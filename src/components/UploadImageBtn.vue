<script lang="ts" setup>
const uploadImgInput = ref<HTMLInputElement>()

const app = useAppStore()
const girid = useGiridStore()

function onClick() {
  uploadImgInput.value?.click()
}

/**
 * set cur grid item image
 * @param _e
 */
function onFileChange(_e: Event) {
  const file = uploadImgInput.value?.files?.[0]
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (!result)
      return

    if (!girid.curGridItem)
      return

    girid.curGridItem.avatar = result.toString()
    girid.curGridItem.name = file.name
    app.showChooseModal = false
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <button class="girid-btn" my-1 @click="onClick">
    上传图片
    <input
      ref="uploadImgInput" class="upload-image-input"
      type="file" accept="image/*"
      :onchange="onFileChange"
    >
  </button>
</template>

<style>
.upload-image-input {
  display: none;
}
</style>
