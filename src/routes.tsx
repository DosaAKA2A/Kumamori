import { lazy } from 'react'
import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Inicio } from './pages/Inicio'

// La portada va en el bundle principal; el resto se carga al navegar (el barrido verde tapa la carga).
const Espacio = lazy(() => import('./pages/Espacio').then((m) => ({ default: m.Espacio })))
const Reservas = lazy(() => import('./pages/Reservas').then((m) => ({ default: m.Reservas })))
const ReservasNueva = lazy(() => import('./pages/ReservasNueva').then((m) => ({ default: m.ReservasNueva })))
const Experiencias = lazy(() => import('./pages/Experiencias').then((m) => ({ default: m.Experiencias })))
const Nosotros = lazy(() => import('./pages/Nosotros').then((m) => ({ default: m.Nosotros })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export const routes: RouteObject[] = [
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Inicio },
      { path: 'espacio', Component: Espacio },
      { path: 'reservas', Component: Reservas },
      { path: 'reservas/nueva', Component: ReservasNueva },
      { path: 'experiencias', Component: Experiencias },
      { path: 'nosotros', Component: Nosotros },
      { path: '*', Component: NotFound },
    ],
  },
]
