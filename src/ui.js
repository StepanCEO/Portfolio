// Надписи интерфейса и тексты служебных страниц на двух языках.
// Данные (кейсы, услуги, отзывы) — в content*.js и services*.js.

// Русское склонение по числу: 1 отзыв, 2 отзыва, 5 отзывов, 21 отзыв, 24 отзыва
const plural = (n, [one, few, many]) => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

const ru = {
  meta: {
    home: null, // мета-теги главной — в app.html
    partners: {
      title: 'Партнёрская программа: 10% за клиента — Its Step',
      description:
        'Для веб-студий, маркетологов и агентств без своей разработки: приводите клиента на AI-агента, CRM, сайт или бота и получайте 10% от суммы договора.',
    },
    privacy: {
      title: 'Политика обработки персональных данных — Its Step',
      description: 'Какие персональные данные обрабатывает сайт itssteps.site, зачем, на каком основании и как их удалить.',
    },
    consent: {
      title: 'Согласие на обработку персональных данных — Its Step',
      description: 'Условия согласия на обработку персональных данных при отправке заявки на itssteps.site.',
    },
  },

  nav: 'Навигация',
  cta: 'Обсудить проект',
  langSwitch: 'EN',
  langSwitchLabel: 'English version',
  close: 'Закрыть',
  openShot: 'Открыть скриншот',

  heroWords: [['Делаю'], ['AI-системы,'], ['CRM'], ['и'], ['сайты'], ['для', true], ['бизнеса', true]],
  heroLead:
    'За два года сдал 30+ заказов: тендерную AI-систему, магазин на 520 000 товаров, сайт бренда минеральной воды за 200 000 ₽. Веду проект сам — от ТЗ до запуска.',
  seeCases: 'Смотреть кейсы',
  heroCaptionTitle: 'Conteria · тендерная система',
  heroCaption:
    'Дашборд с найденными тендерами и лидами, есть мобильная версия. Реальные экраны из работы клиента.',
  clientsLabel: 'Клиенты',
  statsLabel: 'Цифры',

  servicesTitle: 'Услуги',
  servicesLead: 'Что делаю, сколько это стоит и как проходит работа — подробно на странице каждой услуги.',

  casesTitle: 'Лучшие кейсы',
  casesLead:
    'AI-системы, CRM и сайты для реального бизнеса — с цифрами и стеком. Подробности — на странице каждого кейса.',
  allWorks: 'Все работы в @itssteps',
  seeCase: 'Смотреть кейс',
  openCase: 'Открыть кейс',
  tryDemo: 'Попробовать менеджера',

  reviewsTitle: 'Что говорят клиенты',
  reviewsLead: 'Отзывы с Kwork — каждый можно проверить в профиле.',
  kworkProfile: 'Профиль на Kwork',
  reviewsCount: (n) => `${n} ${plural(n, ['отзыв', 'отзыва', 'отзывов'])}`,
  kworkStats: (orders, intime) => `${orders} ${plural(orders, ['заказ', 'заказа', 'заказов'])} · ${intime} в срок`,
  repeatOrder: 'повторный заказ',
  translatedNote: null,
  originals: 'Оригиналы со страницы Kwork',
  newReviews: 'Новые отзывы — в канале @itssteps',

  mediaTitleStart: 'Веду блог об ',
  mediaTitleEnd: 'AI-разработке',
  mediaLead:
    '2 900+ человек следят за тем, как я работаю. До старта проекта можно посмотреть, как я думаю и как объясняю сложное.',
  mediaOpen: 'Смотреть кейсы',

  aboutAlt: 'Степан',
  aboutTitle: 'Степан, разработчик Its Step',
  aboutText: [
    'Делаю системы, которые берут на себя работу людей: AI-агенты, CRM, интеграции и сайты. Веду проект один и целиком — разбор задачи, архитектура, интерфейс, код, запуск. Вы общаетесь напрямую со мной, контекст не теряется между людьми.',
    'Самозанятый, работаю по договору.',
  ],
  worksWith: 'Работаю с',
  telegramChannel: 'Telegram-канал',

  pricingTitle: 'Форматы и цены',
  pricingLead: 'Точная цена — после бесплатного разбора. Смета и сроки фиксируются в договоре.',

  ctaEyebrow: 'Следующий шаг',
  ctaTitle: 'Расскажите, что у вас делают руками',
  ctaText:
    'Опишите задачу в двух словах. В тот же день скажу, как её решить, сколько это стоит и сколько займёт. Разбор бесплатный.',
  ctaTelegram: 'Написать в Telegram',
  ctaHandleNote: 'отвечаю лично',
  ctaFormNote: 'Не любите мессенджеры? Оставьте заявку — свяжусь сам.',

  form: {
    title: 'Оставить заявку',
    partnerTitle: 'Стать партнёром',
    name: 'Имя',
    contact: 'Телефон, email или Telegram',
    company: 'Компания',
    partnerCompany: 'Студия, агентство или ваша специализация',
    message: 'Коротко о задаче',
    partnerMessage: 'Каких клиентов вы можете приводить',
    consentStart: 'Даю ',
    consentLink: 'согласие на обработку персональных данных',
    consentMid: ' и подтверждаю, что ознакомлен с ',
    policyLink: 'политикой обработки данных',
    submit: 'Отправить заявку',
    partnerSubmit: 'Отправить',
    sending: 'Отправляю…',
    sent: 'Заявка отправлена. Свяжусь с вами по указанному контакту.',
    error: 'Не получилось отправить. Напишите, пожалуйста, в Telegram',
    tooMany: 'Слишком много заявок подряд. Напишите, пожалуйста, в Telegram',
  },

  footerSocial: 'Соцсети и площадки',
  footerLegal: 'Документы',
  partnersLink: 'Партнёрам',
  privacyLink: 'Политика обработки данных',
  consentLink: 'Согласие на обработку данных',

  casePage: {
    allCases: 'Все кейсы',
    caseWord: 'кейс',
    zoom: 'Рассмотреть',
    storyLabel: 'Как делали проект',
    task: 'Задача',
    done: 'Что сделал',
    changes: 'Что изменилось для клиента',
    results: 'Результат в цифрах',
    kworkReview: 'отзыв на Kwork',
    discussSimilar: 'Обсудить похожий проект',
    nextCase: 'Следующий кейс',
  },

  servicePage: {
    crumbs: 'Хлебные крошки',
    services: 'Услуги',
    relatedCases: 'Кейсы по теме',
    price: 'Стоимость',
    term: 'Сроки',
    format: 'Формат',
    formatValue: 'по договору, оплата по этапам',
    priceTitle: 'Сроки и цена',
    getQuote: 'Получить оценку',
    faq: 'Частые вопросы',
    otherServices: 'Другие услуги',
    popularTasks: 'Частые задачи',
    similarSolutions: 'Похожие решения',
  },

  notFound: {
    label: 'Ошибка 404',
    title: 'Такой страницы нет',
    text: 'Возможно, ссылка устарела. Всё главное — на главной, а работы — в разделе кейсов.',
    home: 'На главную',
  },

  partners: {
    eyebrow: 'Партнёрская программа',
    title: '10% за приведённого клиента',
    lead: 'Для веб-студий, маркетологов, дизайнеров и агентств, у которых нет своей разработки. Приводите клиента, которому нужен AI-агент, CRM, сайт или Telegram-бот, — я делаю проект, вы получаете 10% от суммы договора.',
    whoTitle: 'Кому подходит',
    who: [
      ['Веб-студии и дизайнеры', 'Клиент просит бота, CRM или AI-интеграцию, а в команде нет бэкенда.'],
      ['Маркетологи и таргетологи', 'Вы приводите заявки, а клиенту нужна система, которая их обработает.'],
      ['Агентства и консультанты', 'Вы видите процессы клиента и знаете, что можно автоматизировать.'],
      ['Фрилансеры смежных профессий', 'Копирайтеры, SMM, продюсеры — те, к кому приходят с задачами «сделайте бота».'],
    ],
    howTitle: 'Как это работает',
    how: [
      ['Знакомите', 'Пишете мне о клиенте или добавляете меня в чат с ним.'],
      ['Я веду проект', 'Разбор, договор, разработка и запуск — на мне. Участвовать в созвонах можно, но не обязательно.'],
      ['Вы получаете 10%', 'От суммы договора с клиентом — после того как клиент оплатит.'],
    ],
    termsTitle: 'Условия',
    terms: [
      '10% от суммы договора с приведённым клиентом',
      'Выплата — после оплаты клиентом, по каждому оплаченному этапу',
      'Без ограничений по числу клиентов',
      'Клиент остаётся вашим: не предлагаю ему услуги в обход вас',
    ],
    ctaTitle: 'Готовы привести клиента?',
    ctaText: 'Напишите в Telegram или оставьте заявку — расскажу детали и отвечу на вопросы.',
    portfolioTitle: 'Что можно показывать клиенту',
    portfolioText: 'Кейсы с цифрами, страницы услуг с ценами и отзывы с Kwork — всё на этом сайте, ссылками можно делиться.',
  },

  cookie: {
    text: 'Сайт использует cookie и Яндекс Метрику, чтобы понимать, какие страницы полезны. Метрика включится только с вашего согласия.',
    more: 'Подробнее',
    accept: 'Принять',
    decline: 'Отклонить',
    settings: 'Настройки cookie',
  },
}

