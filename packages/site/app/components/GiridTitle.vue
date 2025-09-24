<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 text-xl py="4" font="bold" flex="~" items="center" justify="center">
    <div color="red" i-ri-heart-line inline-flex />
    <div mx-2 inline-flex>
      {{ title }}
    </div>
    <div color="red" i-ri-heart-line inline-flex />
  </h1>
</template>
