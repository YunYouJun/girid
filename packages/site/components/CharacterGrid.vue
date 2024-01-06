<script lang="ts" setup>
const girid = useGiridStore()
</script>

<template>
  <div
    class="character-gird shadow transition hover:shadow-md"
    grid="~ cols-5 gap-2px sm:gap-4px md:gap-6px"
    bg="$h5-c-card-border" p="2px sm:4px md:6px"
  >
    <div v-for="(item, i) in girid.userGridItems" :key="item.title">
      <CharacterCard :key="i" :item="item" />
    </div>
  </div>
</template>

<style lang="scss">
.character-gird {
  grid-template-columns: repeat(auto-fill, min(100px, 1fr));
}
</style>
