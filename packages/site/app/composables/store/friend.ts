import type { GridItem } from '../../utils'
import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useFriendStore = defineStore('friend', () => {
  const cols = useStorage('girid:friend:cols', 5)
  const rows = useStorage('girid:friend:rows', 3)

  const num = computed(() => cols.value * rows.value)
  const curGridIndex = ref(0)

  const gridItems = useStorage<GridItem[]>('girid:friend:items', [])
  const curGridItem = computed<GridItem | undefined>(() => gridItems.value[curGridIndex.value])

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
