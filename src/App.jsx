import { useEffect, useRef, useState } from 'react'
import './App.css'

const contactText = 'Здравствуйте! Хочу обсудить автоматизацию / разработку проекта.'
const telegramUrl = `https://t.me/SStepCEO?text=${encodeURIComponent(contactText)}`
const telegramHandle = '@SStepCEO'
const projectImage = (name) => `${import.meta.env.BASE_URL}projects/${name}`
const aboutPhoto = `${import.meta.env.BASE_URL}about/stepan.jpg`

function copyContactText() {
  try {
    navigator.clipboard?.writeText(contactText)
  } catch {
    // не критично: текст всё равно уйдёт через ?text=
  }
}

// Журнал системы вместо картинки продукта на первом экране: это буквально то,
// что бот и AI-менеджер печатают сами, пока никого нет на месте. Пример
// типичной ночи, а не выгрузка конкретного клиента.
const nightLog = [
  ['02:41', 'заявка принята'],
  ['02:41', 'ответ отправлен'],
  ['03:18', 'вопрос по каталогу закрыт'],
  ['04:02', 'оплата 12 000 ₽'],
  ['04:03', 'чек и доступ выданы'],
  ['05:26', 'напоминание клиенту'],
  ['06:31', 'сделка передана в CRM'],
  ['07:04', 'смена открыта: 6 новых заявок'],
]

const services = [
  {
    title: 'Автоматизация и AI',
    body: 'Telegram-боты и AI-менеджеры: принимают заявки, отвечают на вопросы по вашей базе знаний, принимают оплату, ведут подписки и рассылки. Забирают рутину у людей.',
    price: 'от 50 000 ₽',
    term: '1–2 недели',
  },
  {
    title: 'Веб-сервисы и кабинеты',
    body: 'CRM, админки, личные кабинеты и дашборды. Данные в одном месте, интеграции с amoCRM, Битрикс24 и платёжными системами — ЮKassa, Tribute.',
    price: 'от 150 000 ₽',
    term: '3–6 недель',
  },
  {
    title: 'Продукт под ключ',
    body: 'MVP или SaaS с нуля: архитектура, интерфейс, биллинг, аналитика. Для стартапов под инвестиции и внутренних систем бизнеса.',
    price: 'от 300 000 ₽',
    term: 'от 6 недель',
  },
]

const projects = [
  {
    id: 'hayat',
    category: 'Telegram / Продажи',
    title: 'Бот брачного агентства',
    summary:
      'Закрытая анкетная воронка с модерацией, платным доступом и автоматической обработкой заявок. Агентство перестало вести переписку руками.',
    metric: '100 000 ₽ за первую неделю',
    result:
      '50 оплат по 2 000 ₽ за 7 дней после запуска. Сейчас в системе 991 пользователь и 262 анкеты.',
    tags: ['Оплата', 'Воронка', 'Модерация'],
    link: 'https://t.me/Hayatnikah_bot',
    action: 'Открыть бота',
    image: projectImage('hayat-nikah.png'),
  },
  {
    id: 'novoterskaya',
    category: 'Web / Бренд',
    title: 'Сайт бренда минеральной воды',
    summary:
      'Имиджевый сайт «Новотерская Целебная»: история бренда, продуктовая линейка, крупная типографика и анимации. Проект в работе.',
    metric: 'Бюджет 200 000 ₽',
    result: 'Самый крупный текущий проект — от концепции до запуска.',
    tags: ['Бренд', 'Анимации', 'Адаптив'],
    action: 'Обсудить похожий',
    image: projectImage('water-novoterskaya.jpg'),
  },
  {
    id: 'pizza',
    category: 'Web / E-commerce',
    title: 'Сайт пиццерии с онлайн-заказом',
    summary:
      'Меню, корзина, оформление доставки и приём оплаты. Заказ доходит до кухни без звонка и без ручного переноса в таблицу.',
    result: 'Сайт приносит заказы с первого дня, работаем дальше на поддержке.',
    tags: ['Корзина', 'Оплата', 'Доставка'],
    action: 'Обсудить похожий',
    image: projectImage('pizza-bella.jpg'),
  },
  {
    id: 'lsgarden',
    category: 'Web / Внутренняя система',
    title: 'CRM для цветочного магазина',
    summary:
      'Внутренняя система: заказы, клиентская база, статусы и ежедневная операционка в одном окне вместо переписки и таблиц.',
    result: 'Команда видит поток заявок и статусы, ничего не теряется между сменами.',
    tags: ['CRM', 'Внутренний продукт', 'Интерфейс'],
    link: 'https://lsgarden.ru/',
    action: 'Открыть',
    image: projectImage('crm-flower.png'),
  },
  {
    id: 'nexora',
    category: 'Web / Agency',
    title: 'Сайт для digital-агентства',
    summary:
      'Премиальный лендинг для агентства NEXORA: 3D-визуал, крупная типографика, блоки услуг и метрик.',
    result: 'Сайт с первого экрана задаёт статус агентства и удерживает внимание.',
    tags: ['Лендинг', '3D / визуал', 'Анимации'],
    action: 'Обсудить похожий',
    image: projectImage('nexora-agency.png'),
  },
  {
    id: 'jobs-bot',
    category: 'Telegram / Parser',
    title: 'Бот мониторинга вакансий',
    summary: 'Бот отслеживает группы и находит свежие вакансии по ключевым словам.',
    result: 'Новые заказы и вакансии приходят без ручного просмотра десятков чатов.',
    tags: ['Парсинг', 'Уведомления', 'Telegram'],
    action: 'Обсудить похожий',
    image: projectImage('jobs-monitor.png'),
  },
  {
    id: 'slides-ai',
    category: 'Telegram / AI',
    title: 'AI-бот генерации презентаций',
    summary:
      'Работа с языковой моделью по сценарию: бот собирает вводные, генерирует структуру и материалы презентации прямо в Telegram.',
    result: 'Пользователь получает готовый инструмент вместо хаотичного диалога с нейросетью.',
    tags: ['LLM', 'Промпт-сценарии', 'Автоматизация'],
    action: 'Обсудить похожий',
    image: projectImage('slides-ai.png'),
  },
  {
    id: 'course-funnel',
    category: 'Telegram / Воронка',
    title: 'Воронка продаж онлайн-курсов',
    summary:
      'Лид-магнит, прогрев по сценарию, подписка и оплата внутри Telegram. Автор перестал вручную отвечать каждому и вести таблицу оплат.',
    metric: '20 оплат за 7 дней',
    result: 'Путь от лид-магнита до покупки проходит без участия человека.',
    tags: ['Лид-магнит', 'Подписка', 'Оплата'],
    action: 'Обсудить похожий',
    image: projectImage('courses-familia.jpg'),
  },
]

