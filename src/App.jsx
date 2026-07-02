import { startTransition, useState } from 'react'
import './App.css'

const telegramUrl = 'https://t.me/SStepCEO'
const reviewImage = (name) => `${import.meta.env.BASE_URL}reviews/${name}`

const services = [
  {
    number: '01',
    title: 'Лендинги',
    body: 'Собираю структуру, тексты, визуал и адаптив под заявки, рекламу и личный бренд.',
  },
  {
    number: '02',
    title: 'Telegram-боты',
    body: 'Делаю ботов для продаж, мониторинга, уведомлений, оплаты, подписок и клиентских сценариев.',
  },
  {
    number: '03',
    title: 'Mini Apps',
    body: 'Проектирую аккуратные интерфейсы внутри Telegram: каталоги, кабинеты, CRM и админки.',
  },
]

const projects = [
  {
    id: 'lsgarden',
    type: 'site',
    category: 'Web / CRM',
    title: 'CRM для цветочного магазина',
    summary: 'Система для заказов, клиентов и ежедневной операционной работы цветочного магазина.',
    result: 'Команде проще видеть статусы, заявки и клиентский поток.',
    tags: ['CRM', 'Фронтенд', 'Интерфейс'],
    link: 'https://lsgarden.ru/',
    action: 'Открыть',
  },
  {
    id: 'jobs-bot',
    type: 'bot',
    category: 'Telegram / Parser',
    title: 'Бот мониторинга вакансий',
    summary: 'Бот отслеживает группы и находит свежие вакансии по ключевым словам.',
    result: 'Новые заказы и вакансии приходят без ручного просмотра десятков чатов.',
    tags: ['Парсинг', 'Уведомления', 'Telegram'],
    action: 'Обсудить похожий',
  },
  {
    id: 'slides-ai',
    type: 'bot',
    category: 'Telegram / AI',
    title: 'ИИ-бот презентаций',
    summary: 'Сценарий генерации структуры и материалов для презентаций прямо в Telegram.',
    result: 'Пользователь получает быстрый инструмент вместо хаотичного диалога с ИИ.',
    tags: ['ИИ', 'UX бота', 'Автоматизация'],
    action: 'Обсудить похожий',
  },
  {
    id: 'familia',
    type: 'bot',
    category: 'Telegram / Sales',
    title: 'Бот продажи курсов',
    summary: 'Воронка продаж для дизайнерской компании @familiainfobot с подпиской и оплатой.',
    result: 'Путь до покупки стал понятным, а обработка заявок автоматизированной.',
    tags: ['Продажи', 'Курсы', 'Подписка'],
    action: 'Обсудить похожий',
  },
  {
    id: 'water-brand',
    type: 'bot',
    category: 'Brand / Chatbot',
    title: 'Чат-бот бренда воды',
    summary: 'Брендовый сценарий общения: продукты, консультации, навигация и быстрый контакт.',
    result: 'Клиент быстрее получает ответ, бренд выглядит собраннее в переписке.',
    tags: ['Сценарии', 'Лид-ген', 'Поддержка'],
    action: 'Обсудить похожий',
  },
]

const reviews = [
  {
    image: reviewImage('review-01.png'),
    alt: 'Отзывы клиентов о Telegram-боте для фильтрации контента и мониторинге групп',
  },
  {
    image: reviewImage('review-02.png'),
    alt: 'Отзывы клиентов о Telegram-боте для магазина одежды и софте для рассылки',
  },
  {
    image: reviewImage('review-03.png'),
    alt: 'Отзывы клиентов о Telegram-боте по продаже курсов и Mini App frontend',
  },
]

const workflow = [
  'Бриф и цель проекта',
  'Структура, сценарии, тексты',
  'Дизайн и сборка',
  'Адаптив, тесты, запуск',
  'Поддержка после релиза',
]

