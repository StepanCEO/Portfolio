import { startTransition, useEffect, useRef, useState } from 'react'
import './App.css'

const telegramUrl = 'https://t.me/SStepCEO'
const telegramHandle = '@SStepCEO'
const reviewImage = (name) => `${import.meta.env.BASE_URL}reviews/${name}`

const marqueeText =
  'Лендинги под ключ ✦ Telegram-боты ✦ Mini Apps ✦ Вёрстка ✦ Дизайн ✦ Пиксель-анимации ✦ Деплой ✦ Поддержка ✦ '

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
    seed: 3,
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
    seed: 7,
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
    seed: 12,
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
    seed: 18,
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
    seed: 24,
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

/* ---------- пиксельный дизеринг: общие константы ---------- */

// матрица упорядоченного дизеринга 8×8 (Bayer) — сердце «пиксельного» вида
const BAYER8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
]

const C_DIM = [70, 70, 78] // тусклый пиксель
const C_INK = [232, 230, 224] // светлый пиксель
const C_ACC = [198, 242, 78] // акцент (лайм)

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------- эффект «дешифровки» текста ---------- */

const GLYPHS = '▓▒░█#<>/\\*+=~'

function ScrambleText({ text, delay = 0 }) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(text)
      return
    }

    let frame = 0
    let interval = 0
    const framesPerChar = 2
    const total = text.length

    const start = setTimeout(() => {
      interval = setInterval(() => {
        const revealed = Math.floor(frame / framesPerChar)
        let out = ''
        for (let i = 0; i < total; i++) {
          if (i < revealed || text[i] === ' ') {
            out += text[i]
          } else {
            out += GLYPHS[(Math.random() * GLYPHS.length) | 0]
          }
        }
        setDisplay(out)
        frame++
        if (revealed >= total) {
          clearInterval(interval)
          setDisplay(text)
        }
      }, 30)
    }, delay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, delay])

  return <span className="scramble">{display}</span>
}

/* ---------- циклическая пиксельная волна в hero ---------- */

function HeroDither() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    const CELL = 5 // размер «пикселя» в css-px
    let W = 0
    let H = 0
    let img = null
    let crestBack = null
    let crestFront = null
    let rafId = 0
    let last = 0
    let visible = true
    const reduceMotion = prefersReducedMotion()

    // один слой волны: всё ниже линии гребня заливается дизерингом,
    // плотность тает с глубиной; overwrite затирает задний слой
    function drawWave(crest, fadeLen, crestColor, overwrite) {
      const data = img.data
      for (let x = 0; x < W; x++) {
        const top = Math.max(0, crest[x] | 0)
        for (let y = top; y < H; y++) {
          const depth = y - crest[x]
          const v = 1 - depth / fadeLen
          if (v <= 0) break
          const i = (y * W + x) * 4
          if (v * 64 > BAYER8[y & 7][x & 7]) {
            const c = depth < 2 ? crestColor : depth < 8 ? C_INK : C_DIM
            data[i] = c[0]
            data[i + 1] = c[1]
            data[i + 2] = c[2]
            data[i + 3] = 255
          } else if (overwrite) {
            data[i + 3] = 0
          }
        }
      }
    }

    function render(now) {
      if (!img) return
      const phase = now * 0.0012
      img.data.fill(0)

      // гребни — сумма двух синусоид на колонку, фаза бежит по кругу
      for (let x = 0; x < W; x++) {
        crestBack[x] =
          H * 0.66 +
          H * 0.045 * Math.sin(x * 0.05 + phase * 1.6) +
          H * 0.028 * Math.sin(x * 0.023 - phase * 2.4)
        crestFront[x] =
          H * 0.78 +
          H * 0.055 * Math.sin(x * 0.042 - phase * 2.0) +
          H * 0.032 * Math.sin(x * 0.019 + phase * 1.2)
      }

      drawWave(crestBack, H * 0.4, C_INK, false)
      drawWave(crestFront, H * 0.5, C_ACC, true)
      ctx.putImageData(img, 0, 0)
    }

    function frame(now) {
      rafId = 0
      if (now - last > 90) {
        // ~11 fps — дизеринг любит «дёрганость»
        last = now
        render(now)
      }
      schedule()
    }

    function schedule() {
      if (!reduceMotion && visible && !document.hidden && !rafId) {
        rafId = requestAnimationFrame(frame)
      }
    }

    function resize() {
      const rect = parent.getBoundingClientRect()
      W = Math.max(1, Math.ceil(rect.width / CELL))
      H = Math.max(1, Math.ceil(rect.height / CELL))
      canvas.width = W
      canvas.height = H
      img = ctx.createImageData(W, H)
      crestBack = new Float32Array(W)
      crestFront = new Float32Array(W)
      render(performance.now())
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      schedule()
    })
    io.observe(parent)

    const onVisibility = () => schedule()
    document.addEventListener('visibilitychange', onVisibility)
    schedule()

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return <canvas ref={canvasRef} className="dither-hero" aria-hidden="true" />
}

