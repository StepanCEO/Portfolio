import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { allCases, siteUrl } from './content.js'

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

// Страницы для пререндера и их мета-теги. Главная берёт мета-теги из app.html как есть.
export const routes = [
  { path: '/' },
  ...allCases.map((item) => ({
    path: item.path,
    title: `${item.title} — кейс Its Step`,
    description: short(item.summary),
    image: `${siteUrl}${item.image}`,
  })),
]