// Отзывы — расшифровка реальных сообщений клиентов.
// Текстом, а не скриншотом: читается на телефоне и не зависит от вёрстки чужого интерфейса.
const reviews = [
  {
    name: 'GrigoriySE',
    project: 'Бот брачного агентства',
    text: 'Всё получилось даже лучше, чем я ожидал. Телеграм-бот работает именно так, как и хотелось, все пожелания были учтены. Степан — настоящий профессионал своего дела. Всегда был на связи, быстро отвечал на вопросы, вносил правки без лишних проблем и довёл проект до отличного результата. Однозначно рекомендую к сотрудничеству!',
  },
  {
    name: 'MarinaPizzaLove',
    project: 'Сайт пиццерии',
    text: 'Нужен был современный, удобный и аппетитный сайт с меню, онлайн-заказом и доставкой. Степан учёл все пожелания: подобрал стиль, сделал понятную структуру, интегрировал корзину и оплату. Сайт отлично выглядит на всех устройствах и уже приносит заказы. Очень довольны результатом и продолжаем сотрудничество по поддержке!',
  },
  {
    name: 'STIZO',
    project: 'Telegram Mini App',
    text: 'Обратился с задачей, когда сроки уже поджимали, думал, что придётся ждать неделю. Но программист удивил: сделал качественную работающую программу менее чем за сутки. Всё чётко, без воды, багов не заметил. Приятно работать с человеком, который ценит и своё, и чужое время. Рекомендую на 100%!',
  },
  {
    name: 'partyzan77777',
    project: 'Мониторинг групп с уведомлениями о заказах',
    text: 'Поставил задачу — сделать бота для мониторинга групп с поиском по ключам. Исполнитель сделал всё качественно и оперативно. Бот работает стабильно, интерфейс удобный. Контакт сохранил, в будущем планирую заказывать доработки. 10/10',
    repeat: true,
  },
  {
    name: 'daneley',
    project: 'Магазин одежды в Telegram',
    text: 'Всё супер! Перенёс магазин одежды в ТГ, сделали быстро и со вкусом. Оформление прям под наш стиль, каталог удобный, клиентам теперь легко заказывать. Отдельное спасибо за автоответчик — заявки летят даже ночью. Рекомендую!',
  },
  {
    name: 'Traffic_Arbitration',
    project: 'Софт для рассылок',
    text: 'После установки и запуска софт отрабатывает на все 100%, установлена гибкая и тонкая настройка. Телеграм не видит, что это софт, — как будто эти действия делает человек, из-за этого аккаунты очень хорошо живут в работе. Сэкономил кучу времени: загрузил 3–4 аккаунта, запустил, и он работает без проблем 8–10 часов.',
  },
]

