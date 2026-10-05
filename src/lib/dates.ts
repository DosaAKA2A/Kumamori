export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const hoy = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

/**
 * Semanas completas del mes empezando en domingo, como el calendario de la maqueta:
 * los días del mes anterior y del siguiente rellenan la primera y la última semana.
 */
export function semanasMes(year: number, month: number): { fecha: Date; delMes: boolean }[] {
  const first = new Date(year, month, 1)
  const start = new Date(year, month, 1 - first.getDay())
  const last = new Date(year, month + 1, 0)
  const end = new Date(year, month + 1, 6 - last.getDay())
  const out: { fecha: Date; delMes: boolean }[] = []
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) out.push({ fecha: new Date(d), delMes: d.getMonth() === month })
  return out
}

/** "Martes, 30 de Marzo de 2027" (con mayúsculas, como en la maqueta) */
export function fechaCompleta(d: Date) {
  return `${capitalizar(DIAS[d.getDay()])}, ${d.getDate()} de ${capitalizar(MESES[d.getMonth()])} de ${d.getFullYear()}`
}

/** "Martes 30 de Marzo" para el resumen */
export function fechaCorta(d: Date) {
  return `${capitalizar(DIAS[d.getDay()])} ${d.getDate()} de ${capitalizar(MESES[d.getMonth()])}`
}
