import { lazy, Suspense, useEffect, useState } from 'react'
import './App.css'
import imageSizes from './image-sizes.json'
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

// Картинка в WebP с вариантами под ширину экрана (см. scripts/images.mjs).
// Для лайтбокса берём самый крупный вариант.
const fullSize = (src) => imageSizes[src]?.variants.at(-1)[1] ?? src

function Img({ src, alt, sizes = '100vw', eager = false, className }) {
  const meta = imageSizes[src]
  if (!meta) return <img className={className} src={src} alt={alt} loading={eager ? undefined : 'lazy'} />
  return (
    <img
      className={className}
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

// Страница по адресу: /cases/<id>/ — кейс, всё остальное — главная
function findCase(path) {
  const normalized = path.endsWith('/') ? path : `${path}/`
  return allCases.find((item) => item.path === normalized) || null
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
        <SectionHead index="01" title={<>Лучшие кейсы<span className="dot">.</span></>}>
          AI-системы, CRM и сайты для реального бизнеса — с цифрами и стеком. Подробности —
          на странице каждого кейса.
        </SectionHead>
        <a className="deck-all" href={casesChannelUrl} target="_blank" rel="noreferrer">
          Все работы в @itssteps
          <ExternalIcon />
        </a>
      </div>

      <ol className="deck">
        {allCases.map((item, index) => (
          <li
            key={item.id}
            className={`deck-card deck-${item.tone}`}
            style={{ '--i': index, background: item.bg }}
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
        <Img src={item.image} alt={item.title} sizes="(max-width: 1280px) 100vw, 1200px" eager />
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
  return (
    <header className={`header${dark ? ' header-dark' : ''}`}>
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

function Home({ setLightbox, setDemoOpen }) {
  return (
    <>
      {/* ---------- первый экран ---------- */}
      <section className="hero" id="top">
        <p className="eyebrow">Степан · разработчик · самозанятый</p>
        <h1>
          Делаю <span className="nowrap">AI-системы</span>, CRM и сайты{' '}
          <span className="hero-accent">для бизнеса</span>
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

      <CaseDeck setDemoOpen={setDemoOpen} />

      {/* ---------- отзывы ---------- */}
      <section className="section section-tint" id="reviews">
        <div className="section-head-row">
          <SectionHead index="02" title="Что говорят клиенты">
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
        <SectionHead index="03" title={<>Веду блог об <span className="nowrap">AI-разработке</span></>}>
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
          <SectionHead index="04" title="Степан, разработчик Its Step" />
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
        <SectionHead index="05" title="Форматы и цены">
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

      {/* ---------- контакт ---------- */}
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
    </>
  )
}

function App({ path = '/' }) {
  const [lightbox, setLightbox] = useState(null)
  const [demoOpen, setDemoOpen] = useState(false)
  const activeId = useActiveSection()
  const caseItem = findCase(path)
  const notFound = path === '/404/'
  const dark = Boolean(caseItem) || notFound

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
      <Header activeId={dark ? '' : activeId} dark={dark} />

      <main>
        {notFound && <NotFound />}
        {caseItem && <CasePage item={caseItem} setLightbox={setLightbox} setDemoOpen={setDemoOpen} />}
        {!dark && <Home setLightbox={setLightbox} setDemoOpen={setDemoOpen} />}
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
