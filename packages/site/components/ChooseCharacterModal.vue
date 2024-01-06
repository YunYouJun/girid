<script setup lang="ts">
import { SubjectType } from 'bangumi-api'
import { VueFinalModal } from 'vue-final-modal'
import { bangumiApi } from '~/utils'

const app = useAppStore()
const girid = useGiridStore()
const search = useSearchStore()
const { t } = useI18n()

async function go() {
  try {
    const results = await bangumiApi.search.subject.get(search.keyword, {
      type: SubjectType.ANIME,
      max_results: 12,
    })

    if (results.list.length)
      search.animationList = results.list
  }
  catch {}
}

function setCharacterName() {
  if (!search.keyword)
    return
  if (!girid.curGridItem)
    return

  girid.curGridItem.name = search.keyword
  app.showChooseModal = false
}
</script>

<template>
  <VueFinalModal
    class="flex justify-center overflow-auto"
    content-class="overflow-auto  md:mt-8 max-w-xl"
  >
    <div relative rounded bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-900>
      <div
        class="icon" w="10" h="10"
        flex="~" justify="center" items="center"
        absolute right-1 top-1 @click="app.showChooseModal = false"
      >
        <div class="i-ri-close-line" />
      </div>
      <div m="t-2 b-3">
        <h1 class="text-2xl font-bold" text="center">
          {{ t('modal.title') }}
        </h1>
      </div>

      <div v-if="!search.curAnimation" relative my-2>
        <div
          v-if="search.keyword" cursor="pointer"
          absolute right-2 inline-flex justify="center" items-center h="full" opacity="70"
          @click="search.keyword = ''"
        >
          <div class="i-ri-close-line" />
        </div>
        <input
          id="input"
          v-model="search.keyword"
          :placeholder="t('search.anime')"
          :aria-label="t('search.anime')"
          type="text"
          autocomplete="off"
          p="x4 y2"
          w="full"
          text="center"
          bg="transparent"
          border="~ rounded gray-200 dark:gray-700"
          @keydown.enter="go"
        >
        <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
      </div>
      <div v-else mb-2>
        <div h="42px" flex items="center">
          <div cursor="pointer" p="4" icon-btn i-ri-arrow-left-s-line inline-flex @click="search.removeCurAnimation" />
          <span>
            {{ search.curAnimation?.name_cn }}
          </span>
        </div>
      </div>
      <AnimationListGrid v-if="!search.curAnimation" />
      <CharacterListGrid v-else />
      <div>
        <button
          class="girid-btn"
          my-1
          :disabled="!search.keyword"
          @click="go"
        >
          {{ t('modal.search_from_bangumi') }}
        </button>

        <button class="girid-btn" my-1 @click="setCharacterName">
          {{ t('modal.use_search_input') }}
        </button>

        <UploadImageBtn />
      </div>

      <slot />
    </div>
  </VueFinalModal>
</template>
packages/site/utils
