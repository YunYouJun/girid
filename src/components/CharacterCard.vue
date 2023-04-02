<script lang="ts" setup>
import type { GridItem } from '~/utils'

const props = defineProps<{
  item: GridItem
}>()

const app = useAppStore()
const girid = useGiridStore()

const { locale } = useI18n()
const title = computed(() => locale.value === 'en' ? props.item.title_en : props.item.title)

const editable = ref(false)

const customTitle = ref('')

const customTitleInput = ref<HTMLInputElement>()

/**
 * click title to focus
 */
function clickTitle() {
  editable.value = true

  girid.curGridItem = props.item

  setTimeout(() => {
    customTitleInput.value?.focus()
  }, 50)
}

function onBlur() {
  editable.value = false

  if (girid.curGridItem && customTitle.value)
    girid.curGridItem.title = customTitle.value
}

function clickImage() {
  app.showChooseModal = true
  girid.curGridItem = props.item
}
</script>

<template>
  <div bg="$h5-c-card-bg" flex="~ col" h="full">
    <div aspect="1" object="cover center" overflow="hidden">
      <CharacterCardImage :item="item" @click="clickImage" />
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
          @blur="onBlur"
        >
      </div>

      <CharacterName :item="item" />
    </div>
  </div>
</template>
