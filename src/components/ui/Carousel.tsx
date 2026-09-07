import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import clsx from 'clsx'
import { photo } from '../../lib/hooks'

type Foto = { src: string; alt: string }
type Props = {
  fotos: Foto[]
  className?: string
  /** milisegundos entre fotos */
  interval?: number
  /** capa de color encima (para que el texto se lea) */
  overlay?: string
  dots?: boolean
}

/**
 * El "FONDO CARRUSEL" de la maqueta: fotos a sangre que se funden entre sí
 * con un zoom lento (Ken Burns). Se pausa con el mouse encima y fuera de pantalla.
 */
export function Carousel({ fotos, className, interval = 5000, overlay, dots = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const inView = useInView(ref, { margin: '120px' })
  const reduced = useReducedMotion()
  const idx = i % fotos.length
  const f = fotos[idx]

  useEffect(() => {
    if (paused || !inView || fotos.length < 2) return
    const t = setTimeout(() => setI((v) => (v + 1) % fotos.length), interval)
    return () => clearTimeout(t)
  }, [i, paused, inView, fotos.length, interval])

  // precarga la siguiente para que el fundido no parpadee
  useEffect(() => {
    const n = fotos[(idx + 1) % fotos.length]
    if (n) new Image().src = photo(n.src)
  }, [idx, fotos])

  const mouse = (v: boolean) => (e: PointerEvent) => {
    if (e.pointerType === 'mouse') setPaused(v)
  }

  return (
    <div
      ref={ref}
      // la posición la decide quien lo usa: `absolute inset-0` de fondo, o nada (relative) como bloque
      className={clsx('overflow-hidden bg-bark/10', !className?.includes('absolute') && 'relative', className)}
      onPointerEnter={mouse(true)}
      onPointerLeave={mouse(false)}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de Kumamori"
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={idx}
          src={photo(f.src)}
          alt={f.alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: reduced ? 1 : [1.03, 1.1] }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.1, ease: 'easeInOut' },
            scale: { duration: (interval + 1600) / 1000, ease: 'linear' },
          }}
          draggable={false}
        />
      </AnimatePresence>
      {overlay && <div className="absolute inset-0" style={{ background: overlay }} aria-hidden />}
      {dots && fotos.length > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {fotos.map((_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Ir a la foto ${k + 1}`}
              aria-current={k === idx}
              onClick={() => setI(k)}
              className={clsx(
                'h-2.5 rounded-full bg-cream transition-all duration-300',
                k === idx ? 'w-7' : 'w-2.5 opacity-55 hover:opacity-90',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