const neededInfo = [
  '2-3 ссылки на проекты или скриншоты работ',
  'цифры по результатам: заявки, скорость, продажи, экономия времени',
  'фото или аватар для личного бренда',
  'точные цены или диапазоны, которые хочешь показывать',
  'любимые сайты по стилю, чтобы попасть в твой вкус',
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
        strokeWidth="2"
      />
    </svg>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all')

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.type === activeFilter)

  const handleFilter = (filter) => {
    startTransition(() => {
      setActiveFilter(filter)
    })
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="StepanCEO">
          <span>SC</span>
          StepanCEO
        </a>
        <nav className="site-nav" aria-label="Навигация">
          <a href="#work">Кейсы</a>
          <a href="#services">Услуги</a>
          <a href="#proof">Отзывы</a>
          <a href="#contact">Контакт</a>
        </nav>
        <a className="header-cta" href={telegramUrl}>
          Telegram
          <ArrowIcon />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-scene" aria-hidden="true">
            <div className="scene-grid"></div>
            <div className="scene-line scene-line-one"></div>
            <div className="scene-line scene-line-two"></div>
            <div className="scene-code">
              <span>bot.status = online</span>
              <span>landing.conversion += clarity</span>
              <span>miniapp.flow = smooth</span>
            </div>
            <div className="scene-proof">
              {reviews.map((review) => (
                <img key={review.image} src={review.image} alt="" />
              ))}
            </div>
          </div>

          <div className="hero-content reveal">
            <p className="hero-label">Лендинги / Telegram-боты / Mini Apps</p>
            <h1>StepanCEO</h1>
            <p className="hero-lead">
              Разрабатываю премиальные сайты, ботов и Telegram Mini Apps для
              проектов, которым важны скорость, аккуратность и понятная подача.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href={telegramUrl}>
                Обсудить проект
                <ArrowIcon />
              </a>
              <a className="secondary-action" href="#work">
                Смотреть кейсы
              </a>
            </div>
          </div>

          <div className="hero-footer">
            <span>Удалённо</span>
            <span>От идеи до запуска</span>
            <span>Ответ в Telegram: @SStepCEO</span>
          </div>
        </section>

        <section className="intro-strip" aria-label="Коротко">
          <p>
            Я не делаю «просто красивую страницу». Сначала собираю смысл,
            потом превращаю его в интерфейс, который выглядит уверенно и
            помогает человеку быстрее оставить заявку.
          </p>
        </section>

        <section className="services" id="services">
          <div className="section-title reveal">
            <span>Услуги</span>
            <h2>Три направления, в которых я полезен</h2>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-item reveal" key={service.title}>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-title section-title-row reveal">
            <div>
              <span>Кейсы</span>
              <h2>Работы без лишнего шума</h2>
            </div>
            <div className="filter-tabs" aria-label="Фильтр кейсов">
              <button
                type="button"
                className={activeFilter === 'all' ? 'is-active' : ''}
                onClick={() => handleFilter('all')}
              >
                Все
              </button>
              <button
                type="button"
                className={activeFilter === 'site' ? 'is-active' : ''}
                onClick={() => handleFilter('site')}
              >
                Сайты
              </button>
              <button
                type="button"
                className={activeFilter === 'bot' ? 'is-active' : ''}
                onClick={() => handleFilter('bot')}
              >
                Боты
              </button>
            </div>
          </div>

          <div className="project-list">
            {visibleProjects.map((project, index) => (
              <article className="project-row reveal" key={project.id}>
                <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                <div className="project-main">
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-result">
                  <p>{project.result}</p>
                  <ul>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <a
                  className="project-action"
                  href={project.link ?? telegramUrl}
                  target={project.link ? '_blank' : undefined}
                  rel={project.link ? 'noreferrer' : undefined}
                >
                  {project.action}
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="proof" id="proof">
          <div className="section-title reveal">
            <span>Отзывы</span>
            <h2>Реальные скриншоты вместо декоративных цитат</h2>
          </div>
          <div className="review-wall">
            {reviews.map((review, index) => (
              <figure className="review-shot reveal" key={review.image}>
                <img src={review.image} alt={review.alt} />
                <figcaption>Отзыв {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="workflow">
          <div className="section-title reveal">
            <span>Процесс</span>
            <h2>Как проект двигается к запуску</h2>
          </div>
          <ol className="workflow-list">
            {workflow.map((step) => (
              <li className="reveal" key={step}>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="contact" id="contact">
          <div className="contact-copy reveal">
            <span>Готовность портфолио</span>
            <h2>Основа уже собрана. Осталось добавить то, что сделает сайт твоим на 100%.</h2>
            <p>
              Чтобы довести портфолио до финального уровня, мне нужны точные
              факты, визуалы и цифры. Тогда сайт будет не просто красивым, а
              убедительным.
            </p>
            <a className="primary-action" href={telegramUrl}>
              Написать @SStepCEO
              <ArrowIcon />
            </a>
          </div>
          <ul className="info-list">
            {neededInfo.map((item) => (
              <li className="reveal" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="StepanCEO">
          <span>SC</span>
          StepanCEO
        </a>
        <p>Разработка лендингов, Telegram-ботов и Mini Apps. Работаю удалённо.</p>
      </footer>
    </div>
  )
}

export default App
