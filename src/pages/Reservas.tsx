import { reservasPage as p } from '../content/site'
import { HeroSplit } from '../components/ui/HeroSplit'
import { Fade, Words } from '../components/ui/Reveal'
import { Rich } from '../components/ui/Rich'
import { Button } from '../components/ui/Button'
import { Watermarks } from '../components/ui/Watermarks'

const COLUMNAS = [68, 612, 1156]

export function Reservas() {
  return (
    <>
      <HeroSplit titulo={p.hero.titulo} texto={p.hero.texto} boton={p.hero.boton} foto={p.hero.foto} oscuro />
      <Pasos />
    </>
  )
}

/* Panel crema con radio arriba sobre el héroe oscuro: los tres pasos y "¿Qué te parece?". */
function Pasos() {
  return (
    <section className="bg-bark">
      <div className="relative overflow-hidden rounded-t-[24px] bg-cream text-bark dk:urt-30">
        <div className="frame wrap-m pb-16 pt-12 dk:uh-1068 dk:p-0">
          <Watermarks
            marcas={[
              { icono: 'paper-cup', x: 1493, y: 536, h: 252, rot: 20 },
              { icono: 'sprig', x: -49, y: 580, h: 205, rot: -30 },
              { icono: 'cha', x: 132, y: 759, h: 215 },
              { icono: 'purin', x: 1546, y: 801, h: 297, rot: 10 },
              { icono: 'chashaku', x: -65, y: 847, h: 185, rot: 15 },
              { icono: 'flower-five', x: 1339, y: 864, h: 154 },
            ]}
          />
          <Words text={p.pasosTitulo} className="display relative text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:ux-87 dk:uy-80 dk:ut-60" />
          <p className="relative mt-3 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-88 dk:uy-166 dk:mt-0 dk:ut-25">{p.pasosTexto}</p>
          <ol className="relative mt-8 grid gap-5 sm:grid-cols-3 dk:static dk:mt-0 dk:block">
            {p.pasos.map((s, i) => (
              <li
                key={s.titulo}
                className="dk:absolute dk:uy-249 dk:uw-504 dk:uh-319 dk:[left:calc(var(--x)*var(--u))]"
                style={{ ['--x' as string]: COLUMNAS[i] }}
              >
                <Fade delay={i * 0.08} className="h-full rounded-[24px] bg-matcha px-6 pb-7 pt-5 dk:relative dk:urad-30 dk:p-0">
                  <span className="hand block text-[3rem] text-matcha-deep origin-bottom-left -skew-x-[8deg] tracking-[-0.12em] dk:absolute dk:ux-27 dk:uy-36 dk:ut-104 dk:tracking-[-0.2em]" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-[1.75rem] font-extrabold leading-none dk:absolute dk:ux-34 dk:uy-148 dk:mt-0 dk:whitespace-nowrap dk:ut-50">{s.titulo}</h3>
                  <p className="mt-3 text-[1.0625rem] leading-[1.32] dk:absolute dk:ux-34 dk:uy-213 dk:mt-0 dk:whitespace-nowrap dk:ut-25">
                    <Rich text={s.texto} breaks="desktop" />
                  </p>
                </Fade>
              </li>
            ))}
          </ol>
          <div className="relative mt-16 text-center dk:static dk:mt-0">
            <Words text={p.cta.titulo} className="display text-[clamp(2.25rem,9vw,3.5rem)] dk:absolute dk:inset-x-0 dk:uy-678 dk:ut-70" />
            <p className="mt-4 text-[1.125rem] leading-[1.32] dk:absolute dk:inset-x-0 dk:uy-774 dk:mt-0 dk:ut-30">
              <Rich text={p.cta.texto} breaks="desktop" />
            </p>
            <div className="mt-8 dk:absolute dk:ux-716 dk:uy-884 dk:mt-0">
              <Button to={p.cta.boton.to} size="xl">
                {p.cta.boton.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
