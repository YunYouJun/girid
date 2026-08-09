<script setup lang="ts">
import { shallowRef } from 'vue'

defineProps<{
  statusMessage?: string
  statusTone?: 'success' | 'danger'
}>()

const emit = defineEmits<{
  exportBackup: []
  importBackup: [file: File]
  resetDrafts: []
}>()

const isConfirmingReset = shallowRef(false)

function handleImport(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file)
    emit('importBackup', file)

  input.value = ''
}

function confirmReset() {
  emit('resetDrafts')
  isConfirmingReset.value = false
}
</script>

<template>
  <section class="settings-card" aria-labelledby="data-title">
    <header class="settings-card-header">
      <span class="settings-card-icon" aria-hidden="true">
        <span i-ri-database-2-line />
      </span>
      <div>
        <h2 id="data-title" class="settings-card-title">
          {{ $t('settings.data.title') }}
        </h2>
        <p class="settings-card-description">
          {{ $t('settings.data.description') }}
        </p>
      </div>
    </header>

    <div class="local-data-note">
      <span i-ri-shield-check-line aria-hidden="true" />
      <span>{{ $t('settings.data.local_only') }}</span>
    </div>

    <div class="data-actions">
      <button type="button" class="data-action" @click="emit('exportBackup')">
        <span i-ri-download-cloud-2-line aria-hidden="true" />
        <span>
          <strong>{{ $t('settings.data.export') }}</strong>
          <small>{{ $t('settings.data.export_hint') }}</small>
        </span>
        <span i-ri-arrow-right-s-line class="data-action-arrow" aria-hidden="true" />
      </button>

      <label class="data-action" for="settings-backup-file">
        <span i-ri-upload-cloud-2-line aria-hidden="true" />
        <span>
          <strong>{{ $t('settings.data.import') }}</strong>
          <small>{{ $t('settings.data.import_hint') }}</small>
        </span>
        <span i-ri-arrow-right-s-line class="data-action-arrow" aria-hidden="true" />
        <input
          id="settings-backup-file"
          class="sr-only"
          type="file"
          accept="application/json,.json"
          @change="handleImport"
        >
      </label>

      <button
        v-if="!isConfirmingReset"
        type="button"
        class="data-action data-action--danger"
        @click="isConfirmingReset = true"
      >
        <span i-ri-delete-bin-6-line aria-hidden="true" />
        <span>
          <strong>{{ $t('settings.data.reset') }}</strong>
          <small>{{ $t('settings.data.reset_hint') }}</small>
        </span>
        <span i-ri-arrow-right-s-line class="data-action-arrow" aria-hidden="true" />
      </button>

      <div v-else class="reset-confirmation" role="alert">
        <p>{{ $t('settings.data.reset_confirm') }}</p>
        <div class="reset-confirmation-actions">
          <button type="button" class="confirmation-btn" @click="isConfirmingReset = false">
            {{ $t('button.cancel') }}
          </button>
          <button type="button" class="confirmation-btn confirmation-btn--danger" @click="confirmReset">
            {{ $t('settings.data.reset_action') }}
          </button>
        </div>
      </div>
    </div>

    <p
      v-if="statusMessage"
      class="data-status"
      :class="{ 'data-status--danger': statusTone === 'danger' }"
      role="status"
    >
      <span :class="statusTone === 'danger' ? 'i-ri-error-warning-line' : 'i-ri-checkbox-circle-line'" aria-hidden="true" />
      {{ statusMessage }}
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

.local-data-note {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.8rem;
  background: var(--app-c-control);
  color: var(--app-c-muted);
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1.45;
}

.local-data-note > :first-child {
  flex: 0 0 auto;
  color: var(--app-c-brand-strong);
  font-size: 1.1rem;
}

.data-actions {
  display: grid;
  gap: 0.5rem;
}

.data-action {
  display: grid;
  min-height: 3.75rem;
  grid-template-columns: 1.5rem minmax(0, 1fr) 1rem;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.85rem;
  background: var(--app-c-surface-solid);
  color: var(--app-c-text);
  cursor: pointer;
  text-align: left;
  transition:
    border-color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
}

.data-action:hover {
  border-color: var(--app-c-brand-soft);
  box-shadow: 0 6px 18px var(--app-c-focus);
  transform: translateY(-1px);
}

.data-action > :first-child {
  color: var(--app-c-brand-strong);
  font-size: 1.2rem;
}

.data-action strong,
.data-action small {
  display: block;
}

.data-action strong {
  font-size: 0.875rem;
}

.data-action small {
  margin-top: 0.15rem;
  color: var(--app-c-muted);
  font-size: 0.72rem;
  font-weight: 500;
  line-height: 1.4;
}

.data-action-arrow {
  color: var(--app-c-muted) !important;
}

.data-action--danger > :first-child,
.data-action--danger strong {
  color: #c5455e;
}

.reset-confirmation {
  padding: 0.8rem;
  border: 1px solid rgb(197 69 94 / 45%);
  border-radius: 0.85rem;
  background: rgb(197 69 94 / 8%);
}

.reset-confirmation p {
  margin: 0;
  color: var(--app-c-text);
  font-size: 0.8125rem;
  font-weight: 700;
  line-height: 1.5;
}

.reset-confirmation-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.confirmation-btn {
  min-height: 2.75rem;
  padding: 0.5rem 0.8rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.7rem;
  background: var(--app-c-surface-solid);
  color: var(--app-c-text);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 800;
}

.confirmation-btn--danger {
  border-color: #c5455e;
  background: #c5455e;
  color: #fff;
}

.data-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin: 0.75rem 0 0;
  color: #378066;
  font-size: 0.75rem;
  font-weight: 700;
}

.data-status--danger {
  color: #c5455e;
}

@media (max-width: 420px) {
  .settings-card {
    padding: 1rem;
    border-radius: 1rem;
  }
}
</style>
