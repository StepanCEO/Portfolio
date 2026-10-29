import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { siteUrl } from './content.js'
import { alternatePath, getSite } from './i18n.js'
import imageSizes from './image-sizes.json'

// Пререндер: HTML каждой страницы на этапе сборки, чтобы поисковики видели текст без JavaScript
export function render(path) {
  return renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  )
}

const short = (text, limit = 160) =>
  text.length <= limit ? text : `${text.slice(0, text.lastIndexOf(' ', limit - 1))}…`

// Разметка страницы кейса: хлебные крошки для выдачи и сама работа с автором
const caseJsonLd = (item, prefix) => {
  const url = `${siteUrl}${item.path}`
  const image = imageSizes[item.image]?.variants.at(-1)[1] ?? item.image
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Its Step', item: `${siteUrl}${prefix}/` },
          { '@type': 'ListItem', position: 2, name: item.title, item: url },
        ],
      },
      {
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: item.title,
        description: item.summary,
        url,
        image: `${siteUrl}${image}`,
        genre: item.category,
        keywords: item.stackList.join(', ') || undefined,
        inLanguage: prefix ? 'en' : 'ru',
        creator: { '@id': `${siteUrl}/#person` },
      },
    ],
  }
}

// Разметка страницы услуги: сама услуга с ценой «от», хлебные крошки и вопросы-ответы
const serviceJsonLd = (page, prefix) => {
  const url = `${siteUrl}${page.path}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Its Step', item: `${siteUrl}${prefix}/` },
          { '@type': 'ListItem', position: 2, name: page.nav, item: url },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.title,
        description: page.metaDescription,
        url,
        serviceType: page.nav,
        areaServed: prefix ? undefined : 'RU',
        inLanguage: prefix ? 'en' : 'ru',
        provider: { '@id': `${siteUrl}/#person` },
        offers: page.minPrice
          ? {
              '@type': 'Offer',
              priceCurrency: 'RUB',
              priceSpecification: { '@type': 'PriceSpecification', minPrice: page.minPrice, priceCurrency: 'RUB' },
            }
          : undefined,
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }
}

const defaultImage = `${siteUrl}/projects/conteria-hero.jpg`

// Страницы одной языковой версии и их мета-теги. Русская главная берёт мета-теги из app.html.
function routesFor(lang) {
  const site = getSite(lang)
  const { prefix, ui, servicePages, allCases } = site
  const caseSuffix = lang === 'en' ? 'case study, Its Step' : 'кейс Its Step'
  return [
    { path: `${prefix}/`, ...(ui.meta.home && { ...ui.meta.home, image: defaultImage }) },
    ...servicePages.map((page) => {
      const firstCase = allCases.find((item) => item.id === page.caseIds[0])
      return {
        path: page.path,
        title: page.metaTitle,
        description: page.metaDescription,
        image: `${siteUrl}${firstCase.image}`,
        jsonLd: serviceJsonLd(page, prefix),
      }
    }),
    ...allCases.map((item) => ({
      path: item.path,
      title: `${item.title} — ${caseSuffix}`,
      description: short(item.summary),
      image: `${siteUrl}${item.image}`,
      jsonLd: caseJsonLd(item, prefix),
    })),
    { path: `${prefix}/partners/`, ...ui.meta.partners, image: defaultImage },
    { path: `${prefix}/privacy/`, ...ui.meta.privacy, image: defaultImage },
    { path: `${prefix}/consent/`, ...ui.meta.consent, image: defaultImage, noindex: true },
  ].map((route) => ({ ...route, lang, alternate: alternatePath(route.path) }))
}

export const routes = [
  ...routesFor('ru'),
  ...routesFor('en'),
  {
    path: '/404/',
    file: '404.html',
    lang: 'ru',
    title: 'Страница не найдена — Its Step',
    description: 'Такой страницы нет. Кейсы и услуги — на главной itssteps.site.',
    image: defaultImage,
    noindex: true,
  },
]
