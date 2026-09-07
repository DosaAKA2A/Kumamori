import { imagotipo, kana, logotipo, wordmark, type Shape } from './paths'

type Props = { className?: string; title?: string }

function BrandShape({ shape, className, title }: Props & { shape: Shape }) {
  return (
    <svg
      viewBox={`0 0 ${shape.w} ${shape.h}`}
      className={className}
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {shape.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.eo ? 'evenodd' : undefined} />
      ))}
    </svg>
  )
}

/** クマモリ */
export const Kana = (p: Props) => <BrandShape shape={kana} {...p} />
/** KUMAMORI */
export const Wordmark = (p: Props) => <BrandShape shape={wordmark} {...p} />
/** Oso + クマモリ + KUMAMORI (versión principal) */
export const Imagotipo = (p: Props) => <BrandShape shape={imagotipo} {...p} />
/** クマモリ + KUMAMORI (sin oso) */
export const Logotipo = (p: Props) => <BrandShape shape={logotipo} {...p} />
