<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 text-xl py="4" font="bold" flex="~" items="center" justify="center">
      <div color="red" i-ri-heart-line inline-flex />
      <div mx-2 inline-flex>
        {{ t('intro.title') }}
      </div>
      <div color="red" i-ri-heart-line inline-flex />
    </h1>

    <Suspense>
      <div m="auto" max-w="720px">
        <CharacterSearch />
        <CharacterGrid />
      </div>

      <template #fallback>
        <Loading />
      </template>
    </Suspense>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
