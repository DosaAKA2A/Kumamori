import { useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import clsx from 'clsx'
import { photo } from '../../lib/hooks'

type Props = {
  src: string
  overlay?: string
  className?: string
  children: ReactNode
}

/** Banda a lo ancho con una foto de fondo (parallax suave) y una capa de color para el texto. */
export function PhotoBand({ src, overlay = 'rgba(48, 36, 29, 0.55)', className, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-7%', '7%'])

  return (
    <section ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.img
        src={photo(src)}
        alt=""
        aria-hidden
        style={{ y }}
        className="absolute -top-[9%] left-0 h-[118%] w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0" style={{ background: overlay }} aria-hidden />
      <div className="relative">{children}</div>
    </section>
  )
}
