import { useRef } from 'react'
import { motion, useInView, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'
import clsx from 'clsx'
import { iconNames } from '../../brand/paths'
import { BrandIcon } from '../../brand/Icon'

/** Los iconos del packaging desfilando despacio. Se inclinan con la velocidad del scroll y se pausan fuera de pantalla. */
export function IconMarquee({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '120px' })
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const skew = useSpring(useTransform(velocity, [-2500, 2500], [-10, 10]), { stiffness: 140, damping: 22 })
  const items = [...iconNames, ...iconNames]

  return (
    <div ref={ref} className={clsx('marquee overflow-hidden', className)} data-paused={!inView} aria-hidden>
      <motion.div style={{ skewX: skew }}>
        <div className="marquee-track gap-14 py-7 pr-14">
          {items.map((n, i) => (
            <BrandIcon key={i} name={n} className="h-12 w-14 shrink-0 md:h-14 md:w-16" />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
