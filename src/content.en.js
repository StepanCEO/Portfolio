// English site content: mirrors the exports of content.js for the /en/ pages.
// Language-neutral values (links, images, numbers from public profiles) are imported
// from content.js so the two versions cannot drift apart.
// Aimed at US and other English-speaking clients: service prices are starting prices
// in USD; client budgets from Russian projects are not converted or shown.

import { kwork } from './content.js'

export {
  siteUrl,
  asset,
  avatar,
  heroImage,
  kworkUrl,
  tiktokUrl,
  channelUrl,
  casesChannelUrl,
  githubUrl,
  telegramHandle,
  kwork,
  clients,
  reviewShots,
} from './content.js'

import { asset, tiktokUrl, channelUrl, casesChannelUrl, stack as stackRu } from './content.js'

// тот же стек, что в русской версии, но с английскими названиями сервисов
const stackNames = { 'Битрикс24': 'Bitrix24', 'ЮKassa': 'YooKassa' }
export const stack = stackRu.map((name) => stackNames[name] ?? name)

export const contactText = "Hi Stepan! I'd like to discuss a project."
export const telegramUrl = `https://t.me/SStepCEO?text=${encodeURIComponent(contactText)}`

export const heroStats = [
  { value: '30+', label: 'orders delivered in 2 years' },
  { value: '520,000', label: 'products in the largest online store I built' },
  { value: kwork.intime, label: 'of freelance orders delivered on time' },
  { value: '301K', label: 'likes on TikTok videos' },
]

export const featured = {
  id: 'conteria-tenders',
  category: 'AI · B2B system · under contract',
  title: 'AI tender manager for Conteria',
  summary:
    'The system finds public tenders by category and region on its own and pulls out the winners, while AI reads the tender documentation and breaks the estimate down into items from the company catalog. Then come proposals, sending, replies from the mailbox and the CRM.',
  points: [
    ['13', 'pipeline stages from tender to deal'],
    ['AI', 'parses PDFs and estimates instead of a manager'],
    ['1 workspace', 'tender → proposal → reply → deal'],
  ],
  tags: ['Django', 'React', 'Celery', 'LLM', 'email via IMAP'],
  image: asset('projects/conteria-hero.jpg'),
  extraImage: asset('projects/conteria-tenders.jpg'),
  extraCaption: 'AI parses the tender documentation and matches the estimate against the catalog.',
}

export const cases = [
  {
    id: 'conteria-shop',
    category: 'E-commerce',
    title: 'Online store for engineering equipment',
    summary:
      'Migration from OpenCart to Next.js and Laravel: supplier catalog with automatic stock updates, CDEK and PEC delivery, online payment, VK feeds, AI search and an AI consultant.',
    metric: '520,000 products',
    metricNote: 'and AI-written SEO copy for 155,000 pages',
    link: 'https://conteria.ru/',
    linkLabel: 'conteria.ru',
    stack: 'Next.js, Laravel',
    image: asset('projects/conteria-shop.jpg'),
  },
  {
    id: 'novoterskaya',
    category: 'Brand website',
    title: 'Novoterskaya mineral water',
    summary:
      'Brand website for Kavminvody JSC: brand story, composition, catalog, laboratory and news. 13 pages, RU / EN, a custom admin panel for content.',
    metric: '13 pages',
    metricNote: 'in two languages, with its own CMS',
    link: 'https://stepanceo.github.io/Novoterskiy/',
    linkLabel: 'Open website',
    image: asset('projects/water-novoterskaya.jpg'),
  },
  {
    id: 'leasing-crm',
    category: 'CRM',
    title: 'CRM and catalog for a leasing platform',
    summary:
      'Catalog of cars and special machinery, a leasing calculator with bank terms, applications with automatic company checks by tax ID, supplier emails right in the interface, roles and AI descriptions.',
    metric: '7 stages',
    metricNote: 'delivered in 3 weeks instead of the planned 4',
    stack: 'Next.js, Prisma, PostgreSQL',
    image: asset('projects/leasing-crm.jpg'),
  },
  {
    id: 'sales-ai',
    category: 'AI agent',
    title: 'AI assistant for a sales team',
    summary:
      'AI answers clients in MAX and by email using the company’s knowledge base, puts together a commercial proposal in Word on its own and runs the deal in amoCRM. The head of sales gets reports on each manager.',
    metric: 'In production',
    metricNote: 'since August, expanding across the department',
    demo: false,
    stack: 'FastAPI, OpenAI, n8n',
    image: asset('projects/sales-ai.jpg'),
  },
  {
    id: 'ton-access-pass',
    category: 'Web3 · Telegram Mini App',
    title: 'Paid channel access on TON',
    summary:
      'My open-source project: a Mini App that sells a subscription to a private Telegram channel for TON. A Tact smart contract stores the expiry date, and the bot lets subscribers in and removes them when it runs out.',
    metric: '25 tests',
    metricNote: 'for the contract and backend, plus a real testnet payment',
    link: 'https://github.com/StepanCEO/ton-access-pass',
    linkLabel: 'Code on GitHub',
    stack: 'Tact, TON Connect, Node.js, TypeScript',
    image: asset('projects/ton-access-pass.png'),
  },
  {
    id: 'hayat',
    category: 'Telegram bot',
    title: 'Marriage agency bot',
    summary:
      'A closed questionnaire funnel with moderation and paid access. The agency stopped handling conversations by hand.',
    metric: '50 payments',
    metricNote: 'in the first week after launch',
    link: 'https://t.me/Hayatnikah_bot',
    linkLabel: '@Hayatnikah_bot',
    image: asset('projects/hayat-nikah.png'),
  },
  {
    id: 'leadgen',
    category: 'AI · Telegram',
    title: 'Lead generation for an expert',
    summary:
      'Accounts monitor niche chats, AI scores every message, replies to people who need help and guides them through a scripted bot to the expert.',
    metric: 'Leads 24/7',
    metricNote: 'without searching chats by hand',
    stack: 'Python, PostgreSQL, Docker',
    image: asset('projects/leadgen.jpg'),
  },
  {
    id: 'nechay',
    category: 'Website',
    title: 'Nechay catering',
    summary:
      'Menu, event portfolio and requests that go straight to the owner. Analytics, a mini admin panel and auto-deploy.',
    metric: 'Live website',
    metricNote: 'on the client’s domain',
    link: 'https://nechay.online/',
    linkLabel: 'nechay.online',
    image: asset('projects/nechay-catering.jpg'),
  },
]

