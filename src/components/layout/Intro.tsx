import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { imagotipo } from '../../brand/paths'

const IntroCtx = createContext(true)
/** true cuando la intro terminó (o no hacía falta). El hero espera esto para arrancar. */
export const useIntroDone = () => useContext(IntroCtx)

const KEY = 'km-intro'

export function IntroProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem(KEY)
    } catch {
      return false
    }
  })
  const [done, setDone] = useState(!show)
  const lenis = useLenis()

  const finish = () => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* nada */
    }
    setShow(false)
    setDone(true)
  }

  useEffect(() => {
    if (reduced && show) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  useEffect(() => {
    if (show) lenis?.stop()
    else lenis?.start()
  }, [show, lenis])

  return (
    <IntroCtx.Provider value={done}>
      {children}
      <AnimatePresence>{show && !reduced && <IntroOverlay onDone={finish} />}</AnimatePresence>
    </IntroCtx.Provider>
  )
}

const pop = { type: 'spring', stiffness: 380, damping: 22 } as const
const originCenter = { transformBox: 'fill-box', transformOrigin: 'center' } as const

/** El logo se "pega" como un sticker: oso, katakana y letras, en ese orden. */
function IntroOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2150)
    return () => clearTimeout(t)
  }, [onDone])

  const paths = imagotipo.paths // 0-4 oso · 5-8 katakana · 9-16 letras
  return (
    <motion.div
      className="fixed inset-0 z-[115] flex cursor-pointer items-center justify-center bg-cream text-bark"
      onClick={onDone}
      exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.83, 0, 0.17, 1] } }}
      role="presentation"
    >
      <motion.svg
        viewBox={`0 0 ${imagotipo.w} ${imagotipo.h}`}
        className="w-[min(58vw,280px)] overflow-visible"
        fill="currentColor"
        aria-hidden
        exit={{ y: -60, opacity: 0.6, transition: { duration: 0.5 } }}
      >
        <motion.g
          style={originCenter}
          initial={{ scale: 1.7, opacity: 0, rotate: -12 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ ...pop, stiffness: 300, damping: 17, delay: 0.15 }}
        >
          {paths.slice(0, 5).map((p, i) => (
            <path key={i} d={p.d} />
          ))}
        </motion.g>
        {paths.slice(5, 9).map((p, i) => (
          <motion.path
            key={'k' + i}
            d={p.d}
            style={originCenter}
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ ...pop, delay: 0.62 + i * 0.09 }}
          />
        ))}
        {paths.slice(9).map((p, i) => (
          <motion.path
            key={'w' + i}
            d={p.d}
            style={originCenter}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 1.05 + i * 0.045 }}
          />
        ))}
      </motion.svg>
      <span className="sr-only">Kumamori</span>
    </motion.div>
  )
}
