import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'
import { nav, site } from '../../content/site'
import { ScrollBear, Bear } from '../../brand/Bear'
import { Kana } from '../../brand/Logo'
import { TLink } from './Transition'

const esActivo = (pathname: string, to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40))
  const { pathname } = useLocation()
  const onGreen = pathname === '/' && !scrolled
  const [open, setOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-[80] transition-[background-color,color,box-shadow] duration-300',
          scrolled
            ? 'bg-cream/85 shadow-[0_1px_0_rgba(48,36,29,0.08)] backdrop-blur-md'
            : onGreen
              ? 'bg-gradient-to-b from-bark/45 to-transparent'
              : 'bg-transparent',
          onGreen ? 'on-green text-cream' : 'text-bark',
        )}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          <TLink to="/" aria-label="Kumamori, inicio" className="shrink-0 rounded-md">
            <ScrollBear
              progress={scrollYProgress}
              className={clsx('h-9 w-auto transition-colors duration-300', onGreen && 'drop-shadow-[0_2px_10px_rgba(48,36,29,0.65)]')}
            />
          </TLink>

          <nav className={clsx('hidden items-center gap-1 md:flex', onGreen && '[text-shadow:0_1px_14px_rgba(48,36,29,0.7)]')} aria-label="Principal">
            {nav.map((l) => {
              const active = esActivo(pathname, l.to)
              return (
                <TLink
                  key={l.to}
                  to={l.to}
                  aria-current={active ? 'page' : undefined}
                  className={clsx(
                    'relative rounded-full px-3.5 py-2 text-[0.95rem] font-semibold transition-colors hover:bg-current/10',
                    active && 'font-bold',
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-0 h-1.5 w-1.5 rounded-full bg-matcha"
                      style={{ left: 'calc(50% - 3px)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </TLink>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <TLink to="/reservas/nueva" className="btn btn-sm hidden sm:inline-flex">
              Reservar
            </TLink>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-current/10 md:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={open}
            >
              <Menu strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} pathname={pathname} />}</AnimatePresence>
    </>
  )
}

function MobileMenu({ onClose, pathname }: { onClose: () => void; pathname: string }) {
  return (
    <motion.div
      className="on-green fixed inset-0 z-[90] flex flex-col overflow-hidden bg-matcha-deep text-cream"
      initial={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
      animate={{ clipPath: 'circle(150% at calc(100% - 44px) 38px)' }}
      exit={{ clipPath: 'circle(0% at calc(100% - 44px) 38px)' }}
      transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <Kana className="h-6 w-auto" />
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-current/10"
          onClick={onClose}
          aria-label="Cerrar menú"
        >
          <X strokeWidth={2.2} />
        </button>
      </div>
      <nav className="wrap mt-6 flex flex-col gap-1" aria-label="Principal">
        {nav.map((l, i) => (
          <motion.div
            key={l.to}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <TLink
              to={l.to}
              className={clsx('display t-h2 block py-2', esActivo(pathname, l.to) ? 'text-matcha' : 'text-cream')}
            >
              {l.label}
            </TLink>
          </motion.div>
        ))}
      </nav>
      <div className="wrap mt-auto flex items-end justify-between pb-8">
        <div className="text-sm leading-relaxed text-cream/80">
          <p className="font-semibold text-cream">{site.horario.texto}</p>
          <p>{site.direccion}</p>
          <a className="underline underline-offset-4" href={site.redes[0].url} target="_blank" rel="noreferrer">
            {site.redes[0].handle}
          </a>
        </div>
        <Bear className="w-36 translate-x-6 translate-y-8 text-cream/20" track={false} />
      </div>
    </motion.div>
  )
}
