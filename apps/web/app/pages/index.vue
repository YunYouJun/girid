<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const app = useAppStore()
const girid = useGiridStore()

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <section class="workspace-shell">
    <div class="workspace-toolbar">
      <GridControls
        v-model:rows="girid.rows"
        v-model:cols="girid.cols"
      />

      <div class="workspace-actions" :aria-label="$t('label.actions')">
        <button type="button" class="girid-btn" @click="girid.reset()">
          <span i-ri-refresh-line aria-hidden="true" />
          <span>{{ $t('button.reset') }}</span>
        </button>
        <CopyGirid />
        <DownloadGirid />
      </div>
    </div>

    <section class="preview-panel" :aria-label="$t('label.preview')">
      <div class="preview-heading">
        <span>{{ $t('label.preview') }}</span>
        <span class="preview-hint">{{ $t('hint.scroll_preview') }}</span>
      </div>

      <div class="preview-scroll" tabindex="0">
        <div id="girid-container" class="render-canvas">
          <GiridTitle :title="$t('intro.title')" />

          <Suspense>
            <div m="auto">
              <CharacterSearch />
              <UserCharacterGrid />
            </div>

            <template #fallback>
              <Loading />
            </template>
          </Suspense>

          <GeneratedByFooter />
        </div>
      </div>
    </section>
  </section>

  <ChooseCharacterModal v-model="app.showChooseModal" />
</template>
