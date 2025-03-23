<script setup lang="ts">
const { locale, setLocale } = useI18n()

async function toggleLocales() {
  if (locale.value === 'en') {
    setLocale('zh-CN')
  }
  else {
    setLocale('en')
  }
}

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <nav my-4 text-xl>
    <button class="icon-btn mx-2 !outline-none" :title="$t('button.toggle_dark')" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>

    <a class="icon-btn mx-2" :class="locale === 'en' ? '' : '-rotate-y-180'" :title="$t('button.toggle_langs')" @click="toggleLocales()">
      <div i-ri-translate />
    </a>

    <a
      class="icon-btn mx-2"
      href="https://docs.yunyoujun.cn/projects/girid.html"
      :title="$t('button.about')"
      target="_blank"
    >
      <div i-ri-information-line />
    </a>
  </nav>
</template>
