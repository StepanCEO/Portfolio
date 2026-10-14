import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'

// Демо AI-менеджера грузится отдельным файлом — только когда его открыли
const loadDemo = () => import('./AmoDemo.jsx')
const AmoDemo = lazy(loadDemo)

const contactText = 'Здравствуйте, Степан! Хочу обсудить проект.'
const telegramUrl = `https://t.me/SStepCEO?text=${encodeURIComponent(contactText)}`
const telegramHandle = '@SStepCEO'
const kworkUrl = 'https://kwork.ru/user/stepanceo'
const tiktokUrl = 'https://www.tiktok.com/@its___step'
const channelUrl = 'https://t.me/ItsStepss'
const casesChannelUrl = 'https://t.me/itssteps'
const githubUrl = 'https://github.com/StepanCEO'

const asset = (path) => `${import.meta.env.BASE_URL}${path}`
const avatar = asset('about/stepan-avatar.jpg')

// Все цифры на странице проверяемы: Kwork и соцсети — с публичных профилей
// (октябрь 2026), чеки и объёмы — из ТЗ и договоров. Обновлять вручную.
const kwork = { orders: 26, intime: '96%', reviews: 18 }

const heroStats = [
  { value: '30+', label: 'сданных заказов за 2 года' },
  { value: '200 000 ₽', label: 'крупнейший чек — сайт бренда' },
  { value: kwork.intime, label: 'заказов сдано в срок на Kwork' },
  { value: '153 тыс.', label: 'лайков на роликах в TikTok' },
]

const clients = ['Conteria', 'АО «Кавминводы»', 'Новотерская', 'Кейтеринг «Нечай»', 'Hayat Nikah']

const featured = {
  id: 'conteria-tenders',
  category: 'AI · B2B-система · по договору',
  title: 'AI тендер-менеджер для Conteria',
  summary:
    'Система сама находит госзакупки по категориям и регионам, вытаскивает победителей, а AI читает документацию тендера и раскладывает смету на позиции из каталога компании. Дальше — КП, отправка, ответы из почты и CRM.',
  points: [
    ['13', 'стадий воронки от тендера до сделки'],
    ['AI', 'разбирает PDF и сметы вместо менеджера'],
    ['1 окно', 'тендер → КП → ответ → сделка'],
  ],
  tags: ['Django', 'React', 'Celery', 'LLM', 'почта по IMAP'],
  image: asset('projects/conteria-tenders.jpg'),
}

