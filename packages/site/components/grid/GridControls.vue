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
  <div class="flex items-center justify-center pt-4">
    <div class="inline-flex flex-wrap items-center gap-2 p-2">
      <label>
        {{ $t('label.row') }}
      </label>
      <input
        id="username"
        :value="rows"
        type="number"
        class="text-grass11 h-[35px] w-20 shrink-0 grow rounded p-2 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-blue8"
        @input="updateRows"
      >
    </div>

    <div class="inline-flex flex-wrap items-center gap-2 p-2">
      <label>
        {{ $t('label.col') }}
      </label>
      <input
        id="username"
        :value="cols"
        type="number"
        class="text-grass11 h-[35px] w-20 shrink-0 grow rounded p-2 text-[15px] leading-none shadow-[0_0_0_1px] shadow-blue7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-blue8"
        @input="updateCols"
      >
    </div>
  </div>
</template>
