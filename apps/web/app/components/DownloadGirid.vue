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
  <button type="button" class="girid-btn girid-btn--primary" aria-label="Download Image" @click="onClick">
    <span i-ri-download-2-line aria-hidden="true" />
    <span>{{ t('button.download') }}</span>
  </button>
</template>