const en = {
  meta: {
    home: {
      title: 'AI systems, CRMs and websites for business — Stepan, Its Step',
      description:
        'I build AI agents, CRMs, Telegram bots and websites end to end. 30+ projects delivered in 2 years, 96% on time on Kwork. Fixed quote after a free call.',
    },
    partners: {
      title: 'Partner program: 10% per client — Its Step',
      description:
        'For web studios, marketers and agencies without in-house development: refer a client who needs an AI agent, CRM, website or bot and get 10% of the contract.',
    },
    privacy: {
      title: 'Personal data processing policy — Its Step',
      description: 'What personal data itssteps.site processes, why, on what basis and how to have it deleted.',
    },
    consent: {
      title: 'Consent to personal data processing — Its Step',
      description: 'Terms of consent to personal data processing when sending a request on itssteps.site.',
    },
  },

  nav: 'Navigation',
  cta: 'Discuss a project',
  langSwitch: 'RU',
  langSwitchLabel: 'Русская версия',
  close: 'Close',
  openShot: 'Open screenshot',

  heroWords: [['I'], ['build'], ['AI'], ['systems,'], ['CRMs'], ['and'], ['websites'], ['for', true], ['business', true]],
  heroLead:
    'Over two years I have delivered 30+ projects: an AI tender system, an online store with 520,000 products, a brand website for a mineral water producer. I run every project myself — from spec to launch.',
  seeCases: 'See case studies',
  heroCaptionTitle: 'Conteria · tender system',
  heroCaption: 'Dashboard with found tenders and leads, with a mobile version. Real screens from the client’s work.',
  clientsLabel: 'Clients',
  statsLabel: 'Numbers',

  servicesTitle: 'Services',
  servicesLead: 'What I build, how the work goes and what you get — in detail on each service page.',

  casesTitle: 'Case studies',
  casesLead: 'AI systems, CRMs and websites for real businesses — with numbers and stack. Details on each case page.',
  allWorks: 'All work in @itssteps (RU)',
  seeCase: 'View case',
  openCase: 'Open case',
  tryDemo: 'Try the manager',

  reviewsTitle: 'What clients say',
  reviewsLead: 'Reviews from Kwork, a Russian freelance marketplace — each one can be checked in the profile.',
  kworkProfile: 'Kwork profile',
  reviewsCount: (n) => `${n} reviews`,
  kworkStats: (orders, intime) => `${orders} orders · ${intime} on time`,
  repeatOrder: 'repeat order',
  translatedNote: 'translated from Russian',
  originals: 'Originals from the Kwork page (in Russian)',
  newReviews: 'New reviews in the @itssteps channel (RU)',

  mediaTitleStart: 'I write about ',
  mediaTitleEnd: 'AI development',
  mediaLead: '2,900+ people follow how I work. Before we start, you can see how I think and explain complex things.',
  mediaOpen: 'See case studies',

  aboutAlt: 'Stepan',
  aboutTitle: 'Stepan, developer at Its Step',
  aboutText: [
    'I build systems that take work off people’s plates: AI agents, CRMs, integrations and websites. I run each project alone and end to end — analysis, architecture, interface, code and launch. You talk to me directly, so no context gets lost between people.',
    'I work under a contract.',
  ],
  worksWith: 'Stack',
  telegramChannel: 'Telegram channel',

  pricingTitle: 'Formats',
  pricingLead: 'The price is fixed in the contract after a free call where we go through the task.',

  ctaEyebrow: 'Next step',
  ctaTitle: 'Tell me what your team still does by hand',
  ctaText:
    'Describe the task in a couple of sentences. The same day I’ll tell you how to solve it, what it costs and how long it takes. The first call is free.',
  ctaTelegram: 'Message me on Telegram',
  ctaHandleNote: 'I reply personally',
  ctaFormNote: 'Prefer email? Leave a request and I’ll get back to you.',

  form: {
    title: 'Leave a request',
    partnerTitle: 'Become a partner',
    name: 'Name',
    contact: 'Email, phone or Telegram',
    company: 'Company',
    partnerCompany: 'Studio, agency or your specialty',
    message: 'What do you need?',
    partnerMessage: 'What clients could you refer?',
    consentStart: 'I give my ',
    consentLink: 'consent to personal data processing',
    consentMid: ' and confirm I have read the ',
    policyLink: 'data processing policy',
    submit: 'Send request',
    partnerSubmit: 'Send',
    sending: 'Sending…',
    sent: 'Request sent. I’ll contact you using the details you left.',
    error: 'Couldn’t send it. Please message me on Telegram',
    tooMany: 'Too many requests in a row. Please message me on Telegram',
  },

  footerSocial: 'Social and marketplaces',
  footerLegal: 'Legal',
  partnersLink: 'Partners',
  privacyLink: 'Data processing policy',
  consentLink: 'Consent to data processing',

  casePage: {
    allCases: 'All case studies',
    caseWord: 'case',
    zoom: 'Zoom in',
    storyLabel: 'How the project was built',
    task: 'The task',
    done: 'What I built',
    changes: 'What changed for the client',
    results: 'Results in numbers',
    kworkReview: 'Kwork review, translated from Russian',
    discussSimilar: 'Discuss a similar project',
    nextCase: 'Next case',
  },

  servicePage: {
    crumbs: 'Breadcrumbs',
    services: 'Services',
    relatedCases: 'Related cases',
    price: 'Price',
    term: 'Timeline',
    format: 'Format',
    formatValue: 'contract, staged payments',
    priceTitle: 'Timeline and price',
    getQuote: 'Get a quote',
    faq: 'FAQ',
    otherServices: 'Other services',
    popularTasks: 'Common tasks',
    similarSolutions: 'Similar solutions',
  },

  notFound: {
    label: 'Error 404',
    title: 'Page not found',
    text: 'The link may be outdated. Everything important is on the home page, and the work is in the case studies.',
    home: 'Home page',
  },

  partners: {
    eyebrow: 'Partner program',
    title: '10% for every client you refer',
    lead: 'For web studios, marketers, designers and agencies without in-house development. Refer a client who needs an AI agent, CRM, website or Telegram bot — I build the project, you get 10% of the contract.',
    whoTitle: 'Who it’s for',
    who: [
      ['Web studios and designers', 'A client asks for a bot, CRM or AI integration, and your team has no backend developer.'],
      ['Marketers', 'You bring in leads, and the client needs a system to process them.'],
      ['Agencies and consultants', 'You see the client’s processes and know what could be automated.'],
      ['Freelancers in related fields', 'Copywriters, SMM specialists, producers — people who hear “can you build us a bot?”.'],
    ],
    howTitle: 'How it works',
    how: [
      ['Introduce', 'Tell me about the client or add me to a chat with them.'],
      ['I run the project', 'Analysis, contract, development and launch are on me. You can join the calls, but you don’t have to.'],
      ['You get 10%', 'Of the contract amount — once the client has paid.'],
    ],
    termsTitle: 'Terms',
    terms: [
      '10% of the contract amount with the referred client',
      'Paid after the client pays, for every paid stage',
      'No limit on the number of clients',
      'The client stays yours: I don’t offer them services behind your back',
    ],
    ctaTitle: 'Ready to refer a client?',
    ctaText: 'Message me on Telegram or leave a request — I’ll share the details and answer your questions.',
    portfolioTitle: 'What you can show the client',
    portfolioText: 'Case studies with numbers, service pages and reviews — all on this site, feel free to share the links.',
  },

  cookie: {
    text: 'This site uses cookies and Yandex Metrica to understand which pages are useful. Analytics turns on only with your consent.',
    more: 'Learn more',
    accept: 'Accept',
    decline: 'Decline',
    settings: 'Cookie settings',
  },
}

export const ui = { ru, en }
