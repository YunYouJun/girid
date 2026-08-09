<script setup lang="ts">
// import { useGtag } from 'vue-gtag-next'
// const { event } = useGtag()

const app = useAppStore()
const { t } = useI18n()

const friend = useFriendStore()

// todo
// custom column and row
// custom add & delete card item

definePageMeta({
  layout: 'home',
})
</script>

<template>
  <section class="workspace-shell">
    <div class="workspace-toolbar">
      <GridControls
        v-model:rows="friend.rows"
        v-model:cols="friend.cols"
      />

      <div class="workspace-actions" :aria-label="t('label.actions')">
        <button type="button" class="girid-btn" @click="friend.reset()">
          <span i-ri-refresh-line aria-hidden="true" />
          <span>{{ t('button.reset') }}</span>
        </button>
        <CopyGirid />
        <DownloadGirid />
      </div>
    </div>

    <section class="preview-panel" :aria-label="t('label.preview')">
      <div class="preview-heading">
        <span>{{ t('label.preview') }}</span>
        <span class="preview-hint">{{ t('hint.scroll_preview') }}</span>
      </div>

      <div class="preview-scroll" tabindex="0">
        <div id="girid-container" class="render-canvas">
          <GiridTitle title="群友印象表" />

          <Suspense>
            <FriendGrid />

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
