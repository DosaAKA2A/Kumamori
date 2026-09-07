import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'
import { reservaOpciones as op, site } from '../content/site'
import { BrandIcon } from '../brand/Icon'
import { Bear } from '../brand/Bear'
import { SectionHead } from '../components/ui/Section'
import { Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { photo } from '../lib/hooks'
import { capitalizar, celdasMes, DIAS_CORTOS, fechaLarga, fromISO, hoy, MESES, toISO } from '../lib/dates'
import { descargarICS, enviarReserva, generarCodigo, reservaICS, type Reserva } from '../lib/reservas'

type Datos = Omit<Reserva, 'codigo' | 'creada'>

const vacio: Datos = { nombre: '', correo: '', telefono: '', motivo: '', espacio: '', personas: '', duracion: '', extra: '', fecha: '', hora: '', notas: '' }

const nombreDe = (lista: { id: string; nombre?: string; label?: string }[], id: string) => lista.find((x) => x.id === id)?.nombre ?? lista.find((x) => x.id === id)?.label ?? ''

export function ReservasNueva() {
  const [params] = useSearchParams()
  const [d, setD] = useState<Datos>({ ...vacio, espacio: params.get('espacio') ?? '', extra: params.get('extra') ?? '' })
  const set = <K extends keyof Datos>(k: K, v: Datos[K]) => setD((s) => ({ ...s, [k]: v }))
  const [intento, setIntento] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [hecha, setHecha] = useState<Reserva | null>(null)

  const errores = useMemo(() => validar(d), [d])
  const listos = useMemo(() => {
    let n = 0
    if (!errores.nombre && !errores.correo && !errores.telefono) n++
    if (d.espacio) n++
    if (d.personas) n++
    if (d.duracion) n++
    n++ // la experiencia es opcional: siempre cuenta
    if (d.fecha && d.hora) n++
    return n
  }, [d, errores])
  const valido = Object.keys(errores).length === 0

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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (hecha) {
    return (
      <Confirmacion
        reserva={hecha}
        onOtra={() => {
          setHecha(null)
          setIntento(false)
          setD(vacio)
          window.scrollTo(0, 0)
        }}
      />
    )
  }

  const err = (k: keyof Datos) => (intento ? errores[k] : undefined)

  return (
    <section className="bg-cream text-bark">
      <div className="wrap grid gap-10 pb-12 pt-[8.5rem] md:grid-cols-12 md:items-end md:pt-[11rem]">
        <div className="md:col-span-7">
          <SectionHead as="h1" size="t-h1" nota="toma menos de un minuto" titulo="Reservar un lugar" texto="Sin costo. Te guardamos el lugar hasta 15 minutos después del horario elegido." />
        </div>
        <div className="hidden md:col-span-4 md:col-start-9 md:block">
          <div className="sticker rotate-2">
            <img src={photo('bandeja-latte.webp')} alt="" width={1800} height={1200} />
          </div>
        </div>
      </div>

      <form className="wrap grid gap-12 pb-24 lg:grid-cols-12 lg:gap-10" onSubmit={onSubmit} noValidate>
        <div className="space-y-16 lg:col-span-8">
          <Bloque n={1} titulo="Tus datos" texto="Para confirmarte y avisarte si algo cambia.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Campo label="Nombre y apellido" error={err('nombre')}>
                <input className="input" value={d.nombre} onChange={(e) => set('nombre', e.target.value)} autoComplete="name" aria-invalid={!!err('nombre')} />
              </Campo>
              <Campo label="Correo" error={err('correo')}>
                <input className="input" type="email" value={d.correo} onChange={(e) => set('correo', e.target.value)} autoComplete="email" aria-invalid={!!err('correo')} />
              </Campo>
              <Campo label="Teléfono" error={err('telefono')}>
                <input className="input" type="tel" value={d.telefono} onChange={(e) => set('telefono', e.target.value)} autoComplete="tel" aria-invalid={!!err('telefono')} />
              </Campo>
              <Campo label="¿Para qué vienes? (opcional)">
                <select className="input" value={d.motivo} onChange={(e) => set('motivo', e.target.value)}>
                  <option value="">Elegir</option>
                  {op.motivos.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </Campo>
            </div>
          </Bloque>

          <Bloque n={2} titulo="El lugar" texto="Cada zona tiene su ritmo. Elige la que va con el plan." falta={intento && !d.espacio}>
            <CardGroup name="espacio" opciones={op.espacios} value={d.espacio} onChange={(v) => set('espacio', v)} />
          </Bloque>

          <Bloque n={3} titulo="¿Cuántas personas?" falta={intento && !d.personas}>
            <PillGroup name="personas" opciones={op.personas} value={d.personas} onChange={(v) => set('personas', v)} />
          </Bloque>

          <Bloque n={4} titulo="¿Cuánto tiempo?" texto="Es orientativo: nadie te va a mirar el reloj." falta={intento && !d.duracion}>
            <PillGroup name="duracion" opciones={op.duraciones} value={d.duracion} onChange={(v) => { set('duracion', v); set('hora', '') }} />
          </Bloque>

          <Bloque n={5} titulo="Una experiencia" texto="Opcional. Se suma al lugar que elegiste.">
            <CardGroup name="extra" opciones={op.extras} value={d.extra || 'ninguno'} onChange={(v) => set('extra', v)} />
          </Bloque>

          <Bloque n={6} titulo="Día y hora" falta={intento && (!d.fecha || !d.hora)}>
            <div className="grid gap-10 md:grid-cols-2">
              <Calendario value={d.fecha} onChange={(v) => { set('fecha', v); set('hora', '') }} />
              <Horarios fecha={d.fecha} duracion={d.duracion} value={d.hora} onChange={(v) => set('hora', v)} />
            </div>
            <Campo label="Notas para el equipo (opcional)" className="mt-8">
              <textarea className="input min-h-28 resize-y" value={d.notas} onChange={(e) => set('notas', e.target.value)} placeholder="Alergias, un cumpleaños, una silla más..." />
            </Campo>
          </Bloque>
        </div>

        <aside className="lg:col-span-4">
          <Resumen d={d} listos={listos} enviando={enviando} />
        </aside>
      </form>
    </section>
  )
}

/* ---------- Validación ---------- */
function validar(d: Datos) {
  const e: Partial<Record<keyof Datos, string>> = {}
  if (d.nombre.trim().length < 2) e.nombre = 'Necesitamos tu nombre.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.correo.trim())) e.correo = 'Revisa el correo.'
  if (d.telefono.replace(/\D/g, '').length < 6) e.telefono = 'Un teléfono con al menos 6 números.'
  if (!d.espacio) e.espacio = 'Elige un lugar.'
  if (!d.personas) e.personas = 'Elige cuántas personas.'
  if (!d.duracion) e.duracion = 'Elige cuánto tiempo.'
  if (!d.fecha) e.fecha = 'Elige un día.'
  if (!d.hora) e.hora = 'Elige un horario.'
  return e
}

/* ---------- Piezas del formulario ---------- */
function Bloque({ n, titulo, texto, children, falta }: { n: number; titulo: string; texto?: string; children: ReactNode; falta?: boolean }) {
  return (
    <fieldset className="min-w-0" data-falta={falta ? 'true' : undefined}>
      <legend className="flex items-baseline gap-4">
        <span className="note text-4xl leading-none text-matcha" aria-hidden>
          {n}
        </span>
        <span className="t-h3">{titulo}</span>
      </legend>
      {texto && <p className="mt-2 opacity-75">{texto}</p>}
      {falta && <p className="mt-2 text-sm font-bold text-[#b0522d]">Falta elegir esto.</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  )
}

function Campo({ label, error, children, className }: { label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <label className={clsx('field', className)}>
      <span>{label}</span>
      {children}
      {error && <span className="text-sm font-semibold text-[#b0522d]">{error}</span>}
    </label>
  )
}

type Opcion = { id: string; label?: string; nombre?: string; texto?: string; icono?: string }

function PillGroup({ name, opciones, value, onChange }: { name: string; opciones: Opcion[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-3">
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
              'relative rounded-full border-2 px-5 py-3 font-bold transition-colors',
              sel ? 'border-matcha-deep text-cream' : 'border-cream-deep bg-cream-light hover:border-matcha',
            )}
          >
            {sel && <motion.span layoutId={`pill-${name}`} className="absolute inset-0 rounded-full bg-matcha-deep" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{o.label ?? o.nombre}</span>
          </button>
        )
      })}
    </div>
  )
}

