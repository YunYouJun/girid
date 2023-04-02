<script lang="ts" setup>
import { toBlob } from 'html-to-image'

import { copyBlobToClipboard } from 'copy-image-clipboard'

async function onClick() {
  const container = document.getElementById('girid-container')
  if (!container)
    return
  // const url = await screenShotToBase64(container)

  const blob = await toBlob(container, {
    includeQueryParams: true,
  })

  if (blob)
    copyBlobToClipboard(blob)
}
</script>

<template>
  <button inline-flex class="girid-btn" w="20" @click="onClick">
    复制
  </button>
</template>
