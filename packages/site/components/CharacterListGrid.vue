<script lang="ts" setup>
import type { CharacterInfo } from 'bangumi-api'

const app = useAppStore()
const search = useSearchStore()
const girid = useGiridStore()

function clickCharacter(item: CharacterInfo) {
  if (!girid.curGridItem)
    return

  girid.curGridItem.name = item.name

  // girid.curGridItem.avatar = item.images.medium

  const imgUrlWithoutCors = getImageWithoutCors(item.images.medium)
  // image url 转本地 base64

  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = imgUrlWithoutCors

  // load girid cors need time
  girid.curGridItem.loading = true

  img.onload = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const dataURL = canvas.toDataURL('image/png')
    if (!girid.curGridItem)
      return
    girid.curGridItem.avatar = dataURL
    girid.curGridItem.loading = false
  }

  app.showChooseModal = false
}
</script>

<template>
  <div grid="~ cols-3 md:cols-4 gap-1" justify="center" items="center">
    <div
      v-for="item in search.characterList" :key="item.id"
      flex="~ col" items="center" justify="center"
      cursor="pointer"
      w="$anime-card-width"
      h="$anime-card-height"
      relative border shadow-md
      @click="clickCharacter(item)"
    >
      <div w="full" overflow-hidden object="center" h="full">
        <img
          v-if="item.images.medium"
          object="cover top"
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
