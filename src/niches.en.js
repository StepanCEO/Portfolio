// English niche landing pages for US and other English-speaking clients. Topics and
// queries come from Google search suggestions (hl=en, gl=us): each page answers its own
// group of queries (the queries field). Only facts from the cases and reviews in
// content.en.js — no new clients, numbers or results. Starting prices in USD match
// services.en.js. English-only: the Russian site has its own niche pages in niches.js.

export const nichePages = [
  {
    id: 'telegram-mini-app-development',
    parent: 'telegram-bots',
    nav: 'Telegram Mini Apps',
    title: 'Telegram Mini App development',
    metaTitle: 'Telegram Mini App Development: Hire a Mini App Developer | Its Step',
    metaDescription:
      'Telegram Mini Apps with a native look, Telegram sign-in, payments in Stars or TON and a backend you own. From $1,000. Open-source TON example on GitHub.',
    short: 'Apps inside Telegram: catalogs, bookings, subscriptions and payments with nothing to install.',
    queries: [
      'telegram mini app development',
      'telegram mini app developer',
      'telegram mini app creation',
      'telegram web app development',
      'hire telegram mini app developer',
    ],
    lead: 'A Telegram Mini App is a web app that opens inside Telegram: the user is already signed in, there is nothing to install, and payment takes a couple of taps. I build Mini Apps together with the bot and the backend behind them. You can read the code of one right now: TON Access Pass sells access to a private channel for TON and is published on GitHub with its tests.',
    tasksTitle: 'What a Mini App can do for your business',
    tasks: [
      [
        'Sign-in without forms',
        'Telegram passes the user’s profile to the app with a signature, and the server verifies it on every request. No passwords and no sign-up screens.',
      ],
      [
        'Payments in two taps',
        'Telegram Stars for digital goods, TON through TON Connect, or a payment provider connected to your bot.',
      ],
      [
        'Catalogs and bookings',
        'A store, a menu or a booking calendar, with order updates sent to the user in the bot chat.',
      ],
      [
        'Subscriptions and paid access',
        'Access to a private channel or course that is granted and revoked automatically, as in TON Access Pass.',
      ],
      [
        'Native look',
        'The app follows the user’s Telegram theme and uses the native main button and haptics, so it feels like part of Telegram.',
      ],
      [
        'Bot and admin tools',
        'The bot sends updates and reminders, and the owner manages orders and settings without a separate dashboard.',
      ],
    ],
    approachTitle: 'How I build Mini Apps',
    approach: [
      'A Mini App is only as good as the bot and the server behind it, so I design all three together: the scenario in the chat, the screens in the app and the API that checks every request. The server never trusts data from the browser, only what Telegram has signed.',
      'The front end is plain TypeScript or React and is kept light, so it opens fast on mobile data. TON Access Pass loads a 12 KB app first and fetches the 520 KB TON Connect library afterwards, so the subscription status shows up right away.',
      'Small Mini Apps can be quick: one client got a working Mini App in less than a day. Larger ones are delivered in stages with a demo every week, and the code and server access stay with you.',
    ],
    price: 'from $1,000',
    term: '1–3 weeks',
    priceText:
      'From $1,000 for a Mini App with a few screens, Telegram sign-in and a backend. Payments, an admin panel, smart contracts and integrations add to the scope. The price is fixed in the contract after a free 30-minute call.',
    minPrice: 1000,
    caseIds: ['ton-access-pass', 'hayat'],
    reviewNames: ['STIZO', 'daneley'],
    faq: [
      [
        'How much does a Telegram Mini App cost?',
        'From $1,000 for a Mini App with a few screens, sign-in through Telegram and a backend. Payments, admin tools and smart contracts add to the scope. The quote is fixed in the contract after a free call.',
      ],
      [
        'What is the difference between a bot and a Mini App?',
        'A bot talks to the user in the chat with messages and buttons. A Mini App opens a full interface inside Telegram: catalogs, forms, calendars. They usually work together: the bot brings people in and sends updates, and the Mini App handles the screens.',
      ],
      [
        'Can users pay inside the Mini App?',
        'Yes. Digital goods in Telegram are sold for Telegram Stars, crypto payments go through TON Connect, and physical goods can use a payment provider connected to the bot.',
      ],
      [
        'Can I see a Mini App you have built?',
        'Yes. TON Access Pass is open source: the code, the tests, a demo recording and the contract deployed to testnet are on GitHub.',
      ],
      [
        'Do you build the backend too?',
        'Yes. The bot, the API, the database and the deployment on your server are part of the job, and you get the code and the access.',
      ],
      [
        'Who will build the Mini App?',
        'I will, personally, from the scenario to the launch. You talk directly to the developer.',
      ],
    ],
  },
  {
    id: 'ton-smart-contract-development',
    parent: 'telegram-bots',
    nav: 'TON smart contracts',
    title: 'TON smart contract development',
    metaTitle: 'TON Smart Contract Development in Tact | Its Step',
    metaDescription:
      'TON smart contracts in Tact with sandbox tests, testnet deployment and a Telegram Mini App or bot on top. From $1,500. Open-source example with 25 tests.',
    short: 'Tact contracts with tests, testnet deployment and a Telegram interface on top.',
    queries: [
      'ton smart contract development',
      'ton smart contracts',
      'ton blockchain developer',
      'ton blockchain smart contract',
      'tact smart contract',
    ],
    lead: 'TON is the blockchain built into Telegram, so a TON contract can be paid from a wallet inside the messenger and used by a bot or a Mini App. I write TON contracts in Tact, test them in the TON sandbox, deploy them to testnet and connect them to Telegram. My open project TON Access Pass shows the whole chain: a contract for paid subscriptions, a bot, a Mini App and 25 tests.',
    tasksTitle: 'What I build on TON',
    tasks: [
      [
        'Payments and subscriptions',
        'Contracts that accept TON, record who paid and until when, and bounce payments that are too small. Access in Telegram is granted from on-chain data.',
      ],
      [
        'Per-user contracts',
        'The scalable TON pattern: a main contract deploys a small contract for every user, the way jetton wallets work. State stays small and gas stays predictable.',
      ],
      [
        'Owner controls',
        'Withdrawals, price changes and other admin actions are allowed only to the owner, and the contract keeps a reserve for storage fees.',
      ],
      [
        'Tests before deployment',
        'Every rule is covered by tests in @ton/sandbox: the normal flow, wrong senders, underpayments and edge cases with time.',
      ],
      [
        'Wallet connection',
        'TON Connect in a Mini App or on a website: the user confirms the transaction in Tonkeeper or another wallet.',
      ],
      [
        'Backend that reads the chain',
        'A server or bot that reads contract state through the TON API and acts on it, for example by opening or closing access.',
      ],
    ],
    approachTitle: 'How I keep contracts safe',
    approach: [
      'A contract cannot be patched after deployment, so the rules are written down first: who can send which message, what happens to the money in every case and what the contract must never allow. Each rule then becomes a test.',
      'Testnet comes before mainnet, with real wallets. In TON Access Pass a real testnet payment caught something the tests had missed: the wallet took the forwarding fee out of the amount, and the contract correctly bounced the payment. The fix and a regression test went in right away.',
      'I am not an audit firm. For contracts that will hold significant funds, I recommend an independent audit before mainnet and prepare the code, the spec and the tests for it.',
    ],
    price: 'from $1,500',
    term: '2–4 weeks',
    priceText:
      'From $1,500 for a contract with a clear set of rules, tests and testnet deployment. A Mini App, a bot, a backend and more contracts add to the scope. The price is fixed in the contract after a free 30-minute call.',
    minPrice: 1500,
    caseIds: ['ton-access-pass'],
    faq: [
      [
        'How much does a TON smart contract cost?',
        'From $1,500 for a contract with tests and testnet deployment. The final price depends on the rules, the number of contracts and the interface on top, and it is fixed in the contract after a free call.',
      ],
      [
        'Tact or FunC?',
        'Tact for new contracts: it is readable and well supported by TON tooling. If your project already has FunC or Tolk contracts, we go over how to work with them on the call.',
      ],
      [
        'Do you deploy to mainnet?',
        'Yes, after testnet and your sign-off. For contracts that hold significant funds, I recommend an independent audit first.',
      ],
      [
        'Can I see your TON code?',
        'Yes. TON Access Pass is on GitHub with the contracts, 25 tests and a contract deployed to testnet.',
      ],
      [
        'Can you connect the contract to Telegram?',
        'Yes, and that is the main reason to build on TON: a bot or a Mini App reads the contract and grants access, and users pay through TON Connect.',
      ],
    ],
  },
  {
    id: 'ai-sales-agent',
    parent: 'ai-agents',
    nav: 'AI sales agent',
    title: 'AI sales agent for your sales team',
    metaTitle: 'AI Sales Agent for Lead Follow-Up and Proposals | Its Step',
    metaDescription:
      'An AI sales agent that answers leads, drafts proposals, follows up with quiet prospects and updates your CRM. From $1,000. Running in production since August.',
    short: 'Answers leads, drafts proposals, follows up with quiet prospects and updates the CRM.',
    queries: [
      'ai sales agent',
      'ai sales agent for lead generation',
      'ai sales agent pricing',
      'ai sales assistant',
      'ai agent for sales team',
    ],
    lead: 'An AI sales agent does not replace your reps. It takes the repetitive work off them: first replies, product matching, proposal drafts, reminders to quiet leads and an evening report for the manager. I built one for a client’s sales team, and it has been running in production since August, working by email, in a messenger and in the CRM.',
    tasksTitle: 'What the agent takes off your reps',
    tasks: [
      [
        'Answers inbound leads',
        'A lead writes by email or in a messenger, and the agent replies from the company knowledge base: range, terms and lead times. In the live project the knowledge base syncs every night.',
      ],
      [
        'Drafts proposals',
        'It picks the items and builds a proposal in Word from the company template. Prices in foreign currency are converted by code at the official rate, never by the model.',
      ],
      [
        'Follows up',
        'If a lead goes quiet, a follow-up goes out after 3 hours and another after 24. Nobody has to keep it in mind.',
      ],
      [
        'Collects leads from platforms',
        'Requests from five lead platforms land in one pipeline, and the system raises an alert if a platform stays silent for more than a day.',
      ],
      [
        'Works inside the CRM',
        'Deals and notes fill in automatically, and reps control the agent with short commands right in the deal card.',
      ],
      [
        'Reports to the manager',
        'Every day at 18:00 the head of sales gets a report on the reps and on the payback of lead collection.',
      ],
    ],
    approachTitle: 'Why you can trust it with customers',
    approach: [
      'It has two modes. In prompter mode the agent drafts a reply and the rep decides whether to send it. In autopilot it replies on its own. The mode is switched with a tag on the deal, and autopilot is blocked for regular customers.',
      'The riskiest part is price. Once the model “quoted” an exchange rate of about 8 when the real one was 11–12, so the rule is strict: the rate comes from the official source, code does the math, and with no rate there is no price. More than 600 automated tests check replies, prices and commands.',
      'Outbound prospecting works differently, as in the lead generation project for an expert: AI reads niche chats, finds people with a matching need, replies to them and guides them through a scripted bot to a consultation.',
    ],
    price: 'from $1,000',
    term: '1–2 weeks to the first working version',
    priceText:
      'From $1,000 for one job, for example replies in one channel from your knowledge base, or proposal drafting. Every extra channel, lead platform and integration adds to the scope. The system grows as it proves itself, which is how the live project expanded. The quote is fixed in the contract after a free call.',
    minPrice: 1000,
    caseIds: ['sales-ai', 'leadgen'],
    faq: [
      [
        'How much does an AI sales agent cost?',
        'From $1,000 for the first job, with a working version in 1–2 weeks. After that the system grows in stages, such as new channels, platforms and reports, and each stage is quoted separately.',
      ],
      [
        'Will AI scare customers away?',
        'It starts in prompter mode, so customers get replies a rep has checked. Only the requests where the agent is consistently right move to autopilot, and regular customers can stay with people.',
      ],
      [
        'Which CRM does it work with?',
        'The live system runs on amoCRM. HubSpot, Pipedrive and other CRMs with an API are connected the same way, and we go over your stack on the call.',
      ],
      [
        'Which channels can it use?',
        'Email, Telegram and other messengers with an API. In the live project the agent talks to customers by email and in a messenger and can reach out first.',
      ],
      [
        'Will it replace my sales reps?',
        'No. The agent handles first replies, drafts and reminders, and your reps spend their time on negotiations and key accounts.',
      ],
    ],
  },
  {
    id: 'ai-automation-for-small-business',
    parent: 'ai-agents',
    nav: 'AI automation',
    title: 'AI automation services for small businesses',
    metaTitle: 'AI Automation Services for Small Businesses | Its Step',
    metaDescription:
      'I find the repetitive work in your business and automate it with AI agents and workflows: inbox, documents, leads, reports. From $1,000, first result in 1–2 weeks.',
    short: 'AI agents and workflows for the inbox, documents, leads and reports.',
    queries: [
      'ai automation for small businesses',
      'ai automation services for small businesses',
      'ai workflow automation for small business',
      'ai automation agency for small businesses',
      'custom ai agents for business',
    ],
    lead: 'AI automation for a small business starts with one question: where does your team spend hours every week on the same work? I find those spots, build an AI agent or a workflow for them and connect it to your inbox, CRM and messengers. There is no agency in between: from the first call to the launch you talk to the developer who writes the code.',
    tasksTitle: 'Where AI pays off fastest',
    tasks: [
      [
        'Inbox and messages',
        'Replies to common questions from your knowledge base, with a person checking drafts until the answers prove accurate.',
      ],
      [
        'Documents',
        'Reading PDFs, estimates and forms, pulling out the fields you need and matching items to your catalog.',
      ],
      [
        'Leads',
        'Requests from your website and lead platforms collected in one pipeline, with follow-ups that go out on schedule.',
      ],
      ['Proposals and quotes', 'Drafts in your template with prices taken from your data and calculated by code.'],
      ['Reports', 'A daily summary for the owner without exports from the CRM and spreadsheets.'],
      [
        'Content at scale',
        'Product descriptions and SEO copy generated from your data. The Conteria store has AI-written copy for 155,000 pages.',
      ],
    ],
    approachTitle: 'How the work goes',
    approach: [
      'It starts with a free 30-minute call: you describe how the work is done today, and I point out what can be automated and what is not worth it. You get an estimate of time and cost the same day.',
      'Then one task, not the whole company. The first working version takes 1–2 weeks, and the team uses it on real requests. Money, stock and rates are always calculated by code, and the model only handles language.',
      'When the first task pays off, the next one is added as a new stage. That is how the sales assistant grew from replies in one channel into a system with five lead platforms, proposals and daily reports.',
    ],
    price: 'from $1,000',
    term: '1–2 weeks to the first working version',
    priceText:
      'From $1,000 for the first automated task. Each next task is quoted as its own stage, so you only pay for what has proved useful. The quote is fixed in the contract after a free call.',
    minPrice: 1000,
    caseIds: ['sales-ai', 'conteria-tenders', 'conteria-shop', 'leadgen'],
    faq: [
      [
        'How much does AI automation cost for a small business?',
        'From $1,000 for the first task, with a working version in 1–2 weeks. Larger systems are built in stages, and each stage is quoted separately.',
      ],
      [
        'Do I need to change my tools?',
        'Usually not. The automation connects to the CRM, email and messengers you already use through their APIs.',
      ],
      [
        'Which AI models do you use?',
        'OpenAI and DeepSeek models, chosen for each task. The logic runs in Python and FastAPI, and workflows run in n8n where that is easier to maintain.',
      ],
      [
        'What if the AI makes a mistake?',
        'Numbers never come from the model, and a person checks drafts at the start. If the answer is not in your data, the agent hands the question to a person instead of guessing.',
      ],
      [
        'Who owns the automation?',
        'You do. The code and access are handed over after launch, and two weeks of support are included.',
      ],
    ],
  },
  {
    id: 'n8n-automation',
    parent: 'ai-agents',
    nav: 'n8n automation',
    title: 'n8n automation developer',
    metaTitle: 'n8n Developer for Hire: Workflows with AI and Code | Its Step',
    metaDescription:
      'n8n workflows for leads, CRM, email and AI steps, with Python services where n8n alone is not enough. From $500. A developer who writes code, not only nodes.',
    short: 'Workflows for leads, CRM, email and AI, with tested code for the hard parts.',
    queries: ['n8n developer', 'n8n developer hiring', 'n8n automation', 'n8n automation workflows', 'n8n ai agent'],
    lead: 'n8n is great for connecting services and running workflows on a schedule, and it runs on your own server. It struggles when the logic gets complex, the data gets heavy or the money has to be exact. I build n8n workflows and, where needed, put a small Python service next to them, so the workflow stays readable and the hard parts are tested code. The sales assistant I built for a client is made this way: FastAPI, OpenAI and n8n.',
    tasksTitle: 'What I automate with n8n',
    tasks: [
      [
        'Lead routing',
        'Requests from forms, email and lead platforms reach the CRM with the right owner, tags and a first reply.',
      ],
      ['CRM sync', 'Deals, contacts and notes stay in sync between the CRM, email and messengers.'],
      [
        'AI steps',
        'Classifying requests, drafting replies and summarizing conversations with OpenAI or DeepSeek inside the workflow.',
      ],
      ['Scheduled jobs', 'Nightly knowledge base syncs, daily reports and follow-ups that go out on time.'],
      [
        'Monitoring',
        'Alerts when a source goes silent or a step fails, so problems surface within a day instead of months later.',
      ],
      ['Self-hosting', 'n8n on your server with Docker and backups, with the access staying with you.'],
    ],
    approachTitle: 'n8n plus code, not n8n instead of code',
    approach: [
      'Workflows are easy to change, which makes them great for routing and scheduling. Calculations, parsing and anything involving money go into a Python service with tests, and the workflow calls it. You keep the flexibility of n8n without logic hidden across dozens of nodes.',
      'Every workflow gets logging and alerts. In the sales project a watchdog raises an alert if a lead platform is silent for more than a day. It was added after one platform had stopped passing on orders for two months without anyone noticing.',
      'You get the workflows, the code and the server access, and your team can still change simple steps in the n8n editor.',
    ],
    price: 'from $500',
    term: '1–2 weeks',
    priceText:
      'From $500 for a single workflow with error handling and alerts. AI steps, custom services and several connected systems add to the scope. The quote is fixed in the contract after a free call.',
    minPrice: 500,
    caseIds: ['sales-ai', 'leadgen'],
    faq: [
      [
        'How much does an n8n developer cost?',
        'From $500 for a single workflow with error handling and alerts. Bigger automations with AI steps and custom services are quoted after a free 30-minute call.',
      ],
      [
        'Cloud n8n or self-hosted?',
        'Either works. Self-hosting on your server keeps data and costs under your control, and I set it up with Docker and backups.',
      ],
      [
        'Can you fix or extend our existing workflows?',
        'Yes. I start by reviewing what you have, then fix the fragile parts and move heavy logic into code where it helps.',
      ],
      [
        'n8n, Make or Zapier?',
        'n8n when you want self-hosting, AI steps and custom code. If your flows are simple and already live in Zapier or Make, there may be no reason to move them.',
      ],
      ['Who owns the workflows?', 'You do: the workflows, the code and the server access are handed over after launch.'],
    ],
  },
  {
    id: 'ai-document-processing',
    parent: 'ai-agents',
    nav: 'AI document processing',
    title: 'AI document processing system',
    metaTitle: 'AI Document Processing for PDFs, Estimates and RFPs | Its Step',
    metaDescription:
      'AI that reads PDFs, estimates and tender documents, extracts the fields you need and matches items to your catalog. Built for a B2B tender system. From $1,500.',
    short: 'Reads PDFs, estimates and tenders, extracts fields and matches items to your catalog.',
    queries: [
      'ai document processing',
      'ai document processing system',
      'ai document processing pipeline',
      'ai document processing software',
      'rfp automation ai',
    ],
    lead: 'Most document work is the same every time: open the PDF, find the fields, retype them into a spreadsheet or a CRM and match line items to your own catalog. I build systems where AI does the reading and code does the checking. The largest one is a tender system for Conteria: it finds public tenders, reads the tender documentation and breaks the estimate down into items from the company catalog.',
    tasksTitle: 'What the system does with documents',
    tasks: [
      ['Reads PDFs and estimates', 'Tender documentation, estimates, specifications and forms, including long multi-page files.'],
      [
        'Extracts the fields you need',
        'Dates, amounts, quantities, parties and requirements become structured data instead of another document.',
      ],
      [
        'Matches items to your catalog',
        'Lines from an estimate are matched to your products, so the team starts from a draft instead of a blank sheet.',
      ],
      [
        'Feeds the pipeline',
        'Results go to the CRM, a proposal draft or a report. In the Conteria system it is one workspace from tender to deal.',
      ],
      ['Watches the inbox', 'Replies and attachments are picked up from the mailbox and linked to the right deal.'],
      ['Keeps a person in the loop', 'Uncertain matches are flagged for review instead of being guessed.'],
    ],
    approachTitle: 'Accuracy first',
    approach: [
      'The model reads and classifies, but it does not have the last word. Extracted values are validated by code: formats, totals and catalog matches. Anything that fails a check goes to a person.',
      'We start with a sample of your real documents and measure how many fields come out right before the system touches live work.',
      'The stack depends on volume: Python with Django or FastAPI, background jobs in Celery, PostgreSQL, and OpenAI or DeepSeek models. The Conteria system runs on Django, React and Celery.',
    ],
    price: 'from $1,500',
    term: '2–4 weeks to the first working version',
    priceText:
      'From $1,500 for one document type with field extraction and a review step. More document types, catalog matching and CRM integration add to the scope. The quote is fixed in the contract after a free call.',
    minPrice: 1500,
    caseIds: ['conteria-tenders', 'sales-ai'],
    faq: [
      [
        'How much does AI document processing cost?',
        'From $1,500 for one document type with extraction and a review step. The final quote depends on document types, volume and integrations.',
      ],
      [
        'How accurate is it?',
        'It depends on your documents, so we measure it on a sample of your real files before launch. Values are validated by code, and uncertain ones go to a person.',
      ],
      [
        'Can it handle scanned documents?',
        'Scans need text recognition first, and quality depends on the scan. We check it on your samples during the pilot.',
      ],
      [
        'Can it work with RFPs and tenders?',
        'Yes. The Conteria system finds public tenders, reads the documentation and breaks the estimate down into catalog items.',
      ],
      [
        'Where is the data stored?',
        'On your server. Documents are sent to the AI provider only for processing, and the provider is chosen with your data policy in mind.',
      ],
    ],
  },
  {
    id: 'restaurant-website-design',
    parent: 'websites',
    nav: 'Restaurant websites',
    title: 'Restaurant and catering website design',
    metaTitle: 'Restaurant and Catering Website Design with Online Orders | Its Step',
    metaDescription:
      'Fast restaurant, pizzeria and catering websites: menu, online orders and payment, event portfolio and requests straight to the owner. From $800.',
    short: 'Menu, online orders and requests that go straight to the owner.',
    queries: [
      'restaurant website design',
      'restaurant website builder with online ordering',
      'catering website design',
      'catering website',
      'restaurant website companies',
    ],
    lead: 'A restaurant website has three jobs: show the menu, take orders or bookings, and look good on a phone. I build these sites from scratch rather than from a template, so they load fast and the owner can update the menu without a developer. Two examples: a catering site with an event portfolio and a pizzeria site with a cart and online payment.',
    tasksTitle: 'What goes into the site',
    tasks: [
      ['Menu that is easy to update', 'Dishes, prices and photos are edited in a simple admin panel, without calling a developer.'],
      ['Online orders and payment', 'A cart and online payment, as on the pizzeria site that is already bringing in orders.'],
      [
        'Requests straight to the owner',
        'Catering and event requests reach the owner as soon as they are sent, as on the Nechay catering site.',
      ],
      ['Event portfolio', 'Photos of past events, so clients can see what you do before they get in touch.'],
      ['Fast on a phone', 'Compressed images and a light build, so the menu opens quickly on mobile data.'],
      [
        'SEO basics',
        'Structured data, meta tags and link previews for messengers and social networks, plus Google Search Console from day one.',
      ],
    ],
    approachTitle: 'Built for orders, not for awards',
    approach: [
      'The site is built around what guests actually do: find the menu, check prices, order or send a request. Those actions are one tap away on every page, and everything else comes second.',
      'The owner updates content without me: the Nechay site has a mini admin panel, analytics and automatic deployment, so changes go live right after saving.',
      'No website builder subscription: you own the domain, the code and the hosting.',
    ],
    price: 'from $800',
    term: 'estimate on the day you get in touch',
    priceText:
      'From $800 for a restaurant or catering site with a menu, requests and basic SEO. Online orders and payment, more languages and integrations add to the scope. The quote is fixed in the contract after a free call.',
    minPrice: 800,
    caseIds: ['nechay'],
    reviewNames: ['MarinaPizzaLove'],
    faq: [
      [
        'How much does a restaurant website cost?',
        'From $800 for a site with a menu, requests and basic SEO. Online ordering and payment add to the scope, and the quote is fixed after a free call.',
      ],
      ['Can I update the menu myself?', 'Yes. Dishes, prices and photos are edited in an admin panel without a developer.'],
      [
        'Can customers order and pay online?',
        'Yes. The pizzeria site has a cart and online payment and is already bringing in orders.',
      ],
      [
        'Why not Wix or Squarespace?',
        'A builder is fine for a simple page. A custom site makes sense when you need fast loading, your own order flow or integrations, and when you would rather not pay for a builder subscription every month.',
      ],
      ['Who will build the site?', 'I will, personally: structure, design, code and launch.'],
    ],
  },
].map((page) => ({ ...page, path: `/en/${page.id}/` }))
