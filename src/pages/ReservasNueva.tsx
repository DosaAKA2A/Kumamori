import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from 'react'
import { useBlocker, useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { formulario as f, reservaOpciones as op, site } from '../content/site'
import { Words } from '../components/ui/Reveal'
import { Rich } from '../components/ui/Rich'
import { IconBand } from '../components/ui/IconBand'
import { Watermarks } from '../components/ui/Watermarks'
import { useGo, useSetGuard } from '../components/layout/Transition'
import { fechaCompleta, fechaCorta, fromISO, hoy, MESES, capitalizar, semanasMes, toISO } from '../lib/dates'
import { descargarICS, enviarReserva, generarCodigo, reservaICS, type Reserva } from '../lib/reservas'

type Datos = Omit<Reserva, 'codigo' | 'creada'>
const vacio: Datos = { nombre: '', correo: '', telefono: '', espacio: '', personas: '', duracion: '', extra: '', fecha: '', hora: '' }

type Item = { id: string; label?: string; nombre?: string }
const nombreDe = (lista: Item[], id: string) => {
  const x = lista.find((o) => o.id === id)
  return x?.nombre ?? x?.label ?? ''
}

/** posición en px de diseño (solo se aplica en escritorio vía las clases dk:[...]) */
const pos = (x: number, y: number) => ({ ['--x' as string]: x, ['--y' as string]: y }) as CSSProperties
const ABS = 'dk:absolute dk:[left:calc(var(--x)*var(--u))] dk:[top:calc(var(--y)*var(--u))]'

export function ReservasNueva() {
  const [params] = useSearchParams()
  const inicial = useMemo<Datos>(() => ({ ...vacio, espacio: params.get('espacio') ?? '', extra: params.get('extra') ?? '' }), [params])
  const [d, setD] = useState<Datos>(inicial)
  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => setD((s) => ({ ...s, [k]: v }))
  const [intento, setIntento] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [hecha, setHecha] = useState<Reserva | null>(null)

  const errores = useMemo(() => validar(d), [d])
  const valido = Object.keys(errores).length === 0
  const sucio = !hecha && (Object.keys(d) as (keyof Datos)[]).some((k) => d[k] !== inicial[k])

  /* ---------- aviso "¿Querés salir?" ---------- */
  const go = useGo()
  const setGuard = useSetGuard()
  const permitir = useRef(false)
  const [salirA, setSalirA] = useState<string | null>(null)
  const blocker = useBlocker(({ currentLocation, nextLocation }) => sucio && !permitir.current && currentLocation.pathname !== nextLocation.pathname)

  useEffect(() => {
    setGuard(
      sucio
        ? (to) => {
            if (to.split('?')[0] === '/reservas/nueva') return false
            setSalirA(to)
            return true
          }
        : null,
    )
    return () => setGuard(null)
  }, [sucio, setGuard])

  useEffect(() => {
    if (!sucio) return
    const onUnload = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [sucio])

  const popupAbierto = salirA !== null || blocker.state === 'blocked'
  const seguir = () => {
    setSalirA(null)
    if (blocker.state === 'blocked') blocker.reset()
  }
  const salir = () => {
    permitir.current = true
    if (blocker.state === 'blocked') blocker.proceed()
    else if (salirA) go(salirA, true)
    setSalirA(null)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIntento(true)
    if (!valido) {
      document.querySelector<HTMLElement>('[aria-invalid="true"], [data-falta="true"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setEnviando(true)
    const r = await enviarReserva({ ...d, extra: d.extra || 'ninguno', codigo: generarCodigo(), creada: new Date().toISOString() })
    setEnviando(false)
    setHecha(r)
    window.scrollTo({ top: 0 })
  }

  if (hecha) return <Confirmacion reserva={hecha} />

  const err = (k: keyof Datos) => (intento ? errores[k] : undefined)
  const b = f.bloques

  return (
    <>
      <Cabecera />
      <IconBand />
      <section className="relative bg-cream text-bark">
        <form className="frame wrap-m pb-16 pt-12 dk:uh-2400 dk:p-0" onSubmit={onSubmit} noValidate>
          <div className="space-y-14 dk:space-y-0">
            <Bloque n={1} titulo={b.datos.titulo} texto={b.datos.texto} cap={115} falta={intento && !!(errores.nombre || errores.correo || errores.telefono)}>
              <div className={clsx('grid gap-4 sm:grid-cols-2 dk:grid-cols-[repeat(2,calc(502*var(--u)))] dk:ugapx-28 dk:ugapy-28', ABS)} style={pos(83, 192)}>
                <Campo label={f.campos.nombre} error={err('nombre')}>
                  <input className={campoCls(!!d.nombre, !!err('nombre'))} value={d.nombre} onChange={(e) => set('nombre', e.target.value)} autoComplete="name" aria-invalid={!!err('nombre')} placeholder={f.campos.nombre} />
                </Campo>
                <Campo label={f.campos.correo} error={err('correo')}>
                  <input className={campoCls(!!d.correo, !!err('correo'))} type="email" value={d.correo} onChange={(e) => set('correo', e.target.value)} autoComplete="email" aria-invalid={!!err('correo')} placeholder={f.campos.correo} />
                </Campo>
                <Campo label={f.campos.telefono} error={err('telefono')}>
                  <input className={campoCls(!!d.telefono, !!err('telefono'))} type="tel" value={d.telefono} onChange={(e) => set('telefono', e.target.value)} autoComplete="tel" aria-invalid={!!err('telefono')} placeholder={f.campos.telefono} />
                </Campo>
                <Campo label={f.campos.extra}>
                  <span className="relative block">
                    <select className={clsx(campoCls(!!d.extra, false), 'cursor-pointer appearance-none pr-10', !d.extra && 'text-bark/50')} value={d.extra} onChange={(e) => set('extra', e.target.value)}>
                      <option value="">{f.campos.extra}</option>
                      {op.extras.map((x) => (
                        <option key={x.id} value={x.id}>
                          {x.nombre}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-bark/50" aria-hidden />
                  </span>
                </Campo>
              </div>
            </Bloque>

            <Bloque n={2} titulo={b.espacio.titulo} texto={b.espacio.texto} cap={437} falta={intento && !d.espacio}>
              <Tarjetas name="espacio" opciones={op.espacios} value={d.espacio} onChange={(v) => set('espacio', v)} y={515} />
            </Bloque>

            <Bloque n={3} titulo={b.personas.titulo} texto={b.personas.texto} cap={867} falta={intento && !d.personas}>
              <Opciones name="personas" opciones={op.personas} value={d.personas} onChange={(v) => set('personas', v)} y={944} />
            </Bloque>

            <Bloque n={4} titulo={b.duracion.titulo} texto={b.duracion.texto} cap={1099} falta={intento && !d.duracion}>
              <Opciones name="duracion" opciones={op.duraciones} value={d.duracion} onChange={(v) => set('duracion', v)} y={1176} />
            </Bloque>

            <Bloque n={5} titulo={b.extra.titulo} texto={b.extra.texto} cap={1331}>
              <Tarjetas name="extra" opciones={op.extras} value={d.extra} onChange={(v) => set('extra', v)} y={1409} />
            </Bloque>

            <Bloque n={6} titulo={b.fecha.titulo} texto={b.fecha.texto} cap={1762} falta={intento && (!d.fecha || !d.hora)}>
              <div className="grid gap-10 sm:grid-cols-2 dk:block">
                <Calendario value={d.fecha} onChange={(v) => setD((s) => ({ ...s, fecha: v, hora: horaValida(v, s.duracion, s.hora) }))} />
                <Horarios fecha={d.fecha} duracion={d.duracion} value={d.hora} onChange={(v) => set('hora', v)} />
              </div>
            </Bloque>
          </div>

          <Resumen d={d} enviando={enviando} />
        </form>
      </section>

      <AnimatePresence>{popupAbierto && <Salir onSeguir={seguir} onSalir={salir} />}</AnimatePresence>
    </>
  )
}

/* ---------- Validación ---------- */
function validar(d: Datos) {
  const e: Partial<Record<keyof Datos, string>> = {}
  if (d.nombre.trim().length < 2) e.nombre = 'Necesitamos tu nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo.trim())) e.correo = 'Revisá el correo.'
  if (d.telefono.replace(/\D/g, '').length < 6) e.telefono = 'Un teléfono con al menos 6 números.'
  if (!d.espacio) e.espacio = 'Elegí un espacio.'
  if (!d.personas) e.personas = 'Elegí cuántas personas.'
  if (!d.duracion) e.duracion = 'Elegí la duración.'
  if (!d.fecha) e.fecha = 'Elegí un día.'
  if (!d.hora) e.hora = 'Elegí un horario.'
  return e
}

/* ---------- Héroe: "Reservar un lugar es muy simple" y las condiciones ---------- */
function Cabecera() {
  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame wrap-m pb-12 pt-28 dk:uh-514 dk:p-0">
        <Watermarks
          marcas={[
            { icono: 'flower-hatched', x: 1250, y: 117, h: 212, rot: 45 },
            { icono: 'flower-five', x: 1543, y: 89, h: 155 },
            { icono: 'sprig', x: 1446, y: 267, h: 208, rot: -30 },
          ]}
        />
        <Words as="h1" text={f.titulo} className="display relative text-[clamp(2.25rem,9.5vw,3.25rem)] dk:absolute dk:ux-87 dk:uy-185 dk:whitespace-nowrap dk:ut-60" />
        <p className="relative mt-5 text-[1.125rem] leading-[1.32] dk:absolute dk:ux-88 dk:uy-396 dk:uw-513 dk:mt-0 dk:ut-25">{f.texto}</p>
        <ul className="relative mt-8 space-y-2 text-[1.0625rem] leading-[1.32] dk:absolute dk:ux-681 dk:uy-256 dk:uw-879 dk:mt-0 dk:space-y-0 dk:ut-25">
          {f.condiciones.map((c) => (
            <li key={c} className="relative pl-6 dk:upl-38">
              <span className="absolute left-1 dk:ux-14" aria-hidden>
                •
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- Piezas del formulario ---------- */
function Bloque({ n, titulo, texto, cap, falta, children }: { n: number; titulo: string; texto: string; cap: number; falta?: boolean; children: ReactNode }) {
  return (
    <fieldset className="min-w-0" data-falta={falta ? 'true' : undefined}>
      <legend className={clsx('flex items-baseline gap-3 dk:ugap-24', ABS)} style={pos(81, cap - 9)}>
        <span className="hand origin-bottom-left -skew-x-[8deg] text-[2rem] tracking-[-0.12em] text-matcha dk:ut-42 dk:tracking-[-0.2em]" aria-hidden>
          {String(n).padStart(2, '0')}
        </span>
        <span className="text-[1.375rem] font-bold uppercase leading-none dk:ut-30">{titulo}</span>
      </legend>
      <p className={clsx('mt-1 flex flex-wrap items-baseline gap-x-4 text-[0.9375rem] leading-[1.3] dk:ut-20', ABS)} style={pos(84, cap + 24)}>
        <span>{texto}</span>
        {falta && <span className="font-semibold text-[#a3432a]">Falta completar esto.</span>}
      </p>
      <div className="mt-5 dk:mt-0">{children}</div>
    </fieldset>
  )
}

const campoCls = (lleno: boolean, error: boolean) =>
  clsx(
    'h-14 w-full rounded-[10px] border-2 px-[18px] text-[1rem] text-bark outline-none transition-colors duration-200 placeholder:text-bark/50 hover:placeholder:text-bark/70',
    'dk:uh-62 dk:uw-502 dk:urad-10 dk:upx-18 dk:ut-18',
    lleno ? 'bg-matcha-soft' : 'bg-sand hover:bg-cream focus:bg-matcha-soft',
    error ? 'border-[#a3432a]' : 'border-bark/50 focus:border-bark',
  )

function Campo({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[0.875rem] font-semibold text-[#a3432a] dk:absolute dk:left-0 dk:top-full dk:umt-2 dk:ut-15">{error}</span>}
    </label>
  )
}

type Opcion = { id: string; label?: string; nombre?: string; texto?: string }

/** Tarjetas de espacio y de experiencia: arena por defecto, crema al pasar y matcha al 50 % elegida. */
function Tarjetas({ name, opciones, value, onChange, y }: { name: string; opciones: Opcion[]; value: string; onChange: (v: string) => void; y: number }) {
  return (
    <div role="radiogroup" className={clsx('grid gap-4 sm:grid-cols-3 dk:flex dk:ugap-30', ABS)} style={pos(84, y)}>
      {opciones.map((o) => {
        const sel = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={sel}
            onClick={() => onChange(sel && name === 'extra' ? '' : o.id)}
            className={clsx(
              'group relative overflow-hidden rounded-[24px] border border-bark/50 px-5 pb-6 pt-5 text-left transition-colors duration-200 dk:uw-363 dk:uh-258 dk:shrink-0 dk:urad-30 dk:p-0',
              sel ? 'bg-sand' : 'bg-sand hover:bg-cream',
            )}
          >
            {sel && <motion.span layoutId={`sel-${name}`} className="absolute inset-0 bg-matcha-soft" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
            <span className="relative block text-[1.5rem] font-extrabold leading-none dk:absolute dk:ux-19 dk:uy-61 dk:ut-35">{o.nombre}</span>
            <span className="relative mt-3 block text-[1.0625rem] leading-[1.28] dk:absolute dk:ux-19 dk:uy-135 dk:mt-0 dk:uw-321 dk:ut-25">{o.texto}</span>
          </button>
        )
      })}
    </div>
  )
}

/** Opciones de 250 x 60 (personas y duración). */
function Opciones({ name, opciones, value, onChange, y }: { name: string; opciones: Opcion[]; value: string; onChange: (v: string) => void; y: number }) {
  return (
    <div role="radiogroup" className={clsx('grid grid-cols-2 gap-3 sm:grid-cols-4 dk:flex dk:ugap-28', ABS)} style={pos(84, y)}>
      {opciones.map((o) => {
        const sel = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={sel}
            onClick={() => onChange(o.id)}
            className={clsx(
              'relative h-14 overflow-hidden rounded-[10px] border border-bark/50 px-4 text-left text-[1rem] leading-none transition-colors duration-200 dk:uw-252 dk:uh-62 dk:shrink-0 dk:urad-10 dk:upx-19 dk:ut-18',
              sel ? 'bg-sand' : 'bg-sand hover:bg-cream',
            )}
          >
            {sel && <motion.span layoutId={`sel-${name}`} className="absolute inset-0 bg-matcha-soft" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="relative">{o.label}</span>
          </button>
        )
      })}
    </div>
  )
}

const horasDe = (duracion: string) => op.duraciones.find((x) => x.id === duracion)?.horas ?? 1

/** Horarios posibles: desde una hora después de abrir hasta que la estadía termine antes del cierre. */
function horarios(fecha: string, duracion: string) {
  const horas = horasDe(duracion)
  const esHoy = fecha && fecha === toISO(hoy())
  const ahora = new Date().getHours()
  const out: { h: string; ok: boolean }[] = []
  for (let h = site.horario.apertura + 1; h + horas <= site.horario.cierre; h++) out.push({ h: `${String(h).padStart(2, '0')}:00`, ok: !(esHoy && h <= ahora) })
  return out
}
const horaValida = (fecha: string, duracion: string, hora: string) => (horarios(fecha, duracion).some((x) => x.h === hora && x.ok) ? hora : '')

function Calendario({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const h = hoy()
  const [vista, setVista] = useState(() => (value ? fromISO(value) : h))
  const y = vista.getFullYear(), m = vista.getMonth()
  const limite = new Date(h.getFullYear(), h.getMonth(), h.getDate() + 60)
  const puedeAtras = new Date(y, m, 1) > new Date(h.getFullYear(), h.getMonth(), 1)
  const puedeAdelante = new Date(y, m + 1, 1) <= limite
  const habil = (d: Date) => d >= h && d <= limite && site.horario.dias.includes(d.getDay())
  const celdas = semanasMes(y, m)

  return (
    <div className={clsx('relative dk:uw-480', ABS)} style={pos(84, 1839)}>
      <div className="flex items-center justify-between dk:block">
        <p className="text-[1.25rem] font-semibold leading-none dk:absolute dk:ux-0 dk:uy-12 dk:whitespace-nowrap dk:ut-25">
          {capitalizar(MESES[m])} {y}
        </p>
        <div className="flex gap-2 dk:absolute dk:ux-357 dk:uy-1 dk:ugap-10">
          {[
            { lbl: 'Mes anterior', ok: puedeAtras, to: new Date(y, m - 1, 1), Icon: ArrowLeft },
            { lbl: 'Mes siguiente', ok: puedeAdelante, to: new Date(y, m + 1, 1), Icon: ArrowRight },
          ].map(({ lbl, ok, to, Icon }) => (
            <button
              key={lbl}
              type="button"
              className="grid size-10 place-items-center rounded-full transition-colors hover:bg-sand disabled:opacity-30 disabled:hover:bg-transparent dk:usz-48"
              onClick={() => setVista(to)}
              disabled={!ok}
              aria-label={lbl}
            >
              <Icon className="size-6 dk:usz-40" strokeWidth={2.4} />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-1.5 text-center text-[0.9375rem] leading-none dk:absolute dk:ux-0 dk:uy-78 dk:mt-0 dk:w-full dk:ugap-10 dk:ut-25" aria-hidden>
        {f.dias.map((dd) => (
          <span key={dd}>{dd}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5 dk:absolute dk:ux-0 dk:uy-131 dk:mt-0 dk:grid-cols-[repeat(7,calc(60*var(--u)))] dk:ugap-10" role="grid" aria-label="Calendario">
        {celdas.map(({ fecha, delMes }) => {
          const iso = toISO(fecha)
          const sel = iso === value
          const ok = delMes && habil(fecha)
          return (
            <button
              key={iso}
              type="button"
              disabled={!ok}
              onClick={() => onChange(iso)}
              aria-pressed={sel}
              aria-label={fechaCompleta(fecha)}
              className={clsx(
                'relative grid aspect-square place-items-center rounded-full bg-sand text-[1.0625rem] leading-none transition-colors duration-200 dk:usz-60 dk:ut-30',
                !delMes && 'bg-sand/50 text-bark/25',
                delMes && !ok && 'text-bark/35',
                ok && !sel && 'hover:bg-cream',
              )}
            >
              {sel && <motion.span layoutId="dia-sel" className="absolute inset-0 rounded-full bg-matcha-soft" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{fecha.getDate()}</span>
              {iso === toISO(hoy()) && <span className="absolute bottom-[14%] left-1/2 size-1 -translate-x-1/2 rounded-full bg-matcha-deep" aria-hidden />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Horarios({ fecha, duracion, value, onChange }: { fecha: string; duracion: string; value: string; onChange: (v: string) => void }) {
  const slots = useMemo(() => horarios(fecha, duracion), [fecha, duracion])
  return (
    <div role="radiogroup" aria-label="Horario" className={clsx('grid grid-cols-3 gap-2 dk:grid-cols-[repeat(3,calc(200*var(--u)))] dk:ugap-10', ABS)} style={pos(612, 1839)}>
      {slots.map((s) => {
        const sel = s.h === value
        return (
          <button
            key={s.h}
            type="button"
            role="radio"
            aria-checked={sel}
            disabled={!s.ok}
            onClick={() => onChange(s.h)}
            className={clsx(
              'relative h-12 overflow-hidden rounded-[10px] border border-bark/50 bg-sand text-[1.125rem] leading-[1.3] transition-colors duration-200 disabled:opacity-40 dk:uh-60 dk:urad-10 dk:ut-30',
              !sel && 'enabled:hover:bg-cream',
            )}
          >
            {sel && <motion.span layoutId="hora-sel" className="absolute inset-0 bg-matcha-soft" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{s.h}</span>
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Panel RESUMEN, pegado al borde derecho y fijo al hacer scroll ---------- */
function Resumen({ d, enviando }: { d: Datos; enviando: boolean }) {
  const r = f.resumen.filas
  const filas: [string, string][] = [
    [r.espacio, nombreDe(op.espacios, d.espacio)],
    [r.personas, nombreDe(op.personas, d.personas)],
    [r.duracion, nombreDe(op.duraciones, d.duracion)],
    [r.extra, nombreDe(op.extras, d.extra)],
    [r.fecha, d.fecha ? fechaCorta(fromISO(d.fecha)) : ''],
    [r.hora, d.hora],
  ]
  return (
    <div className="mt-14 dk:absolute dk:bottom-0 dk:uy-91 dk:mt-0 dk:[right:calc(-1*var(--gut))] dk:[width:calc(430*var(--u)+var(--gut))]">
      <aside
        className="rounded-[24px] bg-matcha p-6 text-bark dk:sticky dk:uh-1146 dk:rounded-r-none dk:url-30 dk:p-0 dk:[top:min(calc(130*var(--u)),calc(100vh-1146*var(--u)-16px))]"
        aria-label={f.resumen.titulo}
      >
        <h2 className="text-[1.625rem] font-extrabold uppercase leading-none dk:absolute dk:ux-50 dk:uy-97 dk:ut-35">{f.resumen.titulo}</h2>
        <span className="mt-4 block h-[4px] rounded-full bg-matcha-deep dk:absolute dk:ux-47 dk:uy-158 dk:mt-0 dk:uw-339 dk:uh-5" aria-hidden />
        <dl className="mt-5 space-y-4 dk:mt-0 dk:space-y-0">
          {filas.map(([k, v], i) => (
            <div key={k} className="dk:absolute dk:ux-50 dk:[top:calc((192.5+106*var(--i))*var(--u))]" style={{ ['--i' as string]: i }}>
              <dt className="text-[1.1875rem] leading-none dk:ut-31">{k}</dt>
              <dd className="mt-2 text-[1rem] leading-[1.3] dk:umt-9 dk:ut-20">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={v || '-'}
                    className={clsx('inline-block', v ? 'font-medium' : 'text-bark/50')}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                  >
                    {v || '–'}
                  </motion.span>
                </AnimatePresence>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-7 dk:absolute dk:ux-50 dk:uy-859 dk:mt-0">
          <motion.button
            type="submit"
            disabled={enviando}
            whileTap={{ scale: 0.96 }}
            className="inline-flex h-14 items-center justify-center rounded-full bg-matcha-deep px-10 text-[1.375rem] font-semibold leading-none text-cream transition-colors duration-200 hover:bg-bark disabled:opacity-70 dk:uw-286 dk:uh-100 dk:px-0 dk:ut-35"
          >
            {enviando ? f.resumen.enviando : f.resumen.boton}
          </motion.button>
        </div>
      </aside>
    </div>
  )
}

/* ---------- Popup "¿Querés salir?" ---------- */
function Salir({ onSeguir, onSalir }: { onSeguir: () => void; onSalir: () => void }) {
  const s = f.salir
  const seguirRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    seguirRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onSeguir()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onSeguir])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bark/50 px-5 dk:block dk:px-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onSeguir}
    >
      <motion.div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="salir-titulo"
        aria-describedby="salir-texto"
        className="relative w-full max-w-[420px] rounded-[24px] bg-cream px-6 pb-7 pt-8 text-center text-bark dk:absolute dk:left-1/2 dk:uy-213 dk:uw-600 dk:uh-634 dk:max-w-none dk:-translate-x-1/2 dk:urad-30 dk:p-0"
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg viewBox="0 0 104 97" className="mx-auto h-16 w-auto text-matcha-deep dk:absolute dk:ux-248 dk:uy-53 dk:uh-97 dk:mx-0" fill="none" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M96 8 V34 Q96 64 66 64 H14" />
          <path d="M40 38 L12 64 L40 90" />
        </svg>
        <h2 id="salir-titulo" className="mt-5 text-[1.75rem] font-extrabold leading-none dk:absolute dk:inset-x-0 dk:uy-200 dk:mt-0 dk:ut-50">
          {s.titulo}
        </h2>
        <p id="salir-texto" className="mx-auto mt-4 max-w-[30ch] text-[1rem] leading-[1.32] dk:absolute dk:inset-x-0 dk:uy-283 dk:mt-0 dk:max-w-none dk:ut-25 dk:leading-[1.2]">
          <Rich text={s.texto} breaks="desktop" />
        </p>
        <p className="mt-4 text-[1rem] font-bold leading-none dk:absolute dk:inset-x-0 dk:uy-414 dk:mt-0 dk:ut-24">{s.pregunta}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3 dk:absolute dk:ux-69 dk:uy-506 dk:mt-0 dk:flex-nowrap dk:ugap-38">
          <button
            ref={seguirRef}
            type="button"
            onClick={onSeguir}
            className="h-14 rounded-[16px] bg-matcha px-6 text-[1.125rem] font-bold text-bark transition-colors hover:bg-matcha-deep hover:text-cream dk:uh-78 dk:uw-278 dk:urad-20 dk:px-0 dk:ut-23"
          >
            {s.seguir}
          </button>
          <button
            type="button"
            onClick={onSalir}
            className="h-14 rounded-[16px] bg-bark px-8 text-[1.125rem] font-bold text-cream transition-colors hover:bg-matcha-deep dk:uh-78 dk:uw-141 dk:urad-20 dk:px-0 dk:ut-23"
          >
            {s.salir}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Confirmación con el sello hanko ---------- */
function Confirmacion({ reserva: r }: { reserva: Reserva }) {
  const c = f.confirmacion
  const horas = horasDe(r.duracion)
  const ics = () => descargarICS(`kumamori-${r.codigo}.ics`, reservaICS(r, horas, `${nombreDe(op.espacios, r.espacio)} · ${r.hora}`))
  const datos: [string, string][] = [
    [c.filas.nombre, r.nombre],
    [c.filas.espacio, nombreDe(op.espacios, r.espacio)],
    [c.filas.personas, nombreDe(op.personas, r.personas)],
    [c.filas.extra, nombreDe(op.extras, r.extra)],
    [c.filas.fecha, fechaCompleta(fromISO(r.fecha))],
    [c.filas.hora, `A partir de las ${r.hora} - ${nombreDe(op.duraciones, r.duracion)}`],
  ]
  const base = import.meta.env.BASE_URL
  const trazos = `url(${base}iconos/trazos.png)`

  return (
    <section className="relative overflow-hidden bg-cream text-bark">
      <div className="frame wrap-m pb-16 pt-28 dk:uh-1118 dk:p-0">
        {/* trazos de pincel del fondo: aparecen cuando el sello ya cayó */}
        <motion.div
          className="pointer-events-none absolute hidden bg-[#dedcb3] dk:block dk:ux-780 dk:uy-110 dk:uw-948 dk:uh-1008 dk:opacity-100"
          style={{ WebkitMaskImage: trazos, maskImage: trazos, WebkitMaskSize: '100% 100%', maskSize: '100% 100%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          aria-hidden
        />
        <Words as="h1" text={c.titulo} onView={false} className="display relative text-[clamp(2.25rem,10vw,3.5rem)] dk:absolute dk:ux-68 dk:uy-238 dk:whitespace-nowrap dk:ut-80" />
        <p className="relative mt-5 text-[1.0625rem] leading-[1.32] dk:absolute dk:ux-68 dk:uy-438 dk:mt-0 dk:ut-25">
          {c.texto[0]}
          <br />
          {c.texto[1]}
          <button type="button" onClick={ics} className="underline decoration-1 underline-offset-[0.2em] transition-colors hover:text-matcha-deep">
            {c.texto[2]}
          </button>
          {c.texto[3]}
          <br />
          {c.texto[4]}
        </p>
        <p className="hand relative mt-6 text-[3.5rem] tracking-[-0.02em] text-matcha-deep dk:absolute dk:ux-87 dk:uy-566 dk:mt-0 dk:ut-104" aria-label={`Código ${r.codigo}`}>
          {r.codigo}
        </p>
        <dl className="relative mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 dk:absolute dk:ux-87 dk:uy-708 dk:mt-0 dk:grid-flow-col dk:grid-cols-[calc(336*var(--u))_auto] dk:grid-rows-3 dk:gap-x-0 dk:ugapy-33 dk:ut-25">
          {datos.map(([k, v]) => (
            <div key={k} className="text-[1.0625rem] leading-[1.32] dk:text-[length:inherit]">
              <dt className="font-semibold">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <motion.img
          src={`${base}iconos/hanko.webp`}
          alt="Sello 予約済 (reservado) con el oso de Kumamori"
          className="relative mx-auto mt-10 w-[min(80vw,360px)] dk:absolute dk:ux-900 dk:uy-290 dk:uw-720 dk:uh-690 dk:mx-0 dk:mt-0 dk:max-w-none"
          width={720}
          height={690}
          initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 24, delay: 0.45 }}
        />
      </div>
    </section>
  )
}
