import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { home, menu } from '../content/site'
import { Bear, type Mood } from '../brand/Bear'
import { BrandIcon } from '../brand/Icon'
import { Lines, Fade, Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { IconMarquee } from '../components/ui/Marquee'
import { DragStrip } from '../components/ui/DragStrip'
import { SectionHead } from '../components/ui/Section'
import { TLink } from '../components/layout/Transition'
import { useIntroDone } from '../components/layout/Intro'
import { photo } from '../lib/hooks'

export function Inicio() {
  return (
    <>
      <Hero />
      <IconMarquee className="bg-cream text-matcha-deep" />
      <ElEspacio />
      <Barra />
      <Quedarse />
    </>
  )
}

/* ---------- Hero: el oso vivo ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null)
  const done = useIntroDone()
  const [mood, setMood] = useState<Mood>('idle')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bearY = useTransform(scrollYProgress, [0, 1], ['0%', '38%'])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const textO = useTransform(scrollYProgress, [0, 0.55], [1, 0])
  const h = home.hero

  return (
    <section ref={ref} className="on-green relative overflow-hidden bg-matcha-deep text-cream">
      <div className="wrap relative grid min-h-[100svh] content-start pt-[7.5rem] md:grid-cols-12 md:pb-[11rem] md:pt-[9rem] lg:pt-[10rem]">
        <motion.div style={{ y: textY, opacity: textO }} className="relative z-10 md:col-span-8 lg:col-span-7">
          <Lines lines={h.lineas} className="display t-hero" play={done} />
          <motion.div initial={{ opacity: 0, y: 24 }} animate={done ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}>
            <p className="note mt-6 max-w-xl text-[1.5rem] leading-tight text-matcha md:text-[1.8rem]">{h.nota}</p>
            <p className="lead mt-4 max-w-xl text-cream/85">{h.texto}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to={h.primario.to} size="lg" onHoverStart={() => setMood('happy')} onHoverEnd={() => setMood('idle')}>
                {h.primario.label}
              </Button>
              <Button to={h.secundario.to} size="lg" variant="ghost">
                {h.secundario.label}
              </Button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: bearY }}
          className="pointer-events-none relative -mb-[26%] ml-auto mt-4 w-[118%] max-w-none translate-x-[8%] sm:w-[80%] sm:translate-x-0 md:absolute md:bottom-0 md:right-[-5%] md:m-0 md:w-[54%] md:translate-y-[30%] lg:w-[47%]"
        >
          <Bear className="w-full text-cream" mood={mood} reach={8} title="El oso de Kumamori" />
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- El espacio (foto + texto) ---------- */
function ElEspacio() {
  const e = home.espacio
  return (
    <section className="bg-cream text-bark">
      <div className="wrap grid items-center gap-12 py-20 md:grid-cols-12 md:py-32">
        <Fade className="md:col-span-6 lg:col-span-5">
          <div className="sticker -rotate-2 transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0">
            <img src={photo(e.foto.src)} alt={e.foto.alt} width={1800} height={1200} loading="lazy" />
          </div>
        </Fade>
        <div className="md:col-span-6 lg:col-span-7">
          <SectionHead nota={e.nota} titulo={e.titulo} texto={e.texto} />
          <TLink to={e.link.to} className="mt-8 inline-block font-bold text-matcha-deep underline decoration-2 underline-offset-[6px] transition-colors hover:decoration-matcha">
            {e.link.label}
          </TLink>
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
        <div className="md:col-span-6 lg:col-span-6">
          <Words text={q.titulo} className="display t-h2" />
          <dl className="mt-10 grid gap-8 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
            {q.datos.map((d) => (
              <div key={d.titulo}>
                <dt className="t-h3 text-matcha-deep">{d.titulo}</dt>
                <dd className="mt-2 text-[0.98rem] opacity-80">{d.texto}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button to={q.cta.to} size="lg">
              {q.cta.label}
            </Button>
          </div>
        </div>
        <Fade className="md:col-span-6 lg:col-span-5 lg:col-start-8" delay={0.1}>
          <div className="sticker rotate-3 transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0">
            <img src={photo(q.foto.src)} alt={q.foto.alt} width={1800} height={1200} loading="lazy" />
          </div>
        </Fade>
      </div>
    </section>
  )
}
