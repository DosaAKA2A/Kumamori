import { reservasPage as p } from '../content/site'
import { SectionHead } from '../components/ui/Section'
import { Carousel } from '../components/ui/Carousel'
import { PhotoBand } from '../components/ui/PhotoBand'
import { Words } from '../components/ui/Reveal'
import { Watermarks } from '../components/ui/Watermarks'
import { Button } from '../components/ui/Button'

export function Reservas() {
  return (
    <>
      {/* hero de la maqueta: texto a la izquierda, FONDO CARRUSEL a sangre a la derecha */}
      <section className="bg-cream pt-[76px] text-bark">
        <div className="grid md:min-h-[calc(88svh-76px)] md:grid-cols-12">
          <div className="order-2 flex items-center md:order-1 md:col-span-5">
            <div className="max-w-xl px-[clamp(1.25rem,5vw,5rem)] py-14 md:py-20 md:pl-[clamp(1.25rem,4vw,4rem)] md:pr-12">
              <SectionHead as="h1" size="t-h2" nota={p.hero.nota} titulo={p.hero.titulo} texto={p.hero.texto} />
              <div className="mt-9">
                <Button to={p.cta.boton.to} size="lg">
                  {p.cta.boton.label}
                </Button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            <Carousel fotos={p.hero.fotos} className="h-[46svh] w-full md:h-full md:rounded-bl-[3rem]" />
          </div>
        </div>
      </section>

      <section className="relative bg-cream-deep/60 text-bark">
        <Watermarks
          marcas={[
            { icono: 'clover', className: '-right-8 -top-8 w-48 rotate-12 opacity-[0.07]' },
            { icono: 'chashaku', className: 'bottom-[6%] left-[2%] w-40 -rotate-6 opacity-[0.06]' },
          ]}
        />
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

      <PhotoBand src={p.cta.foto} overlay="linear-gradient(rgba(48,36,29,0.5), rgba(48,36,29,0.72))" className="on-bark text-cream">
        <div className="wrap py-28 text-center md:py-44">
          <Words text={p.cta.titulo} className="display t-h1" />
          <p className="lead mx-auto mt-5 max-w-lg text-cream/90">{p.cta.texto}</p>
          <div className="mt-9">
            <Button to={p.cta.boton.to} size="lg">
              {p.cta.boton.label}
            </Button>
          </div>
        </div>
      </PhotoBand>
    </>
  )
}
