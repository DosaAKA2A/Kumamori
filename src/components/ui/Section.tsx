import clsx from 'clsx'
import { Words } from './Reveal'

type Props = {
  titulo: string
  texto?: string
  className?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  size?: 't-h1' | 't-h2'
}

/** Cabecera de sección: titular + párrafo opcional. */
export function SectionHead({ titulo, texto, className, align = 'left', as = 'h2', size = 't-h2' }: Props) {
  return (
    <div className={clsx(align === 'center' && 'mx-auto text-center', className)}>
      <Words text={titulo} as={as} className={clsx('display', size)} />
      {texto && <p className={clsx('lead body mt-6 opacity-85', align === 'center' && 'mx-auto')}>{texto}</p>}
    </div>
  )
}
