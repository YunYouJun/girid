<script setup lang="ts">
import type { AppLocale } from '../composables/store/app'
import type { ThemePreference } from '../composables/useSettingsPreferences'
import pkg from '../../../../package.json'
import { useSettingsData } from '../composables/useSettingsData'
import { useSettingsPreferences } from '../composables/useSettingsPreferences'

const { t } = useI18n()
const {
  locale,
  resolvedTheme,
  setLanguage,
  setTheme,
  theme,
} = useSettingsPreferences()
const {
  exportBackup,
  importBackup,
  resetDrafts,
  status,
} = useSettingsData()

const statusMessage = computed(() => status.value === 'idle'
  ? ''
  : t(`settings.data.status_${status.value}`))
const statusTone = computed(() => status.value === 'error' ? 'danger' : 'success')

function handleThemeChange(value: ThemePreference) {
  setTheme(value)
}

async function handleLocaleChange(value: AppLocale) {
  await setLanguage(value)
}

useHead({
  title: computed(() => `${t('settings.title')} · Girid`),
})

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div class="settings-page">
    <header class="settings-hero">
      <div class="settings-hero-copy">
        <span class="settings-eyebrow">{{ $t('settings.eyebrow') }}</span>
        <h1 class="settings-title">
          {{ $t('settings.title') }}
        </h1>
        <p class="settings-intro">
          {{ $t('settings.description') }}
        </p>
      </div>

      <div class="settings-grid-mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </header>

    <div class="settings-layout">
      <SettingsAppearanceCard
        :locale="locale"
        :resolved-theme="resolvedTheme"
        :theme="theme"
        @change-locale="handleLocaleChange"
        @change-theme="handleThemeChange"
      />

      <SettingsDataCard
        :status-message="statusMessage"
        :status-tone="statusTone"
        @export-backup="exportBackup"
        @import-backup="importBackup"
        @reset-drafts="resetDrafts"
      />

      <SettingsAboutCard class="settings-about" :version="pkg.version" />
    </div>
  </div>
</template>

<style scoped>
.settings-page {
  width: min(100%, 58rem);
  margin-inline: auto;
}

.settings-hero {
  position: relative;
  display: flex;
  min-height: 10rem;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  overflow: hidden;
  margin-bottom: 1rem;
  padding: 1.5rem;
  border: 1px solid var(--app-c-line);
  border-radius: 1.35rem;
  background: linear-gradient(125deg, var(--app-c-surface-solid), var(--app-c-surface)), var(--app-c-surface);
  box-shadow: var(--app-shadow-sm);
  text-align: left;
}

.settings-hero::after {
  position: absolute;
  width: 12rem;
  height: 12rem;
  border: 2rem solid var(--app-c-focus);
  border-radius: 50%;
  content: '';
  inset: -6rem -4rem auto auto;
  pointer-events: none;
}

.settings-hero-copy {
  position: relative;
  z-index: 1;
  max-width: 34rem;
}

.settings-eyebrow {
  color: var(--app-c-brand-strong);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.settings-title {
  margin: 0.35rem 0 0;
  color: var(--app-c-text);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.05;
}

.settings-intro {
  margin: 0.65rem 0 0;
  color: var(--app-c-muted);
  font-size: 0.875rem;
  line-height: 1.65;
}

.settings-grid-mark {
  position: relative;
  z-index: 1;
  display: grid;
  width: 7.8rem;
  flex: 0 0 auto;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.4rem;
  padding: 0.45rem;
  border: 1px solid var(--app-c-line);
  border-radius: 1rem;
  background: var(--app-c-control);
  box-shadow: var(--app-shadow-sm);
  transform: rotate(3deg);
}

.settings-grid-mark span {
  aspect-ratio: 1;
  border: 1px solid var(--app-c-line);
  border-radius: 0.65rem;
  background: var(--app-c-surface-solid);
}

.settings-grid-mark span:first-child,
.settings-grid-mark span:nth-child(5) {
  border-color: var(--app-c-brand);
  background: var(--app-c-brand);
}

.settings-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.settings-about {
  grid-column: 1 / -1;
}

@media (max-width: 720px) {
  .settings-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .settings-about {
    grid-column: auto;
  }
}

@media (max-width: 520px) {
  .settings-hero {
    min-height: auto;
    padding: 1.2rem;
    border-radius: 1.1rem;
  }

  .settings-grid-mark {
    width: 5.5rem;
  }
}

@media (max-width: 390px) {
  .settings-grid-mark {
    display: none;
  }
}
</style>
