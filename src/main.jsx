import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
// Пререндер записывает, какую страницу он отрисовал: страница 404 открывается
// по любому несуществующему адресу, и оживлять её надо как 404, а не по адресу
const path = root.dataset.path || window.location.pathname
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
)

// В сборке страница уже отрисована пререндером — оживляем её, а не рисуем заново
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
