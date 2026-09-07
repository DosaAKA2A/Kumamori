import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource-variable/red-hat-display'
import '@fontsource/gaegu/700.css'
import './styles/zen-maru.css'
import 'lenis/dist/lenis.css'
import './styles/global.css'
import { routes } from './routes'

const base = import.meta.env.BASE_URL.replace(/\/$/, '')
const router = createBrowserRouter(routes, { basename: base || '/' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
