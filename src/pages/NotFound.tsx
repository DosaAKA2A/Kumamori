import { Bear } from '../brand/Bear'
import { Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'

/** Página 404 con el mismo lenguaje de los héroes de la maqueta: titular Black 60, párrafo 25 y botón "Reservar" mediano. */
export function NotFound() {
  return (
    <section className="bg-cream text-bark">
      <div className="frame wrap-m grid min-h-[80svh] items-center gap-10 pb-16 pt-28 dk:min-h-0 dk:uh-700 dk:p-0">
        <div className="dk:absolute dk:ux-87 dk:uy-185">
          <Words as="h1" text="Esta mesa no existe" onView={false} className="display text-[clamp(2.25rem,9.5vw,3.25rem)] dk:ut-60" />
          <p className="mt-5 max-w-[30rem] text-[1.125rem] leading-[1.32] dk:umt-30 dk:uw-513 dk:max-w-none dk:ut-25">
            La página que buscas no está. Puede que el link esté mal escrito o que la hayamos movido.
          </p>
          <div className="mt-8 dk:umt-50">
            <Button to="/">Volver al inicio</Button>
          </div>
        </div>
        <Bear className="mx-auto w-[min(60vw,320px)] text-matcha-deep dk:absolute dk:ux-1050 dk:uy-200 dk:uw-420" mood="sleepy" />
      </div>
    </section>
  )
}
