import { useEffect, useRef, useState, type ReactNode, type WheelEvent } from 'react'
import { animate, motion, useMotionValue } from 'motion/react'
import clsx from 'clsx'

type Props = { children: ReactNode; className?: string; gap?: string }

/** Tira horizontal que se arrastra (puntero), se desplaza con la rueda horizontal y sigue al foco del teclado. */
export function DragStrip({ children, className, gap = 'gap-6' }: Props) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [max, setMax] = useState(0)
  const x = useMotionValue(0)

  useEffect(() => {
    const o = outer.current, i = inner.current
    if (!o || !i) return
    const measure = () => setMax(Math.max(0, i.scrollWidth - o.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(o)
    ro.observe(i)
    return () => ro.disconnect()
  }, [])

  const clamp = (v: number) => Math.min(0, Math.max(-max, v))

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
    x.set(clamp(x.get() - e.deltaX))
  }

  const onFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    const o = outer.current
    const el = e.target as HTMLElement
    if (!o || !el) return
    const r = el.getBoundingClientRect(), ro = o.getBoundingClientRect()
    const left = r.left - ro.left - x.get()
    const target = clamp(-(left - 24))
    if (r.left < ro.left || r.right > ro.right) animate(x, target, { type: 'spring', stiffness: 200, damping: 30 })
  }

  return (
    <div ref={outer} className={clsx('cursor-grab overflow-hidden active:cursor-grabbing', className)} onWheel={onWheel} onFocus={onFocus}>
      <motion.div
        ref={inner}
        className={clsx('flex w-max', gap)}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: -max, right: 0 }}
        dragElastic={0.08}
        dragTransition={{ power: 0.35, timeConstant: 220 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
