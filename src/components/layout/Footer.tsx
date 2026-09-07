import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { footer, nav, site } from '../../content/site'
import { Kana } from '../../brand/Logo'
import { TLink } from './Transition'

export function Footer() {
  const [estado, setEstado] = useState<'idle' | 'ok'>('idle')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const correo = String(data.get('correo') ?? '')
    try {
      localStorage.setItem('km-novedades', correo)
    } catch {
      /* nada */
    }
    setEstado('ok')
  }

  return (
    <footer className="on-bark relative overflow-hidden bg-bark text-cream">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-6">
          <h2 className="t-h3">{footer.novedades.titulo}</h2>
          <p className="mt-2 max-w-md text-cream/75">{footer.novedades.texto}</p>
          <AnimatePresence mode="wait" initial={false}>
            {estado === 'ok' ? (
              <motion.p
                key="ok"
                className="note mt-6 text-2xl text-matcha"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {footer.novedades.gracias}
              </motion.p>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                exit={{ opacity: 0, y: -8 }}
              >
                <label className="sr-only" htmlFor="novedades-correo">
                  Correo
                </label>
                <input
                  id="novedades-correo"
                  name="correo"
                  type="email"
                  required
                  placeholder={footer.novedades.placeholder}
                  className="input flex-1 border-cream/20 bg-cream/10 text-cream placeholder:text-cream/45 focus:bg-cream/15 focus:text-cream"
                />
                <button type="submit" className="btn">
                  {footer.novedades.boton}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-6 md:justify-items-end md:text-right">
          <div className="text-[0.95rem] leading-relaxed text-cream/75">
            <p className="font-bold text-cream">
              © {site.anio} {site.nombre}
            </p>
            <p>{site.direccion}</p>
            <p>{site.horario.texto}</p>
            <a className="underline underline-offset-4 hover:text-matcha" href={`mailto:${site.correo}`}>
              {site.correo}
            </a>
          </div>
          <nav className="flex flex-col gap-1 text-[0.95rem] md:items-end" aria-label="Secundaria">
            {nav.map((l) => (
              <TLink key={l.to} to={l.to} className="w-fit underline-offset-4 hover:underline">
                {l.label}
              </TLink>
            ))}
            {site.redes.map((r) => (
              <a key={r.nombre} href={r.url} target="_blank" rel="noreferrer" className="w-fit underline-offset-4 hover:underline">
                {r.nombre}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="wrap pointer-events-none" aria-hidden>
        <Kana className="h-auto w-full translate-y-[38%] text-cream/[0.07]" />
      </div>
    </footer>
  )
}
