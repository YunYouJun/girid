<script lang="ts" setup>
import type { GridItem } from '~/utils'
import { defaultAvatar } from '~/utils'

const props = defineProps<{
  item: GridItem
}>()
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

const imgSrc = computed(() => {
  return getImageWithoutCors(props.item.avatar || '') || defaultAvatar
})
</script>

<template>
  <div cursor="pointer" h="full">
    <img
      object="top cover"
      class="h-full w-full"
      :src="imgSrc"
      :alt="item.name"
      :class="{ dark: isDark }"
    >
  </div>
</template>
