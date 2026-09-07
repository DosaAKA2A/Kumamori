// Utilidades sobre los paths extraídos del manual.

/** Devuelve el subpath con mayor caja (el contorno exterior de un trazo cerrado). */
export function outerSubpath(d: string): string {
  const subs = d.split(/(?=M)/).filter(Boolean)
  let best = subs[0] ?? ''
  let bestArea = -1
  for (const s of subs) {
    const nums = s.match(/-?\d+\.?\d*/g)?.map(Number) ?? []
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const x = nums[i], y = nums[i + 1]
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
    const area = (maxX - minX) * (maxY - minY)
    if (area > bestArea) {
      bestArea = area
      best = s
    }
  }
  return best.trim().endsWith('Z') ? best : best + 'Z'
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
