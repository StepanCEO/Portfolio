import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import imageSizes from './image-sizes.json'
import { SiteContext, alternatePath, normalize, resolvePage, useSite } from './i18n.js'
import { legal } from './legal.js'
import {
  clearCaseVisual,
  markCaseVisual,
  useCountUp,
  useHeaderOnScroll,
  useImageFade,
} from './motion.js'

// Демо AI-менеджера грузится отдельным файлом — только когда его открыли
const loadDemo = () => import('./AmoDemo.jsx')
const AmoDemo = lazy(loadDemo)

const pad = (n) => String(n).padStart(2, '0')

// Цели Яндекс Метрики: клики в Telegram и отправка форм — видно, что приводит заявки
const METRIKA_ID = 113863773
const goal = (name) => {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') window.ym(METRIKA_ID, 'reachGoal', name)
}

// Картинка в WebP с вариантами под ширину экрана (см. scripts/images.mjs).
// Для лайтбокса берём самый крупный вариант.
const fullSize = (src) => imageSizes[src]?.variants.at(-1)[1] ?? src

function Img({ src, alt, sizes = '100vw', eager = false, className, style }) {
  const meta = imageSizes[src]
  if (!meta) return <img className={className} style={style} src={src} alt={alt} loading={eager ? undefined : 'lazy'} />
  return (
    <img
      className={className}
      style={style}
      src={meta.variants.at(-1)[1]}
      srcSet={meta.variants.map(([w, url]) => `${url} ${w}w`).join(', ')}
      sizes={sizes}
      width={meta.width}
      height={meta.height}
      alt={alt}
      loading={eager ? undefined : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
    />
  )
}

function ArrowIcon({ back = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" style={back ? { transform: 'scaleX(-1)' } : undefined}>
      <path
        d="M5 12h13m-5-5 5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 16 16 8m-7 0h7v7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
    </svg>
  )
}

// подсветка пункта меню: активен последний раздел, чей верх ушёл под шапку
function useActiveSection(items) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    if (!sections.length) return undefined
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.scrollY + 140
      let current = ''
      sections.forEach((section) => {
        if (section.offsetTop <= line) current = section.id
      })
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    // первый расчёт — в следующем кадре, а не сразу: чтение offsetTop сразу после
    // оживления страницы заставляло браузер заново раскладывать её целиком
    frame = requestAnimationFrame(update)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [items])

  return activeId
}

function SectionHead({ index, title, children }) {
  return (
    <header className="section-head">
      {index && <span className="section-index">{index}</span>}
      <h2>{title}</h2>
      {children && <p className="section-lead">{children}</p>}
    </header>
  )
}

