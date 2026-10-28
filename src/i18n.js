import { createContext, useContext } from 'react'
import * as ruContent from './content.js'
import * as enContent from './content.en.js'
import * as ruServices from './services.js'
import * as enServices from './services.en.js'
import { ui } from './ui.js'

// Две версии сайта: русская в корне, английская в /en/. Компоненты берут данные
// и надписи из контекста, поэтому одна и та же разметка рисует обе версии.

export const langOf = (path) => (path === '/en' || path.startsWith('/en/') ? 'en' : 'ru')

export const normalize = (path) => (path.endsWith('/') ? path : `${path}/`)

const sites = {
  ru: { ...ruContent, ...ruServices, lang: 'ru', prefix: '', ui: ui.ru },
  en: { ...enContent, ...enServices, lang: 'en', prefix: '/en', ui: ui.en },
}

export const getSite = (lang) => sites[lang]

export const SiteContext = createContext(sites.ru)
export const useSite = () => useContext(SiteContext)

// Адрес той же страницы на другом языке — для переключателя и hreflang.
// null — у страницы нет пары (например, 404).
export function alternatePath(path) {
  const p = normalize(path)
  if (p === '/404/') return null
  if (langOf(p) === 'en') {
    const service = sites.en.servicePages.find((page) => page.path === p)
    if (service) return `/${service.ruId}/`
    const rest = p.slice(3)
    return rest || '/'
  }
  const service = sites.en.servicePages.find((page) => `/${page.ruId}/` === p)
  if (service) return service.path
  return `/en${p}`
}

// Все страницы сайта с типом — по этому списку работают роутинг и пререндер
export function resolvePage(path) {
  const p = normalize(path)
  const site = getSite(langOf(p))
  if (p === '/404/') return { site, kind: 'notFound' }
  if (p === `${site.prefix}/`) return { site, kind: 'home' }
  if (p === `${site.prefix}/partners/`) return { site, kind: 'partners' }
  if (p === `${site.prefix}/privacy/`) return { site, kind: 'privacy' }
  const caseItem = site.allCases.find((item) => item.path === p)
  if (caseItem) return { site, kind: 'case', caseItem }
  const service = site.servicePages.find((page) => page.path === p)
  if (service) return { site, kind: 'service', service }
  return { site, kind: 'home' }
}
