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
    content-class="overflow-auto  md:mt-8 max-w-xl dark:bg-gray-900 dark:border-gray-700"
  >
    <div rounded p-2 bg-white shadow>
      <div v-if="!search.curAnimation" relative mb-2>
        <div
          v-if="search.keyword" cursor="pointer"
          absolute right-2 inline-flex justify="center" items-center h="full" opacity="70"
          @click="search.keyword = ''"
        >
          <div i-ri-close-line />
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
          <div cursor="pointer" icon-btn inline-flex p="4" i-ri-arrow-left-s-line @click="search.removeCurAnimation" />
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
          在「番组计划」搜索
        </button>

        <button class="girid-btn" my-1 @click="setCharacterName">
          没找到，就用搜索框里的文字了
        </button>

        <button class="girid-btn" my-1>
          上传图片 TODO
        </button>
      </div>

      <slot />
      <button class="girid-btn" my-1 @click="app.showChooseModal = false">
        关闭
      </button>
    </div>
  </VueFinalModal>
</template>
