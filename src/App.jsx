import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react'
import './App.css'
import imageSizes from './image-sizes.json'
import { included, servicePages } from './services.js'
import {
  clearCaseVisual,
  markCaseVisual,
  useCountUp,
  useHeaderOnScroll,
  useImageFade,
  useReveal,
} from './motion.js'
import {
  allCases,
  avatar,
  casesChannelUrl,
  channelUrl,
  featured,
  githubUrl,
  heroImage,
  heroStats,
  clients,
  kwork,
  kworkUrl,
  media,
  navItems,
  reviewShots,
  reviews,
  services,
  stack,
  steps,
  telegramHandle,
  telegramUrl,
  tiktokUrl,
} from './content.js'

// Демо AI-менеджера грузится отдельным файлом — только когда его открыли
const loadDemo = () => import('./AmoDemo.jsx')
const AmoDemo = lazy(loadDemo)

const pad = (n) => String(n).padStart(2, '0')

// Заголовок первого экрана по словам: так строки выезжают из-под маски при загрузке
const heroWords = [
  ['Делаю'],
  ['AI-системы,'],
  ['CRM'],
  ['и'],
  ['сайты'],
  ['для', true],
  ['бизнеса', true],
]

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

const normalize = (path) => (path.endsWith('/') ? path : `${path}/`)

// Страница по адресу: /cases/<id>/ — кейс, /<услуга>/ — услуга, всё остальное — главная
function findCase(path) {
  return allCases.find((item) => item.path === normalize(path)) || null
}

