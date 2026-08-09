import type { AppLocale } from './store/app'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

export type ThemePreference = 'system' | 'light' | 'dark'

export function useSettingsPreferences() {
  const colorMode = useColorMode()
  const app = useAppStore()
  const { lang } = storeToRefs(app)

  const theme = computed<ThemePreference>(() => {
    if (colorMode.preference === 'light' || colorMode.preference === 'dark')
      return colorMode.preference

    return 'system'
  })
  const locale = computed(() => lang.value)

  function setTheme(value: ThemePreference) {
    colorMode.preference = value
  }

  async function setLanguage(value: AppLocale) {
    await app.setLanguage(value)
  }

  return {
    locale,
    setLanguage,
    setTheme,
    theme,
  }
}
