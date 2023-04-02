<script lang="ts" setup>
import { downloadDataUrlAsImage } from '@yunlefun/utils'
import { toPng } from 'html-to-image'

async function onClick() {
  const container = document.getElementById('girid-container')
  if (!container)
    return
  // const url = await screenShotToBase64(container)

  const url = await toPng(container, {
    includeQueryParams: true,
  })

  if (url)
    downloadDataUrlAsImage(url, 'Girid-动画角色印象表.png')
}
</script>

<template>
  <button inline-flex class="girid-btn" w="20" @click="onClick">
    下载
  </button>
</template>
