import { useStorage } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type AppLocale = 'zh-CN' | 'en'

export const useAppStore = defineStore('app', () => {
  const { locale, setLocale } = useI18n()
  const initialLocale: AppLocale = locale.value === 'en' ? 'en' : 'zh-CN'
  const lang = useStorage<AppLocale>('girid-lang', initialLocale)

  /**
   * show choose character modal
   */
  const showChooseModal = ref(false)

  if (locale.value !== lang.value)
    void setLocale(lang.value)

  watch(() => locale.value, (value) => {
    if ((value === 'en' || value === 'zh-CN') && lang.value !== value)
      lang.value = value
  })

  async function setLanguage(value: AppLocale) {
    lang.value = value
    await setLocale(value)
  }

  return {
    lang,
    setLanguage,

    showChooseModal,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
