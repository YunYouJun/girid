<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter((i) => {
    return typeof i === 'string' && i !== locale.value
  })
})

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales.value[(locales.value.indexOf(locale.value) + 1) % locales.value.length]

  const code = typeof newLocale === 'string' ? newLocale : newLocale.code
  switchLocalePath(code)
}
</script>

<template>
  <nav my-4 text-xl>
    <button class="icon-btn mx-2 !outline-none" :title="$t('button.toggle_dark')" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>

    <a class="icon-btn mx-2" :class="locale === 'en' ? '' : '-rotate-y-180'" :title="$t('button.toggle_langs')" @click="toggleLocales()">
      <div i-ri-translate />
    </a>

    <RouterLink class="icon-btn mx-2" to="/about" :title="$t('button.about')">
      <div i-ri-information-line />
    </RouterLink>
  </nav>
</template>
