import { useEffect, useRef } from 'react'
import { useLocation, useOutlet } from 'react-router'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { ReactLenis, type LenisRef } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { TransitionProvider } from './Transition'
import { IntroProvider } from './Intro'

gsap.registerPlugin(ScrollTrigger)

export function Layout() {
  const lenisRef = useRef<LenisRef>(null)
  const location = useLocation()
  const outlet = useOutlet()

  // Lenis mueve el scroll; GSAP lleva el reloj y ScrollTrigger se entera de cada scroll.
  useEffect(() => {
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    const lenis = lenisRef.current?.lenis
    lenis?.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(update)
      lenis?.off('scroll', ScrollTrigger.update)
    }
  }, [])

  useEffect(() => {
    document.title = tituloDe(location.pathname)
  }, [location.pathname])

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.09, smoothWheel: true }}>
      <MotionConfig reducedMotion="user">
        <TransitionProvider>
          <IntroProvider>
            <Nav />
            <AnimatePresence mode="wait" initial={false}>
              <motion.main
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {outlet}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </IntroProvider>
        </TransitionProvider>
        <div className="grain" aria-hidden />
      </MotionConfig>
    </ReactLenis>
  )
}

function tituloDe(path: string) {
  const base = 'Kumamori'
  if (path.startsWith('/espacio')) return `Nuestro espacio · ${base}`
  if (path.startsWith('/reservas/nueva')) return `Nueva reserva · ${base}`
  if (path.startsWith('/reservas')) return `Reservas · ${base}`
  if (path.startsWith('/experiencias')) return `Experiencias · ${base}`
  if (path.startsWith('/nosotros')) return `Nosotros · ${base}`
  return `${base} · Café, matcha y un lugar para quedarse`
}
