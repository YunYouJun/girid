<script setup lang="ts">
defineProps<{
  version: string
}>()
</script>

<template>
  <section class="settings-card settings-card--about" aria-labelledby="about-title">
    <header class="settings-card-header">
      <span class="settings-card-icon" aria-hidden="true">
        <span i-ri-information-line />
      </span>
      <div>
        <h2 id="about-title" class="settings-card-title">
          {{ $t('settings.about.title') }}
        </h2>
        <p class="settings-card-description">
          {{ $t('settings.about.description') }}
        </p>
      </div>
      <span class="version-badge">v{{ version }}</span>
    </header>

    <div class="about-links">
      <a
        class="about-link"
        href="https://docs.yunyoujun.cn/projects/girid.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span i-ri-book-open-line aria-hidden="true" />
        <span>{{ $t('settings.about.guide') }}</span>
        <span i-ri-external-link-line aria-hidden="true" />
      </a>
      <a
        class="about-link"
        href="https://github.com/YunYouJun/girid"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span i-ri-github-line aria-hidden="true" />
        <span>{{ $t('settings.about.source') }}</span>
        <span i-ri-external-link-line aria-hidden="true" />
      </a>
      <a
        class="about-link"
        href="https://github.com/YunYouJun/girid/issues/new/choose"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span i-ri-feedback-line aria-hidden="true" />
        <span>{{ $t('settings.about.feedback') }}</span>
        <span i-ri-external-link-line aria-hidden="true" />
      </a>
    </div>

    <p class="privacy-note">
      <span i-ri-lock-2-line aria-hidden="true" />
      <span>{{ $t('settings.about.privacy') }}</span>
    </p>
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

.version-badge {
  margin-left: auto;
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--app-c-line);
  border-radius: 999px;
  background: var(--app-c-control);
  color: var(--app-c-muted);
  font-size: 0.68rem;
  font-weight: 800;
}

.about-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  margin-top: 1rem;
}

.about-link {
  display: grid;
  min-height: 4.5rem;
  place-items: center;
  gap: 0.25rem;
  padding: 0.6rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.85rem;
  background: var(--app-c-surface-solid);
  color: var(--app-c-muted);
  font-size: 0.75rem;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  transition:
    border-color 150ms ease,
    color 150ms ease,
    transform 150ms ease;
}

.about-link:hover {
  border-color: var(--app-c-brand-soft);
  color: var(--app-c-brand-strong);
  transform: translateY(-1px);
}

.about-link > :first-child {
  color: var(--app-c-brand-strong);
  font-size: 1.2rem;
}

.about-link > :last-child {
  font-size: 0.72rem;
}

.privacy-note {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1rem 0 0;
  padding-top: 0.85rem;
  border-top: 1px solid var(--app-c-line);
  color: var(--app-c-muted);
  font-size: 0.72rem;
  line-height: 1.55;
}

.privacy-note > :first-child {
  flex: 0 0 auto;
  margin-top: 0.1rem;
  color: var(--app-c-brand-strong);
}

@media (max-width: 420px) {
  .settings-card {
    padding: 1rem;
    border-radius: 1rem;
  }

  .settings-card-header {
    flex-wrap: wrap;
  }

  .version-badge {
    margin-left: 3.5rem;
  }
}
</style>
