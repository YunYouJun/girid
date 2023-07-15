<script lang="ts" setup>
import type { GridItem } from '~/utils'

const props = defineProps<{
  index: number
  item?: GridItem
}>()

const girid = useGiridStore()
const friend = useFriendStore()

const { locale } = useI18n()
const title = computed(() => {
  if (props.item)
    return (locale.value === 'en' ? props.item.title_en : props.item.title)
  else
    return '色批'
})

const editable = ref(false)

const customTitle = ref('')

const customTitleInput = ref<HTMLInputElement>()
const uploadImgInputRef = ref<HTMLInputElement>()

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
  uploadImgInputRef.value?.click()
  friend.curGridIndex = props.index
}

/**
 * set cur grid item image
 * @param _e
 */
function onFileChange(_e: Event) {
  const file = uploadImgInputRef.value?.files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (!result)
      return

    if (!friend.curGridItem) {
      friend.gridItems[friend.curGridIndex] = {
        title: '色批',
        title_en: '',
      }
    }

    friend.curGridItem.avatar = result.toString()
    friend.curGridItem.name = file.name
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div bg="$h5-c-card-bg" flex="~ col" h="full">
    <div aspect="1" object="cover center" overflow="hidden">
      <GiridCardImage :item="item" @click="clickImage" />
      <input
        ref="uploadImgInputRef" class="upload-image-input"
        type="file" accept="image/*"
        :onchange="onFileChange"
      >
    </div>
    <div flex="~ col 1" border="t-2 gray opacity-50" p="1" justify="center" items="center">
      <div w="full" text="center xs sm:base md:xl" font="bold" @click="clickTitle">
        <span v-show="!editable" cursor="pointer">{{ customTitle || title || '标签印象' }}</span>
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

      <FriendName :item="item" />
    </div>
  </div>
</template>
