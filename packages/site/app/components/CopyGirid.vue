<script lang="ts" setup>
import { copyBlobToClipboard } from 'copy-image-clipboard'

import { toBlob } from 'html-to-image'

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
  <button inline-flex class="girid-btn" w="21" @click="onClick">
    {{ $t('button.copy') }}
  </button>
</template>
