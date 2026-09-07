import { useEffect, useState } from 'react'

export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : initial,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export const photo = (name: string) => `${import.meta.env.BASE_URL}photos/${name}`
