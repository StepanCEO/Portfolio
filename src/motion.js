import { useEffect } from 'react'

// Анимации сайта. Правила:
// — двигаем только transform и opacity: это делает видеокарта, без пересчёта страницы;
// — ничего не прячем до загрузки JS: без скрипта весь текст виден, пререндер и SEO целы;
// — элементы, которые уже на экране при загрузке, не трогаем — иначе они мигнут;
// — при «уменьшить движение» в системе анимаций нет вообще.

const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Что плавно поднимается при прокрутке. Соседи в одном контейнере появляются по очереди.
const REVEAL = [
  '.section-head',
  '.deck-all',
  '.service-row',
  '.task-card',
  '.approach-text p',
  '.mini-case',
  '.mini-reviews figure',
  '.price-card',
  '.included li',
  '.steps li',
  '.faq',
  '.review',
  '.kwork-card',
  '.review-shots',
  '.media-card',
  '.about-avatar',
  '.about-text > p',
  '.about-links',
  '.service',
  '.story-row',
  '.case-page-facts > div',
  '.case-page-extra',
  '.case-page-review',
  '.next-case',
  '.cta-inner',
  '.not-found-list li',
].join(',')

const STAGGER_MS = 70
const MAX_STAGGER = 6

export function useReveal(routeKey) {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          observer.unobserve(el)
          el.classList.add('is-in')
          // после анимации убираем служебные атрибуты, чтобы не мешать hover-эффектам
          const done = () => {
            el.removeEventListener('transitionend', onEnd)
            el.removeAttribute('data-reveal')
            el.classList.remove('is-in')
            el.style.removeProperty('--reveal-delay')
          }
          // transitionend всплывает и от вложенных элементов — ждём только свой
          const onEnd = (event) => {
            if (event.target === el && event.propertyName === 'transform') done()
          }
          el.addEventListener('transitionend', onEnd)
          setTimeout(done, 1600)
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    const fold = window.innerHeight
    const counters = new Map()
    document.querySelectorAll(REVEAL).forEach((el) => {
      if (el.getBoundingClientRect().top < fold) return
      const parent = el.parentElement
      const index = counters.get(parent) ?? 0
      counters.set(parent, index + 1)
      el.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STAGGER) * STAGGER_MS}ms`)
      el.setAttribute('data-reveal', '')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [routeKey])
}

// Цифры в тёмном блоке набегают от нуля. В HTML стоят итоговые значения —
// их видят поисковики и те, у кого не загрузился JS.
const formatThousands = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export function useCountUp(selector, routeKey) {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return undefined
    const nodes = [...document.querySelectorAll(selector)]
    if (!nodes.length) return undefined

    const targets = nodes
      .map((node) => {
        const original = node.textContent
        const match = original.match(/^([\d\s ]+)(.*)$/)
        if (!match) return null
        return { node, original, value: Number(match[1].replace(/[\s ]/g, '')), suffix: match[2] }
      })
      .filter(Boolean)

    let frame = 0
    const run = () => {
      const start = performance.now()
      const duration = 1200
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - (1 - t) ** 3
        targets.forEach(({ node, original, value, suffix }) => {
          node.textContent = t < 1 ? `${formatThousands(Math.round(value * eased))}${suffix}` : original
        })
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        run()
      },
      { threshold: 0.35 },
    )
    observer.observe(nodes[0].closest('section') || nodes[0])

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      targets.forEach(({ node, original }) => {
        node.textContent = original
      })
    }
  }, [selector, routeKey])
}

// Шапка уезжает вверх при прокрутке вниз и возвращается при прокрутке вверх;
// на прокрученной странице у неё появляется тень. Классы ставим напрямую,
// без состояния React, чтобы прокрутка не вызывала перерисовку страницы.
export function useHeaderOnScroll(ref) {
  useEffect(() => {
    const header = ref.current
    if (!header) return undefined
    let lastY = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      header.classList.toggle('header-scrolled', y > 8)
      if (!reducedMotion()) {
        if (y > 120 && y - lastY > 6) header.classList.add('header-hidden')
        else if (lastY - y > 6 || y <= 120) header.classList.remove('header-hidden')
      }
      lastY = y
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
  }, [ref])
}

// Картинки, которые грузятся по мере прокрутки, проявляются, а не появляются рывком.
// Уже загруженные помечаем до включения эффекта, чтобы они не мигнули.
export function useImageFade(routeKey) {
  useEffect(() => {
    if (reducedMotion()) return
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      if (img.complete) {
        img.classList.add('is-loaded')
        return
      }
      const show = () => img.classList.add('is-loaded')
      img.addEventListener('load', show, { once: true })
      img.addEventListener('error', show, { once: true })
    })
    document.documentElement.classList.add('img-fade')
  }, [routeKey])
}

// Переход между страницами: картинка кейса из карточки «перетекает» в картинку
// на странице кейса. Имя даём только кликнутой картинке — снимать восемь больших
// картинок при каждом переходе было бы дорого.
export function markCaseVisual(event) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const link = event.target.closest('a[href^="/cases/"]')
  if (!link) return
  clearCaseVisual()
  const img = event.currentTarget.querySelector('img')
  if (!img) return
  img.style.viewTransitionName = 'case-visual'
  img.dataset.vt = ''
}

export function clearCaseVisual() {
  document.querySelectorAll('[data-vt]').forEach((el) => {
    el.style.removeProperty('view-transition-name')
    el.removeAttribute('data-vt')
  })
}
