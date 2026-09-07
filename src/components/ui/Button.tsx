import { useRef, type ReactNode, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import clsx from 'clsx'
import { TLink } from '../layout/Transition'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  type?: 'button' | 'submit'
  variant?: 'solid' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  onClick?: () => void
  onHoverStart?: () => void
  onHoverEnd?: () => void
}

/** Botón píldora con un imán suave: se inclina hacia el puntero cuando está cerca. */
export function Button({ children, to, href, type = 'button', variant = 'solid', size = 'md', className, disabled, onClick, onHoverStart, onHoverEnd }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.5 })
  const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.5 })

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduced || disabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22)
    my.set((e.clientY - (r.top + r.height / 2)) * 0.32)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  const cls = clsx('btn', variant === 'ghost' && 'btn-ghost', size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', className)

  let inner: ReactNode
  if (to) {
    inner = (
      <TLink to={to} className={cls} onClick={onClick}>
        {children}
      </TLink>
    )
  } else if (href) {
    inner = (
      <a href={href} className={cls} target="_blank" rel="noreferrer" onClick={onClick}>
        {children}
      </a>
    )
  } else {
    inner = (
      <button type={type} className={cls} disabled={disabled} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        reset()
        onHoverEnd?.()
      }}
      onPointerEnter={onHoverStart}
      whileTap={disabled ? undefined : { scale: 0.96 }}
    >
      {inner}
    </motion.span>
  )
}
