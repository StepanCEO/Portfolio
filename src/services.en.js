// English service pages: mirrors services.js for the /en/ pages.
// Same facts as the Russian version; developer prices in rubles are not shown —
// the price is fixed in the contract after a free call. ruId links each page to its
// Russian counterpart. Update together with services.js.

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
    title: 'AI agent development for business',
    metaTitle: 'Turnkey AI Agent Development for Business — Its Step',
    metaDescription:
      'AI agents that answer clients, put together proposals, parse documents and run deals in your CRM. Fixed quote, first working version in 1–2 weeks.',
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
    price: 'Fixed quote',
    term: '1–2 weeks to the first working version',
    priceText:
      'The price is fixed in the contract after a free 30-minute call and depends on scope: the number of channels, integrations and the size of the knowledge base. A single-task agent covers one job — answers from the knowledge base, request handling or proposal assembly. A large system for several departments, with CRM, documents and reports, is built as a turnkey product and takes from 6 weeks.',
    caseIds: ['conteria-tenders', 'sales-ai', 'leadgen', 'conteria-shop'],
    faq: [
      [
        'How much does an AI agent cost?',
        'The quote is fixed in the contract after a free 30-minute call. It depends on the number of channels, integrations and the size of the knowledge base. The first working version of a single-task agent takes 1–2 weeks.',
      ],
      [
        'Won’t the agent make up prices and facts?',
        'The agent takes numbers from your data, and code does the calculations, not the model. If the answer isn’t in the knowledge base, the agent passes the question to a manager. At the start, a person checks every reply.',
      ],
      [
        'Which CRMs and channels do you work with?',
        'amoCRM and Bitrix24, email, Telegram and MAX. If the integration you need isn’t on the list, we’ll discuss it on the call.',
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
    title: 'Custom CRM development for your business',
    metaTitle: 'Custom CRM Development — Its Step',
    metaDescription:
      'CRMs, client portals and admin panels built around your process: requests, catalogs, calculators, email, roles. amoCRM, Bitrix24, payments. 3–6 weeks.',
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
        'A company is checked by its tax ID (INN) right when the request is created — no manual searching in third-party services.',
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
        'amoCRM, Bitrix24, email, YooKassa and Tribute. AI product descriptions and document parsing — where they save hours of work.',
      ],
    ],
    approachTitle: 'The CRM is built around the process, not the other way round',
    approach: [
      'First I look at how the work is done now: who does what, where requests get lost, which spreadsheets are kept by hand and what is duplicated in them. Only then do I design the screens and the data — so the system removes extra work instead of adding more.',
      'I deliver in stages: a demo of the working part every week, and payment by stage too. You see what you’re paying for, and changes are made along the way rather than in one list at the end. That’s how the CRM for the leasing platform was delivered — with a machinery catalog, a calculator and company checks by tax ID.',
      'The stack is Next.js, Django or FastAPI, and PostgreSQL. I hand over the code and access to you: you can develop the system in-house or together with me.',
    ],
    price: 'Fixed quote',
    term: '3–6 weeks',
    priceText:
      'The price is fixed in the contract after a free 30-minute call and depends on scope: the number of modules, roles and integrations. It covers design, interface, database, integrations and launch on your server.',
    caseIds: ['leasing-crm', 'conteria-tenders', 'sales-ai'],
    faq: [
      [
        'How much does CRM development cost?',
        'The quote is fixed in the contract after a free 30-minute call, and the timeline is 3–6 weeks. The final price depends on modules, roles and integrations.',
      ],
      [
        'Why a custom CRM instead of amoCRM or Bitrix24?',
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
    title: 'Website development for business',
    metaTitle: 'Turnkey Business Website Development — Its Step',
    metaDescription:
      'Brand websites, online stores and service sites: admin panel, integrations, SEO from day one. A store with 520,000 products. Under contract.',
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
        'A catalog with filters, cart and online payment, delivery via CDEK and PEC, product feeds for VKontakte ads.',
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
        'Texts, photos and products are edited without a developer; Yandex Metrica and automatic deployment are set up from the start.',
      ],
    ],
    approachTitle: 'SEO and speed are built in from the start',
    approach: [
      'I build the whole website: structure, interface, code and launch. That’s why it looks the way it was designed and opens quickly on a phone — images are compressed, text is visible to search engines without JavaScript, and there are no unnecessary scripts.',
      'Basic SEO is part of the work: pages for real search queries, meta tags and messenger previews, structured data, a sitemap, and Yandex Webmaster and Metrica setup. You won’t have to rebuild the site for promotion later.',
      'For small websites — a static build and fast hosting. For stores and large catalogs — Next.js and Laravel with a database, an admin panel and integrations.',
    ],
    price: 'Fixed quote',
    term: 'estimate on the day you get in touch',
    priceText:
      'The price depends on the number of pages, the catalog, languages and integrations. It is fixed in the contract after a free 30-minute call, together with the timeline.',
    caseIds: ['novoterskaya', 'conteria-shop', 'nechay'],
    faq: [
      [
        'How much does a website cost?',
        'It depends on scope: the number of pages, the catalog, languages and integrations. I give an estimate on the day you get in touch, and the quote is fixed in the contract after a free 30-minute call.',
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
        'Yes: online payment — for example, via YooKassa — and delivery via CDEK and PEC, as in the Conteria store.',
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
    title: 'Turnkey Telegram bot development',
    metaTitle: 'Turnkey Telegram Bot Development — Its Step',
    metaDescription:
      'Bots for sales, requests, payments and subscriptions, Telegram Mini Apps, AI in bots. A marriage agency bot brought its client 100,000 RUB in week one.',
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
        'Payments via YooKassa and Tribute, paid access to a channel or course, subscription renewal without manual checks.',
      ],
      [
        'Store in Telegram',
        'Catalog, cart and ordering right in the messenger. An auto-responder takes requests even at night.',
      ],
      [
        'Telegram Mini Apps',
        'A full-fledged app inside Telegram — no installation or sign-up for the client.',
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
    price: 'Fixed quote',
    term: '1–2 weeks',
    priceText:
      'The price is fixed in the contract after a free 30-minute call and depends on scope: the funnel, payments and admin panel. Small improvements and Mini Apps take less time — I give an estimate on the day you get in touch.',
    caseIds: ['hayat', 'leadgen'],
    reviewNames: ['STIZO', 'GrigoriySE', 'daneley', 'fomin273', 'partyzan77777'],
    faq: [
      [
        'How much does a Telegram bot cost?',
        'The quote is fixed in the contract after a free 30-minute call and depends on the funnel, payments and admin panel. A bot like that takes 1–2 weeks. Simple improvements cost less and are faster — I’ll estimate them the day you get in touch.',
      ],
      [
        'Which payment systems do you connect?',
        'YooKassa and Tribute: one-time payments, paid access and subscriptions.',
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