// Reviews from Kwork, written in Russian by clients and translated here.
export const reviews = [
  {
    name: 'STIZO',
    project: 'Telegram Mini App',
    text: 'I came with a task when the deadline was already tight and thought I would have to wait a week. But the developer surprised me: he built a high-quality working program in less than a day. Everything was clear and to the point, and I didn’t notice any bugs. I recommend him 100%!',
    accent: true,
    translated: true,
  },
  {
    name: 'GrigoriySE',
    project: 'Marriage agency bot',
    caseId: 'hayat',
    text: 'Everything turned out even better than I expected. All my wishes were taken into account. Stepan is a true professional: always available, made edits quickly and brought the project to an excellent result.',
    translated: true,
  },
  {
    name: 'partyzan77777',
    project: 'AI content filtering in a bot',
    text: 'This is the second time I’ve worked with this developer. He quickly reworked everything for the new tasks, and the bot works great. Recommended!',
    repeat: true,
    translated: true,
  },
  {
    name: 'MarinaPizzaLove',
    project: 'Pizzeria website',
    text: 'Stepan took all our wishes into account: he chose the style, made a clear structure and integrated the cart and payment. The site looks great on all devices and is already bringing in orders. We’re continuing to work together!',
    translated: true,
  },
  {
    name: 'daneley',
    project: 'Clothing store in Telegram',
    text: 'He moved my clothing store to Telegram, quickly and with taste. The catalog is convenient and customers find it easy to order. Special thanks for the auto-responder — requests come in even at night.',
    translated: true,
  },
  {
    name: 'fomin273',
    project: 'Course sales bot with subscriptions',
    text: 'Everything is great. The bot is set up. I recommend him. Reliable and proactive.',
    translated: true,
  },
]

export const media = [
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@its___step',
    url: tiktokUrl,
    body: 'Short videos on how to build products with AI, find clients and earn money from development.',
    stats: [
      ['301K', 'likes'],
      ['2,100', 'followers'],
      ['300', 'videos'],
    ],
  },
  {
    id: 'channel',
    name: 'Telegram channel',
    handle: '@ItsStepss',
    url: channelUrl,
    body: 'AI freelancing from the inside: how I estimate orders, what development costs and which mistakes turn out expensive.',
    stats: [['850', 'subscribers']],
  },
  {
    id: 'cases',
    name: 'Cases and reviews',
    handle: '@itssteps',
    url: casesChannelUrl,
    body: 'A separate channel with work only: the client’s task, what was done and what they wrote after delivery.',
  },
]

export const services = [
  {
    title: 'Telegram bots',
    body: 'Requests, bookings, payments and subscriptions, a store or a Mini App right inside Telegram.',
    price: 'from $300',
    term: '1–2 weeks',
  },
  {
    title: 'Automation and AI',
    body: 'AI agents and integrations: they take requests, answer from your knowledge base, accept payments and guide the client to a deal.',
    price: 'from $1,000',
    term: '1–2 weeks',
  },
  {
    title: 'Web services and CRM',
    body: 'CRMs, client portals, admin panels and dashboards. Integrations with your CRM, email and payment systems through their APIs.',
    price: 'from $2,500',
    term: '3–6 weeks',
    accent: true,
  },
  {
    title: 'Turnkey product',
    body: 'An MVP or SaaS from scratch: architecture, interface, billing, analytics. For startups and internal business systems.',
    price: 'from $6,000',
    term: 'from 6 weeks',
  },
]

