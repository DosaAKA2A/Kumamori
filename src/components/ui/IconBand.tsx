import clsx from 'clsx'
import { iconNames } from '../../brand/paths'
import { BrandIcon } from '../../brand/Icon'

// media cinta; se duplica para que el bucle de -50% sea continuo hasta en pantallas ultraanchas
const MITAD = [...iconNames, ...iconNames]

/**
 * Cinta separadora entre bloques con foto: banda verde con los iconos del manual,
 * pequeños y espaciados, avanzando muy despacio. Un respiro, no una atracción.
 */
export function IconBand({ className }: { className?: string }) {
  return (
    <div className={clsx('overflow-hidden bg-matcha-deep py-5', className)} aria-hidden>
      <div className="cinta-track flex w-max items-center gap-16 pr-16 md:gap-24 md:pr-24">
        {[...MITAD, ...MITAD].map((n, i) => (
          <BrandIcon key={i} name={n} className="h-7 w-9 shrink-0 text-cream/75" />
        ))}
      </div>
    </div>
  )
}
