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
  <div mt="2" flex="~" justify="evenly" items="center">
    <button inline-flex class="girid-btn" w="21" @click="girid.reset()">
      {{ $t('button.reset') }}
    </button>
    <CopyGirid />
    <DownloadGirid />
  </div>

  <GridControls
    v-model:rows="girid.rows"
    v-model:cols="girid.cols"
  />

  <div m="auto" max-w="800px">
    <div id="girid-container" flex="~ col" p="1" bg="$h5-c-bg">
      <GiridTitle :title="$t('intro.title')" />

      <Suspense>
        <div m="auto">
          <CharacterSearch />
          <UserCharacterGrid />
        </div>

        <template #fallback>
          <Loading />
        </template>
      </Suspense>

      <GeneratedByFooter />
    </div>
  </div>

  <ChooseCharacterModal v-model="app.showChooseModal" />
</template>
