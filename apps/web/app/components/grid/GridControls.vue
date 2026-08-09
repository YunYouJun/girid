<script lang="ts" setup>
defineProps<{
  rows: number
  cols: number
}>()

const emit = defineEmits(['update:rows', 'update:cols'])

function updateRows(e: Event) {
  const num = (e.target as HTMLInputElement).valueAsNumber
  if (Number.isNaN(num))
    return

  emit('update:rows', num)
}

function updateCols(e: Event) {
  const num = (e.target as HTMLInputElement).valueAsNumber
  if (Number.isNaN(num))
    return

  emit('update:cols', num)
}
</script>

<template>
  <fieldset class="grid-controls">
    <legend class="sr-only">
      {{ $t('label.grid_settings') }}
    </legend>

    <label class="grid-control-field" for="grid-rows">
      <span class="grid-control-label">
        {{ $t('label.row') }}
      </span>
      <input
        id="grid-rows"
        :value="rows"
        type="number"
        min="1"
        max="10"
        inputmode="numeric"
        class="grid-control-input"
        @input="updateRows"
      >
    </label>

    <label class="grid-control-field" for="grid-cols">
      <span class="grid-control-label">
        {{ $t('label.col') }}
      </span>
      <input
        id="grid-cols"
        :value="cols"
        type="number"
        min="1"
        max="10"
        inputmode="numeric"
        class="grid-control-input"
        @input="updateCols"
      >
    </label>
  </fieldset>
</template>

<style scoped>
.grid-controls {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  border: 0;
}

.grid-control-field {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.5rem;
}

.grid-control-label {
  color: var(--app-c-muted);
  font-size: 0.8125rem;
  font-weight: 700;
}

.grid-control-input {
  width: 4rem;
  height: 2.75rem;
  border: 1px solid var(--app-c-line);
  border-radius: 0.75rem;
  background: var(--app-c-control);
  color: var(--app-c-text);
  font: inherit;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  transition:
    border-color 160ms ease,
    box-shadow 160ms ease,
    background-color 160ms ease;
}

.grid-control-input:hover {
  border-color: var(--app-c-brand-soft);
}

.grid-control-input:focus-visible {
  border-color: var(--app-c-brand);
  box-shadow: 0 0 0 3px var(--app-c-focus);
  outline: none;
}

@media (max-width: 420px) {
  .grid-controls {
    width: 100%;
    justify-content: space-between;
  }

  .grid-control-field {
    flex: 1;
  }

  .grid-control-input {
    min-width: 0;
    flex: 1;
  }
}
</style>
