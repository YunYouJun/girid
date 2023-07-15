<script setup lang="ts">
const { t, availableLocales, locale } = useI18n()

function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
</script>

<template>
  <nav text-xl my-4>
    <button class="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>

    <a class="icon-btn mx-2" :class="locale === 'en' ? '' : '-rotate-y-180'" :title="t('button.toggle_langs')" @click="toggleLocales()">
      <div i-ri-translate />
    </a>

    <RouterLink class="icon-btn mx-2" to="/about" :title="t('button.about')">
      <div i-ri-information-line />
    </RouterLink>
  </nav>
</template>
