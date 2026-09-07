import clsx from 'clsx'
import { BrandIcon } from '../../brand/Icon'

type Marca = { icono: string; className: string }

/**
 * Recursos gráficos del manual como marcas de agua: muy baja opacidad, nunca protagonistas.
 * La sección que las use debe ser `relative`; las marcas no reciben eventos ni lectores de pantalla.
 */
export function Watermarks({ marcas, className }: { marcas: Marca[]; className?: string }) {
  return (
    <div className={clsx('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {marcas.map((m, i) => (
        <BrandIcon key={i} name={m.icono} className={clsx('absolute text-matcha-deep', m.className)} />
      ))}
    </div>
  )
}
