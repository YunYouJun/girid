<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const app = useAppStore()
const { t } = useI18n()

const friend = useFriendStore()

// todo
// custom column and row
// custom add & delete card item
</script>

<template>
  <div mt="10" flex="~" justify="evenly" items="center">
    <button inline-flex class="girid-btn" w="21" @click="friend.reset()">
      {{ t('button.reset') }}
    </button>
    <CopyGirid />
    <DownloadGirid />
  </div>

  <div>
    Working...
  </div>
  <div>
    cols:
    <input v-model="friend.cols">
    rows:
    <input v-model="friend.rows">
  </div>

  <div m="auto">
    <div id="girid-container" flex="~ col" p="1" bg="$h5-c-bg">
      <h1 text-xl py="4" font="bold" flex="~" items="center" justify="center">
        <div color="red" i-ri-heart-line inline-flex />
        <div mx-2 inline-flex>
          群友印象表
        </div>
        <div color="red" i-ri-heart-line inline-flex />
      </h1>

      <Suspense>
        <FriendGrid />

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

<route lang="yaml">
meta:
  layout: home
</route>
