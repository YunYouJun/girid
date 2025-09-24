<script lang="ts" setup>
import { downloadDataUrlAsImage } from '@yunlefun/utils'
import { toPng } from 'html-to-image'
import { suggestedTableFilename } from '~/config'

const { t } = useI18n()

async function onClick() {
  const container = document.getElementById('girid-container')
  if (!container)
    return
  // const url = await screenShotToBase64(container)

  const url = await toPng(container, {
    includeQueryParams: true,
  })

  if (url)
    downloadDataUrlAsImage(url, suggestedTableFilename)
}
</script>

<template>
  <button inline-flex class="girid-btn" w="21" aria-label="Download Image" @click="onClick">
    {{ t('button.download') }}
  </button>
</template>
