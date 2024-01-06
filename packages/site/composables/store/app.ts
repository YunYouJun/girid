import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const { locale } = useI18n()
  const lang = useStorage('girid-lang', locale.value)

  /**
   * show choose character modal
   */
  const showChooseModal = ref(false)

  watch(() => locale.value, () => {
    lang.value = locale.value
  })

  return {
    lang,

    showChooseModal,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
