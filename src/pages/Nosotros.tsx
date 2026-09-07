import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'motion/react'
import { nosotrosPage as p, site } from '../content/site'
import { Words } from '../components/ui/Reveal'
import { DragStrip } from '../components/ui/DragStrip'
import { SectionHead } from '../components/ui/Section'
import { Watermarks } from '../components/ui/Watermarks'
import { photo } from '../lib/hooks'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Nosotros() {
  const manifiesto = useRef<HTMLDivElement>(null)

  // Las palabras se van encendiendo a medida que se lee: el scroll lleva el ritmo.
  useGSAP(
    () => {
      const words = manifiesto.current?.querySelectorAll('.word')
      if (!words?.length) return
      gsap.fromTo(
        words,
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: 'none',
          stagger: 0.02,
          scrollTrigger: { trigger: manifiesto.current, start: 'top 72%', end: 'bottom 58%', scrub: 0.6 },
        },
      )
      const t = setTimeout(() => ScrollTrigger.refresh(), 600)
      return () => clearTimeout(t)
    },
    { scope: manifiesto },
  )

  return (
    <>
      <section className="bg-cream text-bark">
        <div className="wrap max-w-4xl pt-[8.5rem] text-center md:pt-[11rem]">
          <Words as="h1" text={p.titulo} className="display t-h1" />
          <p className="note mt-5 text-[1.8rem] text-matcha md:text-[2.2rem]">{p.sub}</p>
        </div>

        <div ref={manifiesto} className="wrap max-w-3xl py-16 text-center md:py-24">
          {p.parrafos.map((par, i) => (
            <p key={i} className="mb-8 text-[1.35rem] font-semibold leading-snug md:text-[1.75rem]">
              {par.split(' ').map((w, j) => (
                <span key={j} className="word inline-block">
                  {w}&nbsp;
                </span>
              ))}
            </p>
          ))}
          <p className="note mt-6 text-[1.9rem] leading-tight text-matcha-deep md:text-[2.4rem]">{p.cierre}</p>
        </div>

        <div className="wrap flex justify-center overflow-hidden py-4" aria-hidden>
          <motion.p
            className="kanji select-none text-[clamp(7rem,22vw,17rem)] text-matcha-deep/15"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {site.kanji}
          </motion.p>
        </div>
      </section>

      <section className="bg-cream-deep/60 text-bark">
        <div className="wrap grid items-center gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-7">
            <div className="sticker -rotate-2 transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0">
              <img src={photo(p.bocetos.src)} alt={p.bocetos.alt} width={1800} height={1146} loading="lazy" />
            </div>
          </div>
          <div className="md:col-span-5">
            <p className="note text-[2.2rem] leading-tight text-matcha-deep md:text-[2.6rem]">{p.bocetos.nota}</p>
            <p className="mt-4 opacity-80">
              El oso salió de un cuaderno cuadriculado: docenas de caras hasta dar con la que mira de frente, tranquila. Del mismo cuaderno salieron クマモリ y 熊森.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream text-bark">
        <div className="wrap pt-20 md:pt-28">
          <SectionHead nota={p.merch.nota} titulo={p.merch.titulo} texto={p.merch.texto} />
        </div>
        <div className="wrap">
          <DragStrip className="-mx-[var(--pad)] px-[var(--pad)] pb-20 pt-12 md:pb-24" gap="gap-7">
            {p.merch.items.map((m) => (
              <figure key={m.src} tabIndex={0} className="w-[260px] shrink-0 md:w-[300px]">
                <div className="sticker bg-cream-light">
                  {/* multiply: el fondo blanco del mockup toma el color del papel */}
                  <img src={photo(m.src)} alt={m.cap} loading="lazy" className="aspect-square object-contain p-3 mix-blend-multiply" />
                </div>
                <figcaption className="note mt-3 text-center text-xl text-matcha-deep">{m.cap}</figcaption>
              </figure>
            ))}
            <div className="w-[var(--pad)] shrink-0" aria-hidden />
          </DragStrip>
        </div>
      </section>

      <section className="relative bg-cream text-bark">
        <Watermarks
          marcas={[
            { icono: 'flower-hatched', className: 'left-[4%] bottom-[12%] w-36 -rotate-12 opacity-[0.06]' },
            { icono: 'purin', className: 'right-[5%] top-[14%] w-32 rotate-6 opacity-[0.05]' },
          ]}
        />
        <div className="wrap py-20 text-center md:py-28">
          <Words text={p.redesTitulo} className="display t-h2" />
          <ul className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
            {site.redes.map((r) => (
              <li key={r.nombre}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-sticker bg-bark text-cream transition-colors hover:bg-matcha-deep"
                >
                  <span className="t-h3">{r.nombre}</span>
                  <span className="note text-xl text-matcha transition-colors group-hover:text-cream">{r.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