function Chips({ items }) {
  if (!items?.length) return null
  return (
    <ul className="chips">
      {items.map((name) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  )
}

function TelegramLink({ className, children }) {
  const { telegramUrl } = useSite()
  return (
    <a className={className} href={telegramUrl} onClick={() => goal('telegram')}>
      {children}
    </a>
  )
}

function DemoButton({ onOpen, className = 'pill pill-line' }) {
  const { ui } = useSite()
  return (
    <button
      type="button"
      className={className}
      onPointerEnter={loadDemo}
      onFocus={loadDemo}
      onClick={() => {
        goal('demo')
        onOpen()
      }}
    >
      {ui.tryDemo}
    </button>
  )
}

// Форма заявки. Работает и без JavaScript: обычная отправка формы, сервер вернёт
// на эту же страницу с ?lead=ok. С JavaScript — отправка без перезагрузки.
function LeadForm({ type = 'client', page }) {
  const { ui, lang, prefix, telegramUrl, telegramHandle } = useSite()
  const f = ui.form
  const partner = type === 'partner'
  const [status, setStatus] = useState('idle')

  // результат отправки без JavaScript приходит в адресе страницы
  useEffect(() => {
    const result = new URLSearchParams(window.location.search).get('lead')
    if (result === 'ok') setStatus('sent')
    if (result === 'error') setStatus('error')
  }, [])

  async function onSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setStatus('sending')
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, consent: data.consent === 'on' }),
      })
      if (response.ok) {
        setStatus('sent')
        form.reset()
        goal(partner ? 'partner_form' : 'lead_form')
      } else {
        setStatus(response.status === 429 ? 'limit' : 'error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="lead-form" id="lead-form" action="/api/lead" method="post" onSubmit={onSubmit}>
      <h3>{partner ? f.partnerTitle : f.title}</h3>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="page" value={page} />
      {/* ловушка для ботов: люди это поле не видят и не заполняют */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="field">
        <span>{f.name}</span>
        <input name="name" autoComplete="name" maxLength={120} />
      </label>
      <label className="field">
        <span>{f.contact} *</span>
        <input name="contact" required minLength={3} maxLength={200} />
      </label>
      <label className="field">
        <span>{partner ? f.partnerCompany : f.company}</span>
        <input name="company" autoComplete="organization" maxLength={200} />
      </label>
      <label className="field">
        <span>{partner ? f.partnerMessage : f.message}</span>
        <textarea name="message" rows={4} maxLength={3000} />
      </label>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {f.consentStart}
          <a href={`${prefix}/consent/`} target="_blank" rel="noreferrer">
            {f.consentLink}
          </a>
          {f.consentMid}
          <a href={`${prefix}/privacy/`} target="_blank" rel="noreferrer">
            {f.policyLink}
          </a>
        </span>
      </label>
      <button className="pill pill-accent" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? f.sending : partner ? f.partnerSubmit : f.submit}
      </button>
      <p className={`form-status form-${status}`} role="status" aria-live="polite">
        {status === 'sent' && f.sent}
        {(status === 'error' || status === 'limit') && (
          <>
            {status === 'limit' ? f.tooMany : f.error}: <a href={telegramUrl}>{telegramHandle}</a>
          </>
        )}
      </p>
    </form>
  )
}

function Cta({ page, formType = 'client', title, text }) {
  const { ui, telegramHandle } = useSite()
  return (
    <section className="cta dark" id="contact">
      <div className="cta-inner cta-grid">
        <div className="cta-copy">
          <p className="eyebrow eyebrow-light">{ui.ctaEyebrow}</p>
          <h2>{title || ui.ctaTitle}</h2>
          <p>{text || ui.ctaText}</p>
          <div className="cta-actions">
            <TelegramLink className="pill pill-accent">
              {ui.ctaTelegram}
              <ArrowIcon />
            </TelegramLink>
            <span className="cta-handle">
              {telegramHandle} · {ui.ctaHandleNote}
            </span>
          </div>
          <p className="cta-form-note">{ui.ctaFormNote}</p>
        </div>
        <LeadForm type={formType} page={page} />
      </div>
      <div className="wordmark" aria-hidden="true">
        Its Step
      </div>
    </section>
  )
}

