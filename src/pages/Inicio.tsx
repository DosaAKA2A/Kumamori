import { motion } from 'motion/react'
import { useSearchParams } from 'react-router'
import { home, menu } from '../content/site'
import { LivingImagotipo } from '../brand/Bear'
import { BrandIcon } from '../brand/Icon'
import { Words, Fade } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { IconMarquee } from '../components/ui/Marquee'
import { DragStrip } from '../components/ui/DragStrip'
import { Carousel } from '../components/ui/Carousel'
import { PhotoBand } from '../components/ui/PhotoBand'
import { SectionHead } from '../components/ui/Section'
import { TLink } from '../components/layout/Transition'
import { useIntroDone } from '../components/layout/Intro'
import { photo } from '../lib/hooks'

export function Inicio() {
  const cta = home.cta
  return (
    <>
      <Hero />
      <IconMarquee className="bg-cream text-matcha-deep" />
      <ElEspacio />
      <Barra />
      <Quedarse />
      <PhotoBand src={cta.foto} overlay="linear-gradient(rgba(48,36,29,0.45), rgba(48,36,29,0.72))" className="on-bark text-cream">
        <div className="wrap py-28 text-center md:py-44">
          <Words text={cta.titulo} className="display t-h1" />
          <p className="lead mx-auto mt-5 max-w-lg text-cream/90">{cta.texto}</p>
          <div className="mt-9">
            <Button to={cta.boton.to} size="lg">
              {cta.boton.label}
            </Button>
          </div>
        </div>
      </PhotoBand>
    </>
  )
}

/* ---------- Hero de la maqueta: carrusel a pantalla completa + logo vivo encima ---------- */
const EASE = [0.16, 1, 0.3, 1] as const

function Hero() {
  const done = useIntroDone()
  const h = home.hero
  // tres tratamientos del logo sobre foto, comparables con ?logo=borde|crema|pastilla
  const [params] = useSearchParams()
  const variante = params.get('logo') ?? 'borde'
  return (
    <section className="on-green relative min-h-[100svh] overflow-hidden bg-bark text-cream">
      <Carousel
        fotos={h.fotos}
        className="absolute inset-0"
        overlay="linear-gradient(rgba(48,36,29,0.5) 0%, rgba(48,36,29,0.32) 30%, rgba(48,36,29,0.42) 60%, rgba(48,36,29,0.68) 100%)"
      />
      {variante === 'crema' && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 44% 40% at 50% 42%, rgba(48,36,29,0.55), transparent 72%)' }}
          aria-hidden
        />
      )}
      <div className="wrap pointer-events-none relative z-10 flex min-h-[100svh] flex-col items-center justify-center gap-7 pb-24 pt-[86px] text-center">
        <motion.div
          className={
            variante === 'pastilla'
              ? 'pointer-events-auto rounded-[2.75rem] bg-cream px-9 py-7 text-bark shadow-[0_30px_70px_-30px_rgba(48,36,29,0.7)] md:px-12 md:py-9'
              : 'pointer-events-auto'
          }
          initial={{ opacity: 0, scale: 0.92, y: 18 }}
          animate={done ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
        >
          {variante === 'crema' ? (
            <LivingImagotipo className="h-[min(30svh,300px)] w-auto text-cream drop-shadow-[0_10px_36px_rgba(48,36,29,0.55)]" title="Kumamori" />
          ) : variante === 'pastilla' ? (
            <LivingImagotipo className="h-[min(26svh,250px)] w-auto" title="Kumamori" />
          ) : (
            <LivingImagotipo outline={9} className="h-[min(30svh,300px)] w-auto text-bark drop-shadow-[0_18px_40px_rgba(48,36,29,0.4)]" title="Kumamori" />
          )}
        </motion.div>
        <motion.p
          className="note max-w-md text-balance text-[1.5rem] leading-tight text-cream [text-shadow:0_2px_18px_rgba(48,36,29,0.75)] md:text-[1.75rem]"
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
        >
          {h.nota}
        </motion.p>
        <motion.div
          className="pointer-events-auto flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
        >
          <Button to={h.primario.to} size="lg">
            {h.primario.label}
          </Button>
          <Button to={h.secundario.to} size="lg" variant="ghost">
            {h.secundario.label}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Imagen estática + texto (segunda sección de la maqueta) ---------- */
function ElEspacio() {
  const e = home.espacio
  return (
    <section className="bg-cream text-bark">
      <div className="grid md:min-h-[78vh] md:grid-cols-2">
        <Fade className="relative min-h-[48svh] md:min-h-0">
          <img
            src={photo(e.foto.src)}
            alt={e.foto.alt}
            className="absolute inset-0 h-full w-full object-cover md:rounded-r-[2.5rem]"
            loading="lazy"
            width={1800}
            height={1200}
          />
        </Fade>
        <div className="flex items-center">
          <div className="max-w-xl px-[clamp(1.25rem,5vw,5rem)] py-14 md:py-24">
            <SectionHead nota={e.nota} titulo={e.titulo} />
            {e.parrafos.map((par) => (
              <p key={par.slice(0, 20)} className="lead mt-6 opacity-85">
                {par}
              </p>
            ))}
            <TLink
              to={e.link.to}
              className="mt-8 inline-block font-bold text-matcha-deep underline decoration-2 underline-offset-[6px] transition-colors hover:decoration-matcha"
            >
              {e.link.label}
            </TLink>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Hoy en la barra (tira arrastrable) ---------- */
function Barra() {
  const b = home.barra
  return (
    <section className="on-green bg-matcha-deep text-cream">
      <div className="wrap pt-20 md:pt-28">
        <SectionHead nota={b.nota} titulo={b.titulo} texto={b.texto} />
      </div>
      <div className="wrap">
        <DragStrip className="-mx-[var(--pad)] px-[var(--pad)] pb-20 pt-12 md:pb-28">
          {menu.map((item) => (
            <article
              key={item.nombre}
              tabIndex={0}
              className="w-[260px] shrink-0 rounded-sticker bg-cream/10 p-6 transition-colors hover:bg-cream/15 focus:bg-cream/15 md:w-[300px] md:p-7"
            >
              <BrandIcon name={item.icono} className="h-24 w-28 text-cream" />
              <h3 className="t-h3 mt-7">{item.nombre}</h3>
              <p className="mt-2 text-[0.98rem] text-cream/80">{item.texto}</p>
              {item.precio && <p className="note mt-4 text-2xl text-matcha">{item.precio}</p>}
            </article>
          ))}
          <div className="w-[var(--pad)] shrink-0" aria-hidden />
        </DragStrip>
      </div>
    </section>
  )
}

/* ---------- Para quedarse ---------- */
function Quedarse() {
  const q = home.quedarse
  return (
    <section className="bg-cream text-bark">
      <div className="wrap grid items-center gap-12 py-20 md:grid-cols-12 md:py-32">
        <div className="md:col-span-6">
          <Words text={q.titulo} className="display t-h2" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {q.datos.map((d) => (
              <div key={d.titulo}>
                <dt className="t-h3 text-matcha-deep">{d.titulo}</dt>
                <dd className="mt-2 text-[0.98rem] opacity-80">{d.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Fade className="md:col-span-6 lg:col-span-5 lg:col-start-8" delay={0.1}>
          <div className="sticker rotate-2 transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0">
            <img src={photo(q.foto.src)} alt={q.foto.alt} width={1800} height={1200} loading="lazy" />
          </div>
        </Fade>
      </div>
    </section>
  )
}
