import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { GridItem } from '../../utils'
import { defaultGridItems } from '../../utils'

export const useGiridStore = defineStore('girid', () => {
  const userGridItems = useStorage('girid-user-items', defaultGridItems)
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
      userGridItems.value = defaultGridItems
    },
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGiridStore, import.meta.hot))
