<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <slot />
    <div>
      <button mt-8 text-sm btn @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>
  </main>
</template>
