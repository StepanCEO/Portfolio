import { startTransition, useEffect, useRef, useState } from 'react'
import './App.css'

// Текст, который сразу подставляется в чат при клике на «Написать».
const contactText = 'Здравствуйте! Хочу обсудить автоматизацию / разработку проекта.'
// t.me/<user>?text= — большинство клиентов открывают чат с уже введённым
// текстом. На всякий случай при клике дублируем текст в буфер обмена.
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

const marqueeText =
  'AI-менеджеры ✦ Telegram-боты с оплатой ✦ CRM-интеграции ✦ Воронки продаж ✦ Личные кабинеты ✦ Дашборды ✦ Парсинг и мониторинг ✦ Поддержка ✦ '

const services = [
  {
    number: '01',
    title: 'Автоматизация и AI',
    body: 'Telegram-боты и AI-менеджеры: принимают заявки, отвечают на вопросы по вашей базе знаний, принимают оплату, ведут подписки и рассылки. Забирают рутину у людей.',
    price: 'от 50 000 ₽',
    term: '1–2 недели',
  },
  {
    number: '02',
    title: 'Веб-сервисы и кабинеты',
    body: 'CRM, админки, личные кабинеты и дашборды. Данные в одном месте, интеграции с amoCRM, Битрикс24 и платёжными системами — ЮKassa, Tribute.',
    price: 'от 150 000 ₽',
    term: '3–6 недель',
  },
  {
    number: '03',
    title: 'Продукт под ключ',
    body: 'MVP или SaaS с нуля: архитектура, интерфейс, биллинг, аналитика. Для стартапов под инвестиции и внутренних систем бизнеса.',
    price: 'от 300 000 ₽',
    term: 'от 6 недель',
  },
]

