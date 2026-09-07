import { reservasPage as p } from '../content/site'
import { SectionHead } from '../components/ui/Section'
import { Fade, Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { photo } from '../lib/hooks'

export function Reservas() {
  return (
    <>
      <section className="bg-cream text-bark">
        <div className="wrap grid gap-12 pb-16 pt-[8.5rem] md:grid-cols-12 md:items-center md:pb-24 md:pt-[11rem]">
          <div className="md:col-span-6">
            <SectionHead as="h1" size="t-h1" nota={p.hero.nota} titulo={p.hero.titulo} texto={p.hero.texto} />
            <div className="mt-9">
              <Button to={p.cta.boton.to} size="lg">
                {p.cta.boton.label}
              </Button>
            </div>
          </div>
          <Fade className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <div className="sticker rotate-2 transition-transform duration-700 ease-[var(--ease-expo)] hover:rotate-0">
              <img src={photo(p.hero.foto.src)} alt={p.hero.foto.alt} width={1800} height={1200} />
            </div>
          </Fade>
        </div>
      </section>

      <section className="bg-cream-deep/60 text-bark">
        <div className="wrap py-20 md:py-28">
          <ol className="grid gap-6 md:grid-cols-3">
            {p.pasos.map((paso, i) => (
              <li key={paso.titulo} className="rounded-sticker bg-cream-light p-7 md:p-8">
                <span className="note block text-5xl leading-none text-matcha" aria-hidden>
                  {i + 1}
                </span>
                <h2 className="t-h3 mt-4">{paso.titulo}</h2>
                <p className="mt-2 opacity-80">{paso.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-green bg-matcha-deep text-cream">
        <div className="wrap py-24 text-center md:py-36">
          <Words text={p.cta.titulo} className="display t-h2" />
          <p className="lead mx-auto mt-5 max-w-lg text-cream/85">{p.cta.texto}</p>
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
