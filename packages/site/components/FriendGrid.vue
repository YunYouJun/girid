<script lang="ts" setup>
const friend = useFriendStore()

const styles = computed(() => {
  return {
    'grid-template-columns': `repeat(${friend.cols}, minmax(0, 1fr))`,
    'grid-template-rows': `repeat(${friend.rows}, minmax(0, 1fr))`,
  }
})
</script>

<template>
  <div
    class="friend-grid shadow transition hover:shadow-md"
    grid="~ gap-2px sm:gap-4px md:gap-6px cols-5 rows-2"
    bg="$h5-c-card-border" p="2px sm:4px md:6px"
    :style="styles"
    m="auto"
  >
    <template v-for="i in friend.num" :key="i">
      <FriendCard :index="i - 1" :item="friend.gridItems[i - 1]" />
    </template>
  </div>
</template>
