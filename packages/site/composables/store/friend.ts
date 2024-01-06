import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GridItem } from 'packages/site/utils'

export const useFriendStore = defineStore('friend', () => {
  const cols = ref(4)
  const rows = ref(4)

  const num = computed(() => cols.value * rows.value)
  const curGridIndex = ref(0)

  const gridItems = useStorage<GridItem[]>('girid:friend:items', [])
  const curGridItem = computed<GridItem>(() => gridItems.value[curGridIndex.value])

  return {
    cols,
    rows,
    num,
    curGridIndex,

    gridItems,
    curGridItem,

    reset() {
      gridItems.value = []
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGiridStore, import.meta.hot))
