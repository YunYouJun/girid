<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  layout: '404',
})
</script>

<template>
  <div>
    {{ t('not-found') }}
  </div>
</template>
