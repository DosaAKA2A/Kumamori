export const DIAS_CORTOS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'] // lunes primero
export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

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

/** Celdas del mes (con huecos al principio para alinear lunes). */
export function celdasMes(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7 // lunes = 0
  const dias = new Date(year, month + 1, 0).getDate()
  const cells: (Date | null)[] = Array.from({ length: offset }, () => null)
  for (let d = 1; d <= dias; d++) cells.push(new Date(year, month, d))
  return cells
}

export function fechaLarga(d: Date) {
  return new Intl.DateTimeFormat('es-419', { weekday: 'long', day: 'numeric', month: 'long' }).format(d)
}

export const capitalizar = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
