import type { CSSProperties } from 'react'
import { icons } from './paths'

type Props = { name: string; className?: string; title?: string; style?: CSSProperties }

/** Iconos dibujados a mano del manual (chasen, dango, 茶, melon pan...). Se pintan con currentColor. */
export function BrandIcon({ name, className, title, style }: Props) {
  const shape = icons[name]
  if (!shape) return null
  return (
    <svg
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      className={className}
      style={{ aspectRatio: `${shape.w} / ${shape.h}`, ...style }}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
    >
      {title && <title>{title}</title>}
      {shape.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.eo ? 'evenodd' : undefined} />
      ))}
    </svg>
  )
}
