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
  <button type="button" class="girid-btn" @click="onClick">
    <span i-ri-file-copy-line aria-hidden="true" />
    <span>{{ $t('button.copy') }}</span>
  </button>
</template>
