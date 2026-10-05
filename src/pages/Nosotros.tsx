import { Fragment, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import clsx from 'clsx'
import { nosotrosPage as p, site } from '../content/site'
import { Bear } from '../brand/Bear'
import { Fade, Words } from '../components/ui/Reveal'
import { Rich } from '../components/ui/Rich'
import { IconBand } from '../components/ui/IconBand'
import { Watermarks } from '../components/ui/Watermarks'
import { MaskIcon, type NombreIcono } from '../components/ui/MaskIcon'
import { photo } from '../lib/hooks'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Nosotros() {
  return (
    <>
      <Manifiesto />
      <IconBand />
      <Visita />
    </>
  )
}

const PASTILLAS = [68, 473, 879, 1285]

/* "Un oso en el bosque": oso vivo, titular, manifiesto que se enciende palabra a palabra y los cuatro valores. */
function Manifiesto() {
  const texto = useRef<HTMLDivElement>(null)

  // Las palabras del manifiesto se encienden una tras otra cuando el bloque entra en pantalla.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const words = texto.current?.querySelectorAll('.word')
        if (!words?.length) return
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out',
            stagger: 0.022,
            scrollTrigger: { trigger: texto.current, start: 'top 88%', once: true },
          },
        )
      })
      return () => mm.revert()
    },
    { scope: texto },
  )

  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame wrap-m pb-14 pt-28 text-center dk:uh-1171 dk:p-0">
        <Watermarks
          marcas={[
            { icono: 'flower-hatched-2', x: -36, y: 94, h: 247, rot: 15 },
            { icono: 'flower-five', x: 1329, y: 62, h: 219 },
            { icono: 'purin', x: 1528, y: 153, h: 348, rot: 10 },
            { icono: 'chashaku', x: -21, y: 419, h: 226, rot: 15 },
            { icono: 'dango', x: 1508, y: 498, h: 394, rot: -60 },
            { icono: 'leaves', x: -153, y: 617, h: 317, rot: -20 },
          ]}
        />
        <Bear className="mx-auto h-auto w-20 text-bark/50 dk:absolute dk:ux-815 dk:uy-194 dk:uw-98 dk:uh-60" title="Oso de Kumamori" />
        <Words as="h1" text={p.titulo} className="display relative mt-5 text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:inset-x-0 dk:uy-286 dk:mt-0 dk:ut-60" />
        <p className="relative mt-2 text-[1.375rem] font-semibold leading-none dk:absolute dk:inset-x-0 dk:uy-351 dk:mt-0 dk:ut-30">{p.sub}</p>
        <div
          ref={texto}
          className="relative mx-auto mt-8 max-w-[40rem] text-[1.0625rem] leading-[1.32] dk:absolute dk:ux-457 dk:uy-436 dk:uw-814 dk:mt-0 dk:max-w-none dk:ut-25"
        >
          {[...p.parrafos, p.cierre].map((par, i, all) => (
            <p key={i} className={clsx(i > 0 && 'mt-[1.32em]', i === all.length - 1 && 'font-semibold')}>
              {par.split(/( |\n)/).map((w, j) =>
                w === ' ' ? (
                  <Fragment key={j}> </Fragment>
                ) : w === '\n' ? (
                  <Fragment key={j}>
                    <br className="hidden dk:inline" />
                    <span className="dk:hidden"> </span>
                  </Fragment>
                ) : (
                  <span key={j} className="word">
                    {w}
                  </span>
                ),
              )}
            </p>
          ))}
        </div>
        <ul className="relative mt-12 grid grid-cols-2 gap-3 text-left dk:static dk:mt-0 dk:block">
          {p.valores.map((v, i) => (
            <li
              key={v}
              className="dk:absolute dk:uy-892 dk:[left:calc(var(--x)*var(--u))]"
              style={{ ['--x' as string]: PASTILLAS[i] }}
            >
              <Fade delay={i * 0.07} y={14}>
                <span
                  className={clsx(
                    'flex h-20 items-center rounded-[16px] px-4 text-[1.25rem] font-extrabold leading-none transition-transform duration-300 ease-[var(--ease-expo)] hover:-translate-y-1 dk:uh-120 dk:uw-376 dk:upx-25 dk:ut-37 dk:[border-radius:calc(22.36*var(--u))]',
                    i % 2 ? 'bg-matcha-deep text-cream' : 'bg-matcha text-bark',
                  )}
                >
                  {v}
                </span>
              </Fade>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* "Vení a visitarnos" + "Y seguinos en nuestras redes". */
function Visita() {
  const v = p.visita
  const filas = [355, 486, 618]
  const iconos: { name: NombreIcono; x: number; y: number }[] = [
    { name: 'pin', x: 868, y: 361 },
    { name: 'reloj-contacto', x: 860, y: 491 },
    { name: 'tren', x: 864, y: 657 },
  ]
  const redes = [864, 1096, 1312]
  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame wrap-m py-14 dk:uh-1156 dk:p-0">
        <Watermarks
          marcas={[
            { icono: 'cha', x: 1288, y: -7, h: 235, rot: -5 },
            { icono: 'paper-cup', x: 1531, y: 207, h: 286, rot: 15 },
          ]}
        />
        <Words text={v.titulo} className="display relative text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:ux-87 dk:uy-105 dk:ut-60" />
        <p className="relative mt-3 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-88 dk:uy-189 dk:mt-0 dk:ut-25">{v.texto}</p>
        <Fade className="relative mt-8 dk:absolute dk:ux-99 dk:uy-272 dk:mt-0" y={0}>
          <img src={photo(v.mapa.src)} alt={v.mapa.alt} className="w-full dk:uw-561 dk:uh-505" width={561} height={505} loading="lazy" />
        </Fade>
        <span className="hidden rounded-full bg-matcha dk:absolute dk:block dk:ux-761 dk:uy-272 dk:uw-8 dk:uh-504" aria-hidden />
        <address className="relative mt-10 not-italic dk:static dk:mt-0">
          <p className="text-[1.75rem] font-bold leading-none dk:absolute dk:ux-946 dk:uy-278 dk:ut-40">{v.nombre}</p>
          <ul className="mt-6 space-y-6 dk:mt-0 dk:space-y-0">
            {v.datos.map((d, i) => (
              <li key={i} className="flex gap-4 dk:static dk:block">
                <span className="w-10 shrink-0 pt-1 text-matcha-deep dk:absolute dk:w-auto dk:pt-0 dk:[left:calc(var(--x)*var(--u))] dk:[top:calc(var(--y)*var(--u))]" style={{ ['--x' as string]: iconos[i].x, ['--y' as string]: iconos[i].y }}>
                  <MaskIcon name={iconos[i].name} mobileScale={0.6} />
                </span>
                <span
                  className="block text-[1.0625rem] leading-[1.32] dk:absolute dk:ux-946 dk:ut-25 dk:[top:calc(var(--y)*var(--u))]"
                  style={{ ['--y' as string]: filas[i] }}
                >
                  {d.lineas.map((l, j) => (
                    <span key={j} className={clsx('block', l.fuerte && 'font-semibold')}>
                      {l.t}
                      {l.gris && <span className="text-bark/50"> {l.gris}</span>}
                    </span>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </address>

        <Words text={p.redes.titulo} className="display relative mt-16 max-w-[13ch] text-[clamp(2rem,8.5vw,3.25rem)] dk:absolute dk:ux-87 dk:uy-887 dk:mt-0 dk:max-w-none dk:ut-60" />
        <p className="relative mt-3 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-88 dk:uy-1021 dk:mt-0 dk:ut-25">
          <Rich text={p.redes.texto} />
        </p>
        <ul className="relative mt-8 grid grid-cols-3 gap-3 dk:static dk:mt-0 dk:block">
          {site.redes.map((r, i) => (
            <li key={r.nombre} className="dk:absolute dk:uy-907 dk:[left:calc(var(--x)*var(--u))]" style={{ ['--x' as string]: redes[i] }}>
              <a href={r.url} target="_blank" rel="noreferrer" className="group block">
                <span className="block text-matcha-deep transition-transform duration-300 ease-[var(--ease-expo)] group-hover:-translate-y-1">
                  <MaskIcon name={r.icono as NombreIcono} mobileScale={0.7} />
                </span>
                <span className="mt-3 block text-[1.25rem] font-bold leading-none dk:umt-14 dk:ut-30">{r.nombre}</span>
                <span className="mt-1 block text-[0.9375rem] leading-[1.32] group-hover:underline dk:umt-3 dk:ut-25">{r.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
