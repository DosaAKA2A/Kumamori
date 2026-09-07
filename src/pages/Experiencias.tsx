import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import clsx from 'clsx'
import { experienciasPage as p } from '../content/site'
import { photo } from '../lib/hooks'
import { BrandIcon } from '../brand/Icon'
import { SectionHead } from '../components/ui/Section'
import { Watermarks } from '../components/ui/Watermarks'
import { Button } from '../components/ui/Button'

export function Experiencias() {
  const [abierta, setAbierta] = useState<string | null>(null)

  return (
    <>
      <section className="relative bg-cream text-bark">
        <Watermarks
          marcas={[
            { icono: 'chasen', className: 'left-[5%] top-[12rem] w-32 -rotate-12 opacity-[0.06]' },
            { icono: 'melonpan', className: 'right-[5%] top-[9rem] w-40 rotate-6 opacity-[0.05]' },
            { icono: 'dango', className: 'bottom-[4%] left-[3%] w-32 rotate-6 opacity-[0.05]' },
          ]}
        />
        <div className="wrap pt-[8.5rem] md:pt-[11rem]">
          <SectionHead as="h1" size="t-h1" nota={p.hero.nota} titulo={p.hero.titulo} texto={p.hero.texto} align="center" className="max-w-3xl" />
        </div>
        <div className="wrap grid gap-6 pb-24 pt-24 md:grid-cols-3 md:pb-32 md:pt-28">
          {p.items.map((x) => {
            const open = abierta === x.id
            return (
              <motion.article
                key={x.id}
                layout
                className="on-green relative flex flex-col rounded-sticker bg-matcha-deep p-7 pt-20 text-cream"
                transition={{ layout: { type: 'spring', stiffness: 260, damping: 30 } }}
              >
                <motion.div layout="position" className="absolute -top-12 left-7 h-28 w-28 rounded-full ring-[10px] ring-cream" aria-hidden>
                  <img src={photo(x.foto)} alt="" className="h-full w-full rounded-full object-cover" loading="lazy" />
                  <span className="absolute -bottom-1 -right-2 grid h-12 w-12 place-items-center rounded-full bg-matcha text-bark ring-4 ring-cream">
                    <BrandIcon name={x.icono} className="h-7 w-7" />
                  </span>
                </motion.div>
                <motion.div layout="position">
                  <h2 className="t-h3">{x.nombre}</h2>
                  <p className="note mt-1 text-[1.35rem] leading-tight text-matcha">{x.sub}</p>
                  <p className="mt-5 text-cream/85">{x.texto}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Incluye">
                    {x.incluye.map((i) => (
                      <li key={i.label} title={i.label} className="grid h-11 w-11 place-items-center rounded-xl bg-cream/12 text-cream">
                        <BrandIcon name={i.icono} className="h-7 w-7" title={i.label} />
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="det"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 space-y-1.5 border-t border-cream/15 pt-5 text-[0.95rem] font-semibold">
                        {x.incluye.map((i) => (
                          <li key={i.label} className="flex gap-2.5">
                            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-matcha" aria-hidden />
                            {i.label}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[0.95rem] text-cream/80">
                        {x.duracion} · {x.personas}
                      </p>
                      <div className="mt-5">
                        <Button to={`/reservas/nueva?extra=${x.extra}&espacio=${x.espacio}`} size="sm">
                          Reservar con esta experiencia
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  layout="position"
                  type="button"
                  onClick={() => setAbierta(open ? null : x.id)}
                  aria-expanded={open}
                  className={clsx('mt-6 w-fit font-bold underline decoration-2 underline-offset-[6px] transition-colors hover:decoration-matcha')}
                >
                  {open ? 'Ver menos' : 'Ver qué incluye'}
                </motion.button>
              </motion.article>
            )
          })}
        </div>
      </section>
    </>
  )
}
