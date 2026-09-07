import { fromISO } from './dates'

export type Reserva = {
  codigo: string
  creada: string
  nombre: string
  correo: string
  telefono: string
  motivo: string
  espacio: string
  personas: string
  duracion: string
  extra: string
  fecha: string // YYYY-MM-DD
  hora: string // HH:MM
  notas: string
}

const KEY = 'km-reservas'
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789' // sin caracteres ambiguos

export function generarCodigo() {
  let s = 'KM-'
  for (let i = 0; i < 4; i++) s += ALFABETO[Math.floor(Math.random() * ALFABETO.length)]
  return s
}

export function listarReservas(): Reserva[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

/**
 * Punto único de envío. Hoy guarda en el navegador; cuando exista el backend
 * (Cloudflare Worker + correo) se cambia solamente esta función.
 */
export async function enviarReserva(r: Reserva): Promise<Reserva> {
  await new Promise((res) => setTimeout(res, 650)) // simula la red
  try {
    localStorage.setItem(KEY, JSON.stringify([r, ...listarReservas()].slice(0, 20)))
  } catch {
    /* modo privado: no pasa nada */
  }
  return r
}

/** Archivo .ics para agregar la reserva al calendario. */
export function reservaICS(r: Reserva, horas: number, resumen: string) {
  const d = fromISO(r.fecha)
  const [h, m] = r.hora.split(':').map(Number)
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m)
  const end = new Date(start.getTime() + horas * 3600_000)
  const fmt = (x: Date) =>
    `${x.getFullYear()}${String(x.getMonth() + 1).padStart(2, '0')}${String(x.getDate()).padStart(2, '0')}T${String(x.getHours()).padStart(2, '0')}${String(x.getMinutes()).padStart(2, '0')}00`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Kumamori//Reservas//ES',
    'BEGIN:VEVENT',
    `UID:${r.codigo}@kumamori`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Kumamori · ${resumen}`,
    `DESCRIPTION:Código ${r.codigo}. Te guardamos el lugar hasta 15 minutos después del horario.`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function descargarICS(nombre: string, contenido: string) {
  const blob = new Blob([contenido], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
