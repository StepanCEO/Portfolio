import { useEffect, useRef, useState } from 'react'
import './AmoDemo.css'

// Демо AI-менеджера отдела продаж. Ничего не генерируется и никуда не уходит:
// сделка, клиент, цены и ответы бота — заготовки ниже. Данных реальной
// компании здесь нет, и добавлять их нельзя: страница публичная.

const RATE = 11.05 // «курс ЦБ» для демо
const MARKUP = 1.25 // условная наценка для демо — не цифра реального клиента

const spaced = (value) => value.toLocaleString('ru-RU').replace(/\s/g, ' ')
const rub = (value) => `${spaced(value)} ₽`
const cny = (value) => `¥ ${spaced(value)}`
// Округление вверх до тысячи — клиенту не показываем копейки
const toRub = (amount) => Math.ceil((amount * RATE * MARKUP) / 1000) * 1000

const client = { company: 'ООО «Металлист-Демо»', person: 'Иван Петров', phone: '+7 900 000-00-00' }
const dealId = 48213

const items = [
  {
    name: 'Вертикальный фрезерный центр VMC-855',
    note: 'поле 850×500 мм, стойка ЧПУ, шпиндель 12 000 об/мин',
    cny: 248000,
  },
  { name: 'Комплект оснастки и инструмента', note: 'тиски, патроны, стартовый набор фрез', cny: 18500 },
  { name: 'Доставка до площадки клиента', note: 'со страховкой груза', rub: 180000 },
  { name: 'Пусконаладка и обучение операторов', note: '3 рабочих дня на месте', rub: 120000 },
].map((item) => ({ ...item, price: item.rub ?? toRub(item.cny) }))

const total = items.reduce((sum, item) => sum + item.price, 0)
const analog = { name: 'VMC-650', cny: 189000 }

const stages = ['Новая заявка', 'Квалификация', 'Подготовка КП', 'КП готово', 'Сделка']

const initialFeed = [
  { id: 'f1', type: 'system', time: '09:41', text: 'Сделка создана автоматически из сообщения в МАКС' },
  {
    id: 'f2',
    type: 'client',
    time: '09:41',
    author: client.person,
    text: [
      'Добрый день! Нужен вертикальный фрезерный центр под стальные корпуса, поле примерно 800×500. Бюджет до 4,5 млн. Пришлите, пожалуйста, КП.',
    ],
  },
  {
    id: 'f3',
    type: 'outgoing',
    time: '09:42',
    author: 'AI-менеджер → МАКС',
    text: [
      'Здравствуйте, Иван! Подберём станок под ваши детали и пришлём КП сегодня. Подскажите, нужна ли пусконаладка и обучение операторов?',
    ],
  },
  { id: 'f4', type: 'client', time: '09:50', author: client.person, text: ['Да, с пусконаладкой.'] },
  {
    id: 'f5',
    type: 'bot',
    time: '09:51',
    author: 'AI-менеджер',
    label: 'Сводка для менеджера',
    text: [
      'Металлообработка, серийные корпуса. Нужен VMC с полем ~800×500 мм, бюджет до 4,5 млн ₽, с пусконаладкой.',
      'Под запрос подходит VMC-855 из каталога. Не хватает срока поставки — уточню у клиента.',
    ],
  },
]

const commands = [
  {
    id: 'kp',
    label: '@бот, сделай КП',
    steps: ['Беру позиции из каталога…', 'Пересчитываю юани по курсу ЦБ…', 'Собираю документ по шаблону…'],
    reply: {
      label: 'КП готово',
      text: [
        `Черновик КП: 4 позиции, итого ${rub(total)} — в бюджет клиента до 4,5 млн укладываемся.`,
        'Проверьте документ. Отправить клиенту можно командой «@почта, отправь КП» или «@макс».',
      ],
      attachment: true,
    },
  },
  {
    id: 'cny',
    label: '@бот, подскажи стоимость в юанях',
    steps: ['Смотрю закупочные цены завода…', 'Беру курс ЦБ на сегодня…'],
    reply: {
      label: 'Цена в юанях',
      text: [
        `VMC-855 у завода — ${cny(items[0].cny)}, оснастка — ${cny(items[1].cny)}. Это закупка.`,
        `Клиенту: ${cny(items[0].cny)} × ${String(RATE).replace('.', ',')} ₽ по курсу ЦБ × ${String(MARKUP).replace('.', ',')} наценки = ${rub(items[0].price)}.`,
        'Курс беру из выгрузки ЦБ, а не придумываю: нет курса — нет цены.',
      ],
    },
  },
  {
    id: 'analog',
    label: '@бот, подбери аналог дешевле',
    steps: ['Ищу похожие станки в каталоге…', 'Сравниваю характеристики…'],
    reply: {
      label: 'Аналог',
      text: [
        `${analog.name} — ${cny(analog.cny)}, клиенту ${rub(toRub(analog.cny))}: на ${rub(items[0].price - toRub(analog.cny))} дешевле.`,
        'Но поле у него 650×400 мм, а клиент просил около 800×500. Советую сначала уточнить у Ивана размер самых крупных деталей.',
      ],
    },
  },
]

