import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const { locale } = useI18n()
  const lang = useStorage('girid-lang', locale.value)

  watch(() => locale.value, () => {
    lang.value = locale.value
  })

  return {
    lang,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