const cases = [
  {
    id: 'conteria-shop',
    category: 'E-commerce',
    title: 'Интернет-магазин инженерного оборудования',
    summary:
      'Переезд с OpenCart на Next.js и Laravel: каталог поставщиков с автообновлением остатков, СДЭК и ПЭК, онлайн-оплата, фиды VK, AI-поиск и AI-консультант.',
    metric: '520 000 товаров',
    metricNote: 'и SEO-тексты для 155 000 страниц через AI',
    link: 'https://conteria.ru/',
    linkLabel: 'conteria.ru',
    image: asset('projects/conteria-shop.jpg'),
  },
  {
    id: 'novoterskaya',
    category: 'Сайт бренда',
    title: 'Минеральная вода «Новотерская»',
    summary:
      'Имиджевый сайт для АО «Кавминводы»: история бренда, состав, каталог, лаборатория и новости. 13 страниц, RU / EN, своя админка для контента.',
    metric: '200 000 ₽',
    metricNote: 'крупнейший чек по сайтам',
    link: 'https://stepanceo.github.io/Novoterskiy/',
    linkLabel: 'Открыть сайт',
    image: asset('projects/water-novoterskaya.jpg'),
  },
  {
    id: 'leasing-crm',
    category: 'CRM',
    title: 'CRM и каталог для лизинговой платформы',
    summary:
      'Каталог авто и спецтехники, калькулятор лизинга с условиями банков, заявки с автопроверкой компании по ИНН, письма поставщиков прямо в интерфейсе, роли и AI-описания.',
    metric: '120 000 ₽',
    metricNote: 'крупнейшая CRM, сдаётся по этапам',
    stack: 'Next.js, Prisma, PostgreSQL',
    image: asset('projects/leasing-crm.jpg'),
  },
  {
    id: 'sales-ai',
    category: 'AI-агент',
    title: 'AI-ассистент отдела продаж',
    summary:
      'AI отвечает клиентам в MAX и почте по базе знаний компании, сам собирает коммерческое предложение в Word и ведёт сделку в amoCRM. Руководитель получает отчёты по менеджерам.',
    metric: 'В продакшене',
    metricNote: 'с августа, расширяется под отдел',
    demo: true,
    stack: 'FastAPI, OpenAI, n8n',
    image: asset('projects/sales-ai.jpg'),
  },
  {
    id: 'hayat',
    category: 'Telegram-бот',
    title: 'Бот брачного агентства',
    summary:
      'Закрытая анкетная воронка с модерацией и платным доступом. Агентство перестало вести переписку руками.',
    metric: '100 000 ₽',
    metricNote: 'выручки клиента за первую неделю — 50 оплат',
    link: 'https://t.me/Hayatnikah_bot',
    linkLabel: '@Hayatnikah_bot',
    image: asset('projects/hayat-nikah.png'),
  },
  {
    id: 'leadgen',
    category: 'AI · Telegram',
    title: 'Лидогенерация для эксперта',
    summary:
      'Аккаунты мониторят тематические чаты, AI оценивает каждое сообщение, отвечает тем, кому нужна помощь, и ведёт их через бота-сценарий к эксперту.',
    metric: 'Заявки 24/7',
    metricNote: 'без ручного поиска в чатах',
    stack: 'Python, PostgreSQL, Docker',
    image: asset('projects/leadgen.jpg'),
  },
  {
    id: 'nechay',
    category: 'Сайт',
    title: 'Кейтеринг «Нечай»',
    summary:
      'Меню, портфолио мероприятий и заявки, которые сразу приходят владельцу. Метрика, мини-админка и автодеплой.',
    metric: 'Живой сайт',
    metricNote: 'на домене клиента',
    link: 'https://nechay.online/',
    linkLabel: 'nechay.online',
    image: asset('projects/nechay-catering.jpg'),
  },
]

// Отзывы — с Kwork, длинные слегка сокращены без изменения смысла.
const reviews = [
  {
    name: 'STIZO',
    project: 'Telegram Mini App',
    text: 'Обратился с задачей, когда сроки уже поджимали, думал, что придётся ждать неделю. Но программист удивил: сделал качественную работающую программу менее чем за сутки. Всё чётко, без воды, багов не заметил. Рекомендую на 100%!',
    accent: true,
  },
  {
    name: 'GrigoriySE',
    project: 'Бот брачного агентства',
    text: 'Всё получилось даже лучше, чем я ожидал. Все пожелания были учтены. Степан — настоящий профессионал своего дела: всегда на связи, быстро вносил правки и довёл проект до отличного результата.',
  },
  {
    name: 'partyzan77777',
    project: 'AI-фильтрация контента в боте',
    text: 'Второй раз обращаюсь к этому разработчику. Всё оперативно переделал под новые задачи, бот работает отлично. Рекомендую!',
    repeat: true,
  },
  {
    name: 'MarinaPizzaLove',
    project: 'Сайт пиццерии',
    text: 'Степан учёл все пожелания: подобрал стиль, сделал понятную структуру, интегрировал корзину и оплату. Сайт отлично выглядит на всех устройствах и уже приносит заказы. Продолжаем сотрудничество!',
  },
  {
    name: 'daneley',
    project: 'Магазин одежды в Telegram',
    text: 'Перенёс магазин одежды в ТГ, сделали быстро и со вкусом. Каталог удобный, клиентам легко заказывать. Отдельное спасибо за автоответчик — заявки летят даже ночью.',
  },
  {
    name: 'fomin273',
    project: 'Бот продажи курсов с подпиской',
    text: 'Всё отлично. Настроили бота. Советую. Исполнительный и инициативный.',
  },
]

const reviewShots = [
  { src: asset('reviews/review-01.png'), alt: 'Два отзыва partyzan77777 на Kwork' },
  { src: asset('reviews/review-03.png'), alt: 'Отзывы fomin273 и STIZO на Kwork' },
]

