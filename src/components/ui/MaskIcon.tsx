import clsx from 'clsx'

// Iconos macizos recortados de la maqueta (public/iconos/*.png): se pintan con el color de fondo vía CSS mask.
// Medidas en px de diseño, tal como aparecen en la captura al 100 %.
export const ICONOS_MASCARA = {
  wifi: [42, 42],
  enchufe: [30, 42],
  silencio: [42, 42],
  reloj: [42, 42],
  taza: [42, 36],
  sillon: [48, 36],
} as const

export type NombreIcono = keyof typeof ICONOS_MASCARA

export function MaskIcon({ name, className, mobileScale = 0.8 }: { name: NombreIcono; className?: string; mobileScale?: number }) {
  const [w, h] = ICONOS_MASCARA[name]
  const url = `url(${import.meta.env.BASE_URL}iconos/${name}.png)`
  return (
    <span
      className={clsx('inline-block shrink-0 bg-current [--k:var(--mk)] dk:[--k:var(--u)]', className)}
      style={{
        ['--mk' as string]: `${mobileScale}px`,
        width: `calc(${w} * var(--k))`,
        height: `calc(${h} * var(--k))`,
        WebkitMaskImage: url,
        maskImage: url,
        WebkitMaskSize: '100% 100%',
        maskSize: '100% 100%',
      }}
      aria-hidden
    />
  )
}
