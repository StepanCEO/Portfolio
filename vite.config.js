import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  // сайт живёт в корне домена; абсолютные пути нужны страницам кейсов в /cases/<id>/
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      // при пререндере вход задаёт --ssr src/entry-server.jsx
      input: isSsrBuild ? undefined : { app: resolve(__dirname, 'app.html') },
    },
  },
}))
