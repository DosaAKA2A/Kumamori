import { motion } from 'motion/react'
import { home } from '../content/site'
import { LivingImagotipo } from '../brand/Bear'
import { Words, Fade } from '../components/ui/Reveal'
import { Watermarks } from '../components/ui/Watermarks'
import { IconBand } from '../components/ui/IconBand'
import { Carousel } from '../components/ui/Carousel'
import { TLink } from '../components/layout/Transition'
import { useIntroDone } from '../components/layout/Intro'
import { photo } from '../lib/hooks'

export function Inicio() {
  return (
    <>
      <Hero />
      <IconBand />
      <Lugar />
    </>
  )
}

const EASE = [0.16, 1, 0.3, 1] as const

/* Héroe de la maqueta: carrusel a pantalla completa, velo marrón al 50 % y el imagotipo crema con el oso vivo. */
function Hero() {
  const done = useIntroDone()
  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-bark text-cream dk:h-auto dk:min-h-0 dk:uh-1118">
      <Carousel fotos={home.hero.fotos} className="absolute inset-0" overlay="rgba(48, 36, 29, 0.5)" dots={false} />
      <div className="frame pointer-events-none relative z-10 flex h-full items-center justify-center pt-16 dk:block dk:pt-0">
        <motion.div
          className="pointer-events-auto dk:absolute dk:ux-608 dk:uy-282"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          <LivingImagotipo stretch className="aspect-[513/545] h-auto w-[min(62vw,300px)] text-cream dk:uw-513 dk:uh-550" title="Kumamori" />
        </motion.div>
      </div>
    </section>
  )
}

/* "Un lugar tranquilo para vos": foto de matcha a sangre por la izquierda y texto a la derecha. */
function Lugar() {
  const l = home.lugar
  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame dk:uh-1080">
        <Watermarks
          marcas={[
            { icono: 'chasen', x: 1486, y: 390, h: 422, rot: -5 },
            { icono: 'bun', x: 1181, y: 882, h: 254, rot: 20 },
            { icono: 'flower-hatched', x: 1557, y: 878, h: 219, rot: 45 },
          ]}
        />
        <Fade y={0} className="relative aspect-[4/5] max-h-[70svh] w-full overflow-hidden rounded-br-[24px] sm:aspect-[16/11] dk:absolute dk:uy-0 dk:aspect-auto dk:max-h-none dk:uh-1080 dk:urbr-30 dk:[left:calc(-1*var(--gut))] dk:[width:calc(892*var(--u)+var(--gut))]">
          <img
            src={photo(l.foto.src)}
            alt={l.foto.alt}
            className="absolute inset-0 h-full w-full object-cover object-right"
            width={892}
            height={1080}
            loading="lazy"
          />
        </Fade>
        <div className="wrap-m relative py-14 dk:static dk:py-0">
          <Words
            text={l.titulo}
            className="display text-[clamp(2.75rem,11vw,4rem)] dk:absolute dk:ux-978 dk:uy-170 dk:uw-774 dk:ut-90"
          />
          <Fade className="mt-6 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-978 dk:uy-470 dk:uw-511 dk:mt-0 dk:ut-25">
            {l.parrafos.map((p, i) => (
              <p key={i} className={i ? 'mt-[1.32em]' : undefined}>
                {p}
              </p>
            ))}
          </Fade>
          <TLink
            to={l.link.to}
            className="mt-6 inline-block text-[1.0625rem] font-medium text-matcha-deep underline decoration-1 underline-offset-[0.3em] transition-colors hover:text-bark dk:absolute dk:ux-979 dk:uy-824 dk:mt-0 dk:ut-20"
          >
            {l.link.label}
          </TLink>
        </div>
      </div>
    </section>
  )
}
