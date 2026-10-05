import clsx from 'clsx'
import type { CSSProperties } from 'react'
import { BrandIcon } from '../../brand/Icon'

// Banda "infinite-scroll" de la maqueta: 80 de alto y 18 dibujos de la marca en crema.
// Centro x, alto y giro de cada dibujo, medidos sobre la captura al 100 % (px de diseño).
const ICONOS: [string, number, number, number][] = [
  ['melonpan', 0, 37, 0],
  ['tin', 111, 44, 0],
  ['sprig', 224, 41, 0],
  ['chasen', 331, 60, 0],
  ['teacup', 430, 50, 0],
  ['dango', 525, 60, 0],
  ['cha', 622, 32, 0],
  ['clover', 715, 28, 0],
  ['paper-cup', 810, 49, 0],
  ['leaves', 910, 36, 0],
  ['flower-hatched', 1004, 30, 0],
  ['iced-drink', 1099, 38, 0],
  ['purin', 1197, 44, 0],
  ['chashaku', 1303, 34, 0],
  ['bun', 1409, 34, 0],
  ['flower-five', 1501, 26, 0],
  ['cake', 1598, 42, 0],
  ['flower-hatched-2', 1693, 22, 0],
]
const CICLO = 1792 // un ciclo completo: el siguiente melon pan entra justo fuera del marco

const n = (v: number) => `calc(${v} * var(--bu))`

/** La cinta se desplaza despacio y sin fin; en la primera imagen coincide con la maqueta. */
export function IconBand({ className }: { className?: string }) {
  return (
    <div
      className={clsx('relative h-14 overflow-hidden bg-matcha-deep [--bu:0.62px] dk:uh-80 dk:[--bu:var(--u)]', className)}
      style={{ '--cinta': n(CICLO) } as CSSProperties}
      aria-hidden
    >
      <div className="cinta-track absolute inset-y-0" style={{ left: `calc(var(--gut) - ${CICLO} * var(--bu))` }}>
        {[0, 1, 2, 3].map((c) =>
          ICONOS.map(([name, cx, h, rot], i) => (
            <BrandIcon
              key={c + '-' + i}
              name={name}
              className="absolute top-1/2 w-auto text-cream"
              style={{ left: n(c * CICLO + cx), height: n(h), transform: `translate(-50%, -50%) rotate(${rot}deg)` }}
            />
          )),
        )}
      </div>
    </div>
  )
}