function nextTime(time) {
  const [h, m] = time.split(':').map(Number)
  const minutes = h * 60 + m + 2
  return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}

function today() {
  return new Date().toLocaleDateString('ru-RU')
}

function Entry({ entry, onOpenKp }) {
  if (entry.type === 'system') {
    return (
      <li className="amo-entry amo-system">
        <span>{entry.time}</span> {entry.text}
      </li>
    )
  }

  const avatar = { client: 'ИП', manager: 'А', bot: 'AI', outgoing: 'AI' }[entry.type]

  return (
    <li className={`amo-entry amo-${entry.type}`}>
      <span className="amo-avatar" aria-hidden="true">
        {avatar}
      </span>
      <div className="amo-bubble">
        <div className="amo-meta">
          <strong>{entry.author}</strong>
          {entry.type === 'client' && <em className="amo-channel">МАКС</em>}
          {entry.label && <em className="amo-tag">{entry.label}</em>}
          <span>{entry.time}</span>
        </div>
        {entry.steps ? (
          <ul className="amo-steps">
            {entry.steps.map((step, index) => (
              <li key={step} className={index < entry.done ? 'is-done' : ''}>
                {step}
              </li>
            ))}
          </ul>
        ) : (
          entry.text.map((line) => <p key={line}>{line}</p>)
        )}
        {entry.attachment && (
          <button type="button" className="amo-file" onClick={onOpenKp}>
            <span className="amo-file-icon" aria-hidden="true">
              DOC
            </span>
            <span>
              <strong>КП_{dealId}_Металлист.docx</strong>
              <small>Черновик · нажмите, чтобы открыть</small>
            </span>
          </button>
        )}
      </div>
    </li>
  )
}

