import { icons } from './paths'

type Props = { name: string; className?: string; title?: string }

/** Iconos dibujados a mano del manual (chasen, dango, 茶, melon pan...). Se pintan con currentColor. */
export function BrandIcon({ name, className, title }: Props) {
  const shape = icons[name]
  if (!shape) return null
  return (
    <svg
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      className={className}
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
