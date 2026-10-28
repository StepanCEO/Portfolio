import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { allCases, siteUrl } from './content.js'
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
const caseJsonLd = (item) => {
  const url = `${siteUrl}${item.path}`
  const image = imageSizes[item.image]?.variants.at(-1)[1] ?? item.image
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Its Step', item: `${siteUrl}/` },
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
        inLanguage: 'ru',
        creator: { '@id': `${siteUrl}/#person` },
      },
    ],
  }
}

// Страницы для пререндера и их мета-теги. Главная берёт мета-теги из app.html как есть.
export const routes = [
  { path: '/' },
  ...allCases.map((item) => ({
    path: item.path,
    title: `${item.title} — кейс Its Step`,
    description: short(item.summary),
    image: `${siteUrl}${item.image}`,
    jsonLd: caseJsonLd(item),
  })),
  {
    path: '/404/',
    file: '404.html',
    title: 'Страница не найдена — Its Step',
    description: 'Такой страницы нет. Кейсы и услуги — на главной itssteps.site.',
    image: `${siteUrl}/projects/conteria-hero.jpg`,
    noindex: true,
  },
]
