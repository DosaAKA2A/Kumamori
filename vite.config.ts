import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// GitHub Pages sirve el sitio bajo /Kumamori/. Para un dominio propio: BASE_PATH=/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH ?? '/Kumamori/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
  },
})
