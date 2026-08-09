<script lang="ts" setup>
import type { BottomMenuItem } from '@yunlefun/vue'
import { computed } from 'vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const items = computed<BottomMenuItem[]>(() => [
  {
    icon: 'i-ri-home-line',
    activeIcon: 'i-ri-home-fill',
    title: t('nav.home'),
    to: '/',
  },
  {
    icon: 'i-ri-compass-2-line',
    activeIcon: 'i-ri-compass-2-fill',
    title: t('nav.friends'),
    to: '/friends',
  },
  {
    icon: 'i-ri-settings-line',
    activeIcon: 'i-ri-settings-fill',
    title: t('nav.settings'),
    to: '/settings',
  },
])
const active = computed(() => route.path)

function onClick(item: BottomMenuItem) {
  if (item.to)
    void router.push(item.to)
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
