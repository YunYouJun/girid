<script lang="ts" setup>
import type { GridItem } from '~/utils'

const props = defineProps<{
  item?: GridItem
}>()

const girid = useGiridStore()

const editable = ref(false)
const customName = ref('')

const { t } = useI18n()

const customNameInput = ref<HTMLInputElement>()

/**
 * click title to focus
 */
function onClick() {
  editable.value = true

  girid.curGridItem = props.item

  setTimeout(() => {
    customNameInput.value?.focus()
  }, 50)
}

function onBlur() {
  editable.value = false
  if (girid.curGridItem)
    girid.curGridItem.name = customName.value
}
</script>

<template>
  <div class="girid-character-name" text="center xs sm:sm" opacity-75 @click="onClick">
    <span v-show="!editable" cursor="pointer">
      {{ customName || item?.name || t('girid.none') }}
    </span>
    <input
      v-show="editable"
      ref="customNameInput" v-model="customName"
      text="center"
      h="full"
      w="full" border="1"
      @keyup.enter="editable = false"
      @blur="onBlur"
    >
  </div>
</template>
packages/site/utils
