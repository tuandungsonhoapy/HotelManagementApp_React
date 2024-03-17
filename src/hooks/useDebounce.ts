import { useEffect, useState } from 'react'

function useDebounce(value: any, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const Id = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(Id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  return debounceValue
}

export default useDebounce