/* ---------- пиксельный тикер-бегущая строка ---------- */

function PixelTicker({ text }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    const CELL = 4
    const STRIP = 64
    let W = 0
    let H = 0
    let img = null
    let mask = null
    let maskW = 1
    let rafId = 0
    let last = 0
    let visible = true
    const reduceMotion = prefersReducedMotion()

    // текст → offscreen-канвас → битовая маска пикселей
    function buildMask() {
      const value = text.toUpperCase()
      const m = document.createElement('canvas')
      const mc = m.getContext('2d')
      const font = `${H - 4}px "IBM Plex Mono", monospace`
      mc.font = font
      maskW = Math.max(1, Math.ceil(mc.measureText(value).width))
      m.width = maskW
      m.height = H
      mc.font = font
      mc.textBaseline = 'middle'
      mc.fillStyle = '#fff'
      mc.fillText(value, 0, H / 2 + 1)

      const d = mc.getImageData(0, 0, maskW, H).data
      mask = new Uint8Array(maskW * H)
      for (let i = 0; i < mask.length; i++) mask[i] = d[i * 4 + 3] > 120 ? 1 : 0
    }

    function render(now) {
      if (!mask) return
      const data = img.data
      data.fill(0)

      const offset = Math.floor(now * 0.02) % maskW
      const phase = now * 0.0025
      const FADE = Math.min(14, W >> 2)

      for (let sx = 0; sx < W; sx++) {
        const mx = (sx + offset) % maskW
        // волна прокатывается по строке: буквы приподнимаются,
        // на гребне подсвечиваются акцентом
        const wobble = Math.sin(sx * 0.09 - phase)
        const dy = Math.round(wobble * 1.6)
        const c = wobble > 0.9 ? C_ACC : C_INK
        const edge = Math.min(sx, W - 1 - sx)

        for (let sy = 0; sy < H; sy++) {
          const my = sy - dy
          if (my < 0 || my >= H) continue
          if (!mask[my * maskW + mx]) continue
          if (edge < FADE && (edge / FADE) * 64 <= BAYER8[sy & 7][sx & 7]) continue
          const i = (sy * W + sx) * 4
          data[i] = c[0]
          data[i + 1] = c[1]
          data[i + 2] = c[2]
          data[i + 3] = 255
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    function frame(now) {
      rafId = 0
      if (now - last > 70) {
        last = now
        render(now)
      }
      schedule()
    }

    function schedule() {
      if (!reduceMotion && visible && !document.hidden && !rafId) {
        rafId = requestAnimationFrame(frame)
      }
    }

    function resize() {
      const rect = parent.getBoundingClientRect()
      W = Math.max(1, Math.ceil(rect.width / CELL))
      H = Math.round(STRIP / CELL)
      canvas.width = W
      canvas.height = H
      img = ctx.createImageData(W, H)
      buildMask()
      render(performance.now())
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()

    const io = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting
      schedule()
    })
    io.observe(parent)

    const onVisibility = () => schedule()
    document.addEventListener('visibilitychange', onVisibility)

    // моноширинный шрифт мог ещё грузиться — перерисуем маску начисто
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        buildMask()
        render(performance.now())
      })
    }
    schedule()

    return () => {
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [text])

  return <canvas ref={canvasRef} className="pixel-ticker" aria-hidden="true" />
}

/* ---------- статичная дизеринг-обложка проекта ---------- */

