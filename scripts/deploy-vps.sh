#!/usr/bin/env bash
# Выкладывает сайт на VPS, где его отдаёт Caddy (itssteps.site → /var/www/itssteps).
# dist/index.html здесь не годится: это редирект для github.io, поэтому index.html
# на сервере берём из dist/app.html.
set -euo pipefail

HOST="root@212.69.85.99"
KEY="$HOME/.ssh/gptrade_vps"
REMOTE_DIR="/var/www/itssteps"

cd "$(dirname "$0")/.."
npm run build

STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT
cp -R dist/. "$STAGE"/
# app.html — собранная главная; на сервере она нужна как index.html, дубль не выкладываем
mv "$STAGE/app.html" "$STAGE/index.html"
# mktemp создаёт папку с правами 700 — сайт должен быть читаем для Caddy
chmod 755 "$STAGE"
find "$STAGE" -name '._*' -delete

# Сервер — точная копия сборки: --delete убирает файлы, которых в сборке больше нет
# (старые бандлы, удалённые картинки). Касается только $REMOTE_DIR.
rsync -rlt --delete -e "ssh -i $KEY -o IdentitiesOnly=yes" "$STAGE"/ "$HOST:$REMOTE_DIR/"
ssh -i "$KEY" -o IdentitiesOnly=yes "$HOST" "chmod -R a+rX $REMOTE_DIR"

echo "Загружено: $HOST:$REMOTE_DIR"

# сервис формы заявок (server/lead_service.py): перезапускаем, только если файл изменился
LOCAL_SUM="$(shasum -a 256 server/lead_service.py | cut -d' ' -f1)"
REMOTE_SUM="$(ssh -i "$KEY" -o IdentitiesOnly=yes "$HOST" "sha256sum /opt/itssteps-leads/lead_service.py 2>/dev/null | cut -d' ' -f1")"
if [ "$LOCAL_SUM" != "$REMOTE_SUM" ]; then
  rsync -rlt -e "ssh -i $KEY -o IdentitiesOnly=yes" server/lead_service.py "$HOST:/opt/itssteps-leads/"
  ssh -i "$KEY" -o IdentitiesOnly=yes "$HOST" "chmod 644 /opt/itssteps-leads/lead_service.py && systemctl restart itssteps-leads"
  echo "Сервис заявок обновлён"
fi

# сообщить поисковикам об обновлённых страницах; сбой здесь не отменяет деплой
node scripts/indexnow.mjs || echo "IndexNow: не удалось отправить, сайт при этом обновлён"
