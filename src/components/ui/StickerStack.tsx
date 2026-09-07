import { useState, type KeyboardEvent } from 'react'
import { motion } from 'motion/react'
import { photo } from '../../lib/hooks'

type Foto = { src: string; alt: string }
const ROT = [-2.5, 3, -4]

/** Pila de fotos-sticker. Se arrastra la de arriba para pasar a la siguiente. */
export function StickerStack({ fotos, className }: { fotos: Foto[]; className?: string }) {
  const [order, setOrder] = useState(() => fotos.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      next()
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    }
  }

  return (
    <div
      className={className}
      tabIndex={0}
      role="group"
      aria-label="Fotos del espacio. Flechas para pasar."
      onKeyDown={onKey}
    >
      <div className="relative aspect-[4/3] w-full">
        {order.map((idx, pos) => {
          const f = fotos[idx]
          const top = pos === 0
          return (
            <motion.div
              key={idx}
              className="sticker absolute inset-0 touch-none select-none"
              style={{ zIndex: fotos.length - pos }}
              animate={{ rotate: ROT[pos % ROT.length], scale: 1 - pos * 0.05, left: pos * 14, top: -pos * 10 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              drag={top}
              dragSnapToOrigin
              dragElastic={0.9}
              whileDrag={{ rotate: 0, scale: 1.03, cursor: 'grabbing' }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 120 || Math.abs(info.offset.y) > 120) next()
              }}
            >
              <img src={photo(f.src)} alt={top ? f.alt : ''} draggable={false} loading={pos === 0 ? 'eager' : 'lazy'} className="pointer-events-none" />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
