// English service pages: mirrors services.js for the /en/ pages, aimed at US and
// other English-speaking clients. Same facts as the Russian version; prices are
// starting prices in USD (minPrice feeds the Service markup). ruId links each page to
// its Russian counterpart. Update together with services.js.

// What every client gets, whatever the format
export const included = [
  'A free 30-minute review of your task and an estimate of timeline and price the same day',
  'A contract with fixed scope, timeline and cost',
  'Payment by stage and a demo of the working part every week',
  'The code and access stay with you, 2 weeks of support after launch are included',
]

export const servicePages = [
  {
    id: 'ai-agents',
    ruId: 'ai-agenty',
    nav: 'AI agents',
    title: 'AI agent development services',
    metaTitle: 'AI Agent Development Services for Business | Its Step',
    metaDescription:
      'Custom AI agents that answer customers, draft proposals, process documents and update your CRM. From $1,000, first working version in 1–2 weeks, fixed-price contract.',
    short: 'They answer clients, put together proposals, parse documents and run deals in the CRM.',
    lead: 'An AI agent takes over your managers’ repetitive work: it answers clients from your knowledge base, parses documents, puts together commercial proposals and runs the deal in the CRM. I build these systems for real businesses — from a single-task agent to a tender system with a 13-stage pipeline.',
    tasksTitle: 'What the agents I build can do',
    tasks: [
      [
        'Answer clients',
        'In messengers and by email, from your knowledge base: price lists, internal rules, product descriptions. At night and on weekends too.',
      ],
      [
        'Put together commercial proposals',
        'Proposals in Word from your template: items, prices, terms. The manager checks the draft and sends it to the client with a single command.',
      ],
      [
        'Parse documents',
        'They read PDFs and estimates, extract the fields you need and match items to your catalog — as in the tender system for Conteria.',
      ],
      [
        'Run deals in the CRM',
        'They create deals and tasks in amoCRM, write a summary of the conversation to the deal card and suggest the next step to the manager.',
      ],
      [
        'Find clients',
        'They monitor niche chats, score every message and reply to people who genuinely need help.',
      ],
      [
        'Prepare reports',
        'The head of sales gets a summary of managers and requests without manual exports from the CRM and spreadsheets.',
      ],
    ],
    approachTitle: 'How to keep AI from making mistakes',
    approach: [
      'The main risk of an AI agent is a confident wrong answer. That’s why in my systems money, stock levels and exchange rates are calculated by code, not by the model: the model understands the question, classifies the request and writes the text, while the numbers come from your data. If the answer isn’t in the data, the agent doesn’t make it up — it passes the question to a manager.',
      'The agent starts in prompter mode: it drafts the reply and a person sends it. Once the answers prove accurate, part of the flow moves to autopilot. Every action of the agent is logged, so you can always see what it did and why.',
      'I work with OpenAI and DeepSeek models and connect them to your CRM, email, messengers and knowledge base. The logic is written in Python and FastAPI and the workflows in n8n, so the system can keep growing without a rewrite from scratch.',
    ],
    price: 'from $1,000',
    minPrice: 1000,
    term: '1–2 weeks to the first working version',
    priceText:
      'From $1,000 for a single-task agent: answers from your knowledge base, request handling or proposal drafting. The final price depends on the channels, integrations and the size of the knowledge base, and it is fixed in the contract after a free 30-minute call. A large system for several departments, with CRM, documents and reports, is built as a turnkey product and takes from 6 weeks.',
    caseIds: ['conteria-tenders', 'sales-ai', 'leadgen', 'conteria-shop'],
    faq: [
      [
        'How much does an AI agent cost?',
        'From $1,000 for a single-task agent, with the first working version in 1–2 weeks. The final quote depends on channels, integrations and the knowledge base, and it is fixed in the contract after a free 30-minute call.',
      ],
      [
        'Won’t the agent make up prices and facts?',
        'The agent takes numbers from your data, and code does the calculations, not the model. If the answer isn’t in the knowledge base, the agent passes the question to a manager. At the start, a person checks every reply.',
      ],
      [
        'Which CRMs and channels do you work with?',
        'Delivered projects run on amoCRM, Bitrix24, email, Telegram and the MAX messenger. HubSpot, Pipedrive, Slack, WhatsApp Business and other tools with an API are connected the same way, through their APIs. We go over your stack on the call.',
      ],
      [
        'Can we start with a small pilot?',
        'Yes. We usually start with one task — for example, answers from the knowledge base or proposal assembly — and expand once the results are visible.',
      ],
      [
        'Is the model expensive to run after launch?',
        'Costs depend on the number of requests and the chosen model. Simple tasks can be moved to a cheaper model or a regular script — I build this into the architecture from the start.',
      ],
      [
        'Who will build the project?',
        'I do, personally: analysis, architecture, code and launch. No managers or intermediaries, so the context of the task doesn’t get lost between people.',
      ],
    ],
  },
  {
    id: 'crm',
    ruId: 'crm',
    nav: 'CRM',
    title: 'Custom CRM development',
    metaTitle: 'Custom CRM Development for Small Business | Its Step',
    metaDescription:
      'A CRM, client portal or admin panel built around how your team works: pipeline, catalogs, calculators, email and roles. From $2,500, 3–6 weeks, you own the code.',
    short: 'Requests, catalogs, calculators and email in one window — built around your process.',
    lead: 'I build CRMs and internal systems around a company’s specific process — when an off-the-shelf CRM forces you to work “like everyone else” or customizing it already costs more than having your own. Requests, catalogs, calculators, documents and email come together in one window, with roles and access rights.',
    tasksTitle: 'What I build into a CRM',
    tasks: [
      [
        'Requests and pipeline',
        'Your own deal stages, owners, tasks and history for every client. The Conteria tender system has 13 stages from tender to deal.',
      ],
      [
        'Catalogs and calculators',
        'A catalog of products or machinery with filters and a calculator that works by your rules — for example, leasing with bank terms.',
      ],
      [
        'Counterparty checks',
        'Company details are pulled from public registries by tax ID as soon as a request is created. In the leasing CRM this runs through the Checko API, with no manual searching.',
      ],
      [
        'Email inside the CRM',
        'Emails from clients and suppliers arrive right in the system, and you can reply without switching to your inbox.',
      ],
      [
        'Roles and permissions',
        'A manager sees their own requests, the head sees the whole pipeline and reports, an administrator manages the reference data.',
      ],
      [
        'Integrations and AI',
        'Email, payments and other CRMs through their APIs: amoCRM and Bitrix24 in delivered projects, HubSpot, Pipedrive or Stripe the same way. AI product descriptions and document parsing where they save hours of work.',
      ],
    ],
    approachTitle: 'The CRM is built around the process, not the other way round',
    approach: [
      'First I look at how the work is done now: who does what, where requests get lost, which spreadsheets are kept by hand and what is duplicated in them. Only then do I design the screens and the data — so the system removes extra work instead of adding more.',
      'I deliver in stages: a demo of the working part every week, and payment by stage too. You see what you’re paying for, and changes are made along the way rather than in one list at the end. That’s how the CRM for the leasing platform was delivered — with a machinery catalog, a calculator and company checks by tax ID.',
      'The stack is Next.js, Django or FastAPI, and PostgreSQL. I hand over the code and access to you: you can develop the system in-house or together with me.',
    ],
    price: 'from $2,500',
    minPrice: 2500,
    term: '3–6 weeks',
    priceText:
      'From $2,500 for a CRM with one pipeline, roles and email. Every extra module, role or integration adds to the scope. The price covers design, interface, database, integrations and launch on your server, and it is fixed in the contract after a free 30-minute call.',
    caseIds: ['leasing-crm', 'conteria-tenders', 'sales-ai'],
    faq: [
      [
        'How much does CRM development cost?',
        'From $2,500, with a timeline of 3–6 weeks. The final price depends on modules, roles and integrations, and it is fixed in the contract after a free 30-minute call.',
      ],
      [
        'Why a custom CRM instead of HubSpot or Salesforce?',
        'An off-the-shelf CRM works well if your process fits its logic. A custom one is needed when your own reference data, calculators, documents and rules matter — or when customizing an off-the-shelf one already costs more. Often an integration with amoCRM is enough, and I’ll tell you so honestly on the call.',
      ],
      [
        'Can data be moved from spreadsheets or an old system?',
        'Yes. We discuss data migration on the call and plan it as a separate stage of the work.',
      ],
      [
        'Who owns the code?',
        'You do. After launch I hand over the code and access, and 2 weeks of support are included in the price.',
      ],
      [
        'How does payment work?',
        'By stage. Every week I show the working part of the system, so you see what you’re paying for.',
      ],
      [
        'Do you work under a contract?',
        'Yes, as a registered self-employed professional. Scope, timeline and price are fixed in the contract before work begins.',
      ],
    ],
  },
  {
    id: 'websites',
    ruId: 'sajty',
    nav: 'Websites',
    title: 'Website development for small business',
    metaTitle: 'Small Business Website Development | Its Step',
    metaDescription:
      'Business websites, online stores and restaurant sites with an admin panel and SEO from day one. From $800. Built an online store with 520,000 products.',
    short: 'Brand websites, online stores and service sites — with an admin panel and SEO from day one.',
    lead: 'I build websites that work for the business: they take requests, sell and are updated without a developer. From a brand website for a mineral water to an online store with 520,000 products and stock levels updated automatically from suppliers.',
    tasksTitle: 'Websites I build',
    tasks: [
      [
        'Brand website',
        'History, products, news and contacts, several languages and a custom admin panel for content — like the Novoterskaya mineral water site.',
      ],
      [
        'Online store',
        'A catalog with filters, cart and online payment, shipping integrations and product feeds for ads.',
      ],
      [
        'Service website',
        'A menu or price list, portfolio and requests that go straight to the owner — like the Nechay catering site.',
      ],
      [
        'Migration from an old platform',
        'Moving a store from OpenCart or an outdated engine to a modern stack — as we did with the Conteria store.',
      ],
      [
        'AI on the website',
        'AI catalog search, an AI consultant and SEO copy for thousands of pages — the Conteria store has 155,000 of them.',
      ],
      [
        'Admin panel and analytics',
        'Texts, photos and products are edited without a developer; analytics and automatic deployment are set up from the start.',
      ],
    ],
    approachTitle: 'SEO and speed are built in from the start',
    approach: [
      'I build the whole website: structure, interface, code and launch. That’s why it looks the way it was designed and opens quickly on a phone — images are compressed, text is visible to search engines without JavaScript, and there are no unnecessary scripts.',
      'Basic SEO is part of the work: pages for real search queries, meta tags and messenger previews, structured data, a sitemap, and Google Search Console and analytics setup. You won’t have to rebuild the site for promotion later.',
      'For small websites — a static build and fast hosting. For stores and large catalogs — Next.js and Laravel with a database, an admin panel and integrations.',
    ],
    price: 'from $800',
    minPrice: 800,
    term: 'estimate on the day you get in touch',
    priceText:
      'From $800 for a small business website with several pages, a contact form and basic SEO. A store, a catalog, more languages and integrations add to the scope. The price and timeline are fixed in the contract after a free 30-minute call.',
    caseIds: ['novoterskaya', 'conteria-shop', 'nechay'],
    faq: [
      [
        'How much does a website cost?',
        'From $800 for a small business website. The final price depends on pages, catalog, languages and integrations. I give an estimate on the day you get in touch, and the quote is fixed in the contract after a free 30-minute call.',
      ],
      [
        'Can I edit texts and products myself?',
        'Yes. If the site needs an admin panel, I build it around your content: texts, photos, news and products are edited without a developer.',
      ],
      [
        'Will the site be promoted in search?',
        'Basic SEO is part of the work: structure, meta tags, markup, sitemap and speed. Promotion is separate work, but the site will be ready for it from day one.',
      ],
      [
        'Can you connect payment and delivery?',
        'Yes. Payments and shipping are connected through the providers’ APIs. The Conteria store, for example, takes online payments and calculates delivery with two carriers.',
      ],
      [
        'Can a store be moved from OpenCart?',
        'Yes, I’ve done this migration before: the Conteria engineering equipment store moved from OpenCart to Next.js and Laravel.',
      ],
      [
        'Who will build the website?',
        'I do, personally: structure, interface, code and launch. You talk directly to me, without managers.',
      ],
    ],
  },
  {
    id: 'telegram-bots',
    ruId: 'telegram-boty',
    nav: 'Telegram bots',
    title: 'Telegram bot development',
    metaTitle: 'Telegram Bot Developer for Hire: Bots and Mini Apps | Its Step',
    metaDescription:
      'Telegram bots for sales, requests, payments and subscriptions, plus Telegram Mini Apps and TON smart contracts. From $300, 1–2 weeks, fixed-price contract.',
    short: 'They sell, take requests and payments, and grant access — with no human involved.',
    lead: 'I build bots that sell, take requests and accept payments with no human involved. One of them — a marriage agency bot — brought the client 100,000 RUB in its first week: 50 payments, and the agency stopped handling conversations by hand.',
    tasksTitle: 'What the bots can do',
    tasks: [
      [
        'Funnels and questionnaires',
        'The bot guides the client through a scenario: questions, questionnaire, moderation, access. A person steps in only where they are really needed.',
      ],
      [
        'Payments and subscriptions',
        'Telegram Stars, TON via TON Connect, YooKassa or Tribute: paid access to a channel or course and subscription renewals without manual checks.',
      ],
      [
        'Store in Telegram',
        'Catalog, cart and ordering right in the messenger. An auto-responder takes requests even at night.',
      ],
      [
        'Telegram Mini Apps',
        'A full app inside Telegram with no installation or sign-up, and TON Connect payments when you need them.',
      ],
      [
        'AI in the bot',
        'The bot understands free-form text, answers from a knowledge base and filters the content it receives.',
      ],
      [
        'Admin panel in the bot',
        'Statistics, settings and A/B tests of texts right in Telegram — no separate control panel.',
      ],
    ],
    approachTitle: 'Scenario first, then code',
    approach: [
      'I start with the scenario: what steps the client goes through, where they might drop off and what the bot does if a person goes off-script. We agree on the flow before development, so from day one the bot behaves the way you expect.',
      'Small tasks I do quickly: a Telegram Mini App for one of my clients was ready in less than a day. Bots with payments, moderation and an admin panel are delivered in stages, with a demo every week.',
      'I write in Python with a PostgreSQL database. The bot runs around the clock and is deployed on your server, and the access stays with you.',
    ],
    price: 'from $300',
    minPrice: 300,
    term: '1–2 weeks',
    priceText:
      'From $300 for a bot with a simple scenario. Payments, moderation, an admin panel and Mini Apps add to the scope. I give an estimate on the day you get in touch, and the price is fixed in the contract after a free 30-minute call.',
    caseIds: ['hayat', 'ton-access-pass', 'leadgen'],
    reviewNames: ['STIZO', 'GrigoriySE', 'daneley', 'fomin273', 'partyzan77777'],
    faq: [
      [
        'How much does a Telegram bot cost?',
        'From $300 for a simple bot. A bot with a funnel, payments and an admin panel takes 1–2 weeks, and the price is fixed in the contract after a free 30-minute call.',
      ],
      [
        'Which payment systems do you connect?',
        'Telegram Stars, TON via TON Connect, YooKassa and Tribute: one-time payments, paid access and subscriptions. Other providers are connected through their APIs.',
      ],
      [
        'Can you build a bot with AI?',
        'Yes: the bot understands free-form text, answers from a knowledge base, scores messages and filters content. More on the AI agents page.',
      ],
      [
        'Will the bot work when I’m offline?',
        'Yes. The bot runs around the clock: it takes requests and payments, grants access and replies by the scenario without your involvement.',
      ],
      [
        'What do you need from me to start?',
        'A short description of the task. We’ll go over the flow, timeline and price on a free 30-minute call.',
      ],
      [
        'Who will build the bot?',
        'I do, personally — from scenario to launch. You talk directly to the developer.',
      ],
    ],
  },
].map((page) => ({ ...page, path: `/en/${page.id}/` }))