const projects = [
  {
    id: 'hayat',
    type: 'bot',
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
    seed: 2,
  },
  {
    id: 'novoterskaya',
    type: 'site',
    category: 'Web / Бренд',
    title: 'Сайт бренда минеральной воды',
    summary:
      'Имиджевый сайт «Новотерская Целебная»: история бренда, продуктовая линейка, крупная типографика и анимации. Проект в работе.',
    metric: 'Бюджет 200 000 ₽',
    result: 'Самый крупный текущий проект — от концепции до запуска.',
    tags: ['Бренд', 'Анимации', 'Адаптив'],
    action: 'Обсудить похожий',
    image: projectImage('water-novoterskaya.jpg'),
    seed: 9,
  },
  {
    id: 'pizza',
    type: 'site',
    category: 'Web / E-commerce',
    title: 'Сайт пиццерии с онлайн-заказом',
    summary:
      'Меню, корзина, оформление доставки и приём оплаты. Заказ доходит до кухни без звонка и без ручного переноса в таблицу.',
    result: 'Сайт приносит заказы с первого дня, работаем дальше на поддержке.',
    tags: ['Корзина', 'Оплата', 'Доставка'],
    action: 'Обсудить похожий',
    image: projectImage('pizza-bella.jpg'),
    seed: 14,
  },
  {
    id: 'lsgarden',
    type: 'site',
    category: 'Web / Внутренняя система',
    title: 'CRM для цветочного магазина',
    summary:
      'Внутренняя система: заказы, клиентская база, статусы и ежедневная операционка в одном окне вместо переписки и таблиц.',
    result: 'Команда видит поток заявок и статусы, ничего не теряется между сменами.',
    tags: ['CRM', 'Внутренний продукт', 'Интерфейс'],
    link: 'https://lsgarden.ru/',
    action: 'Открыть',
    image: projectImage('crm-flower.png'),
    seed: 3,
  },
  {
    id: 'nexora',
    type: 'site',
    category: 'Web / Agency',
    title: 'Сайт для digital-агентства',
    summary: 'Премиальный лендинг для агентства NEXORA: 3D-визуал, крупная типографика, блоки услуг и метрик.',
    result: 'Сайт с первого экрана задаёт статус агентства и удерживает внимание.',
    tags: ['Лендинг', '3D / визуал', 'Анимации'],
    action: 'Обсудить похожий',
    image: projectImage('nexora-agency.png'),
    seed: 5,
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
    image: projectImage('jobs-monitor.png'),
    seed: 7,
  },
  {
    id: 'slides-ai',
    type: 'bot',
    category: 'Telegram / AI',
    title: 'AI-бот генерации презентаций',
    summary:
      'Работа с языковой моделью по сценарию: бот собирает вводные, генерирует структуру и материалы презентации прямо в Telegram.',
    result: 'Пользователь получает готовый инструмент вместо хаотичного диалога с нейросетью.',
    tags: ['LLM', 'Промпт-сценарии', 'Автоматизация'],
    action: 'Обсудить похожий',
    image: projectImage('slides-ai.png'),
    seed: 12,
  },
  {
    id: 'course-funnel',
    type: 'bot',
    category: 'Telegram / Воронка',
    title: 'Воронка продаж онлайн-курсов',
    summary:
      'Лид-магнит, прогрев по сценарию, подписка и оплата внутри Telegram. Автор перестал вручную отвечать каждому и вести таблицу оплат.',
    metric: '20 оплат за 7 дней',
    result: 'Путь от лид-магнита до покупки проходит без участия человека.',
    tags: ['Лид-магнит', 'Подписка', 'Оплата'],
    action: 'Обсудить похожий',
    image: projectImage('courses-familia.jpg'),
    seed: 18,
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

// канвасы всегда рисуются на графитовом фоне, поэтому акцент здесь берётся
// в осветлённом варианте: чистый #0231bf на #2d2d2e почти не виден
const C_DIM = [64, 66, 82] // тусклый пиксель
const C_INK = [244, 245, 250] // светлый пиксель
const C_ACC = [109, 155, 255] // акцент (электрический синий)

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
  // открытый на весь экран скриншот кейса (null — лайтбокс закрыт)
  const [lightbox, setLightbox] = useState(null)
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
      <div className="scanlines" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Its Step">
          <span>IS</span>
          Its Step
        </a>
        <nav className="site-nav" aria-label="Навигация">
          <a href="#services">Услуги и цены</a>
          <a href="#work">Кейсы</a>
          <a href="#about">Обо мне</a>
          <a href="#proof">Отзывы</a>
        </nav>
        <a className="header-cta" href={telegramUrl} onClick={copyContactText}>
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
              <span>ai_manager.status = online</span>
              <span>leads → crm: auto</span>
              <span>manual_work −= 80%</span>
            </div>
          </div>

          <div className="hero-content reveal">
            <p className="hero-label mono">// its step — автоматизация и ai для бизнеса</p>
            <h1>
              <ScrambleText text="Системы, которые работают вместо отдела" delay={200} />
            </h1>
            <p className="hero-lead">
              AI-менеджеры, CRM-интеграции, воронки с оплатой и дашборды.
              Меньше ручной работы — больше обработанных лидов.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href={telegramUrl} onClick={copyContactText}>
                Обсудить автоматизацию
                <ArrowIcon />
              </a>
              <a className="secondary-action" href="#work">
                Смотреть кейсы
              </a>
            </div>
          </div>

          <div className="hero-footer">
            <span>2 года в разработке</span>
            <span>20+ проектов до запуска</span>
            <span>Работаю по договору</span>
            <span>Ответ в Telegram: {telegramHandle}</span>
          </div>
        </section>

        <section className="marquee-band" aria-hidden="true">
          <PixelTicker text={marqueeText} />
        </section>

        <section className="intro-strip" aria-label="Коротко">
          <p>
            Я не продаю «сайт» или «бота». Я закрываю участок работы, который
            сейчас делают руками: приём заявок, ответы клиентам, оплаты,
            отчётность. Результат считается в заявках и сэкономленных часах,
            а не в количестве экранов.
          </p>
        </section>

        <section className="services" id="services">
          <div className="section-title reveal">
            <span className="mono">Услуги и цены</span>
            <h2>
              <ScrambleText text="Три формата работы" />
            </h2>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article className="service-item reveal" key={service.title}>
                <span className="mono">{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <div className="service-price">
                  <strong>{service.price}</strong>
                  <span className="mono">{service.term}</span>
                </div>
              </article>
            ))}
          </div>
          <p className="services-note mono">
            // точная цена — после разбора задачи. Смета и сроки фиксируются в договоре
          </p>
        </section>

        <section className="work" id="work">
          <div className="section-title section-title-row reveal">
            <div>
              <span className="mono">Кейсы</span>
              <h2>
                <ScrambleText text="Что уже работает у клиентов" />
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
                Сайты и сервисы
              </button>
              <button
                type="button"
                className={activeFilter === 'bot' ? 'is-active' : ''}
                onClick={() => handleFilter('bot')}
              >
                Боты и AI
              </button>
            </div>
          </div>

          <div className="project-list">
            {visibleProjects.map((project, index) => (
              <article className="project-row reveal" key={project.id}>
                {project.image ? (
                  <button
                    type="button"
                    className="project-cover is-tappable"
                    onClick={() => setLightbox(project)}
                    aria-label={`Открыть скриншот: ${project.title}`}
                  >
                    <img
                      className="work-photo"
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />
                    <span className="project-index mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="cover-hint mono" aria-hidden="true">
                      Открыть
                    </span>
                  </button>
                ) : (
                  <div className="project-cover">
                    <WorkCover seed={project.seed} />
                    <span className="project-index mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                )}
                {project.image && (
                  <img
                    className="cover-full"
                    src={project.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                )}
                <div className="project-main">
                  <span className="mono">{project.category}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                </div>
                <div className="project-result">
                  {project.metric && (
                    <strong className="project-metric">{project.metric}</strong>
                  )}
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
                  onClick={project.link ? undefined : copyContactText}
                >
                  {project.action}
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-grid">
            <figure className="about-photo reveal">
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
            <div className="about-copy reveal">
              <span className="mono">Кто делает</span>
              <h2>
                <ScrambleText text="Степан, соло-разработчик" />
              </h2>
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
        </section>

        <section className="proof" id="proof">
          <div className="section-title reveal">
            <span className="mono">Отзывы</span>
            <h2>
              <ScrambleText text="Что говорят клиенты" />
            </h2>
          </div>
          <div className="review-wall">
            {reviews.map((review) => (
              <figure className="review-card reveal" key={review.name}>
                <blockquote>{review.text}</blockquote>
                <figcaption>
                  <strong>{review.name}</strong>
                  <span className="mono">{review.project}</span>
                  {review.repeat && <em className="review-repeat">повторный заказ</em>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="workflow">
          <div className="section-title reveal">
            <span className="mono">Процесс</span>
            <h2>
              <ScrambleText text="Как мы работаем и где ваши риски" />
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
            <span className="mono">05 · Контакт</span>
            <h2>
              <ScrambleText text="Расскажите, что у вас делают руками" />
            </h2>
            <p>
              Напишите в Telegram и опишите задачу в двух словах. Задам пару
              уточняющих вопросов и в тот же день скажу, сколько это стоит и
              сколько займёт. Разбор бесплатный и ни к чему не обязывает.
            </p>
            <a className="primary-action" href={telegramUrl} onClick={copyContactText}>
              Написать в Telegram
              <ArrowIcon />
            </a>
            <p className="contact-direct mono">// или напрямую: {telegramHandle}</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top" aria-label="Its Step">
          <span>IS</span>
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
            <figcaption className="mono">
              {lightbox.category} — {lightbox.title}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default App