export const steps = [
  ['Task review', 'Free, 30 minutes on a call or in Telegram. An estimate of timeline and price the same day.'],
  ['Contract and spec', 'I fix the scope, timeline and cost. I work as a registered self-employed professional.'],
  ['Development in stages', 'Payment by stage, a demo every week — you see what you’re paying for.'],
  ['Launch and support', 'I hand over the code and access; 2 weeks of support are included.'],
]

export const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'cases', label: 'Cases' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'media', label: 'Media' },
  { id: 'about', label: 'About' },
  { id: 'pricing', label: 'Pricing' },
]

// Case card look: background and text tone to match the project image (same as content.js)
const caseLooks = {
  'ton-access-pass': { tone: 'dark', bg: 'linear-gradient(135deg, #08121e 0%, #0b3a66 100%)' },
  'conteria-tenders': { tone: 'light', bg: 'linear-gradient(135deg, #eef3ff 0%, #d6e2ff 100%)' },
  'conteria-shop': { tone: 'light', bg: 'linear-gradient(135deg, #f2f6fd 0%, #dce8fa 100%)' },
  novoterskaya: { tone: 'dark', bg: 'linear-gradient(135deg, #0e1a2b 0%, #1d3a5c 100%)' },
  'leasing-crm': { tone: 'light', bg: 'linear-gradient(135deg, #f4f5f8 0%, #e1e5ee 100%)' },
  'sales-ai': { tone: 'dark', bg: 'linear-gradient(135deg, #121838 0%, #26338a 100%)' },
  hayat: { tone: 'dark', bg: 'linear-gradient(135deg, #170f20 0%, #3d2443 100%)' },
  leadgen: { tone: 'light', bg: 'linear-gradient(135deg, #eef4ff 0%, #dde7fb 100%)' },
  nechay: { tone: 'dark', bg: 'linear-gradient(135deg, #1b1510 0%, #3d2d1e 100%)' },
}

