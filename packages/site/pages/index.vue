<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const app = useAppStore()

const girid = useGiridStore()

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div mt="10" flex="~" justify="evenly" items="center">
    <button inline-flex class="girid-btn" w="21" @click="girid.reset()">
      {{ $t('button.reset') }}
    </button>
    <CopyGirid />
    <DownloadGirid />
  </div>

  <div m="auto" max-w="720px">
    <div id="girid-container" flex="~ col" p="1" bg="$h5-c-bg">
      <h1 text-xl py="4" font="bold" flex="~" items="center" justify="center">
        <div color="red" i-ri-heart-line inline-flex />
        <div mx-2 inline-flex>
          {{ $t('intro.title') }}
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

      <a
        class="text-xs" alt="site"
        href="https://girid.yunyoujun.cn" target="_blank"
        op="60"
        my="1"
      >
        <span>girid.yunyoujun.cn</span>
      </a>
    </div>
  </div>

  <ChooseCharacterModal v-model="app.showChooseModal" />
</template>
