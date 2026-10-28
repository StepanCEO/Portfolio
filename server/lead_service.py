"""Приём заявок с сайта itssteps.site.

POST /api/lead — форма «Оставить заявку» и заявка партнёра. Принимает JSON (fetch)
и обычную отправку формы (если у посетителя не работает JavaScript).
Заявки дописываются в $STATE_DIRECTORY/leads.jsonl. Если в окружении заданы
TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID, каждая заявка дублируется в Telegram.

Без сторонних библиотек: только стандартная библиотека Python.
Слушает 127.0.0.1 — снаружи запросы приходят через Caddy.
"""

import json
import os
import threading
import time
import urllib.parse
import urllib.request
from collections import defaultdict, deque
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HOST = '127.0.0.1'
PORT = int(os.environ.get('LEADS_PORT', '8095'))
STATE_DIR = os.environ.get('STATE_DIRECTORY', '/var/lib/itssteps-leads')
LEADS_FILE = os.path.join(STATE_DIR, 'leads.jsonl')
BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '').strip()
CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '').strip()

MAX_BODY = 16 * 1024
LIMITS = {'name': 120, 'contact': 200, 'company': 200, 'message': 3000, 'page': 200}
# не больше 5 заявок за 10 минут и 20 в сутки с одного адреса — от спама, без капчи
RATE_WINDOWS = [(600, 5), (86400, 20)]

_hits = defaultdict(deque)
_hits_lock = threading.Lock()
_file_lock = threading.Lock()


def rate_limited(ip):
    now = time.time()
    with _hits_lock:
        hits = _hits[ip]
        while hits and now - hits[0] > RATE_WINDOWS[-1][0]:
            hits.popleft()
        for window, limit in RATE_WINDOWS:
            if sum(1 for t in hits if now - t <= window) >= limit:
                return True
        hits.append(now)
        return False


def clean(value, limit):
    text = str(value or '').replace('\r', '').strip()
    return text[:limit]


def notify_telegram(lead):
    if not (BOT_TOKEN and CHAT_ID):
        return
    kind = 'Партнёр' if lead['type'] == 'partner' else 'Заявка'
    lines = [
        f"{kind} с сайта ({lead['lang'].upper()})",
        f"Имя: {lead['name'] or '—'}",
        f"Контакт: {lead['contact']}",
    ]
    if lead['company']:
        lines.append(f"Компания: {lead['company']}")
    if lead['message']:
        lines.append(f"Задача: {lead['message']}")
    lines.append(f"Страница: https://itssteps.site{lead['page']}")
    body = urllib.parse.urlencode({'chat_id': CHAT_ID, 'text': '\n'.join(lines)}).encode()
    try:
        urllib.request.urlopen(
            f'https://api.telegram.org/bot{BOT_TOKEN}/sendMessage', data=body, timeout=8
        ).read()
    except Exception as error:  # заявка уже сохранена — сбой уведомления не теряет её
        print(f'telegram notify failed: {error}', flush=True)


class Handler(BaseHTTPRequestHandler):
    server_version = 'itssteps-leads'

    def log_message(self, fmt, *args):  # без IP и данных заявки в журнале
        print(f'{self.command} {self.path.split("?")[0]} {args[1] if len(args) > 1 else ""}', flush=True)

    def client_ip(self):
        forwarded = self.headers.get('X-Forwarded-For', '')
        return forwarded.split(',')[0].strip() or self.client_address[0]

    def wants_json(self):
        return 'application/json' in (self.headers.get('Accept', '') + self.headers.get('Content-Type', ''))

    def reply(self, status, payload, page='/', force_json=False):
        if force_json or self.wants_json():
            data = json.dumps(payload, ensure_ascii=False).encode()
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(data)
            return
        # обычная отправка формы: возвращаем на ту же страницу с отметкой результата
        result = 'ok' if payload.get('ok') else 'error'
        self.send_response(303)
        self.send_header('Location', f'{page}?lead={result}#lead-form')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/health':
            self.reply(200, {'ok': True}, force_json=True)
        else:
            self.reply(404, {'ok': False, 'error': 'not_found'}, force_json=True)

    def do_POST(self):
        if self.path.split('?')[0] != '/api/lead':
            return self.reply(404, {'ok': False, 'error': 'not_found'})

        length = int(self.headers.get('Content-Length') or 0)
        if length <= 0 or length > MAX_BODY:
            return self.reply(413, {'ok': False, 'error': 'too_large'})
        raw = self.rfile.read(length).decode('utf-8', errors='replace')

        try:
            if 'application/json' in self.headers.get('Content-Type', ''):
                data = json.loads(raw)
            else:
                data = {k: v[0] for k, v in urllib.parse.parse_qs(raw).items()}
        except ValueError:
            return self.reply(400, {'ok': False, 'error': 'bad_request'})

        page = clean(data.get('page'), LIMITS['page'])
        if not page.startswith('/') or page.startswith('//'):
            page = '/'

        # ловушка для ботов: поле скрыто от людей, заполняют его только скрипты
        if clean(data.get('website'), 200):
            return self.reply(200, {'ok': True}, page)

        if rate_limited(self.client_ip()):
            return self.reply(429, {'ok': False, 'error': 'rate_limited'}, page)

        lead = {
            'ts': datetime.now(timezone.utc).isoformat(timespec='seconds'),
            'type': 'partner' if data.get('type') == 'partner' else 'client',
            'lang': 'en' if data.get('lang') == 'en' else 'ru',
            'page': page,
            'name': clean(data.get('name'), LIMITS['name']),
            'contact': clean(data.get('contact'), LIMITS['contact']),
            'company': clean(data.get('company'), LIMITS['company']),
            'message': clean(data.get('message'), LIMITS['message']),
        }
        consent = str(data.get('consent', '')).lower() in ('on', 'true', '1', 'yes')
        if len(lead['contact']) < 3 or not consent:
            return self.reply(422, {'ok': False, 'error': 'invalid'}, page)

        with _file_lock:
            os.makedirs(STATE_DIR, exist_ok=True)
            with open(LEADS_FILE, 'a', encoding='utf-8') as file:
                file.write(json.dumps(lead, ensure_ascii=False) + '\n')
            os.chmod(LEADS_FILE, 0o600)

        threading.Thread(target=notify_telegram, args=(lead,), daemon=True).start()
        return self.reply(200, {'ok': True}, page)


if __name__ == '__main__':
    print(f'itssteps-leads on {HOST}:{PORT}, telegram: {"on" if BOT_TOKEN and CHAT_ID else "off"}', flush=True)
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
