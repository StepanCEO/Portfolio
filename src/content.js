// Контент сайта: контакты, цифры, кейсы, отзывы, тарифы.
// Отдельно от разметки, чтобы пререндер мог собрать по нему страницы и мета-теги.

export const siteUrl = 'https://itssteps.site'

export const contactText = 'Здравствуйте, Степан! Хочу обсудить проект.'
export const telegramUrl = `https://t.me/SStepCEO?text=${encodeURIComponent(contactText)}`
export const telegramHandle = '@SStepCEO'
export const kworkUrl = 'https://kwork.ru/user/stepanceo'
export const tiktokUrl = 'https://www.tiktok.com/@its___step'
export const channelUrl = 'https://t.me/ItsStepss'
export const casesChannelUrl = 'https://t.me/itssteps'
export const githubUrl = 'https://github.com/StepanCEO'

export const asset = (path) => `${import.meta.env.BASE_URL}${path}`
export const avatar = asset('about/stepan-avatar.jpg')
export const heroImage = asset('projects/conteria-hero.jpg')

// Все цифры на странице проверяемы: Kwork и соцсети — с публичных профилей
// (октябрь 2026), чеки и объёмы — из ТЗ и договоров. Обновлять вручную.
export const kwork = { orders: 26, intime: '96%', reviews: 18 }

export const heroStats = [
  { value: '30+', label: 'сданных заказов за 2 года' },
  { value: '200 000 ₽', label: 'крупнейший чек — сайт бренда' },
  { value: kwork.intime, label: 'заказов сдано в срок на Kwork' },
  { value: '153 тыс.', label: 'лайков на роликах в TikTok' },
]

export const clients = ['Conteria', 'АО «Кавминводы»', 'Новотерская', 'Кейтеринг «Нечай»', 'Hayat Nikah']

export const featured = {
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
  image: asset('projects/conteria-hero.jpg'),
  extraImage: asset('projects/conteria-tenders.jpg'),
  extraCaption: 'AI разбирает документацию закупки и сопоставляет смету с каталогом.',
}

export const cases = [
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
    stack: 'Next.js, Laravel',
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
export const reviews = [
  {
    name: 'STIZO',
    project: 'Telegram Mini App',
    text: 'Обратился с задачей, когда сроки уже поджимали, думал, что придётся ждать неделю. Но программист удивил: сделал качественную работающую программу менее чем за сутки. Всё чётко, без воды, багов не заметил. Рекомендую на 100%!',
    accent: true,
  },
  {
    name: 'GrigoriySE',
    project: 'Бот брачного агентства',
    caseId: 'hayat',
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

export const reviewShots = [
  { src: asset('reviews/review-01.png'), alt: 'Два отзыва partyzan77777 на Kwork' },
  { src: asset('reviews/review-03.png'), alt: 'Отзывы fomin273 и STIZO на Kwork' },
]

export const media = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@its___step',
    url: tiktokUrl,
    body: 'Короткие видео о том, как с помощью AI собирать продукты, находить клиентов и зарабатывать на разработке.',
    stats: [
      ['153 тыс.', 'лайков'],
      ['2 100', 'подписчиков'],
      ['194', 'видео'],
    ],
  },
  {
    id: 'channel',
    name: 'Telegram-канал',
    handle: '@ItsStepss',
    url: channelUrl,
    body: 'AI-фриланс изнутри: как оцениваю заказы, сколько стоит разработка и какие ошибки дорого обходятся.',
    stats: [['850', 'подписчиков']],
  },
  {
    id: 'cases',
    name: 'Кейсы и отзывы',
    handle: '@itssteps',
    url: casesChannelUrl,
    body: 'Отдельный канал только с работами: задача клиента, что сделано и что он написал после сдачи.',
  },
]

export const stack = [
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

export const services = [
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

export const steps = [
  ['Разбор задачи', 'Бесплатно, 30 минут в Telegram. В тот же день — оценка сроков и цены.'],
  ['Договор и ТЗ', 'Фиксирую объём, сроки и стоимость. Работаю как самозанятый.'],
  ['Разработка этапами', 'Оплата по этапам, демо каждую неделю — видно, за что платите.'],
  ['Запуск и поддержка', 'Передаю код и доступы, 2 недели поддержки включены.'],
]

export const navItems = [
  { id: 'cases', label: 'Кейсы' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'media', label: 'Медиа' },
  { id: 'about', label: 'Обо мне' },
  { id: 'pricing', label: 'Цены' },
]

// Оформление карточек кейсов: фон и цвет текста под картинку проекта
const caseLooks = {
  'conteria-tenders': { tone: 'light', bg: 'linear-gradient(135deg, #eef3ff 0%, #d6e2ff 100%)' },
  'conteria-shop': { tone: 'light', bg: 'linear-gradient(135deg, #f2f6fd 0%, #dce8fa 100%)' },
  novoterskaya: { tone: 'dark', bg: 'linear-gradient(135deg, #0e1a2b 0%, #1d3a5c 100%)' },
  'leasing-crm': { tone: 'light', bg: 'linear-gradient(135deg, #f4f5f8 0%, #e1e5ee 100%)' },
  'sales-ai': { tone: 'dark', bg: 'linear-gradient(135deg, #121838 0%, #26338a 100%)' },
  hayat: { tone: 'dark', bg: 'linear-gradient(135deg, #170f20 0%, #3d2443 100%)' },
  leadgen: { tone: 'light', bg: 'linear-gradient(135deg, #eef4ff 0%, #dde7fb 100%)' },
  nechay: { tone: 'dark', bg: 'linear-gradient(135deg, #1b1510 0%, #3d2d1e 100%)' },
}

// Все кейсы одним списком: главный первым. У главного вместо одной цифры — три пункта,
// на карточку берём первый.
export const allCases = [
  {
    ...featured,
    metric: `${featured.points[0][0]} стадий`,
    metricNote: 'воронки — от тендера до сделки',
    stackList: featured.tags,
  },
  ...cases.map((item) => ({
    ...item,
    stackList: item.stack ? item.stack.split(', ') : [],
  })),
].map((item) => ({ ...item, ...caseLooks[item.id], path: `/cases/${item.id}/` }))
