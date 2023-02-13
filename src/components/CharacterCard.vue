<script lang="ts" setup>
import type { GridItem } from '~/utils'
import { defaultAvatar } from '~/utils'

const props = defineProps<{
  item: GridItem
}>()

const { locale, t } = useI18n()
const title = computed(() => locale.value === 'en' ? props.item.title_en : props.item.title)

const editable = ref(false)

const customTitle = ref('')

const customTitleInput = ref<HTMLInputElement>()

/**
 * click title to focus
 */
const clickTitle = () => {
  editable.value = true
  setTimeout(() => {
    customTitleInput.value?.focus()
  }, 50)
}
</script>

<template>
  <div bg="$h5-c-card-bg" flex="~ col" h="full">
    <div aspect="1">
      <img
        :src="defaultAvatar"
        alt="asd"
        :class="isDark && 'filter-invert'"
      >
    </div>
    <div flex="~ col 1" border="t-2 gray opacity-50" p="1" justify="center" items="center">
      <div text="center xs sm:base md:xl" font="bold" @click="clickTitle">
        <span v-show="!editable" cursor="pointer">{{ customTitle || title }}</span>
        <input
          v-show="editable"
          ref="customTitleInput" v-model="customTitle"
          text="center"
          h="full"
          w="full" border="1"
          @keyup.enter="editable = false"
          @blur="editable = false"
        >
      </div>
      <div text="center xs sm:sm" opacity-75>
        {{ t('girid.none') }}
      </div>
    </div>
  </div>
</template>