const media = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@its___step',
    url: tiktokUrl,
    body: 'Короткие видео о том, как с помощью AI собирать продукты, находить клиентов и зарабатывать на разработке.',
    stats: [
      ['153 тыс.', 'лайков'],
      ['1 288', 'подписчиков'],
      ['194', 'видео'],
    ],
  },
  {
    id: 'channel',
    name: 'Telegram-канал',
    handle: '@ItsStepss',
    url: channelUrl,
    body: 'AI-фриланс изнутри: как оцениваю заказы, сколько стоит разработка и какие ошибки дорого обходятся.',
    stats: [['349', 'подписчиков']],
  },
  {
    id: 'cases',
    name: 'Кейсы и отзывы',
    handle: '@itssteps',
    url: casesChannelUrl,
    body: 'Отдельный канал только с работами: задача клиента, что сделано и что он написал после сдачи.',
  },
]

const stack = [
  'Python',
  'FastAPI',
  'Django',
  'Next.js',
  'React',
  'TypeScript',
  'PostgreSQL',
  'Redis',
  'Docker',
  'OpenAI',
  'DeepSeek',
  'n8n',
  'amoCRM',
  'Telegram API',
  'ЮKassa',
]

const services = [
  {
    title: 'Автоматизация и AI',
    body: 'AI-менеджеры и Telegram-боты: принимают заявки, отвечают по вашей базе знаний, берут оплату, ведут клиента до сделки.',
    price: 'от 50 000 ₽',
    term: '1–2 недели',
  },
  {
    title: 'Веб-сервисы и CRM',
    body: 'CRM, кабинеты, админки и дашборды. Интеграции с amoCRM, Битрикс24, почтой и платёжными системами — ЮKassa, Tribute.',
    price: 'от 150 000 ₽',
    term: '3–6 недель',
    accent: true,
  },
  {
    title: 'Продукт под ключ',
    body: 'MVP или SaaS с нуля: архитектура, интерфейс, биллинг, аналитика. Для стартапов и внутренних систем бизнеса.',
    price: 'от 300 000 ₽',
    term: 'от 6 недель',
  },
]

const steps = [
  ['Разбор задачи', 'Бесплатно, 30 минут в Telegram. В тот же день — оценка сроков и цены.'],
  ['Договор и ТЗ', 'Фиксирую объём, сроки и стоимость. Работаю как самозанятый.'],
  ['Разработка этапами', 'Оплата по этапам, демо каждую неделю — видно, за что платите.'],
  ['Запуск и поддержка', 'Передаю код и доступы, 2 недели поддержки включены.'],
]

const navItems = [
  { id: 'cases', label: 'Кейсы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'media', label: 'Блог' },
  { id: 'about', label: 'Обо мне' },
  { id: 'pricing', label: 'Цены' },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 16 16 8m-7 0h7v7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

// подсветка пункта меню: активен последний раздел, чей верх ушёл под шапку
function useActiveSection() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.scrollY + 140
      let current = ''
      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id
      })
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return activeId
}

function SectionHead({ title, children, aside }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {children && <p className="section-lead">{children}</p>}
      </div>
      {aside}
    </div>
  )
}

