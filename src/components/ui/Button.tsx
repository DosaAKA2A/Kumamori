import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import clsx from 'clsx'
import { TLink } from '../layout/Transition'

type Size = 'xl' | 'md' | 'resumen'

// Medidas de la maqueta: el "Reservar" grande (300 x 100, Bold 40), el del héroe (200 x 70)
// y el del panel RESUMEN (286 x 100, verde oscuro).
const SIZES: Record<Size, string> = {
  xl: 'h-16 px-10 text-[1.6rem] font-bold rounded-full dk:uw-300 dk:uh-100 dk:px-0 dk:ut-40',
  md: 'h-[52px] px-8 text-[1.0625rem] font-semibold rounded-full dk:uw-200 dk:uh-70 dk:px-0 dk:ut-20',
  resumen: 'h-14 px-10 text-[1.375rem] font-semibold rounded-full dk:uw-286 dk:uh-100 dk:px-0 dk:ut-35',
}
const VARIANTS: Record<Size, string> = {
  xl: 'bg-matcha text-bark hover:bg-matcha-deep hover:text-cream',
  md: 'bg-matcha text-bark hover:bg-matcha-deep hover:text-cream',
  resumen: 'bg-matcha-deep text-cream hover:bg-bark',
}

type Props = {
  children: ReactNode
  to?: string
  type?: 'button' | 'submit'
  size?: Size
  className?: string
  disabled?: boolean
  onClick?: () => void
}

/** Botón píldora de la maqueta con un imán suave: se inclina hacia el puntero y vuelve a su sitio al salir. */
export function Button({ children, to, type = 'button', size = 'md', className, disabled, onClick }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.5 })
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduced || disabled || !ref.current || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.12)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }

  const cls = clsx(
    'inline-flex items-center justify-center whitespace-nowrap leading-none transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60',
    SIZES[size],
    VARIANTS[size],
    className,
  )

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
    >
      {to ? (
        <TLink to={to} className={cls} onClick={onClick}>
          {children}
        </TLink>
      ) : (
        <button type={type} className={cls} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      )}
    </motion.span>
  )
}
