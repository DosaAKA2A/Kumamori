import { experienciasPage as p } from '../content/site'
import { Fade, Words } from '../components/ui/Reveal'
import { Rich } from '../components/ui/Rich'
import { Watermarks } from '../components/ui/Watermarks'
import { Textura } from '../components/ui/Textura'
import { Sticker } from '../components/ui/Sticker'
import { TLink } from '../components/layout/Transition'
import { photo } from '../lib/hooks'

export function Experiencias() {
  return (
    <>
      <Cabecera />
      <Testimonios />
    </>
  )
}

const COLUMNAS = [77, 612, 1147]

/* "¿Qué se puede hacer en Kumamori?": titular centrado, dibujos de fondo y tres tarjetas con foto. */
function Cabecera() {
  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame wrap-m pb-16 pt-28 dk:uh-1376 dk:p-0">
        <Watermarks
          marcas={[
            { icono: 'teacup', x: -36, y: 65, h: 302 },
            { icono: 'cake', x: 181, y: 270, h: 210 },
            { icono: 'chasen', x: 1335, y: 28, h: 349, rot: 15 },
            { icono: 'iced-drink', x: 1524, y: 231, h: 264 },
            { icono: 'leaves', x: -69, y: 447, h: 240, rot: -20 },
            { icono: 'flower-hatched-2', x: 1384, y: 470, h: 190, rot: 20 },
          ]}
        />
        <Words
          as="h1"
          text={p.titulo}
          className="display relative text-center text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:inset-x-0 dk:uy-214 dk:ut-60"
        />
        <p className="relative mx-auto mt-5 max-w-[34ch] text-center text-[1.125rem] leading-[1.32] dk:absolute dk:inset-x-0 dk:uy-396 dk:mt-0 dk:max-w-none dk:ut-25">
          <Rich text={p.texto} breaks="desktop" />
        </p>
        <div className="relative mt-10 grid gap-6 sm:grid-cols-2 dk:static dk:mt-0 dk:block">
          {p.items.map((it, i) => (
            <article
              key={it.id}
              className="dk:absolute dk:uy-578 dk:uw-505 dk:[left:calc(var(--x)*var(--u))]"
              style={{ ['--x' as string]: COLUMNAS[i] }}
            >
              <Fade delay={i * 0.08} className="flex h-full flex-col">
                <div className="relative aspect-[505/296] overflow-hidden rounded-t-[24px] dk:urt-30">
                  <img src={photo(it.foto.src)} alt={it.foto.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={505} height={296} />
                </div>
                <div className="flex-1 rounded-b-[24px] bg-matcha px-6 pb-7 pt-6 dk:relative dk:uh-319 dk:flex-none dk:urb-30 dk:p-0">
                  <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-1 dk:absolute dk:ux-34 dk:uy-40 dk:ugapx-12 dk:whitespace-nowrap">
                    <span className="text-[1.5rem] font-extrabold leading-none dk:ut-30">{it.nombre}</span>
                    <span className="text-[0.875rem] leading-none text-bark/50 dk:ut-15">{it.personas}</span>
                  </h2>
                  <p className="mt-5 text-[1.0625rem] leading-[1.3] dk:absolute dk:ux-34 dk:uy-101 dk:uw-389 dk:mt-0 dk:ut-20">
                    <Rich text={it.texto} breaks="desktop" />
                  </p>
                  <TLink
                    to={`/reservas/nueva?espacio=${it.espacio}&extra=${it.extra}`}
                    className="mt-5 inline-block text-[1.0625rem] font-medium leading-[1.3] underline decoration-1 underline-offset-[0.25em] transition-colors hover:text-cream dk:absolute dk:ux-34 dk:uy-245 dk:mt-0 dk:ut-20"
                  >
                    {p.verMas}
                    <span className="sr-only"> sobre {it.nombre}</span>
                  </TLink>
                </div>
              </Fade>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* Testimonios: espuma de café con velo, radio arriba y tres tarjetas con retrato, sticker y estrellas. */
const TARJETAS = [
  { x: 74, avatar: 110, texto: 110, sticker: { x: 421, y: 389, h: 117, rot: 20 } },
  { x: 609, avatar: 645, texto: 653, sticker: { x: 952, y: 397, h: 98, rot: 15 } },
  { x: 1144, avatar: 1187, texto: 1195, sticker: { x: 1488, y: 390, h: 111, rot: 5 } },
]

function Testimonios() {
  const t = p.testimonios
  return (
    <section className="bg-cream">
      <div className="relative overflow-hidden rounded-t-[24px] text-cream dk:urt-30">
        <Textura src="latte-textura-1.webp" x={-144} y={-191} w={2017} h={1345} velo="rgba(48, 36, 29, 0.47)" />
        <div className="frame wrap-m relative pb-16 pt-16 dk:uh-1000 dk:p-0">
          <Words text={t.titulo} className="display text-center text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:inset-x-0 dk:uy-95 dk:ut-70" />
          <p className="mx-auto mt-4 max-w-[34ch] text-center text-[1.125rem] leading-[1.32] dk:absolute dk:inset-x-0 dk:uy-192 dk:mt-0 dk:max-w-none dk:ut-30">
            <Rich text={t.texto} breaks="desktop" />
          </p>
          <ul className="mt-16 grid gap-20 sm:grid-cols-2 sm:gap-x-6 dk:static dk:mt-0 dk:block">
            {t.items.map((it, i) => {
              const c = TARJETAS[i]
              return (
                <li key={it.nombre} className="relative text-bark dk:static">
                  <Fade delay={i * 0.08} y={24}>
                    {/* base crema (franja de las estrellas) y cuerpo verde */}
                    <div
                      className="absolute inset-x-0 bottom-0 top-10 rounded-[24px] bg-cream dk:inset-auto dk:uy-785 dk:uw-505 dk:uh-164 dk:urad-30 dk:[left:calc(var(--x)*var(--u))]"
                      style={{ ['--x' as string]: c.x }}
                      aria-hidden
                    />
                    <div
                      className="absolute inset-x-0 bottom-16 top-10 rounded-[24px] bg-matcha dk:inset-auto dk:uy-398 dk:uw-505 dk:uh-457 dk:urad-30 dk:[left:calc(var(--x)*var(--u))]"
                      style={{ ['--x' as string]: c.x }}
                      aria-hidden
                    />
                    <img
                      src={photo(it.foto)}
                      alt=""
                      className="relative ml-6 size-[120px] rounded-full object-cover dk:absolute dk:ml-0 dk:uy-330 dk:usz-194 dk:[left:calc(var(--x)*var(--u))]"
                      style={{ ['--x' as string]: c.avatar }}
                      width={194}
                      height={194}
                      loading="lazy"
                    />
                    {/* en móvil el sticker se dibuja con su propia escala */}
                    <div className="absolute right-4 top-0 h-[110px] w-[120px] [--u:0.75px] dk:static dk:h-auto dk:w-auto dk:[--u:inherit]">
                      <Sticker
                        icono={it.icono}
                        x={c.sticker.x}
                        y={c.sticker.y}
                        h={c.sticker.h}
                        rot={c.sticker.rot}
                        className="max-dk:!left-[22px] max-dk:!top-[18px]"
                      />
                    </div>
                    <div
                      className="relative px-6 pb-24 pt-5 dk:absolute dk:p-0 dk:uy-560 dk:uw-340 dk:[left:calc(var(--x)*var(--u))]"
                      style={{ ['--x' as string]: c.texto }}
                    >
                      <h3 className="text-[1.5rem] font-extrabold leading-none dk:ut-30">{it.nombre}</h3>
                      <p className="mt-1 text-[1rem] font-medium leading-[1.3] dk:mt-0 dk:ut-20">{it.experiencia}</p>
                      <p className="mt-5 text-[1rem] leading-[1.3] dk:umt-19 dk:uw-329 dk:ut-20">{it.texto}</p>
                    </div>
                    <div
                      className="absolute bottom-6 left-6 flex items-center gap-3 text-matcha-deep dk:bottom-auto dk:uy-883 dk:ugap-13 dk:[left:calc(var(--x)*var(--u))]"
                      style={{ ['--x' as string]: c.texto }}
                    >
                      <Estrellas n={it.estrellas} />
                      <span className="text-[1rem] font-semibold leading-none dk:ut-20">{it.estrellas} de 5</span>
                    </div>
                  </Fade>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

const STAR = 'M15.77 0.00 L19.50 11.46 L31.54 11.46 L21.80 18.54 L25.52 30.00 L15.77 22.92 L6.02 30.00 L9.75 18.54 L-0.00 11.46 L12.05 11.46Z'

/** Cinco estrellas de 30 px (grupo de 192 x 30 en la maqueta): llenas hasta n, la última vacía si falta. */
function Estrellas({ n }: { n: number }) {
  return (
    <span className="flex gap-[6px] dk:[gap:calc(8.5*var(--u))]" role="img" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 31.54 30" className="h-6 w-auto overflow-visible dk:uh-30" style={{ aspectRatio: '31.54 / 30' }} aria-hidden>
          <path
            d={STAR}
            fill={i < n ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={i < n ? 0 : 1.5}
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </span>
  )
}
