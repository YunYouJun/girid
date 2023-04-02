<script lang="ts" setup>
import type { CharacterInfo } from 'bangumi-api'

const app = useAppStore()
const search = useSearchStore()
const girid = useGiridStore()

function clickCharacter(item: CharacterInfo) {
  if (!girid.curGridItem)
    return

  girid.curGridItem.name = item.name
  girid.curGridItem.avatar = item.images.medium

  app.showChooseModal = false
}
</script>

<template>
  <div grid="~ cols-3 md:cols-4 gap-1">
    <div
      v-for="item in search.characterList" :key="item.id"
      flex="~ col" items="center" justify="center" cursor="pointer"
      h="$anime-card-height"
      shadow-md
      border
      relative
      @click="clickCharacter(item)"
    >
      <div w="full" overflow-hidden object="center" h="full">
        <img
          v-if="item.images.medium"
          object="cover"
          w="full" h="full" :src="item.images.medium" :alt="item.name"
        >
      </div>
      <div
        class="overflow-ellipsis"
        absolute bottom-0 w="full" h="36px"
        flex justify="center" items="center"
        bg="black opacity-70" text="white"
      >
        <caption text="xs" opacity="70" font="bold">
          {{ item.name }}
        </caption>
      </div>
    </div>
  </div>
</template>
