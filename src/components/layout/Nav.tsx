import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { nav, site } from '../../content/site'
import { Bear } from '../../brand/Bear'
import { Wordmark } from '../../brand/Logo'
import { TLink } from './Transition'

const esActivo = (pathname: string, to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

// Cajas de los enlaces en la maqueta (x y ancho, en px de diseño): el texto va centrado en cada una.
const CAJAS = [
  [298, 174],
  [502, 215],
  [747, 176],
  [953, 174],
  [1157, 174],
] as const

/** Barra de la maqueta: verde matcha profundo, fija, 110 de alto, esquinas inferiores redondeadas y solo los cinco enlaces. */
export function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] h-16 rounded-b-[20px] bg-matcha-deep text-cream dk:uh-110 dk:urb-30">
        {/* escritorio */}
        <nav className="frame hidden h-full dk:block" aria-label="Principal">
          {nav.map((l, i) => {
            const active = esActivo(pathname, l.to)
            const [x, w] = CAJAS[i]
            return (
              <TLink
                key={l.to}
                to={l.to}
                aria-current={active ? 'page' : undefined}
                className="group absolute top-0 flex h-full items-center justify-center font-semibold uppercase leading-none ut-18"
                style={{ left: `calc(${x} * var(--u))`, width: `calc(${w} * var(--u))` }}
              >
                <span className="relative">
                  {l.label}
                  <span
                    className="absolute inset-x-0 -bottom-[calc(7*var(--u))] h-[calc(2*var(--u))] origin-left scale-x-0 rounded-full bg-matcha transition-transform duration-300 ease-[var(--ease-expo)] group-hover:scale-x-100"
                    aria-hidden
                  />
                </span>
              </TLink>
            )
          })}
        </nav>

        {/* móvil y tablet */}
        <div className="wrap-m flex h-full items-center justify-between dk:hidden">
          <TLink to="/" aria-label="Kumamori, inicio" className="rounded-md">
            <Wordmark className="h-[18px] w-auto" />
          </TLink>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-cream/10"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <Menu strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} pathname={pathname} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-matcha-deep text-cream"
      initial={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
      animate={{ clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
      exit={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
      transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="wrap-m flex h-16 items-center justify-between">
        <Wordmark className="h-[18px] w-auto" />
        <button type="button" className="-mr-2 grid h-11 w-11 place-items-center rounded-full hover:bg-cream/10" onClick={onClose} aria-label="Cerrar menú">
          <X strokeWidth={2.2} />
        </button>
      </div>
      <nav className="wrap-m mt-8 flex flex-col gap-1" aria-label="Principal">
        {nav.map((l, i) => (
          <motion.div
            key={l.to}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <TLink
              to={l.to}
              onClick={onClose}
              aria-current={esActivo(pathname, l.to) ? 'page' : undefined}
              className={clsx('display block py-2.5 text-[2rem]', esActivo(pathname, l.to) ? 'text-matcha' : 'text-cream')}
            >
              {l.label}
            </TLink>
          </motion.div>
        ))}
      </nav>
      <div className="wrap-m mt-auto flex items-end justify-between pb-8">
        <div className="text-sm leading-relaxed text-cream/85">
          <p>{site.direccion}</p>
          <p>{site.horario.texto}</p>
          <a className="underline underline-offset-4" href={`mailto:${site.correo}`}>
            {site.correo}
          </a>
        </div>
        <Bear className="w-32 translate-x-6 translate-y-8 text-cream/20" track={false} />
      </div>
    </motion.div>
  )
}
