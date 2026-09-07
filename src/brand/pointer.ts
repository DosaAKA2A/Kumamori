import { motionValue } from 'motion/react'

// Un único listener de puntero para todos los osos de la página.
export const pointerX = motionValue(-1)
export const pointerY = motionValue(-1)

let started = false
export function startPointer() {
  if (started || typeof window === 'undefined') return
  started = true
  const onMove = (e: PointerEvent) => {
    pointerX.set(e.clientX)
    pointerY.set(e.clientY)
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerdown', onMove, { passive: true })
}