function findService(path) {
  return servicePages.find((page) => page.path === normalize(path)) || null
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
function useActiveSection() {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean)
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
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

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

function DemoButton({ onOpen, className = 'pill pill-line' }) {
  return (
    <button
      type="button"
      className={className}
      onPointerEnter={loadDemo}
      onFocus={loadDemo}
      onClick={onOpen}
    >
      Попробовать менеджера
    </button>
  )
}

// Колода кейсов: карточки на всю ширину, при прокрутке ложатся одна на другую
function CaseDeck({ setDemoOpen }) {
  return (
    <section className="section dark deck-section" id="cases">
      <div className="deck-head">
        <SectionHead index="02" title={<>Лучшие кейсы<span className="dot">.</span></>}>
          AI-системы, CRM и сайты для реального бизнеса — с цифрами и стеком. Подробности —
          на странице каждого кейса.
        </SectionHead>
        <a className="deck-all" href={casesChannelUrl} target="_blank" rel="noreferrer">
          Все работы в @itssteps
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
                    Смотреть кейс
                    <ArrowIcon />
                  </a>
                  {item.demo && (
                    <DemoButton onOpen={() => setDemoOpen(true)} className="pill pill-tone" />
                  )}
                </div>
              </div>

              <a className="deck-visual" href={item.path} tabIndex={-1}>
                <Img src={item.image} alt={item.title} sizes="(max-width: 1080px) 100vw, 680px" />
              </a>
            </div>

            <a className="deck-arrow" href={item.path} aria-label={`Открыть кейс: ${item.title}`}>
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
  return (
    <section className="section" id="services">
      <SectionHead index="01" title={<>Услуги<span className="dot dot-light">.</span></>}>
        Что делаю, сколько это стоит и как проходит работа — подробно на странице каждой услуги.
      </SectionHead>
      <div className="services-list">
        {servicePages.map((page) => (
          <ServiceRow key={page.id} page={page} />
        ))}
      </div>
    </section>
  )
}

function ServicePage({ page }) {
  const related = page.caseIds.map((id) => allCases.find((item) => item.id === id)).filter(Boolean)
  const pageReviews = page.reviewNames ? reviews.filter((review) => page.reviewNames.includes(review.name)) : []
  const others = servicePages.filter((other) => other.id !== page.id)

  return (
    <>
      <section className="hero service-hero">
        <nav className="eyebrow crumbs-light" aria-label="Хлебные крошки">
          <a href="/">Its Step</a> / <a href="/#services">Услуги</a> / <span>{page.nav}</span>
        </nav>
        <h1>{page.title}</h1>
        <div className="hero-row">
          <p className="hero-lead">{page.lead}</p>
          <div className="hero-actions">
            <a className="pill pill-accent" href={telegramUrl}>
              Обсудить проект
              <ArrowIcon />
            </a>
            <a className="pill pill-line" href="#service-cases">
              Кейсы по теме
            </a>
          </div>
        </div>
        <dl className="service-facts">
          <div>
            <dt>Стоимость</dt>
            <dd>{page.price}</dd>
          </div>
          <div>
            <dt>Сроки</dt>
            <dd>{page.term}</dd>
          </div>
          <div>
            <dt>Формат</dt>
            <dd>по договору, оплата по этапам</dd>
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
        <SectionHead index="03" title={<>Кейсы по теме<span className="dot">.</span></>} />
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
                  {review.name} · {review.project} · отзыв на Kwork
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <SectionHead index="04" title="Сроки и цена" />
        <div className="price-block">
          <div className="price-card">
            <strong>{page.price}</strong>
            <span>{page.term}</span>
            <p>{page.priceText}</p>
            <a className="pill pill-accent" href={telegramUrl}>
              Получить оценку
              <ArrowIcon />
            </a>
          </div>
          <ul className="included">
            {included.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <ol className="steps">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-tint">
        <SectionHead index="05" title="Частые вопросы" />
        <div className="faq">
          {page.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead title="Другие услуги" />
        <div className="services-list">
          {others.map((other) => (
            <ServiceRow key={other.id} page={other} />
          ))}
        </div>
      </section>

      <Cta />
    </>
  )
}

function CasePage({ item, setLightbox, setDemoOpen }) {
  const index = allCases.indexOf(item)
  const next = allCases[(index + 1) % allCases.length]
  const caseReviews = reviews.filter((review) => review.caseId === item.id)

  return (
    <article className="case-page">
      <a className="back-link" href="/#cases">
        <ArrowIcon back />
        Все кейсы
      </a>

      <p className="crumbs">
        {item.category} / Its Step · кейс {pad(index + 1)}
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
          Рассмотреть
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
        <section className="case-story" aria-label="Как делали проект">
          <div className="story-row">
            <h2>Задача</h2>
            <p>{item.details.task}</p>
          </div>
          <div className="story-row">
            <h2>Что сделал</h2>
            <ul>
              {item.details.done.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          {item.details.changes && (
            <div className="story-row">
              <h2>Что изменилось для клиента</h2>
              <ul>
                {item.details.changes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="story-row">
            <h2>Результат в цифрах</h2>
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
            aria-label={`Открыть скриншот: ${item.extraCaption}`}
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
            {review.name} · отзыв на Kwork
          </figcaption>
        </figure>
      ))}

      <div className="case-page-actions">
        <a className="pill pill-accent" href={telegramUrl}>
          Обсудить похожий проект
          <ArrowIcon />
        </a>
        {item.demo && <DemoButton onOpen={() => setDemoOpen(true)} className="pill pill-tone" />}
        {item.link && (
          <a className="case-page-ext" href={item.link} target="_blank" rel="noreferrer">
            {item.linkLabel}
            <ExternalIcon />
          </a>
        )}
      </div>

      <a className="next-case" href={next.path}>
        <span>Следующий кейс</span>
        <strong>{next.title}</strong>
        <ArrowIcon />
      </a>
    </article>
  )
}

function NotFound() {
  return (
    <section className="case-page not-found">
      <p className="crumbs">Ошибка 404</p>
      <h1>Такой страницы нет</h1>
      <p className="case-page-lead">
        Возможно, ссылка устарела. Всё главное — на главной, а работы — в разделе кейсов.
      </p>
      <div className="case-page-actions">
        <a className="pill pill-accent" href="/">
          На главную
          <ArrowIcon />
        </a>
        <a className="pill pill-tone" href="/#cases">
          Смотреть кейсы
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

function Header({ activeId, dark }) {
  const ref = useRef(null)
  useHeaderOnScroll(ref)
  return (
    <header ref={ref} className={`header${dark ? ' header-dark' : ''}`}>
      <a className="brand" href="/">
        Its Step
      </a>
      <nav className="nav" aria-label="Навигация">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`/#${item.id}`}
            className={activeId === item.id ? 'is-active' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a className={`pill ${dark ? 'pill-accent' : 'pill-dark'} pill-header`} href={telegramUrl}>
        Обсудить проект
      </a>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>AI-системы, CRM и сайты для бизнеса. Самозанятый, по договору, удалённо.</p>
      <nav className="footer-links" aria-label="Услуги">
        {servicePages.map((page) => (
          <a key={page.id} href={page.path}>
            {page.nav}
          </a>
        ))}
      </nav>
      <div className="footer-links">
        <a href={telegramUrl}>Telegram</a>
        <a href={tiktokUrl} target="_blank" rel="noreferrer">
          TikTok
        </a>
        <a href={kworkUrl} target="_blank" rel="noreferrer">
          Kwork
        </a>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  )
}

function Cta() {
  return (
    <section className="cta dark" id="contact">
      <div className="cta-inner">
        <p className="eyebrow eyebrow-light">Следующий шаг</p>
        <h2>Расскажите, что у вас делают руками</h2>
        <p>
          Опишите задачу в двух словах. В тот же день скажу, как её решить, сколько это
          стоит и сколько займёт. Разбор бесплатный.
        </p>
        <div className="cta-actions">
          <a className="pill pill-accent" href={telegramUrl}>
            Написать в Telegram
            <ArrowIcon />
          </a>
          <span className="cta-handle">{telegramHandle} · отвечаю лично</span>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">
        Its Step
      </div>
    </section>
  )
}

function Home({ setLightbox, setDemoOpen }) {
  return (
    <>
      {/* ---------- первый экран ---------- */}
      <section className="hero" id="top">
        <p className="eyebrow">Степан · разработчик · самозанятый</p>
        <h1 className="hero-title">
          {heroWords.map(([word, accent], index) => (
            <Fragment key={word}>
              <span className={`w${accent ? ' hero-accent' : ''}`}>
                <span className="w-in" style={{ '--w': index }}>
                  {word}
                </span>
              </span>
              {index < heroWords.length - 1 && ' '}
            </Fragment>
          ))}
        </h1>

        <div className="hero-row">
          <p className="hero-lead">
            За два года сдал 30+ заказов: тендерную AI-систему, магазин на 520 000 товаров,
            сайт бренда минеральной воды за 200 000 ₽. Веду проект сам — от ТЗ до запуска.
          </p>
          <div className="hero-actions">
            <a className="pill pill-accent" href={telegramUrl}>
              Обсудить проект
              <ArrowIcon />
            </a>
            <a className="pill pill-line" href="#cases">
              Смотреть кейсы
            </a>
          </div>
        </div>

        <figure className="hero-visual">
          <button
            type="button"
            className="hero-shot"
            onClick={() => setLightbox({ src: fullSize(heroImage), alt: featured.title })}
            aria-label={`Открыть скриншот: ${featured.title}`}
          >
            <Img src={heroImage} alt={featured.title} sizes="(max-width: 1280px) 100vw, 1280px" eager />
          </button>
          <figcaption>
            <span>Conteria · тендерная система</span>
            Дашборд с найденными тендерами и лидами, есть мобильная версия. Реальные экраны
            из работы клиента.
          </figcaption>
        </figure>
      </section>

      <div className="marquee" aria-label="Клиенты">
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
      <section className="stats dark" aria-label="Цифры">
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
          <SectionHead index="03" title="Что говорят клиенты">
            Отзывы с Kwork — каждый можно проверить в профиле.
          </SectionHead>
          <a className="kwork-card" href={kworkUrl} target="_blank" rel="noreferrer">
            <span>Профиль на Kwork</span>
            <strong>{kwork.reviews} отзывов</strong>
            <em>
              {kwork.orders} заказов · {kwork.intime} в срок
            </em>
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
                </span>
                {review.repeat && <em>повторный заказ</em>}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="review-shots">
          <span className="review-shots-label">Оригиналы со страницы Kwork</span>
          <div>
            {reviewShots.map((shot) => (
              <button
                type="button"
                key={shot.src}
                onClick={() => setLightbox({ src: fullSize(shot.src), alt: shot.alt })}
                aria-label={`Открыть скриншот: ${shot.alt}`}
              >
                <Img src={shot.src} alt={shot.alt} sizes="(max-width: 760px) 100vw, 640px" />
              </button>
            ))}
          </div>
          <a href={casesChannelUrl} target="_blank" rel="noreferrer">
            Новые отзывы — в канале @itssteps
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* ---------- медиа ---------- */}
      <section className="section dark" id="media">
        <SectionHead index="04" title={<>Веду блог об <span className="nowrap">AI-разработке</span></>}>
          2 900+ человек следят за тем, как я работаю. До старта проекта можно посмотреть,
          как я думаю и как объясняю сложное.
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
                <span className="media-open">Смотреть кейсы</span>
              )}
            </a>
          ))}
        </div>
      </section>

      {/* ---------- обо мне ---------- */}
      <section className="section about" id="about">
        <img className="about-avatar" src={avatar} alt="Степан" width="160" height="160" />
        <div className="about-text">
          <SectionHead index="05" title="Степан, разработчик Its Step" />
          <p>
            Делаю системы, которые берут на себя работу людей: AI-агенты, CRM, интеграции и
            сайты. Веду проект один и целиком — разбор задачи, архитектура, интерфейс, код,
            запуск. Вы общаетесь напрямую со мной, контекст не теряется между людьми.
          </p>
          <p>
            Самозанятый, работаю по договору. Беру 2–3 проекта параллельно, чтобы не растягивать
            сроки.
          </p>
          <p className="stack">
            <span>Работаю с</span> {stack.join(', ')}.
          </p>
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
              Telegram-канал <ExternalIcon />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- цены и процесс ---------- */}
      <section className="section section-tint" id="pricing">
        <SectionHead index="06" title="Форматы и цены">
          Точная цена — после бесплатного разбора. Смета и сроки фиксируются в договоре.
        </SectionHead>
        <div className="services">
          {services.map((service) => (
            <article
              className={`service${service.accent ? ' service-accent' : ''}`}
              key={service.title}
            >
              <h3>{service.title}</h3>
              <p>{service.body}</p>
              <div className="service-terms">
                <strong>{service.price}</strong>
                <span>{service.term}</span>
              </div>
            </article>
          ))}
        </div>

        <ol className="steps">
          {steps.map(([title, body], i) => (
            <li key={title}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </section>

      <Cta />
    </>
  )
}

function App({ path = '/' }) {
  const [lightbox, setLightbox] = useState(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const activeId = useActiveSection()
  const caseItem = findCase(path)
  const service = findService(path)
  const notFound = path === '/404/'
  const dark = Boolean(caseItem) || notFound

  useReveal(path)
  useCountUp('.stat strong', path)
  useImageFade(path)

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
    <div className={`site${dark ? ' site-dark' : ''}`}>
      <Header activeId={dark || service ? '' : activeId} dark={dark} />

      <main>
        {notFound && <NotFound />}
        {caseItem && <CasePage item={caseItem} setLightbox={setLightbox} setDemoOpen={setDemoOpen} />}
        {service && <ServicePage page={service} />}
        {!dark && !service && <Home setLightbox={setLightbox} setDemoOpen={setDemoOpen} />}
      </main>

      <Footer />

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
            aria-label="Закрыть"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default App
