<script lang="ts" setup>
import type { BottomMenuItem } from '@yunlefun/vue'
import { ref } from 'vue'

const items: BottomMenuItem[] = [
  {
    icon: 'i-ri-home-line',
    activeIcon: 'i-ri-home-fill',
    title: '首页',
    to: '/',
  },
  {
    icon: 'i-ri-compass-2-line',
    activeIcon: 'i-ri-compass-2-fill',
    title: '朋友',
    to: '/friends',
  },
  {
    icon: 'i-ri-settings-line',
    activeIcon: 'i-ri-settings-fill',
    title: '设置',
    to: '/settings',
  },
]

const route = useRoute()
const router = useRouter()
const active = ref(route.path)
function onClick(item: BottomMenuItem) {
  active.value = item.to || ''
  if (active.value)
    router.push(active.value)
}
</script>

<template>
  <YlfBottomMenu shadow>
    <YlfBottomMenuItem
      v-for="item in items"
      :key="item.to"
      :item="item"
      :active="active === item.to"
      @click="onClick"
    />
  </YlfBottomMenu>
</template>
