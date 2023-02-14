<script lang="ts" setup>
import type { GridItem } from '~/utils'
import { defaultAvatar } from '~/utils'

defineProps<{
  item: GridItem
}>()
</script>

<template>
  <div cursor="pointer" h="full">
    <img
      class="object-center object-cover h-full w-full"
      :src="item.avatar || defaultAvatar"
      :alt="item.name"
      :class="isDark && 'filter-invert'"
    >
  </div>
</template>
