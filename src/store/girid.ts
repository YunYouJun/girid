import { acceptHMRUpdate, defineStore } from 'pinia'
import type { GridItem } from '~/utils'
import { defaultGridItems } from '~/utils'

export const useGiridStore = defineStore('girid', () => {
  const userGridItems = ref(defaultGridItems)
  const curGridItem = ref<GridItem>()

  return {
    userGridItems,

    curGridItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGiridStore, import.meta.hot))
