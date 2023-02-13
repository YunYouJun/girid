<script lang="ts" setup>
const gridNum = 20
</script>

<template>
  <div
    class="character-gird" grid="~ cols-5 gap-1"
    bg="$h5-c-card-border" p="1"
  >
    <div v-for="i in gridNum" :key="i">
      <CharacterCard />
    </div>
  </div>
</template>

<style lang="scss">
.character-gird {
  grid-template-columns: repeat(auto-fill, min(100px, 1fr));
}
</style>
