import { useEffect, useMemo, useState } from 'react'

export function useMobile(pxNumber: number): boolean {
  const mql = useMemo(
    () => matchMedia(`(max-width: ${pxNumber}px)`),
    [pxNumber]
  )
  const [matches, setMatch] = useState(mql.matches)

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setMatch(e.matches)
    mql.addEventListener('change', listener)

    return () => mql.removeEventListener('change', listener)
  }, [mql])

  return matches
}
