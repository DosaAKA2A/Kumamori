import { createElement, Fragment, useRef, type ReactNode } from 'react'
import { motion, useInView } from 'motion/react'
import clsx from 'clsx'

const EASE = [0.16, 1, 0.3, 1] as const

const maskCls = 'inline-block overflow-hidden align-top leading-[1.1] -my-[0.09em] px-[0.02em]'

type WordsProps = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  /** si es false, anima al montar en vez de al entrar en pantalla */
  onView?: boolean
  play?: boolean
}

/** Titular que aparece palabra por palabra desde una máscara. */
export function Words({ text, as = 'h2', className, delay = 0, onView = true, play = true }: WordsProps) {
  // Se observa el titular entero, no las palabras: dentro de la máscara están recortadas y nunca "entran" en pantalla.
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' })
  const show = onView ? inView : play
  const words = text.split(' ')
  const children = words.map((w, i) => (
    <Fragment key={i}>
      <span className={maskCls}>
        <motion.span
          className="inline-block"
          initial={{ y: '112%' }}
          animate={show ? { y: 0 } : { y: '112%' }}
          transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.045 }}
        >
          {w}
        </motion.span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ))
  return createElement(as, { ref, className, 'aria-label': text }, children)
}

type LinesProps = {
  lines: string[]
  as?: 'h1' | 'h2'
  className?: string
  delay?: number
  play?: boolean
}

/** Titular por líneas fijas (para el hero), cada línea sube desde su máscara. */
export function Lines({ lines, as = 'h1', className, delay = 0, play = true }: LinesProps) {
  const children = lines.map((l, i) => (
    <span key={i} className={clsx(maskCls, 'block')}>
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        animate={play ? { y: 0 } : { y: '112%' }}
        transition={{ duration: 1, ease: EASE, delay: delay + i * 0.09 }}
      >
        {l}
      </motion.span>
    </span>
  ))
  return createElement(as, { className, 'aria-label': lines.join(' ') }, children)
}

type FadeProps = { children: ReactNode; className?: string; delay?: number; y?: number; once?: boolean }

/** Aparición suave al entrar en pantalla. Usar con moderación: solo para bloques que lo necesiten. */
export function Fade({ children, className, delay = 0, y = 18, once = true }: FadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