function CardGroup({ name, opciones, value, onChange }: { name: string; opciones: Opcion[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="radiogroup" className="grid gap-4 sm:grid-cols-3">
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
              'relative rounded-sticker border-2 p-6 text-left transition-colors',
              sel ? 'border-matcha-deep text-cream' : 'border-cream-deep bg-cream-light hover:border-matcha',
            )}
          >
            {sel && <motion.span layoutId={`card-${name}`} className="absolute inset-0 rounded-[calc(var(--radius-sticker)-2px)] bg-matcha-deep" transition={{ type: 'spring', stiffness: 350, damping: 32 }} />}
            <span className="relative block">
              {o.icono && <BrandIcon name={o.icono} className={clsx('h-14 w-16', sel ? 'text-cream' : 'text-matcha-deep')} />}
              <span className="mt-4 block text-lg font-extrabold leading-tight">{o.nombre}</span>
              {o.texto && <span className={clsx('mt-1.5 block text-[0.92rem]', sel ? 'text-cream/80' : 'opacity-75')}>{o.texto}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function Calendario({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const h = hoy()
  const [vista, setVista] = useState(() => (value ? fromISO(value) : h))
  const y = vista.getFullYear(), m = vista.getMonth()
  const celdas = celdasMes(y, m)
  const limite = new Date(h.getFullYear(), h.getMonth(), h.getDate() + 60)
  const puedeAtras = new Date(y, m, 1) > new Date(h.getFullYear(), h.getMonth(), 1)
  const puedeAdelante = new Date(y, m + 1, 1) <= limite

  const habil = (d: Date) => d >= h && d <= limite && site.horario.dias.includes(d.getDay())

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-extrabold capitalize">
          {MESES[m]} {y}
        </p>
        <div className="flex gap-1">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => setVista(new Date(y, m - 1, 1))} disabled={!puedeAtras} aria-label="Mes anterior">
            <ChevronLeft />
          </button>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream-deep disabled:opacity-30" onClick={() => setVista(new Date(y, m + 1, 1))} disabled={!puedeAdelante} aria-label="Mes siguiente">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm font-bold opacity-60" aria-hidden>
        {DIAS_CORTOS.map((dd, i) => (
          <span key={i}>{dd}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1" role="grid" aria-label="Calendario">
        {celdas.map((c, i) =>
          c ? (
            <button
              key={i}
              type="button"
              disabled={!habil(c)}
              onClick={() => onChange(toISO(c))}
              aria-pressed={toISO(c) === value}
              aria-label={fechaLarga(c)}
              className={clsx(
                'relative aspect-square rounded-full text-[0.95rem] font-bold transition-colors disabled:opacity-25',
                toISO(c) === value ? 'text-cream' : 'hover:bg-cream-deep disabled:hover:bg-transparent',
              )}
            >
              {toISO(c) === value && <motion.span layoutId="dia-sel" className="absolute inset-0 rounded-full bg-matcha-deep" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
              <span className="relative">{c.getDate()}</span>
              {toISO(c) === toISO(h) && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-matcha" aria-hidden />}
            </button>
          ) : (
            <span key={i} />
          ),
        )}
      </div>
      <p className="mt-3 text-sm opacity-60">Domingos cerrado. Se puede reservar hasta 60 días adelante.</p>
    </div>
  )
}

function Horarios({ fecha, duracion, value, onChange }: { fecha: string; duracion: string; value: string; onChange: (v: string) => void }) {
  const horas = op.duraciones.find((x) => x.id === duracion)?.horas ?? 1
  const slots = useMemo(() => {
    if (!fecha) return []
    const d = fromISO(fecha)
    const esHoy = toISO(d) === toISO(hoy())
    const ahora = new Date().getHours()
    const out: string[] = []
    for (let h = site.horario.apertura + 1; h + horas <= site.horario.cierre; h++) {
      if (esHoy && h <= ahora) continue
      out.push(`${String(h).padStart(2, '0')}:00`)
    }
    return out
  }, [fecha, horas])

  return (
    <div>
      <p className="font-extrabold">Horario</p>
      <AnimatePresence mode="wait" initial={false}>
        {!fecha ? (
          <motion.p key="sin-fecha" className="mt-4 opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} exit={{ opacity: 0 }}>
            Elige un día primero.
          </motion.p>
        ) : (
          <motion.div key={fecha + duracion} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
            <p className="mt-1 text-[0.95rem] opacity-70">{capitalizar(fechaLarga(fromISO(fecha)))}</p>
            {slots.length === 0 ? (
              <p className="mt-4 opacity-60">Ya no quedan horarios para hoy. Prueba con mañana.</p>
            ) : (
              <div role="radiogroup" className="mt-4 grid grid-cols-3 gap-2">
                {slots.map((s) => {
                  const sel = s === value
                  return (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      onClick={() => onChange(s)}
                      className={clsx('relative rounded-full border-2 py-2.5 text-[0.95rem] font-bold transition-colors', sel ? 'border-matcha-deep text-cream' : 'border-cream-deep bg-cream-light hover:border-matcha')}
                    >
                      {sel && <motion.span layoutId="hora-sel" className="absolute inset-0 rounded-full bg-matcha-deep" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                      <span className="relative">{s}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Fila({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-cream/15 py-3">
      <dt className="text-sm text-cream/70">{label}</dt>
      <dd className="text-right font-bold">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={value || '-'} className="inline-block" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
            {value || <span className="text-cream/40">—</span>}
          </motion.span>
        </AnimatePresence>
      </dd>
    </div>
  )
}

function Resumen({ d, listos, enviando }: { d: Datos; listos: number; enviando: boolean }) {
  return (
    <div className="on-green sticky top-24 rounded-sticker bg-matcha-deep p-7 text-cream">
      <div className="flex items-center justify-between">
        <h2 className="t-h3">Tu reserva</h2>
        <span className="text-sm font-semibold text-cream/70">{listos} de 6 listos</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-cream/15" aria-hidden>
        <motion.div className="h-full rounded-full bg-matcha" animate={{ width: `${(listos / 6) * 100}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
      <dl className="mt-4">
        <Fila label="Lugar" value={nombreDe(op.espacios, d.espacio)} />
        <Fila label="Personas" value={nombreDe(op.personas, d.personas)} />
        <Fila label="Tiempo" value={nombreDe(op.duraciones, d.duracion)} />
        <Fila label="Experiencia" value={nombreDe(op.extras, d.extra || 'ninguno')} />
        <Fila label="Día" value={d.fecha ? capitalizar(fechaLarga(fromISO(d.fecha))) : ''} />
        <Fila label="Hora" value={d.hora} />
      </dl>
      <div className="mt-6">
        <Button type="submit" size="lg" className="w-full" disabled={enviando}>
          {enviando ? 'Guardando...' : 'Confirmar reserva'}
        </Button>
      </div>
      <ul className="mt-5 space-y-1.5 text-[0.85rem] text-cream/70">
        {op.politicas.map((pol) => (
          <li key={pol} className="flex gap-2">
            <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-matcha" aria-hidden />
            {pol}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Confirmación con sello ---------- */
function Confirmacion({ reserva: r, onOtra }: { reserva: Reserva; onOtra: () => void }) {
  const horas = op.duraciones.find((x) => x.id === r.duracion)?.horas ?? 1
  const resumen = `${nombreDe(op.espacios, r.espacio)} · ${r.hora}`
  return (
    <section className="bg-cream text-bark">
      <div className="wrap grid gap-12 pb-24 pt-[8.5rem] md:grid-cols-12 md:items-center md:pt-[11rem]">
        <div className="md:col-span-7">
          <p className="note text-2xl text-matcha">listo</p>
          <Words as="h1" text="Tu lugar está guardado" className="display t-h1 mt-2" onView={false} />
          <p className="lead mt-6 max-w-xl opacity-85">Muestra este código al llegar. Guárdalo o agrégalo a tu calendario: por ahora no enviamos correos.</p>
          <p className="note mt-6 text-6xl text-matcha-deep md:text-7xl" aria-label={`Código ${r.codigo}`}>
            {r.codigo}
          </p>
          <dl className="mt-8 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              ['Lugar', nombreDe(op.espacios, r.espacio)],
              ['Personas', nombreDe(op.personas, r.personas)],
              ['Día', capitalizar(fechaLarga(fromISO(r.fecha)))],
              ['Hora', `${r.hora} · ${nombreDe(op.duraciones, r.duracion)}`],
              ['Experiencia', nombreDe(op.extras, r.extra)],
              ['A nombre de', r.nombre],
            ].map(([k, v]) => (
              <div key={k} className="border-b border-bark/10 pb-2">
                <dt className="text-sm opacity-60">{k}</dt>
                <dd className="font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button onClick={() => descargarICS(`kumamori-${r.codigo}.ics`, reservaICS(r, horas, resumen))}>Agregar al calendario</Button>
            <Button variant="ghost" onClick={onOtra}>
              Hacer otra reserva
            </Button>
            <Button variant="ghost" to="/">
              Volver al inicio
            </Button>
          </div>
        </div>
        <div className="md:col-span-5">
          <motion.div
            className="mx-auto grid aspect-square w-[min(70vw,300px)] place-items-center rounded-full border-[7px] border-matcha-deep text-matcha-deep"
            initial={{ scale: 2.2, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 1, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24, delay: 0.5 }}
            aria-hidden
          >
            <div className="grid place-items-center gap-1">
              <Bear className="w-40" track={false} mood="happy" />
              <span className="kanji text-2xl">予約済</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
