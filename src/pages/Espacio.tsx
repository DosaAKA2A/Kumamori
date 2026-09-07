import { Clock, Coffee, Infinity as InfinityIcon, Plug, Volume1, Wifi, type LucideIcon } from 'lucide-react'
import { espacioPage as p } from '../content/site'
import { SectionHead } from '../components/ui/Section'
import { StickerStack } from '../components/ui/StickerStack'
import { Fade, Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { photo } from '../lib/hooks'

const ICONOS: Record<string, LucideIcon> = { wifi: Wifi, plug: Plug, volume: Volume1, clock: Clock, coffee: Coffee, infinity: InfinityIcon }

export function Espacio() {
  return (
    <>
      <section className="bg-cream text-bark">
        <div className="wrap grid gap-12 pb-16 pt-[8.5rem] md:grid-cols-12 md:items-center md:pb-24 md:pt-[11rem]">
          <div className="md:col-span-6">
            <SectionHead as="h1" size="t-h1" titulo={p.hero.titulo} texto={p.hero.texto} />
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <StickerStack fotos={p.hero.fotos} className="rounded-sticker" />
            <p className="note mt-5 text-center text-2xl text-matcha">{p.hero.nota}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-deep/60 text-bark">
        <div className="wrap py-20 md:py-28">
          <SectionHead titulo={p.zonasTitulo} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {p.zonas.map((z, i) => (
              <Fade key={z.nombre} delay={i * 0.08}>
                <article className="h-full overflow-hidden rounded-sticker bg-cream-light">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={photo(z.foto.src)}
                      alt={z.foto.alt}
                      width={1800}
                      height={1200}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-expo)] hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-7">
                    <h3 className="t-h3">{z.nombre}</h3>
                    <p className="mt-2 opacity-80">{z.texto}</p>
                    <ul className="mt-5 space-y-1.5 text-[0.95rem] font-semibold">
                      {z.puntos.map((pt) => (
                        <li key={pt} className="flex gap-2.5">
                          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-matcha" aria-hidden />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      <section className="on-green bg-matcha-deep text-cream">
        <div className="wrap grid gap-12 py-20 md:grid-cols-12 md:py-28">
          <div className="md:col-span-4">
            <SectionHead titulo={p.serviciosTitulo} />
          </div>
          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
            {p.servicios.map((s) => {
              const I = ICONOS[s.icono]
              return (
                <li key={s.titulo} className="flex gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cream/12 text-cream">
                    <I strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold leading-tight">{s.titulo}</h3>
                    <p className="mt-1.5 text-[0.95rem] text-cream/80">{s.texto}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-cream text-bark">
        <div className="wrap py-24 text-center md:py-36">
          <Words text={p.cta.titulo} className="display t-h2" />
          <p className="lead mx-auto mt-5 max-w-lg opacity-85">{p.cta.texto}</p>
          <div className="mt-9">
            <Button to={p.cta.boton.to} size="lg">
              {p.cta.boton.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
