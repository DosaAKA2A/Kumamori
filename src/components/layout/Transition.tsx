import { createContext, useCallback, useContext, useRef, type MouseEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate, type LinkProps } from 'react-router'
import { animate, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Kana } from '../../brand/Logo'

type Ctx = { go: (to: string) => void }
const TransitionCtx = createContext<Ctx>({ go: () => {} })
export const useGo = () => useContext(TransitionCtx).go

const WIPE = [0.83, 0, 0.17, 1] as const

/**
 * Cambio de página con barrido: un panel verde sube tapando la pantalla con el katakana,
 * se cambia la ruta debajo y el panel sigue hacia arriba.
 */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const lenis = useLenis()
  const reduced = useReducedMotion()
  const panel = useRef<HTMLDivElement>(null)
  const logo = useRef<HTMLDivElement>(null)
  const busy = useRef(false)

  const go = useCallback(
    async (to: string) => {
      if (busy.current) return
      const [path, search = ''] = to.split('?')
      if (path === location.pathname && search === location.search.replace(/^\?/, '')) {
        lenis?.scrollTo(0)
        return
      }
      if (reduced || !panel.current || !logo.current) {
        navigate(to)
        window.scrollTo(0, 0)
        return
      }
      busy.current = true
      const p = panel.current
      const l = logo.current
      p.style.visibility = 'visible'
      await Promise.all([
        animate(p, { y: ['100%', '0%'] }, { duration: 0.55, ease: WIPE }),
        animate(l, { opacity: [0, 1], scale: [0.7, 1], y: [40, 0] }, { duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }),
      ])
      navigate(to)
      lenis?.scrollTo(0, { immediate: true })
      window.scrollTo(0, 0)
      await new Promise((r) => setTimeout(r, 140))
      await Promise.all([
        animate(p, { y: '-100%' }, { duration: 0.62, ease: WIPE }),
        animate(l, { opacity: 0, y: -50 }, { duration: 0.35, ease: 'easeIn' }),
      ])
      p.style.transform = 'translateY(100%)'
      p.style.visibility = 'hidden'
      busy.current = false
    },
    [navigate, location.pathname, location.search, lenis, reduced],
  )

  return (
    <TransitionCtx.Provider value={{ go }}>
      {children}
      <div
        ref={panel}
        className="fixed inset-0 z-[110] flex items-center justify-center bg-matcha-deep text-cream"
        style={{ transform: 'translateY(100%)', visibility: 'hidden' }}
        aria-hidden
      >
        <div ref={logo} style={{ opacity: 0 }}>
          <Kana className="h-10 w-auto md:h-14" />
        </div>
      </div>
    </TransitionCtx.Provider>
  )
}

type TLinkProps = Omit<LinkProps, 'to'> & { to: string }

/** Link que dispara la transición. Con ctrl/cmd o target _blank se comporta como un link normal. */
export function TLink({ to, onClick, children, ...rest }: TLinkProps) {
  const go = useGo()
  return (
    <Link
      to={to}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return
        e.preventDefault()
        go(to)
      }}
    >
      {children}
    </Link>
  )
}