const stats = [
  { value: '2 года', label: 'в коммерческой разработке' },
  { value: '20+', label: 'проектов доведено до запуска' },
  { value: '2–3', label: 'проекта в работе одновременно' },
]

const workflow = [
  'Бесплатный разбор задачи — 30 минут в Telegram',
  'Фиксирую объём, сроки и цену в договоре',
  'Прототип и согласование до старта разработки',
  'Разработка с демо каждую неделю',
  'Запуск, передача доступов и 2 недели поддержки',
]

// Разделы в том порядке, в котором сайт ведёт читателя: цена → доказательства
// → кто делает → отзывы. Тот же порядок подсвечивает активный пункт в шапке.
const navItems = [
  { id: 'services', label: 'Услуги' },
  { id: 'work', label: 'Кейсы' },
  { id: 'about', label: 'Обо мне' },
  { id: 'proof', label: 'Отзывы' },
]

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

/* ---------- журнал системы ---------- */

// Строки печатаются по одной. Появление сделано через DOM, а не через
// прозрачность: журнал остаётся читаемым, даже если анимации не проигрываются.
function useNightLog() {
  const [shown, setShown] = useState(1)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(nightLog.length)
      return
    }
    let printed = 1
    const timer = window.setInterval(() => {
      printed += 1
      setShown(printed)
      if (printed >= nightLog.length) window.clearInterval(timer)
    }, 230)
    return () => window.clearInterval(timer)
  }, [])

  return shown
}

/* ---------- сценарий чтения: прогресс и активный раздел ---------- */

function useReadingProgress() {
  const [activeId, setActiveId] = useState('')
  const progressRef = useRef(null)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)
    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      const scrolled = doc.scrollTop
      const max = doc.scrollHeight - doc.clientHeight
      progressRef.current?.style.setProperty(
        '--progress',
        max > 0 ? String(Math.min(1, scrolled / max)) : '0',
      )
      // активен последний раздел, чья верхняя граница уже ушла под шапку —
      // иначе на длинных секциях подсветка прыгает туда-сюда
      const line = scrolled + 160
      let current = ''
      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id
      })
      setActiveId(current)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { activeId, progressRef }
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

// Переход к следующему разделу: страница нигде не заканчивается «в никуда»,
// каждый блок сам говорит, что смотреть дальше.
function Bridge({ href, children }) {
  return (
    <div className="bridge-wrap">
      <a className="bridge" href={href}>
        <span>Дальше</span>
        {children}
        <ArrowIcon />
      </a>
    </div>
  )
}

