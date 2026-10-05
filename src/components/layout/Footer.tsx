import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { footer, site } from '../../content/site'
import { Rich } from '../ui/Rich'

/** Pie de la maqueta: boletín a la izquierda; marca, dirección, horario y correo alineados a la derecha. */
export function Footer() {
  const [estado, setEstado] = useState<'idle' | 'ok'>('idle')
  const n = footer.novedades

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    try {
      localStorage.setItem('km-novedades', String(data.get('correo') ?? ''))
    } catch {
      /* nada */
    }
    setEstado('ok')
  }

  return (
    <footer className="bg-bark text-cream">
      <div className="frame wrap-m flex flex-col gap-10 py-12 dk:block dk:uh-304 dk:py-0">
        <div className="dk:absolute dk:ux-87 dk:uy-53">
          <h2 className="text-[1.375rem] font-bold leading-none dk:ut-25">{n.titulo}</h2>
          <p className="mt-4 text-[0.875rem] font-medium leading-[1.33] dk:umt-22 dk:ut-15">
            <Rich text={n.texto} />
          </p>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          {estado === 'ok' ? (
            <motion.p
              key="ok"
              className="hand text-2xl text-matcha dk:absolute dk:ux-87 dk:uy-170 dk:ut-30"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {n.gracias}
            </motion.p>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              className="-mt-4 flex gap-2 dk:absolute dk:ux-87 dk:uy-159 dk:mt-0 dk:ugap-8"
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
                placeholder={n.placeholder}
                className="h-[52px] min-w-0 flex-1 rounded-[13px] bg-cream px-4 text-[0.9375rem] text-bark outline-none transition-shadow placeholder:text-bark/70 focus:shadow-[0_0_0_3px_var(--color-matcha)] dk:uh-60 dk:uw-250 dk:flex-none dk:urad-15 dk:upx-20 dk:ut-15"
              />
              <button
                type="submit"
                className="h-[52px] shrink-0 cursor-pointer rounded-full bg-matcha px-6 text-[0.9375rem] font-bold text-bark transition-colors hover:bg-cream dk:uh-60 dk:uw-140 dk:px-0 dk:ut-15"
              >
                {n.boton}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="text-[1.0625rem] leading-[1.3] dk:absolute dk:ur-87 dk:uy-0 dk:text-right dk:ut-20">
          <p className="font-bold dk:absolute dk:right-0 dk:uy-53 dk:whitespace-nowrap">{footer.marca}</p>
          <div className="mt-4 dk:absolute dk:right-0 dk:uy-137 dk:mt-0 dk:whitespace-nowrap">
            <p>{site.direccion}</p>
            <p>{site.horario.texto}</p>
            <a className="font-semibold underline decoration-1 underline-offset-[3px] transition-colors hover:text-matcha" href={`mailto:${site.correo}`}>
              {site.correo}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