function App() {
  const [lightbox, setLightbox] = useState(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const activeId = useActiveSection()

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightbox])

  return (
    <div className="site">
      <header className="header">
        <a className="brand" href="#top">
          Its Step
        </a>
        <nav className="nav" aria-label="Навигация">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-small" href={telegramUrl}>
          Обсудить проект
        </a>
      </header>

      <main>
        {/* ---------- первый экран ---------- */}
        <section className="hero" id="top">
          <div className="hero-copy">
            <h1>
              Делаю <span className="nowrap">AI-системы</span>, CRM и сайты для бизнеса
            </h1>
            <a className="hero-person" href="#about">
              <img src={avatar} alt="" width="48" height="48" />
              <span>Степан, разработчик</span>
            </a>
            <p className="hero-lead">
              За два года сдал 30+ заказов: тендерную AI-систему, магазин на
              520 000 товаров, сайт бренда минеральной воды за 200 000 ₽. Веду
              проект сам — от ТЗ до запуска, без менеджеров и посредников.
            </p>
            <div className="hero-actions">
              <a className="btn" href={telegramUrl}>
                Обсудить проект
                <ArrowIcon />
              </a>
              <a className="btn btn-ghost" href="#cases">
                Смотреть кейсы
              </a>
            </div>
            <p className="hero-kwork">
              На Kwork —{' '}
              <a href={kworkUrl} target="_blank" rel="noreferrer">
                {kwork.orders} выполненных заказов и {kwork.reviews} отзывов
              </a>
              , {kwork.intime} сданы в срок.
            </p>
          </div>

          <figure className="hero-visual">
            <button
              type="button"
              className="hero-shot"
              onClick={() => setLightbox({ src: featured.image, alt: featured.title })}
              aria-label={`Открыть скриншот: ${featured.title}`}
            >
              <img src={featured.image} alt={featured.title} />
            </button>
            <figcaption>
              Тендерная система Conteria: AI разбирает документацию закупки и
              сопоставляет смету с каталогом. Реальный экран из работы клиента.
            </figcaption>
          </figure>
        </section>

        <section className="stats" aria-label="Цифры">
          {heroStats.map((item) => (
            <div key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </section>

        <section className="clients" aria-label="Клиенты">
          <span className="clients-label">Работал с</span>
          <ul>
            {clients.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>

        {/* ---------- кейсы ---------- */}
        <section className="section" id="cases">
          <SectionHead title="Крупные кейсы">
            AI-системы, CRM и сайты для реального бизнеса. Часть работает внутри
            компаний клиентов — там вместо скриншота показан состав системы.
          </SectionHead>

          <article className="featured">
            <div className="featured-copy">
              <span className="case-cat">{featured.category}</span>
              <h3>{featured.title}</h3>
              <p>{featured.summary}</p>
              <ul className="featured-points">
                {featured.points.map(([value, label]) => (
                  <li key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
              <p className="featured-stack">Стек: {featured.tags.join(', ')}</p>
            </div>
            <button
              type="button"
              className="featured-shot"
              onClick={() => setLightbox({ src: featured.image, alt: featured.title })}
              aria-label={`Открыть скриншот: ${featured.title}`}
            >
              <img src={featured.image} alt={featured.title} loading="lazy" />
            </button>
          </article>

          <div className="case-grid">
            {cases.map((item) => (
              <article className="case" key={item.id}>
                <button
                  type="button"
                  className="case-shot"
                  onClick={() => setLightbox({ src: item.image, alt: item.title })}
                  aria-label={`Открыть скриншот: ${item.title}`}
                >
                  <img src={item.image} alt={item.title} loading="lazy" />
                </button>
                <div className="case-body">
                  <span className="case-cat">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  {item.stack && <p className="case-stack">Стек: {item.stack}</p>}
                  <div className="case-foot">
                    <div className="case-metric">
                      <strong>{item.metric}</strong>
                      <span>{item.metricNote}</span>
                    </div>
                    {item.demo && (
                      <button
                        type="button"
                        className="case-demo"
                        onPointerEnter={loadDemo}
                        onFocus={loadDemo}
                        onClick={() => setDemoOpen(true)}
                      >
                        Попробовать менеджера
                        <ArrowIcon />
                      </button>
                    )}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noreferrer" className="case-link">
                        {item.linkLabel}
                        <ExternalIcon />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- отзывы ---------- */}
        <section className="section" id="reviews">
          <SectionHead title="Что говорят клиенты"
            aside={
              <a className="kwork-card" href={kworkUrl} target="_blank" rel="noreferrer">
                <span>Профиль на Kwork</span>
                <strong>{kwork.reviews} отзывов</strong>
                <em>
                  {kwork.orders} заказов · {kwork.intime} в срок
                </em>
                <ExternalIcon />
              </a>
            }
          >
            Отзывы с Kwork — каждый можно проверить в профиле.
          </SectionHead>

          <div className="reviews">
            {reviews.map((review) => (
              <figure className={`review${review.accent ? ' review-accent' : ''}`} key={review.name}>
                <blockquote>{review.text}</blockquote>
                <figcaption>
                  <span className="review-avatar" aria-hidden="true">
                    {review.name[0].toUpperCase()}
                  </span>
                  <span>
                    <strong>{review.name}</strong>
                    {review.project}
                  </span>
                  {review.repeat && <em>повторный заказ</em>}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="review-shots">
            <span className="review-shots-label">Оригиналы со страницы Kwork</span>
            <div>
              {reviewShots.map((shot) => (
                <button
                  type="button"
                  key={shot.src}
                  onClick={() => setLightbox(shot)}
                  aria-label={`Открыть скриншот: ${shot.alt}`}
                >
                  <img src={shot.src} alt={shot.alt} loading="lazy" />
                </button>
              ))}
            </div>
            <a href={casesChannelUrl} target="_blank" rel="noreferrer">
              Новые отзывы — в канале @itssteps
              <ArrowIcon />
            </a>
          </div>
        </section>

        {/* ---------- медиа ---------- */}
        <section className="section" id="media">
          <SectionHead title="Веду блог об AI-разработке">
            1 600+ человек следят за тем, как я работаю. До старта проекта можно
            посмотреть, как я думаю и как объясняю сложное.
          </SectionHead>

          <div className="media">
            {media.map((item) => (
              <a
                key={item.id}
                className={`media-card media-${item.id}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="media-top">
                  <span className="media-name">{item.name}</span>
                  <ExternalIcon />
                </div>
                <span className="media-handle">{item.handle}</span>
                <p>{item.body}</p>
                {item.stats ? (
                  <ul className="media-stats">
                    {item.stats.map(([value, label]) => (
                      <li key={label}>
                        <strong>{value}</strong>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="media-open">Смотреть кейсы</span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* ---------- обо мне ---------- */}
        <section className="section about" id="about">
          <div className="about-card">
            <img className="about-avatar" src={avatar} alt="Степан" width="112" height="112" />
            <div>
              <h2>Степан, разработчик Its Step</h2>
              <p>
                Делаю системы, которые берут на себя работу людей: AI-агенты,
                CRM, интеграции и сайты. Веду проект один и целиком — разбор
                задачи, архитектура, интерфейс, код, запуск. Вы общаетесь напрямую
                со мной, контекст не теряется между людьми.
              </p>
              <p>
                Самозанятый, работаю по договору. Беру 2–3 проекта параллельно,
                чтобы не растягивать сроки.
              </p>
              <p className="stack">
                <span>Работаю с</span> {stack.join(', ')}.
              </p>
              <div className="about-links">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  GitHub <ExternalIcon />
                </a>
                <a href={kworkUrl} target="_blank" rel="noreferrer">
                  Kwork <ExternalIcon />
                </a>
                <a href={tiktokUrl} target="_blank" rel="noreferrer">
                  TikTok <ExternalIcon />
                </a>
                <a href={channelUrl} target="_blank" rel="noreferrer">
                  Telegram-канал <ExternalIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- цены и процесс ---------- */}
        <section className="section" id="pricing">
          <SectionHead title="Форматы и цены">
            Точная цена — после бесплатного разбора. Смета и сроки фиксируются в
            договоре.
          </SectionHead>
          <div className="services">
            {services.map((service) => (
              <article
                className={`service${service.accent ? ' service-accent' : ''}`}
                key={service.title}
              >
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="service-terms">
                  <strong>{service.price}</strong>
                  <span>{service.term}</span>
                </div>
              </article>
            ))}
          </div>

          <ol className="steps">
            {steps.map(([title, body], i) => (
              <li key={title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{title}</strong>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- контакт ---------- */}
        <section className="cta" id="contact">
          <div className="cta-inner">
            <img src={avatar} alt="" width="64" height="64" />
            <h2>Расскажите, что у вас делают руками</h2>
            <p>
              Опишите задачу в двух словах. В тот же день скажу, как её решить,
              сколько это стоит и сколько займёт. Разбор бесплатный.
            </p>
            <a className="btn btn-dark" href={telegramUrl}>
              Написать в Telegram
              <ArrowIcon />
            </a>
            <span className="cta-handle">{telegramHandle} · отвечаю лично</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#top">
          Its Step
        </a>
        <p>AI-системы, CRM и сайты для бизнеса. Самозанятый, по договору, удалённо.</p>
        <div className="footer-links">
          <a href={telegramUrl}>Telegram</a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer">
            TikTok
          </a>
          <a href={kworkUrl} target="_blank" rel="noreferrer">
            Kwork
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>

      {demoOpen && (
        <Suspense fallback={null}>
          <AmoDemo onClose={() => setDemoOpen(false)} />
        </Suspense>
      )}

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="lightbox-close"
            aria-label="Закрыть"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default App
