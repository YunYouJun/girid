<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const app = useAppStore()
const { t } = useI18n()

const friend = useFriendStore()

// todo
// custom column and row
// custom add & delete card item

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <div mt="2" flex="~" justify="evenly" items="center">
    <button inline-flex class="girid-btn" w="21" @click="friend.reset()">
      {{ t('button.reset') }}
    </button>
    <CopyGirid />
    <DownloadGirid />
  </div>

  <GridControls
    v-model:rows="friend.rows"
    v-model:cols="friend.cols"
  />

  <div m="auto" max-w="800px">
    <div id="girid-container" flex="~ col" p="1" bg="$h5-c-bg">
      <GiridTitle title="群友印象表" />

      <Suspense>
        <FriendGrid />

        <template #fallback>
          <Loading />
        </template>
      </Suspense>

      <GeneratedByFooter />
    </div>
  </div>

  <ChooseCharacterModal v-model="app.showChooseModal" />
</template>
