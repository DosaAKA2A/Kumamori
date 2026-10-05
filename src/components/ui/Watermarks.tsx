import clsx from 'clsx'
import { motion, useReducedMotion } from 'motion/react'
import { BrandIcon } from '../../brand/Icon'

/** Dibujo de fondo de la maqueta: posición de su caja (x, y), alto y giro, en px de diseño. */
export type Marca = { icono: string; x: number; y: number; h: number; rot?: number; flip?: boolean }

/**
 * Dibujos grandes de la marca en beige detrás del contenido, como en la maqueta.
 * Van dentro de un `.frame` relativo; solo en escritorio. Entran con un fundido suave.
 */
export function Watermarks({ marcas, className, color = 'text-mark' }: { marcas: Marca[]; className?: string; color?: string }) {
  const reduced = useReducedMotion()
  return (
    <div className={clsx('pointer-events-none absolute inset-0 hidden dk:block', className)} aria-hidden>
      {marcas.map((m, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `calc(${m.x} * var(--u))`, top: `calc(${m.y} * var(--u))`, height: `calc(${m.h} * var(--u))` }}
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1 + i * 0.08 }}
        >
          <BrandIcon
            name={m.icono}
            className={clsx('h-full w-auto', color)}
            style={{ transform: `rotate(${m.rot ?? 0}deg)${m.flip ? ' scaleX(-1)' : ''}` }}
          />
        </motion.div>
      ))}
    </div>
  )
}
