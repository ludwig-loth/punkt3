import type { Ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'

interface UseElementDimensionsOptions<K extends string> {
  set: (key: K, dims: ElementDimensions) => void
}

export function useElementDimensions<K extends string>(options: UseElementDimensionsOptions<K>) {
  function saveDimensions(refEl: Ref<HTMLElement | null>, key: K) {
    useResizeObserver(refEl, (entries: ReadonlyArray<ResizeObserverEntry>) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height, x: left, y: top } = entry.contentRect
      options.set(key, { width, height, top, left })
    })
  }
  return { saveDimensions }
}