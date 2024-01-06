<script lang="ts" setup>
import { defaultAvatar } from '~/utils'

const search = useSearchStore()
const { locale } = useI18n()
</script>

<template>
  <div
    v-if="search.animationList.length"
    grid="~ cols-3 md:cols-4 gap-1" justify="center" items="center"
  >
    <div
      v-for="item in search.animationList" :key="item.id"
      flex="~ col" items="center" justify="center" cursor="pointer"
      m="auto"
      max-h="$anime-card-height"

      relative border shadow-md
      class="aspect-ratio-0.65"
      @click="search.setAnimation(item)"
    >
      <div w="full" overflow-hidden object="center" h="full">
        <img
          object="cover top"
          w="full" h="full"
          :src="item.images?.medium || defaultAvatar" :alt="item.name"
        >
      </div>
      <div
        class="overflow-ellipsis"
        absolute bottom-0 w="full" min-h="36px"
        flex justify="center" items="center"
        bg="black opacity-70" text="white"
      >
        <caption text="xs" opacity="70" font="bold" class="overflow-ellipsis">
          {{ locale === 'zh-CN' ? item.name_cn : item.name }}
        </caption>
      </div>
    </div>
  </div>
</template>
packages/site/utils
