import type { GridItem } from '../../utils'
import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { defaultGridItems } from '../../utils'
import { useIndexedDbStorage } from '../useIndexedDbStorage'

export const useGiridStore = defineStore('girid', () => {
  const { state: userGridItems } = useIndexedDbStorage<GridItem[]>('girid-user-items', defaultGridItems)
  const curGridItem = ref<GridItem>()

  const rows = useStorage('girid:rows', 3)
  const cols = useStorage('girid:cols', 5)
  const num = computed(() => rows.value * cols.value)

  watch(num, () => {
    if (userGridItems.value.length < num.value) {
      for (let i = userGridItems.value.length; i < num.value; i++) {
        userGridItems.value.push({
          title: '最...',
          title_en: 'Most ...',
        })
      }
    }
  })

  return {
    num,
    rows,
    cols,

    userGridItems,

    curGridItem,

    reset() {
      userGridItems.value = structuredClone(defaultGridItems)
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGiridStore, import.meta.hot))
