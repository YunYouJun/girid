<script lang="ts" setup>
import { gridItems } from '~/utils'
</script>

<template>
  <div
    class="character-gird shadow hover:shadow-md transition"
    grid="~ cols-5 gap-2px sm:gap-4px md:gap-6px"
    bg="$h5-c-card-border" p="2px sm:4px md:6px"
  >
    <div v-for="item in gridItems" :key="item.title">
      <CharacterCard :item="item" />
    </div>
  </div>
</template>

<style lang="scss">
.character-gird {
  grid-template-columns: repeat(auto-fill, min(100px, 1fr));
}
</style>
