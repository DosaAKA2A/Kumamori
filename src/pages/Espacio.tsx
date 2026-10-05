import { espacioPage as p } from '../content/site'
import { HeroSplit } from '../components/ui/HeroSplit'
import { IconBand } from '../components/ui/IconBand'
import { Fade, Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Rich } from '../components/ui/Rich'
import { Watermarks } from '../components/ui/Watermarks'
import { Textura } from '../components/ui/Textura'
import { MaskIcon, type NombreIcono } from '../components/ui/MaskIcon'
import { photo } from '../lib/hooks'

const COLUMNAS = [68, 613, 1157]

export function Espacio() {
  return (
    <>
      <HeroSplit titulo={p.hero.titulo} texto={p.hero.texto} boton={p.hero.boton} foto={p.hero.foto} />
      <IconBand />
      <Zonas />
      <Comodidades />
      <Cta />
    </>
  )
}

/* "Conocé nuestros espacios": fondo matcha y tres tarjetas con foto arriba y cuerpo crema. */
function Zonas() {
  return (
    <section className="relative overflow-hidden bg-matcha text-bark">
      <div className="frame wrap-m pb-16 pt-12 dk:uh-900 dk:p-0">
        <Watermarks
          color="text-[#888f46]"
          marcas={[
            { icono: 'clover', x: 1360, y: -7, h: 140, rot: 60 },
            { icono: 'iced-drink', x: 1515, y: -57, h: 209 },
            { icono: 'dango', x: 1577, y: 167, h: 322, rot: -50 },
          ]}
        />
        <Words text={p.zonasTitulo} className="display text-[clamp(2rem,8.5vw,3rem)] dk:absolute dk:ux-89 dk:uy-91 dk:ut-60" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 dk:mt-0 dk:block">
          {p.zonas.map((z, i) => (
            <article
              key={z.nombre}
              className="dk:absolute dk:uy-202 dk:uw-504 dk:[left:calc(var(--x)*var(--u))]"
              style={{ ['--x' as string]: COLUMNAS[i] }}
            >
              <Fade delay={i * 0.08} className="flex h-full flex-col">
                <div className="relative aspect-[504/296] overflow-hidden rounded-t-[24px] dk:urt-30">
                  <img src={photo(z.foto.src)} alt={z.foto.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={504} height={296} />
                </div>
                <div className="flex-1 rounded-b-[24px] bg-cream px-6 pb-8 pt-6 dk:uh-320 dk:flex-none dk:urb-30 dk:upx-33 dk:upt-41 dk:pb-0">
                  <h3 className="text-[1.5rem] font-extrabold leading-none dk:ut-30">{z.nombre}</h3>
                  <p className="mt-6 text-[1.0625rem] leading-[1.3] dk:umt-30 dk:ut-20">
                    <Rich text={z.texto} breaks="desktop" />
                  </p>
                  <ul className="mt-[1.3em] text-[1.0625rem] font-semibold leading-[1.3] dk:ut-20">
                    {z.puntos.map((pt) => (
                      <li key={pt} className="relative pl-[1.55em] dk:pl-0 dk:uml-31">
                        <span className="absolute left-[0.55em] dk:-left-[calc(19*var(--u))]" aria-hidden>
                          •
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* "Nuestras comodidades": panel crema con radio arriba, título a la izquierda y seis servicios. */
function Comodidades() {
  const c = p.comodidades
  const cols = [485, 892, 1299]
  const filas = [101, 275]
  return (
    <section className="bg-matcha">
      <div className="rounded-t-[24px] bg-cream text-bark dk:urt-30">
        <div className="frame wrap-m py-14 dk:uh-500 dk:p-0">
          <Words text={c.titulo} className="display max-w-[12ch] text-[clamp(2rem,8.5vw,3rem)] dk:absolute dk:ux-48 dk:uy-150 dk:ut-50" />
          <p className="mt-4 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-48 dk:uy-297 dk:mt-0 dk:ut-25 dk:leading-none">
            <Rich text={c.texto} breaks="desktop" />
          </p>
          <ul className="mt-10 grid gap-7 sm:grid-cols-2 dk:mt-0 dk:block">
            {c.items.map((it, i) => (
              <li
                key={it.titulo}
                className="dk:absolute dk:[left:calc(var(--x)*var(--u))] dk:[top:calc(var(--y)*var(--u))]"
                style={{ ['--x' as string]: cols[i % 3], ['--y' as string]: filas[Math.floor(i / 3)] }}
              >
                <Fade delay={(i % 3) * 0.06} y={12} className="flex items-center gap-4 dk:block">
                  <span className="grid size-[88px] shrink-0 place-items-center rounded-full bg-matcha-soft text-bark dk:absolute dk:ux-0 dk:uy-0 dk:usz-120">
                    <MaskIcon name={it.icono as NombreIcono} mobileScale={0.75} />
                  </span>
                  <span className="block dk:absolute dk:ux-140 dk:uy-20 dk:whitespace-nowrap">
                    <span className="block text-[1.125rem] font-bold leading-none dk:ut-22.5">{it.titulo}</span>
                    <span className="mt-2 block text-[1rem] leading-[1.3] dk:umt-13 dk:ut-20">
                      <Rich text={it.texto} breaks="desktop" />
                    </span>
                  </span>
                </Fade>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

/* "¿Encontraste tu lugar?": textura de espuma con velo, radio arriba, texto centrado y el "Reservar" grande. */
function Cta() {
  const c = p.cta
  return (
    <section className="bg-cream">
      <div className="relative overflow-hidden rounded-t-[24px] text-cream dk:urt-30">
        <Textura src={c.foto} x={-38} y={-514} w={1814} h={1210} velo="rgba(48, 36, 29, 0.46)" />
        <div className="frame wrap-m relative py-20 text-center dk:uh-500 dk:p-0">
          <Words text={c.titulo} className="display text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:inset-x-0 dk:uy-119 dk:ut-70" />
          <p className="mx-auto mt-5 max-w-[36ch] text-[1.125rem] leading-[1.32] dk:absolute dk:inset-x-0 dk:uy-214 dk:mt-0 dk:max-w-none dk:ut-30">
            <Rich text={c.texto} breaks="desktop" />
          </p>
          <div className="mt-8 dk:absolute dk:ux-715 dk:uy-325 dk:mt-0">
            <Button to={c.boton.to} size="xl">
              {c.boton.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
