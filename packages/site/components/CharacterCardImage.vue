<script lang="ts" setup>
import type { GridItem } from '~/utils'
import { defaultAvatar } from '~/utils'

const props = defineProps<{
  item: GridItem
}>()

const imgSrc = computed(() => {
  if (props.item.avatar?.startsWith('https://lain.bgm.tv'))
    return `${import.meta.env.DEV ? 'http://localhost:3000' : ''}/api/bgm/cors?url=${props.item.avatar}`
  else
    return props.item.avatar || defaultAvatar
})
</script>

<template>
  <div cursor="pointer" h="full">
    <img
      object="top cover"
      class="h-full w-full"
      :src="imgSrc"
      :alt="item.name"
      :class="isDark"
    >
  </div>
</template>
packages/site/utilspackages/site/utils