// Колода кейсов: карточки на всю ширину, при прокрутке ложатся одна на другую
function CaseDeck({ setDemoOpen }) {
  const { ui, allCases, casesChannelUrl } = useSite()
  return (
    <section className="section dark deck-section" id="cases">
      <div className="deck-head">
        <SectionHead index="02" title={<>{ui.casesTitle}<span className="dot">.</span></>}>
          {ui.casesLead}
        </SectionHead>
        <a className="deck-all" href={casesChannelUrl} target="_blank" rel="noreferrer">
          {ui.allWorks}
          <ExternalIcon />
        </a>
      </div>

      <ol className="deck" style={{ '--n': allCases.length }}>
        {allCases.map((item, index) => (
          <li
            key={item.id}
            className={`deck-card deck-${item.tone}`}
            style={{ '--i': index, background: item.bg }}
            onClick={markCaseVisual}
          >
            <div className="deck-top">
              <span>
                {pad(index + 1)} / {pad(allCases.length)}
              </span>
              <span className="deck-pill">{item.category}</span>
            </div>

            <div className="deck-body">
              <div className="deck-copy">
                <Chips items={item.stackList} />
                <h3>
                  <a href={item.path}>{item.title}</a>
                </h3>
                <p>{item.summary}</p>
                <div className="deck-metric">
                  <strong>{item.metric}</strong>
                  <span>{item.metricNote}</span>
                </div>
                <div className="deck-actions">
                  <a className="pill pill-accent" href={item.path}>
                    {ui.seeCase}
                    <ArrowIcon />
                  </a>
                  {item.demo && <DemoButton onOpen={() => setDemoOpen(true)} className="pill pill-tone" />}
                </div>
              </div>

              <a className="deck-visual" href={item.path} tabIndex={-1}>
                <Img src={item.image} alt={item.title} sizes="(max-width: 1080px) 100vw, 680px" />
              </a>
            </div>

            <a className="deck-arrow" href={item.path} aria-label={`${ui.openCase}: ${item.title}`}>
              <ArrowIcon />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ServiceRow({ page }) {
  return (
    <a className="service-row" href={page.path}>
      <span className="service-row-title">{page.nav}</span>
      <span className="service-row-text">{page.short}</span>
      <span className="service-row-price">{page.price}</span>
      <ArrowIcon />
    </a>
  )
}

function ServicesSection() {
  const { ui, servicePages, lang } = useSite()
  return (
    <section className="section" id="services">
      <SectionHead index="01" title={<>{ui.servicesTitle}<span className="dot dot-light">.</span></>}>
        {ui.servicesLead}
      </SectionHead>
      <div className="services-list">
        {servicePages.map((page) => (
          <ServiceRow key={page.id} page={page} />
        ))}
      </div>
      {lang === 'ru' && (
        <p className="services-geo">
          Работаю удалённо с компаниями из России, <a href="/kazahstan/">Казахстана</a> и{' '}
          <a href="/belarus/">Беларуси</a>.
        </p>
      )}
    </section>
  )
}

function Steps() {
  const { steps } = useSite()
  return (
    <ol className="steps">
      {steps.map(([title, body], i) => (
        <li key={title}>
          <span>{pad(i + 1)}</span>
          <strong>{title}</strong>
          <p>{body}</p>
        </li>
      ))}
    </ol>
  )
}

function ServicePage({ page, path }) {
  const { ui, prefix, allCases, reviews, servicePages, nichePages, included } = useSite()
  const t = ui.servicePage
  const related = page.caseIds.map((id) => allCases.find((item) => item.id === id)).filter(Boolean)
  const pageReviews = page.reviewNames ? reviews.filter((review) => page.reviewNames.includes(review.name)) : []
  const others = servicePages.filter((other) => other.id !== page.id)
  // нишевая страница знает свою услугу; у услуги — список её нишевых страниц
  const parent = page.parent ? servicePages.find((item) => item.id === page.parent) : null
  const solutions = parent
    ? nichePages.filter((item) => item.parent === page.parent && item.id !== page.id)
    : nichePages.filter((item) => item.parent === page.id)

  return (
    <>
      <section className="hero service-hero">
        <nav className="eyebrow crumbs-light" aria-label={t.crumbs}>
          <a href={`${prefix}/`}>Its Step</a> / <a href={`${prefix}/#services`}>{t.services}</a> /{' '}
          {parent && (
            <>
              <a href={parent.path}>{parent.nav}</a> /{' '}
            </>
          )}
          <span>{page.nav}</span>
        </nav>
        <h1>{page.title}</h1>
        <div className="hero-row">
          <p className="hero-lead">{page.lead}</p>
          <div className="hero-actions">
            <TelegramLink className="pill pill-accent">
              {ui.cta}
              <ArrowIcon />
            </TelegramLink>
            <a className="pill pill-line" href="#service-cases">
              {t.relatedCases}
            </a>
          </div>
        </div>
        <dl className="service-facts">
          <div>
            <dt>{t.price}</dt>
            <dd>{page.price}</dd>
          </div>
          <div>
            <dt>{t.term}</dt>
            <dd>{page.term}</dd>
          </div>
          <div>
            <dt>{t.format}</dt>
            <dd>{t.formatValue}</dd>
          </div>
        </dl>
      </section>

      <section className="section">
        <SectionHead index="01" title={page.tasksTitle} />
        <div className="task-grid">
          {page.tasks.map(([title, body]) => (
            <article className="task-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <div className="approach">
          <SectionHead index="02" title={page.approachTitle} />
          <div className="approach-text">
            {page.approach.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark" id="service-cases">
        <SectionHead index="03" title={<>{t.relatedCases}<span className="dot">.</span></>} />
        <div className="mini-cases">
          {related.map((item) => (
            <a
              className={`mini-case deck-${item.tone}`}
              style={{ background: item.bg }}
              href={item.path}
              key={item.id}
              onClick={markCaseVisual}
            >
              <Img src={item.image} alt={item.title} sizes="(max-width: 760px) 100vw, 600px" />
              <span className="mini-case-cat">{item.category}</span>
              <strong>{item.title}</strong>
              <span className="mini-case-metric">
                {item.metric} — {item.metricNote}
              </span>
            </a>
          ))}
        </div>
        {pageReviews.length > 0 && (
          <div className="mini-reviews">
            {pageReviews.map((review) => (
              <figure key={review.name}>
                <blockquote>«{review.text}»</blockquote>
                <figcaption>
                  {review.name} · {review.project} · {ui.casePage.kworkReview}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHead index="04" title={t.priceTitle} />
        <div className="price-block">
          <div className="price-card">
            <strong>{page.price}</strong>
            <span>{page.term}</span>
            <p>{page.priceText}</p>
            <TelegramLink className="pill pill-accent">
              {t.getQuote}
              <ArrowIcon />
            </TelegramLink>
          </div>
          <ul className="included">
            {included.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <Steps />
      </section>

      <section className="section section-tint">
        <SectionHead index="05" title={t.faq} />
        <div className="faq">
          {page.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {solutions.length > 0 && (
        <section className="section">
          <SectionHead title={parent ? t.similarSolutions : t.popularTasks} />
          <div className="services-list">
            {solutions.map((item) => (
              <ServiceRow key={item.id} page={item} />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <SectionHead title={t.otherServices} />
        <div className="services-list">
          {others.map((other) => (
            <ServiceRow key={other.id} page={other} />
          ))}
        </div>
      </section>

      <Cta page={path} />
    </>
  )
}

function CasePage({ item, path, setLightbox, setDemoOpen }) {
  const { ui, prefix, allCases, reviews } = useSite()
  const t = ui.casePage
  const index = allCases.indexOf(item)
  const next = allCases[(index + 1) % allCases.length]
  const caseReviews = reviews.filter((review) => review.caseId === item.id)

  return (
    <>
      <article className="case-page">
        <a className="back-link" href={`${prefix}/#cases`}>
          <ArrowIcon back />
          {t.allCases}
        </a>

        <p className="crumbs">
          {item.category} / Its Step · {t.caseWord} {pad(index + 1)}
        </p>
        <div className="case-page-head">
          <div>
            <h1>{item.title}</h1>
            <p className="case-page-lead">{item.summary}</p>
          </div>
          <Chips items={item.stackList} />
        </div>

        <figure className="case-page-visual" style={{ background: item.bg }}>
          <Img
            src={item.image}
            alt={item.title}
            sizes="(max-width: 1280px) 100vw, 1200px"
            eager
            style={{ viewTransitionName: 'case-visual' }}
          />
          <button
            type="button"
            className="pill pill-glass"
            onClick={() => setLightbox({ src: fullSize(item.image), alt: item.title })}
          >
            {t.zoom}
            <PlusIcon />
          </button>
        </figure>

        <div className="case-page-facts">
          {item.points ? (
            item.points.map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))
          ) : (
            <div>
              <strong>{item.metric}</strong>
              <span>{item.metricNote}</span>
            </div>
          )}
        </div>

        {item.details && (
          <section className="case-story" aria-label={t.storyLabel}>
            <div className="story-row">
              <h2>{t.task}</h2>
              <p>{item.details.task}</p>
            </div>
            <div className="story-row">
              <h2>{t.done}</h2>
              <ul>
                {item.details.done.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            {item.details.changes && (
              <div className="story-row">
                <h2>{t.changes}</h2>
                <ul>
                  {item.details.changes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="story-row">
              <h2>{t.results}</h2>
              <div className="story-results">
                {item.details.results.map(([value, label]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {item.extraImage && (
          <figure className="case-page-extra">
            <button
              type="button"
              onClick={() => setLightbox({ src: fullSize(item.extraImage), alt: item.extraCaption })}
              aria-label={`${ui.openShot}: ${item.extraCaption}`}
            >
              <Img src={item.extraImage} alt={item.extraCaption} sizes="(max-width: 1280px) 100vw, 1280px" />
            </button>
            <figcaption>{item.extraCaption}</figcaption>
          </figure>
        )}

        {caseReviews.map((review) => (
          <figure className="case-page-review" key={review.name}>
            <blockquote>«{review.text}»</blockquote>
            <figcaption>
              {review.name} · {t.kworkReview}
            </figcaption>
          </figure>
        ))}

        <div className="case-page-actions">
          <TelegramLink className="pill pill-accent">
            {t.discussSimilar}
            <ArrowIcon />
          </TelegramLink>
          {item.demo && <DemoButton onOpen={() => setDemoOpen(true)} className="pill pill-tone" />}
          {item.link && (
            <a className="case-page-ext" href={item.link} target="_blank" rel="noreferrer">
              {item.linkLabel}
              <ExternalIcon />
            </a>
          )}
        </div>

        <a className="next-case" href={next.path}>
          <span>{t.nextCase}</span>
          <strong>{next.title}</strong>
          <ArrowIcon />
        </a>
      </article>

      <Cta page={path} />
    </>
  )
}

function PartnersPage({ path }) {
  const { ui } = useSite()
  const t = ui.partners
  return (
    <>
      <section className="hero service-hero">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <div className="hero-row">
          <p className="hero-lead">{t.lead}</p>
          <div className="hero-actions">
            <a className="pill pill-accent" href="#lead-form">
              {ui.form.partnerTitle}
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead index="01" title={t.whoTitle} />
        <div className="task-grid task-grid-4">
          {t.who.map(([title, body]) => (
            <article className="task-card" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tint">
        <SectionHead index="02" title={t.howTitle} />
        <ol className="steps steps-3">
          {t.how.map(([title, body], i) => (
            <li key={title}>
              <span>{pad(i + 1)}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <div className="price-block">
          <div className="price-card">
            <strong>10%</strong>
            <span>{t.termsTitle}</span>
            <p>{t.portfolioText}</p>
          </div>
          <ul className="included">
            {t.terms.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>

      <Cta page={path} formType="partner" title={t.ctaTitle} text={t.ctaText} />
    </>
  )
}

function LegalPage({ doc }) {
  const { lang } = useSite()
  const t = legal[lang][doc]
  return (
    <article className="legal-page">
      <header className="legal-head">
        <h1>{t.title}</h1>
        <p>{t.updated}</p>
      </header>
      {t.sections.map(([heading, blocks]) => (
        <section className="legal-section" key={heading}>
          <h2>{heading}</h2>
          <div className="legal-body">
            {blocks.map((block) =>
              typeof block === 'string' ? (
                <p key={block.slice(0, 40)}>{block}</p>
              ) : (
                <ul key={block.list[0].slice(0, 40)}>
                  {block.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              ),
            )}
          </div>
        </section>
      ))}
    </article>
  )
}

// Плашка о cookie. Яндекс Метрика включается только после «Принять»
// (загрузчик в app.html читает выбор из localStorage). Выбор можно поменять
// в подвале — «Настройки cookie».
const COOKIE_KEY = 'cookie-consent'

function readCookieChoice() {
  try {
    return window.localStorage.getItem(COOKIE_KEY)
  } catch {
    return 'unavailable'
  }
}

function CookieBanner() {
  const { ui, prefix } = useSite()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!readCookieChoice()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener('cookie-settings', reopen)
    return () => window.removeEventListener('cookie-settings', reopen)
  }, [])

  const choose = (value) => {
    try {
      window.localStorage.setItem(COOKIE_KEY, value)
    } catch {
      // хранилище недоступно — выбор действует до закрытия вкладки
    }
    if (value === 'yes' && typeof window.itsLoadMetrika === 'function') window.itsLoadMetrika()
    setOpen(false)
  }

  if (!open) return null
  return (
    <div className="cookie-banner" role="region" aria-label={ui.cookie.settings}>
      <p>
        {ui.cookie.text} <a href={`${prefix}/privacy/`}>{ui.cookie.more}</a>
      </p>
      <div className="cookie-actions">
        <button type="button" className="pill pill-accent pill-small" onClick={() => choose('yes')}>
          {ui.cookie.accept}
        </button>
        <button type="button" className="pill pill-tone pill-small" onClick={() => choose('no')}>
          {ui.cookie.decline}
        </button>
      </div>
    </div>
  )
}

function NotFound() {
  const { ui, allCases } = useSite()
  const t = ui.notFound
  return (
    <section className="case-page not-found">
      <p className="crumbs">{t.label}</p>
      <h1>{t.title}</h1>
      <p className="case-page-lead">{t.text}</p>
      <div className="case-page-actions">
        <a className="pill pill-accent" href="/">
          {t.home}
          <ArrowIcon />
        </a>
        <a className="pill pill-tone" href="/#cases">
          {ui.seeCases}
        </a>
      </div>
      <ul className="not-found-list">
        {allCases.map((item) => (
          <li key={item.id}>
            <a href={item.path}>
              <span>{item.category}</span>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Header({ activeId, dark, path, partnersActive }) {
  const { ui, prefix, navItems, lang } = useSite()
  const ref = useRef(null)
  useHeaderOnScroll(ref)
  const other = alternatePath(path)
  return (
    <header ref={ref} className={`header${dark ? ' header-dark' : ''}`}>
      <a className="brand" href={`${prefix}/`}>
        Its Step
      </a>
      <nav className="nav" aria-label={ui.nav}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`${prefix}/#${item.id}`}
            className={activeId === item.id ? 'is-active' : undefined}
          >
            {item.label}
          </a>
        ))}
        <a href={`${prefix}/partners/`} className={partnersActive ? 'is-active' : undefined}>
          {ui.partnersLink}
        </a>
      </nav>
      <div className="header-actions">
        {other && (
          <a
            className="lang-switch"
            href={other}
            hrefLang={lang === 'ru' ? 'en' : 'ru'}
            aria-label={ui.langSwitchLabel}
          >
            {ui.langSwitch}
          </a>
        )}
        <TelegramLink className={`pill ${dark ? 'pill-accent' : 'pill-dark'} pill-header`}>
          {ui.cta}
        </TelegramLink>
      </div>
    </header>
  )
}

// Подвал: сверху крупные ссылки на соцсети и площадки, снизу — документы
function Footer() {
  const { ui, prefix, telegramUrl, tiktokUrl, kworkUrl, githubUrl } = useSite()
  const social = [
    ['Telegram', telegramUrl, false],
    ['TikTok', tiktokUrl, true],
    ['Kwork', kworkUrl, true],
    ['GitHub', githubUrl, true],
  ]
  return (
    <footer className="footer">
      <nav className="footer-social" aria-label={ui.footerSocial}>
        {social.map(([name, url, external]) => (
          <a key={name} href={url} {...(external && { target: '_blank', rel: 'noreferrer' })}>
            {name}
            <ExternalIcon />
          </a>
        ))}
      </nav>
      <div className="footer-bottom">
        <span>© 2026 Its Step</span>
        <nav className="footer-legal" aria-label={ui.footerLegal}>
          <a href={`${prefix}/privacy/`}>{ui.privacyLink}</a>
          <a href={`${prefix}/consent/`}>{ui.consentLink}</a>
          <button type="button" onClick={() => window.dispatchEvent(new Event('cookie-settings'))}>
            {ui.cookie.settings}
          </button>
        </nav>
      </div>
    </footer>
  )
}

function Home({ path, setLightbox, setDemoOpen }) {
  const site = useSite()
  const {
    ui,
    featured,
    heroImage,
    heroStats,
    clients,
    kwork,
    kworkUrl,
    reviews,
    reviewShots,
    casesChannelUrl,
    media,
    avatar,
    stack,
    githubUrl,
    tiktokUrl,
    channelUrl,
    services,
  } = site

  return (
    <>
      {/* ---------- первый экран ---------- */}
      <section className="hero" id="top">
        <h1 className="hero-title">
          {ui.heroWords.map(([word, accent], index) => (
            <Fragment key={word}>
              <span className={`w${accent ? ' hero-accent' : ''}`}>
                <span className="w-in" style={{ '--w': index }}>
                  {word}
                </span>
              </span>
              {index < ui.heroWords.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>

        <div className="hero-row">
          <p className="hero-lead">{ui.heroLead}</p>
          <div className="hero-actions">
            <TelegramLink className="pill pill-accent">
              {ui.cta}
              <ArrowIcon />
            </TelegramLink>
            <a className="pill pill-line" href="#cases">
              {ui.seeCases}
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <button
            type="button"
            className="hero-shot"
            onClick={() => setLightbox({ src: fullSize(heroImage), alt: featured.title })}
            aria-label={`${ui.openShot}: ${featured.title}`}
          >
            <Img src={heroImage} alt={featured.title} sizes="(max-width: 1280px) 100vw, 1280px" eager />
          </button>
          <figcaption>
            <span>{ui.heroCaptionTitle}</span>
            {ui.heroCaption}
          </figcaption>
        </figure>
      </section>

      <div className="marquee" aria-label={ui.clientsLabel}>
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <ul key={group} aria-hidden={group === 1 || undefined}>
              {clients.map((name) => (
                <li key={`${group}-${name}`}>{name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ---------- цифры ---------- */}
      <section className="stats dark" aria-label={ui.statsLabel}>
        {heroStats.map((item) => (
          <div key={item.label} className="stat">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <ServicesSection />

      <CaseDeck setDemoOpen={setDemoOpen} />

      {/* ---------- отзывы ---------- */}
      <section className="section section-tint" id="reviews">
        <div className="section-head-row">
          <SectionHead index="03" title={ui.reviewsTitle}>
            {ui.reviewsLead}
          </SectionHead>
          <a className="kwork-card" href={kworkUrl} target="_blank" rel="noreferrer">
            <span>{ui.kworkProfile}</span>
            <strong>{ui.reviewsCount(kwork.reviews)}</strong>
            <em>{ui.kworkStats(kwork.orders, kwork.intime)}</em>
            <ExternalIcon />
          </a>
        </div>

        <div className="reviews">
          {reviews.map((review) => (
            <figure className={`review${review.accent ? ' review-accent' : ''}`} key={review.name}>
              <blockquote>{review.text}</blockquote>
              <figcaption>
                <span className="review-avatar" aria-hidden="true">
                  {review.name[0].toUpperCase()}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  {review.project}
                  {review.translated && ui.translatedNote && <small>{ui.translatedNote}</small>}
                </span>
                {review.repeat && <em>{ui.repeatOrder}</em>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="review-shots">
          <span className="review-shots-label">{ui.originals}</span>
          <div>
            {reviewShots.map((shot) => (
              <button
                type="button"
                key={shot.src}
                onClick={() => setLightbox({ src: fullSize(shot.src), alt: shot.alt })}
                aria-label={`${ui.openShot}: ${shot.alt}`}
              >
                <Img src={shot.src} alt={shot.alt} sizes="(max-width: 760px) 100vw, 640px" />
              </button>
            ))}
          </div>
          <a href={casesChannelUrl} target="_blank" rel="noreferrer">
            {ui.newReviews}
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* ---------- медиа ---------- */}
      <section className="section dark" id="media">
        <SectionHead
          index="04"
          title={
            <>
              {ui.mediaTitleStart}
              <span className="nowrap">{ui.mediaTitleEnd}</span>
            </>
          }
        >
          {ui.mediaLead}
        </SectionHead>

        <div className="media">
          {media.map((item) => (
            <a
              key={item.id}
              className={`media-card media-${item.id}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="media-top">
                <span className="media-name">{item.name}</span>
                <ExternalIcon />
              </div>
              <span className="media-handle">{item.handle}</span>
              <p>{item.body}</p>
              {item.stats ? (
                <ul className="media-stats">
                  {item.stats.map(([value, label]) => (
                    <li key={label}>
                      <strong>{value}</strong>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="media-open">{ui.mediaOpen}</span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* ---------- обо мне ---------- */}
      <section className="section about" id="about">
        <img className="about-avatar" src={avatar} alt={ui.aboutAlt} width="160" height="160" />
        <div className="about-text">
          <SectionHead index="05" title={ui.aboutTitle} />
          {ui.aboutText.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
          <div className="about-stack">
            <span>{ui.worksWith}</span>
            <Chips items={stack} />
          </div>
          <div className="about-links">
            <a href={githubUrl} target="_blank" rel="noreferrer">
              GitHub <ExternalIcon />
            </a>
            <a href={kworkUrl} target="_blank" rel="noreferrer">
              Kwork <ExternalIcon />
            </a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer">
              TikTok <ExternalIcon />
            </a>
            <a href={channelUrl} target="_blank" rel="noreferrer">
              {ui.telegramChannel} <ExternalIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- цены и процесс ---------- */}
      <section className="section section-tint" id="pricing">
        <SectionHead index="06" title={ui.pricingTitle}>
          {ui.pricingLead}
        </SectionHead>
        <div className="services">
          {services.map((service) => (
            <article className={`service${service.accent ? ' service-accent' : ''}`} key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <div className="service-terms">
                <strong>{service.price}</strong>
                <span>{service.term}</span>
              </div>
            </article>
          ))}
        </div>

        <Steps />
      </section>

      <Cta page={path} />
    </>
  )
}

function App({ path = '/' }) {
  const page = normalize(path)
  const { site, kind, caseItem, service } = resolvePage(page)
  const [lightbox, setLightbox] = useState(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const activeId = useActiveSection(site.navItems)
  const dark = kind === 'case' || kind === 'notFound'

  useCountUp('.stat strong', page)
  useImageFade(page)

  // страница из кэша «назад/вперёд»: снимаем имя перехода с картинки, по которой кликнули
  useEffect(() => {
    window.addEventListener('pageshow', clearCaseVisual)
    return () => window.removeEventListener('pageshow', clearCaseVisual)
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event) => {
      if (event.key === 'Escape') setLightbox(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightbox])

  return (
    <SiteContext.Provider value={site}>
      <div className={`site${dark ? ' site-dark' : ''}`}>
        <Header
          activeId={kind === 'home' ? activeId : ''}
          dark={dark}
          path={page}
          partnersActive={kind === 'partners'}
        />

        <main>
          {kind === 'home' && <Home path={page} setLightbox={setLightbox} setDemoOpen={setDemoOpen} />}
          {kind === 'service' && <ServicePage page={service} path={page} />}
          {kind === 'case' && (
            <CasePage item={caseItem} path={page} setLightbox={setLightbox} setDemoOpen={setDemoOpen} />
          )}
          {kind === 'partners' && <PartnersPage path={page} />}
          {kind === 'privacy' && <LegalPage doc="privacy" />}
          {kind === 'consent' && <LegalPage doc="consent" />}
          {kind === 'notFound' && <NotFound />}
        </main>

        <Footer />
        <CookieBanner />

        {demoOpen && (
          <Suspense fallback={null}>
            <AmoDemo onClose={() => setDemoOpen(false)} />
          </Suspense>
        )}

        {lightbox && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={lightbox.alt}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label={site.ui.close}
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <img src={lightbox.src} alt={lightbox.alt} onClick={(event) => event.stopPropagation()} />
          </div>
        )}
      </div>
    </SiteContext.Provider>
  )
}

export default App
