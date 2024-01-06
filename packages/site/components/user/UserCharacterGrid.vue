<script lang="ts" setup>
const girid = useGiridStore()

const styles = computed(() => {
  return {
    'grid-template-columns': `repeat(${girid.cols}, minmax(0, 1fr))`,
    'grid-template-rows': `repeat(${girid.rows}, minmax(0, 1fr))`,
  }
})

const gridItems = computed(() => {
  return girid.userGridItems.slice(0, girid.num)
})
</script>

<template>
  <div
    class="character-gird shadow transition hover:shadow-md"
    grid="~ gap-2px sm:gap-4px md:gap-6px"
    bg="$h5-c-card-border" p="2px sm:4px md:6px"
    :style="styles"
    m="auto"
  >
    <div v-for="(item, i) in gridItems" :key="item.title">
      <UserCharacterCard :key="i" :item="item" />
    </div>
  </div>
</template>
