import { useMemo } from 'react'
import { icons } from '../../brand/paths'
import { outerSubpath } from '../../brand/geometry'

type Props = {
  icono: string
  /** caja del dibujo (sin el borde) en px de diseño */
  x: number
  y: number
  h: number
  rot?: number
  /** ancho del borde crema troquelado, en px de diseño */
  pad?: number
  className?: string
}

/** Dibujo de la marca como sticker: silueta crema troquelada y trazo marrón, como en los testimonios de la maqueta. */
export function Sticker({ icono, x, y, h, rot = 0, pad = 20, className }: Props) {
  const shape = icons[icono]
  const outer = useMemo(() => shape?.paths.map((p) => outerSubpath(p.d)) ?? [], [shape])
  if (!shape) return null
  const k = shape.h / h // unidades del viewBox por px de diseño
  return (
    <svg
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      className={className}
      style={{
        position: 'absolute',
        left: `calc(${x} * var(--u))`,
        top: `calc(${y} * var(--u))`,
        height: `calc(${h} * var(--u))`,
        aspectRatio: `${shape.w} / ${shape.h}`,
        overflow: 'visible',
        transform: `rotate(${rot}deg)`,
      }}
      aria-hidden
    >
      <g fill="var(--color-cream)" stroke="var(--color-cream)" strokeWidth={pad * 2 * k} strokeLinejoin="round">
        {outer.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      <g fill="var(--color-bark)">
        {shape.paths.map((p, i) => (
          <path key={i} d={p.d} fillRule={p.eo ? 'evenodd' : undefined} />
        ))}
      </g>
    </svg>
  )
}
