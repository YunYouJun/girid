<script setup lang="ts">
import type { AppLocale } from '../../composables/store/app'
import type { ThemePreference } from '../../composables/useSettingsPreferences'

defineProps<{
  locale: AppLocale
  resolvedTheme: 'light' | 'dark'
  theme: ThemePreference
}>()

const emit = defineEmits<{
  changeLocale: [value: AppLocale]
  changeTheme: [value: ThemePreference]
}>()

const themeOptions: Array<{ value: ThemePreference, icon: string, labelKey: string }> = [
  { value: 'system', icon: 'i-ri-computer-line', labelKey: 'settings.appearance.theme_system' },
  { value: 'light', icon: 'i-ri-sun-line', labelKey: 'settings.appearance.theme_light' },
  { value: 'dark', icon: 'i-ri-moon-line', labelKey: 'settings.appearance.theme_dark' },
]

const localeOptions: Array<{ value: AppLocale, shortLabel: string, label: string }> = [
  { value: 'zh-CN', shortLabel: '中', label: '简体中文' },
  { value: 'en', shortLabel: 'EN', label: 'English' },
]
</script>

<template>
  <section class="settings-card" aria-labelledby="appearance-title">
    <header class="settings-card-header">
      <span class="settings-card-icon" aria-hidden="true">
        <span i-ri-palette-line />
      </span>
      <div>
        <h2 id="appearance-title" class="settings-card-title">
          {{ $t('settings.appearance.title') }}
        </h2>
        <p class="settings-card-description">
          {{ $t('settings.appearance.description') }}
        </p>
      </div>
    </header>

    <div class="appearance-preview" aria-hidden="true">
      <span class="appearance-preview-cell appearance-preview-cell--brand" />
      <span class="appearance-preview-cell" />
      <span class="appearance-preview-cell" />
      <span class="appearance-preview-status">
        {{ $t(`settings.appearance.resolved_${resolvedTheme}`) }}
      </span>
    </div>

    <fieldset class="settings-fieldset">
      <legend class="settings-field-label">
        {{ $t('settings.appearance.theme') }}
      </legend>
      <div class="settings-segmented settings-segmented--theme">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          type="button"
          class="settings-segment"
          :class="{ 'settings-segment--active': theme === option.value }"
          :aria-pressed="theme === option.value"
          @click="emit('changeTheme', option.value)"
        >
          <span :class="option.icon" aria-hidden="true" />
          <span>{{ $t(option.labelKey) }}</span>
        </button>
      </div>
    </fieldset>

    <fieldset class="settings-fieldset">
      <legend class="settings-field-label">
        {{ $t('settings.appearance.language') }}
      </legend>
      <div class="settings-segmented">
        <button
          v-for="option in localeOptions"
          :key="option.value"
          type="button"
          class="settings-segment settings-segment--locale"
          :class="{ 'settings-segment--active': locale === option.value }"
          :aria-pressed="locale === option.value"
          @click="emit('changeLocale', option.value)"
        >
          <span class="locale-mark" aria-hidden="true">{{ option.shortLabel }}</span>
          <span>{{ option.label }}</span>
        </button>
      </div>
    </fieldset>
  </section>
</template>

<style scoped>
.settings-card {
  padding: 1.25rem;
  border: 1px solid var(--app-c-line);
  border-radius: 1.25rem;
  background: var(--app-c-surface);
  box-shadow: var(--app-shadow-sm);
  text-align: left;
  backdrop-filter: blur(18px);
}

.settings-card-header {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.settings-card-icon {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--app-c-brand-soft);
  border-radius: 0.9rem;
  background: var(--app-c-focus);
  color: var(--app-c-brand-strong);
  font-size: 1.25rem;
}

.settings-card-title {
  margin: 0;
  color: var(--app-c-text);
  font-size: 1.05rem;
  font-weight: 800;
}

.settings-card-description {
  margin: 0.25rem 0 0;
  color: var(--app-c-muted);
  font-size: 0.8125rem;
  line-height: 1.55;
}

.appearance-preview {
  display: grid;
  grid-template-columns: repeat(3, 2rem) 1fr;
  align-items: center;
  gap: 0.4rem;
  margin: 1.1rem 0;
  padding: 0.65rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.9rem;
  background: var(--app-c-control);
}

.appearance-preview-cell {
  height: 2rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.55rem;
  background: var(--app-c-surface-solid);
}

.appearance-preview-cell--brand {
  border-color: var(--app-c-brand);
  background: var(--app-c-brand);
}

.appearance-preview-status {
  justify-self: end;
  color: var(--app-c-muted);
  font-size: 0.75rem;
  font-weight: 700;
}

.settings-fieldset {
  min-width: 0;
  margin: 1rem 0 0;
  padding: 0;
  border: 0;
}

.settings-field-label {
  margin-bottom: 0.5rem;
  color: var(--app-c-muted);
  font-size: 0.75rem;
  font-weight: 800;
}

.settings-segmented {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
  padding: 0.3rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.9rem;
  background: var(--app-c-control);
}

.settings-segmented--theme {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.settings-segment {
  display: inline-flex;
  min-width: 0;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 0.65rem;
  background: transparent;
  color: var(--app-c-muted);
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 700;
}

.settings-segment:hover {
  color: var(--app-c-brand-strong);
}

.settings-segment--active {
  border-color: var(--app-c-line);
  background: var(--app-c-surface-solid);
  box-shadow: 0 4px 12px rgb(42 43 74 / 8%);
  color: var(--app-c-text);
}

.settings-segment--locale {
  justify-content: flex-start;
  padding-inline: 0.75rem;
}

.locale-mark {
  display: inline-flex;
  width: 1.75rem;
  height: 1.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--app-c-focus);
  color: var(--app-c-brand-strong);
  font-size: 0.7rem;
  font-weight: 900;
}

@media (max-width: 420px) {
  .settings-card {
    padding: 1rem;
    border-radius: 1rem;
  }

  .settings-segment {
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.75rem;
  }

  .settings-segment--locale {
    flex-direction: row;
  }
}
</style>