function WorkCover({ seed }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    const CELL = 5

    function draw() {
      const rect = canvas.getBoundingClientRect()
      const W = Math.max(1, Math.ceil(rect.width / CELL))
      const H = Math.max(1, Math.ceil(rect.height / CELL))
      canvas.width = W
      canvas.height = H

      const img = ctx.createImageData(W, H)
      const data = img.data
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          // диагональный градиент + волна, у каждой обложки свой характер от seed
          const v =
            (x / W) * 0.5 +
            (1 - y / H) * 0.25 +
            0.3 * Math.sin(x * 0.09 * (1 + seed * 0.13) + y * 0.07 + seed) +
            0.15 * Math.sin(y * 0.2 + seed * 2)

          const i = (y * W + x) * 4
          if (v * 64 > BAYER8[y & 7][x & 7]) {
            const c = v > 0.9 ? C_ACC : v > 0.6 ? C_INK : C_DIM
            data[i] = c[0]
            data[i + 1] = c[1]
            data[i + 2] = c[2]
            data[i + 3] = 255
          } else {
            data[i] = 17
            data[i + 1] = 17
            data[i + 2] = 20
            data[i + 3] = 255
          }
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    const ro = new ResizeObserver(draw)
    ro.observe(parent)
    draw()
    return () => ro.disconnect()
  }, [seed])

  return <canvas ref={canvasRef} className="work-cover" aria-hidden="true" />
}

/* ---------- появление блоков при скролле ---------- */

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal')
    if (prefersReducedMotion()) {
      nodes.forEach((el) => el.classList.add('visible'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    nodes.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
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
        strokeWidth="2"
      />
    </svg>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('all')
  useReveal()

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
      <div className="scanlines" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Step Studio">
          <span>St</span>
          Step Studio
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
            <HeroDither />
            <div className="scene-code">
              <span>bot.status = online</span>
              <span>landing.conversion += clarity</span>
              <span>miniapp.flow = smooth</span>
            </div>
          </div>

          <div className="hero-content reveal">
            <p className="hero-label mono">// step studio — лендинги / telegram-боты / mini apps</p>
            <h1>
              <ScrambleText text="Step Studio" delay={200} />
            </h1>
            <p className="hero-lead">
              Большие идеи начинаются с пикселя. Разрабатываю премиальные сайты,
              ботов и Telegram Mini Apps для проектов, которым важны скорость,
              аккуратность и понятная подача.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href={telegramUrl}>
                Написать в Telegram
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
            <span>Ответ в Telegram: {telegramHandle}</span>
          </div>
        </section>

        <section className="marquee-band" aria-hidden="true">
          <PixelTicker text={marqueeText} />
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
            <span className="mono">Услуги</span>
            <h2>
              <ScrambleText text="Три направления, в которых я полезен" />
            </h2>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-item reveal" key={service.title}>
                <span className="mono">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-title section-title-row reveal">
            <div>
              <span className="mono">Кейсы</span>
              <h2>
                <ScrambleText text="Работы без лишнего шума" />
              </h2>
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
                <div className="project-cover">
                  <WorkCover seed={project.seed} />
                  <span className="project-index mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="project-main">
                  <span className="mono">{project.category}</span>
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
            <span className="mono">Отзывы</span>
            <h2>
              <ScrambleText text="Реальные скриншоты вместо цитат" />
            </h2>
          </div>
          <div className="review-wall">
            {reviews.map((review, index) => (
              <figure className="review-shot reveal" key={review.image}>
                <img src={review.image} alt={review.alt} loading="lazy" />
                <figcaption className="mono">Отзыв {index + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="workflow">
          <div className="section-title reveal">
            <span className="mono">Процесс</span>
            <h2>
              <ScrambleText text="Как проект двигается к запуску" />
            </h2>
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
            <span className="mono">04 · Контакт</span>
            <h2>
              <ScrambleText text="Расскажи о задаче — соберу под ключ" />
            </h2>
            <p>
              Напиши в Telegram: опиши, что хочешь — лендинг, бота или mini app.
              Задам пару уточняющих вопросов и прикину сроки и стоимость.
            </p>
            <a className="primary-action" href={telegramUrl}>
              Написать {telegramHandle}
              <ArrowIcon />
            </a>
            <p className="contact-direct mono">// или напрямую: {telegramHandle}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Step Studio">
          <span>St</span>
          Step Studio
        </a>
        <p>Разработка лендингов, Telegram-ботов и Mini Apps. Работаю удалённо.</p>
      </footer>
    </div>
  )
}

export default App
