import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, type MotionValue } from 'motion/react'
import { bear } from './paths'
import { outerSubpath, clamp } from './geometry'
import { pointerX, pointerY, startPointer } from './pointer'

export type Mood = 'idle' | 'happy' | 'sleepy'

type BearProps = {
  className?: string
  /** los ojos siguen al puntero */
  track?: boolean
  mood?: Mood
  /** cuánto pueden moverse los ojos, en unidades del viewBox (229 x 146) */
  reach?: number
  title?: string
}

const eyeStyle = { transformBox: 'fill-box', transformOrigin: 'center' } as const

/**
 * El oso del isotipo, con los ojos como capas independientes: siguen al puntero y parpadean.
 * Se pinta con currentColor, así que el color lo decide el contexto (crema sobre verde, corteza sobre crema...).
 */
export function Bear({ className, track = true, mood = 'idle', reach = 7, title }: BearProps) {
  const ref = useRef<SVGSVGElement>(null)
  const tx = useMotionValue(0)
  const ty = useMotionValue(0)
  const ex = useSpring(tx, { stiffness: 120, damping: 14, mass: 0.6 })
  const ey = useSpring(ty, { stiffness: 120, damping: 14, mass: 0.6 })

  useEffect(() => {
    if (track) startPointer()
  }, [track])

  const follow = () => {
    if (!track || !ref.current) return
    const px = pointerX.get(), py = pointerY.get()
    if (px < 0) return
    const r = ref.current.getBoundingClientRect()
    if (r.width === 0) return
    const cx = r.left + r.width * 0.5
    const cy = r.top + r.height * 0.52
    const dx = px - cx, dy = py - cy
    const unit = r.width / bear.w // px por unidad de viewBox
    const k = 0.08 // cuánto responde a la distancia
    tx.set(clamp((dx / unit) * k, -reach, reach))
    ty.set(clamp((dy / unit) * k, -reach * 0.8, reach * 0.8))
  }
  useMotionValueEvent(pointerX, 'change', follow)
  useMotionValueEvent(pointerY, 'change', follow)

  // parpadeo aleatorio
  const [blink, setBlink] = useState(false)
  useEffect(() => {
    let t: number
    const loop = () => {
      t = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 140)
        loop()
      }, 2600 + Math.random() * 3200)
    }
    loop()
    return () => clearTimeout(t)
  }, [])

  const eyeScaleY = blink ? 0.12 : mood === 'happy' ? 0.35 : mood === 'sleepy' ? 0.5 : 1
  const eyeY = mood === 'happy' ? -2 : 0

  return (
    <svg ref={ref} viewBox={`0 0 ${bear.w} ${bear.h}`} className={className} fill="currentColor" role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d={bear.head} />
      <path d={bear.muzzle} />
      <path d={bear.nose} />
      <motion.g style={{ x: ex, y: ey }}>
        <motion.path d={bear.eyeL} style={eyeStyle} animate={{ scaleY: eyeScaleY, y: eyeY }} transition={{ duration: 0.12 }} />
        <motion.path d={bear.eyeR} style={eyeStyle} animate={{ scaleY: eyeScaleY, y: eyeY }} transition={{ duration: 0.12 }} />
      </motion.g>
    </svg>
  )
}

/**
 * El oso pequeño de la barra de navegación: se llena de matcha a medida que se baja por la página.
 * `progress` va de 0 a 1 (por ejemplo scrollYProgress).
 */
export function ScrollBear({ progress, className }: { progress: MotionValue<number>; className?: string }) {
  const outer = useMemo(() => outerSubpath(bear.head), [])
  const level = useTransform(progress, [0, 1], [bear.h, 0])
  const id = 'bear-fill-clip'
  return (
    <svg viewBox={`0 0 ${bear.w} ${bear.h}`} className={className} fill="currentColor" aria-hidden>
      <defs>
        <clipPath id={id}>
          <path d={outer} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <motion.rect x={0} y={0} width={bear.w} height={bear.h} style={{ y: level }} fill="var(--color-matcha)" />
      </g>
      <path d={bear.head} />
      <path d={bear.muzzle} />
      <path d={bear.nose} />
      <path d={bear.eyeL} />
      <path d={bear.eyeR} />
    </svg>
  )
}