// Detailed case stories: task → what was done → result. Translated from content.js;
// same facts, no new ones.
const caseDetails = {
  'ton-access-pass': {
    task: 'Show, as an open project, how to sell access to a private Telegram channel for crypto with no payment provider and no manual checks. The blockchain is the source of truth: anyone can verify a subscription without trusting the server.',
    done: [
      'Two Tact smart contracts. The main one takes payments and deploys a small per-subscriber contract that stores the expiry date. Renewing early adds to the time left, and underpayments are bounced back automatically.',
      'The bot admits people to the channel only through join requests. Before approving, it reads the subscription from the blockchain, and every minute it removes members whose subscription has expired.',
      'A Mini App that looks like Telegram itself: subscription status, payment with TON Connect, confirmation and a button to open the channel. Colors follow the user’s Telegram theme.',
      'The server verifies Telegram’s signature on every Mini App request, so nobody can view or pay for a subscription as someone else.',
      'Deployed to testnet and tested with a real payment. It caught a bug the tests had missed: the wallet took the fee out of the amount and the contract bounced the payment. The server now asks for a 0.01 TON reserve, covered by its own test.',
    ],
    results: [
      ['25 tests', 'for the contract, bot and API on the TON sandbox'],
      ['≈ 0.001 TON', 'network fee per payment'],
      ['2 contracts', 'a main one and one per subscriber'],
      ['Testnet', 'deployed and verified with a real payment'],
    ],
  },
  'leasing-crm': {
    task: 'A platform for leasing cars and special machinery: a catalog, a payment calculator based on bank terms, leasing applications with a CRM for bank managers, and an admin panel. The client also asked for machinery to be pulled from leasing companies’ websites every night and for a feed export to Yandex.',
    done: [
      'The calculator computes the payment on the server, taking VAT, down payment and term into account, and ranks banks from the best offer to the most expensive. The administrator sets each bank’s position in the results.',
      'A catalog with a three-level filter — type, subtype and variant such as “6×4 dump truck”. Every filter combination became a separate search page with a readable URL.',
      'An application CRM from “New” to “Issued”: bank managers see the application without the client’s contact details and respond with their own offer. A calendar, 5 roles and 9 notification types.',
      'Company check by tax ID (INN) via Checko: name, address, revenue and leases from Fedresurs — right in the application.',
      'A “Looking for a vehicle” section: machinery requests are pulled from a mailbox and shown in a carousel, with matching vehicles from the catalog under each one.',
      'Nightly import of machinery from leasing companies’ websites, bulk upload via Excel, a feed or the Avito API, and AI-written listing descriptions.',
    ],
    changes: [
      'Machinery from leasing companies is pulled in every night — the catalog grows without manual entry.',
      'Bank managers receive the application and respond with their offer right in the system, and the client sees banks ranked from the best offer to the most expensive.',
      'Instead of a single catalog page — 388 filter pages, each of which search engines can show for its own query.',
    ],
    results: [
      ['7 stages', 'in 3 weeks — the plan was 4 stages in 4 weeks'],
      ['14 banks', 'in the payment calculator'],
      ['388 pages', 'of catalog filters, each with its own search-friendly URL'],
      ['95–99', 'Lighthouse mobile performance score, 100 for SEO and accessibility'],
    ],
  },
  'sales-ai': {
    task: 'The sales team needed an AI assistant: answer clients in MAX and by email, reach out to them first, collect requests from lead platforms, prepare commercial proposals and send the head of sales a report every day. Paid third-party messenger services were ruled out by the brief.',
    done: [
      'Two modes: in Prompter mode the AI drafts a reply and the manager sends it; in Autopilot mode it replies on its own. The mode is switched with a tag on the deal, and autopilot is blocked for regular clients.',
      'A control panel right in amoCRM notes: with the commands “@бот” (bot), “@макс” (MAX) and “@почта” (email) the manager asks it to pick products, rework a proposal or send the client a reply in the messenger or by email with a file attached.',
      'The proposal is assembled in Word from the company template. Prices in yuan are converted at the Central Bank rate by code, not by the model: once the model “quoted” a rate of about 8 rubles when the real one was 11–12, and since then the rule is simple — no rate, no price.',
      'Request collection from 5 platforms through modules that are switched on in settings, and a watchdog that raises an alert if a platform stays silent for more than a day.',
      'Follow-up messages to silent clients after 3 and 24 hours, and a daily 18:00 report showing the payback of request collection.',
      'The knowledge base syncs from Yandex Disk every night. An action and cost log, a monitoring dashboard and automatic rollback of a failed deployment.',
    ],
    changes: [
      'Proposals with items priced in yuan no longer get stuck as drafts: the price is calculated at the Central Bank rate automatically, and the proposal goes out to the client.',
      'Silent clients get reminders automatically — after 3 and 24 hours, with no manual follow-up.',
      'Every day at 18:00 the head of sales gets a report with the payback of request collection, without exporting data from the CRM.',
      'If a lead platform goes quiet, the system raises an alert within a day. Before, one platform stopped passing on orders for two months and nobody noticed.',
    ],
    results: [
      ['2 modes', 'prompter and autopilot — switched with a tag on the deal'],
      ['5 platforms', 'with requests connected to collection'],
      ['600+', 'automated tests for replies, prices and commands'],
      ['18:00', 'every day — a report for the head of sales'],
    ],
  },
  novoterskaya: {
    task: 'Kavminvody JSC needed a premium website for Novoterskaya mineral water built on the “Balance of the Four Elements” brand legend: to build trust in the brand and lead visitors to the products. The requirements included two languages, editing without a developer, SEO and fast loading by Core Web Vitals.',
    done: [
      '13 pages: an 8-screen home page, catalog, origin and company history, water composition, production, laboratory control, documents, awards, news, charity and “where to buy”.',
      'Switching between Russian and English without reloading the page.',
      'Animations: a “water thread” that fills up as you scroll, and video backgrounds — with reduced-motion support.',
      'An admin panel on Sveltia CMS: the home page, products, documents and contacts are edited without a developer, and the site updates itself after saving.',
      'SEO: organization and product markup, social media previews, a sitemap and robots.txt.',
      'Speed optimization: AVIF images, lazy loading, and the first screen does not wait for video.',
    ],
    changes: [
      'Products, documents and news are updated without a developer — the site updates itself after saving.',
      'The first screen on a phone loads in 2.2 s instead of 5.8 s.',
      'The English version switches on the same page — no separate site is needed for an international audience.',
    ],
    results: [
      ['13 pages', 'in two languages'],
      ['5.8 → 2.2 s', 'first-screen load on a phone (LCP)'],
      ['100', 'Lighthouse score for SEO and accessibility'],
      ['2 languages', 'RU and EN, switched without page reload'],
    ],
  },
}

// All cases in one list, the featured one first. The featured case has three points
// instead of one metric; the card uses the first.
export const allCases = [
  {
    ...featured,
    metric: `${featured.points[0][0]} stages`,
    metricNote: 'in the pipeline — from tender to deal',
    stackList: featured.tags,
  },
  ...cases.map((item) => ({
    ...item,
    stackList: item.stack ? item.stack.split(', ') : [],
  })),
].map((item) => ({
  ...item,
  ...caseLooks[item.id],
  details: caseDetails[item.id],
  path: `/en/cases/${item.id}/`,
}))
