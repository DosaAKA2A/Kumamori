import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Inicio } from './pages/Inicio'
import { Espacio } from './pages/Espacio'
import { Reservas } from './pages/Reservas'
import { ReservasNueva } from './pages/ReservasNueva'
import { Experiencias } from './pages/Experiencias'
import { Nosotros } from './pages/Nosotros'
import { NotFound } from './pages/NotFound'

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
