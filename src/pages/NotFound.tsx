import { Bear } from '../brand/Bear'
import { Words } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <section className="bg-cream text-bark">
      <div className="wrap grid min-h-[80svh] items-center gap-10 pt-[8.5rem] pb-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <Words as="h1" text="Esta mesa no existe" className="display t-h1 mt-2" onView={false} />
          <p className="lead mt-6 max-w-lg opacity-85">La página que buscas no está. Puede que el link esté mal escrito o que la hayamos movido.</p>
          <div className="mt-9">
            <Button to="/">Volver al inicio</Button>
          </div>
        </div>
        <div className="md:col-span-5">
          <Bear className="mx-auto w-[min(60vw,360px)] text-matcha-deep" mood="sleepy" />
        </div>
      </div>
    </section>
  )
}
