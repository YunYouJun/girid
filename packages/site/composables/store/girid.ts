import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { GridItem } from '../../utils'
import { defaultGridItems } from '../../utils'

export const useGiridStore = defineStore('girid', () => {
  const userGridItems = useStorage('girid-user-items', defaultGridItems)
  const curGridItem = ref<GridItem>()

  return {
    userGridItems,

    curGridItem,

    reset() {
      userGridItems.value = defaultGridItems
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGiridStore, import.meta.hot))
