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
  <nav class="settings-nav" my-4 text-xl>
    <button
      type="button"
      class="icon-btn settings-action"
      :title="$t('button.toggle_dark')"
      :aria-label="$t('button.toggle_dark')"
      @click="toggleDark()"
    >
      <span i="ri-sun-line dark:ri-moon-line" aria-hidden="true" />
    </button>

    <button
      type="button"
      class="icon-btn settings-action"
      :title="$t('button.toggle_langs')"
      :aria-label="$t('button.toggle_langs')"
      @click="toggleLocales()"
    >
      <span i-ri-translate aria-hidden="true" :class="locale === 'en' ? '' : '-rotate-y-180'" />
    </button>

    <a
      class="icon-btn settings-action"
      href="https://docs.yunyoujun.cn/projects/girid.html"
      :title="$t('button.about')"
      :aria-label="$t('button.about')"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span i-ri-information-line aria-hidden="true" />
    </a>
  </nav>
</template>

<style scoped>
.settings-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.settings-action {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  touch-action: manipulation;
}

.settings-action:focus-visible {
  outline: 2px solid var(--c-primary, #6366f1);
  outline-offset: 2px;
}
</style>
