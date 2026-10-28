import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Пререндер: HTML страницы на этапе сборки, чтобы поисковики видели текст без JavaScript
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
