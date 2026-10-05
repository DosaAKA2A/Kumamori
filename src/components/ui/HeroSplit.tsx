import clsx from 'clsx'
import { Words, Fade } from './Reveal'
import { Button } from './Button'
import { photo } from '../../lib/hooks'

type Props = {
  titulo: string
  texto: string
  boton: { label: string; to: string }
  foto: { src: string; alt: string }
  oscuro?: boolean
}

/**
 * Héroe de Nuestro espacio y Reservas: texto a la izquierda y foto a sangre por la derecha
 * (940 x 700 desde y 0, por debajo de la barra, con radio 30 a la izquierda).
 * El recorte empieza en y 82: lo de arriba queda siempre tapado por la barra.
 */
export function HeroSplit({ titulo, texto, boton, foto, oscuro }: Props) {
  return (
    <section className={clsx('relative overflow-hidden', oscuro ? 'bg-bark text-cream' : 'bg-cream text-bark')}>
      <div className="frame dk:uh-700">
        <Fade
          y={0}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-bl-[24px] dk:absolute dk:uy-0 dk:ux-788 dk:aspect-auto dk:uh-700 dk:url-30 dk:[width:calc(940*var(--u)+var(--gut))]"
        >
          <img
            src={photo(foto.src)}
            alt={foto.alt}
            className="absolute inset-0 h-full w-full object-cover object-left dk:inset-auto dk:left-0 dk:uy-82 dk:uh-618"
            width={940}
            height={618}
            fetchPriority="high"
          />
        </Fade>
        <div className="wrap-m py-12 dk:static dk:py-0">
          <Words as="h1" text={titulo} className="display text-[clamp(2.25rem,9.5vw,3.25rem)] dk:absolute dk:ux-87 dk:uy-185 dk:whitespace-nowrap dk:ut-60" />
          <Fade className="mt-5 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-88 dk:uy-395 dk:uw-513 dk:mt-0 dk:ut-25">
            <p>{texto}</p>
          </Fade>
          <div className="mt-8 dk:absolute dk:ux-88 dk:uy-558 dk:mt-0">
            <Button to={boton.to}>{boton.label}</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