function App() {
  // открытый на весь экран скриншот кейса (null — лайтбокс закрыт)
  const [lightbox, setLightbox] = useState(null)
  const { activeId, progressRef } = useReadingProgress()
  const printed = useNightLog()

  // пока лайтбокс открыт — блокируем прокрутку фона и закрываем по Escape
  useEffect(() => {
    if (!lightbox) return
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  return (
    <div className="site-shell">
      <header className="site-header" ref={progressRef}>
        <span className="header-progress" aria-hidden="true" />
        <a className="brand" href="#top">
          Its Step
        </a>
        <nav className="site-nav" aria-label="Навигация">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? 'is-current' : ''}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href={telegramUrl} onClick={copyContactText}>
          Telegram
          <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-main">
            <h1>Системы, которые работают вместо отдела</h1>
            <p className="hero-lead">
              Боты, AI-менеджеры и веб-сервисы: принимают заявки, отвечают
              клиентам, берут оплату — без участия людей.
            </p>
            <p className="hero-terms">
              <span>От 50 000 ₽</span>
              <i aria-hidden="true">·</i>
              <span>запуск от 1 недели</span>
            </p>
            <div className="hero-actions">
              <a className="action" href={telegramUrl} onClick={copyContactText}>
                Рассказать о задаче
                <ArrowIcon />
              </a>
              <a className="action-text" href="#services">
                Смотреть, как это работает
              </a>
            </div>
          </div>

          <aside className="hero-log">
            <h2>Журнал системы · ночь</h2>
            <ol>
              {nightLog.slice(0, printed).map(([time, event]) => (
                <li key={time + event}>
                  <time>{time}</time>
                  <span>{event}</span>
                </li>
              ))}
            </ol>
            {printed === nightLog.length && (
              <p>Обычная ночь. Ни одного человека в переписке.</p>
            )}
          </aside>

          <div className="hero-footer">
            <span>20+ проектов до запуска</span>
            <span>По договору</span>
            <span>Ответ в Telegram: {telegramHandle}</span>
          </div>
        </section>

        <section className="intro" aria-label="Коротко">
          <p className="intro-lead">Я не продаю «сайт» или «бота».</p>
          <p className="intro-body">
            Я закрываю участок работы, который сейчас делают руками: приём
            заявок, ответы клиентам, оплаты, отчётность. Результат считается в
            заявках и сэкономленных часах, а не в количестве экранов.
          </p>
        </section>

        <section className="section" id="services">
          <div className="section-head">
            <h2>Три формата работы</h2>
          </div>
          {services.map((service) => (
            <article className="service" key={service.title}>
              <div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
              <div className="service-terms">
                <strong>{service.price}</strong>
                <span>{service.term}</span>
              </div>
            </article>
          ))}
          <p className="note">
            Точная цена — после разбора задачи. Смета и сроки фиксируются в договоре.
          </p>
          <Bridge href="#work">Что из этого уже работает у клиентов</Bridge>
        </section>

        <section className="section" id="work">
          <div className="section-head">
            <h2>Что уже работает у клиентов</h2>
          </div>
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <button
                type="button"
                className="project-shot"
                onClick={() => setLightbox(project)}
                aria-label={`Открыть скриншот: ${project.title}`}
              >
                <img src={project.image} alt={project.title} loading="lazy" />
              </button>
              <div className="project-body">
                <span className="project-cat">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.metric && (
                  <strong className="project-metric">{project.metric}</strong>
                )}
                <p>{project.result}</p>
                <ul className="project-tags">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a
                  className="action-text"
                  href={project.link ?? telegramUrl}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noreferrer' : undefined}
                  onClick={project.link ? undefined : copyContactText}
                >
                  {project.action}
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
          <Bridge href="#about">Кто это делает</Bridge>
        </section>

        <section className="section" id="about">
          <div className="about-grid">
            <figure className="about-photo">
              <img
                src={aboutPhoto}
                alt="Степан — разработчик Its Step"
                onError={(event) => {
                  // фото ещё не загружено в public/about — прячем рамку и схлопываем
                  // сетку в одну колонку, иначе текст остаётся в узком столбце
                  event.currentTarget.closest('.about-grid')?.classList.add('is-photoless')
                }}
              />
            </figure>
            <div className="about-copy">
              <h2>Степан, соло-разработчик</h2>
              <p>
                Веду проект один и целиком: разбор задачи, архитектура, интерфейс,
                код, интеграции, запуск. Вы общаетесь напрямую со мной — без
                менеджеров, пересказов и потерянного контекста между людьми.
              </p>
              <p>
                Самозанятый, работаю по договору. Беру 2–3 проекта параллельно,
                чтобы не растягивать сроки.
              </p>
              <ul className="about-stats">
                {stats.map((item) => (
                  <li key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Bridge href="#proof">Что говорят те, кто уже работал</Bridge>
        </section>

        <section className="section" id="proof">
          <div className="section-head">
            <h2>Что говорят клиенты</h2>
          </div>
          <div className="reviews">
            {reviews.map((review) => (
              <figure className="review" key={review.name}>
                <blockquote>{review.text}</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span>{review.project}</span>
                  {review.repeat && <em className="review-repeat">повторный заказ</em>}
                </figcaption>
              </figure>
            ))}
          </div>
          <Bridge href="#process">Как проходит работа и где ваши риски</Bridge>
        </section>

        <section className="section" id="process">
          <div className="section-head">
            <h2>Как мы работаем и где ваши риски</h2>
          </div>
          <ol className="workflow-list">
            {workflow.map((step) => (
              <li key={step}>
                {step}
              </li>
            ))}
          </ol>
          <Bridge href="#contact">Начать с бесплатного разбора</Bridge>
        </section>

        <section className="section contact" id="contact">
          <h2>Расскажите, что у вас делают руками</h2>
          <p>
            Напишите в Telegram и опишите задачу в двух словах. Задам пару
            уточняющих вопросов и в тот же день скажу, сколько это стоит и
            сколько займёт. Разбор бесплатный и ни к чему не обязывает.
          </p>
          <p className="contact-step">
            Шаг 1 из 5 · разбор 30 минут · без оплаты и обязательств
          </p>
          <div>
            <a
              className="action action-invert"
              href={telegramUrl}
              onClick={copyContactText}
            >
              Написать в Telegram
              <ArrowIcon />
            </a>
          </div>
          <p className="contact-direct">
            Или напрямую:{' '}
            <a href={telegramUrl} onClick={copyContactText}>
              {telegramHandle}
            </a>
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top">
          Its Step
        </a>
        <p>
          Автоматизация, AI-агенты и веб-сервисы для бизнеса. Самозанятый,
          работаю по договору, удалённо.
        </p>
      </footer>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title}
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
          <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img src={lightbox.image} alt={lightbox.title} />
            <figcaption>
              {lightbox.category} — {lightbox.title}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default App