function KpDocument({ onClose }) {
  return (
    <div className="kp-overlay" role="dialog" aria-modal="true" aria-label="Коммерческое предложение" onClick={onClose}>
      <div className="kp-toolbar" onClick={(event) => event.stopPropagation()}>
        <span>КП_{dealId}_Металлист.docx</span>
        <div>
          <button type="button" onClick={() => window.print()}>
            Сохранить PDF
          </button>
          <button type="button" onClick={onClose} aria-label="Закрыть документ">
            ✕
          </button>
        </div>
      </div>

      <article className="kp-paper" onClick={(event) => event.stopPropagation()}>
        <span className="kp-watermark" aria-hidden="true">
          ДЕМО
        </span>
        <header className="kp-head">
          <div>
            <strong>ООО «Демо-Поставка»</strong>
            <span>Станки и линии для производства</span>
          </div>
          <span>
            Исх. № {dealId} от {today()}
          </span>
        </header>

        <p className="kp-to">
          Для: {client.company}
          <br />
          {client.person}
        </p>
        <h4>Коммерческое предложение</h4>
        <p>Благодарим за обращение. По вашему запросу подобрали оборудование для обработки стальных корпусов:</p>

        <table className="kp-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.name}>
                <td>{index + 1}</td>
                <td>
                  {item.name}
                  <small>{item.note}</small>
                </td>
                <td>{rub(item.price)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Итого, с НДС</td>
              <td>{rub(total)}</td>
            </tr>
          </tfoot>
        </table>

        <ul className="kp-terms">
          <li>Срок поставки: 45–60 дней с момента предоплаты</li>
          <li>Оплата: 50% предоплата, 50% перед отгрузкой</li>
          <li>Гарантия: 12 месяцев</li>
          <li>Цены действительны 5 рабочих дней — зависят от курса юаня</li>
        </ul>

        <footer className="kp-foot">
          Документ собран AI-менеджером по шаблону компании. Все данные вымышленные.
        </footer>
      </article>
    </div>
  )
}

export default function AmoDemo({ onClose }) {
  const [feed, setFeed] = useState(initialFeed)
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [used, setUsed] = useState([])
  const [stage, setStage] = useState(2)
  const [budget, setBudget] = useState(null)
  const [kpOpen, setKpOpen] = useState(false)
  const run = useRef(0)
  const clock = useRef('10:04')
  const feedRef = useRef(null)

  // Таймеры прошлого прогона гасятся сменой run.current — после «Заново»
  // или закрытия окна старый сценарий больше ничего не допишет.
  const wait = (ms, token) =>
    new Promise((resolve, reject) => {
      setTimeout(() => (run.current === token ? resolve() : reject(new Error('cancelled'))), ms)
    })

  const tick = () => {
    clock.current = nextTime(clock.current)
    return clock.current
  }

  const play = async (command) => {
    const token = run.current
    setBusy(true)
    try {
      for (let i = 1; i <= command.label.length; i += 1) {
        setDraft(command.label.slice(0, i))
        await wait(28, token)
      }
      await wait(250, token)
      setDraft('')
      const askedAt = tick()
      setFeed((list) => [
        ...list,
        { id: `m-${command.id}-${Date.now()}`, type: 'manager', time: askedAt, author: 'Анна, менеджер', text: [command.label] },
      ])

      const workId = `w-${command.id}-${Date.now()}`
      await wait(500, token)
      setFeed((list) => [
        ...list,
        { id: workId, type: 'bot', time: askedAt, author: 'AI-менеджер', label: 'Работаю', steps: command.steps, done: 0 },
      ])
      for (let i = 1; i <= command.steps.length; i += 1) {
        await wait(750, token)
        setFeed((list) => list.map((entry) => (entry.id === workId ? { ...entry, done: i } : entry)))
      }
      await wait(350, token)
      const answeredAt = tick()
      setFeed((list) =>
        list.map((entry) =>
          entry.id === workId ? { id: workId, type: 'bot', time: answeredAt, author: 'AI-менеджер', ...command.reply } : entry,
        ),
      )
      if (command.id === 'kp') {
        setStage(3)
        setBudget(total)
      }
      setUsed((list) => (list.includes(command.id) ? list : [...list, command.id]))
      setBusy(false)
    } catch {
      // прогон отменён
    }
  }

  const reset = () => {
    run.current += 1
    clock.current = '10:04'
    setFeed(initialFeed)
    setDraft('')
    setBusy(false)
    setUsed([])
    setStage(2)
    setBudget(null)
    setKpOpen(false)
  }

  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return
      if (kpOpen) setKpOpen(false)
      else onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [kpOpen, onClose])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
      run.current += 1
    }
  }, [])

  useEffect(() => {
    const node = feedRef.current
    if (node) node.scrollTo({ top: node.scrollHeight, behavior: 'smooth' })
  }, [feed])

  return (
    <div className="amo-overlay" role="dialog" aria-modal="true" aria-label="Демо AI-менеджера">
      <div className="amo-window">
        <div className="amo-banner">
          <span>
            <b>Демо.</b> Сделка, клиент и цены вымышлены, ответы бота заготовлены заранее.
          </span>
          <div className="amo-banner-actions">
            <button type="button" onClick={reset} disabled={feed === initialFeed && !draft}>
              Заново
            </button>
            <button type="button" className="amo-close" onClick={onClose} aria-label="Закрыть демо">
              ✕
            </button>
          </div>
        </div>

        <div className="amo-body">
          <nav className="amo-rail" aria-hidden="true">
            {['▦', '☰', '✉', '☏', '◔'].map((icon, index) => (
              <span key={icon} className={index === 1 ? 'is-active' : ''}>
                {icon}
              </span>
            ))}
          </nav>

          <aside className="amo-card">
            <span className="amo-id">Сделка #{dealId}</span>
            <h3>Фрезерный центр для «Металлист-Демо»</h3>
            <div className="amo-stage">
              <div className="amo-stage-bar">
                {stages.map((name, index) => (
                  <span key={name} className={index <= stage ? 'is-on' : ''} />
                ))}
              </div>
              <span>{stages[stage]}</span>
            </div>
            <dl className="amo-fields">
              <div>
                <dt>Бюджет</dt>
                <dd className={budget ? 'is-new' : ''}>{budget ? rub(budget) : '—'}</dd>
              </div>
              <div>
                <dt>Ответственный</dt>
                <dd>Анна, менеджер</dd>
              </div>
              <div>
                <dt>Источник</dt>
                <dd>МАКС</dd>
              </div>
              <div>
                <dt>Режим бота</dt>
                <dd>Суфлёр</dd>
              </div>
              <div>
                <dt>Контакт</dt>
                <dd>
                  {client.person}
                  <small>{client.phone}</small>
                </dd>
              </div>
              <div>
                <dt>Компания</dt>
                <dd>{client.company}</dd>
              </div>
            </dl>
          </aside>

          <section className="amo-main">
            <ol className="amo-feed" ref={feedRef}>
              {feed.map((entry) => (
                <Entry key={entry.id} entry={entry} onOpenKp={() => setKpOpen(true)} />
              ))}
            </ol>

            <div className="amo-composer">
              <div className="amo-tabs" aria-hidden="true">
                <span>Чат</span>
                <span className="is-active">Примечание</span>
                <span>Задача</span>
              </div>
              <div className="amo-input" aria-live="polite">
                {draft || <span>Выберите команду ниже</span>}
                {draft && <i className="amo-caret" />}
              </div>
              <div className="amo-commands">
                {commands.map((command) => (
                  <button
                    key={command.id}
                    type="button"
                    disabled={busy}
                    className={used.includes(command.id) ? 'is-used' : ''}
                    onClick={() => play(command)}
                  >
                    {command.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {kpOpen && <KpDocument onClose={() => setKpOpen(false)} />}
    </div>
  )
}
