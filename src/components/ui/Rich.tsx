import { Fragment } from 'react'

type Props = {
  text: string
  strong?: string
  /** "always": los "\n" son saltos siempre; "desktop": solo en la composición de escritorio (en móvil, espacio) */
  breaks?: 'always' | 'desktop'
}

/** Texto de site.ts: **así** va en SemiBold y "\n" es un salto de línea de la maqueta. */
export function Rich({ text, strong = 'font-semibold', breaks = 'always' }: Props) {
  return (
    <>
      {text.split('\n').map((line, i, lines) => (
        <Fragment key={i}>
          {line.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
            part.startsWith('**') ? (
              <strong key={j} className={strong}>
                {part.slice(2, -2)}
              </strong>
            ) : (
              <Fragment key={j}>{part}</Fragment>
            ),
          )}
          {i < lines.length - 1 &&
            (breaks === 'always' ? (
              <br />
            ) : (
              <>
                <br className="hidden dk:inline" />
                <span className="dk:hidden"> </span>
              </>
            ))}
        </Fragment>
      ))}
    </>
  )
}
