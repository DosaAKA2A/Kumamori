import { photo } from '../../lib/hooks'

type Props = {
  src: string
  /** caja de la foto en px de diseño, relativa a la sección (el encuadre exacto de la maqueta) */
  x: number
  y: number
  w: number
  h: number
  /** velo encima (color con alfa) */
  velo?: string
}

/**
 * Foto de fondo de una sección con el encuadre de la maqueta. En escritorio se coloca con la geometría
 * medida (y crece con --ws en pantallas de más de 1728 px); en móvil cubre la sección.
 */
export function Textura({ src, x, y, w, h, velo }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <img src={photo(src)} alt="" className="absolute inset-0 h-full w-full object-cover dk:hidden" loading="lazy" />
      <div
        className="absolute inset-y-0 left-1/2 hidden uw-1728 origin-top dk:block"
        style={{ transform: 'translateX(-50%) scale(var(--ws, 1))' }}
      >
        <img
          src={photo(src)}
          alt=""
          className="absolute max-w-none"
          style={{ left: `calc(${x} * var(--u))`, top: `calc(${y} * var(--u))`, width: `calc(${w} * var(--u))`, height: `calc(${h} * var(--u))` }}
          loading="lazy"
        />
      </div>
      {velo && <div className="absolute inset-0" style={{ background: velo }} />}
    </div>
  )
}
