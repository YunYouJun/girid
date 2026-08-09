<script setup lang="ts">
import { SubjectType } from 'bangumi-api'
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
} from 'reka-ui'
import { bangumiApi } from '~/utils'

const open = defineModel<boolean>({ default: false })
const girid = useGiridStore()
const search = useSearchStore()
const { t } = useI18n()

async function go() {
  try {
    const results = await bangumiApi.search.subject.get(search.keyword, {
      type: SubjectType.ANIME,
      max_results: 12,
    })

    if (results.list.length)
      search.animationList = results.list
  }
  catch {}
}

function setCharacterName() {
  if (!search.keyword)
    return
  if (!girid.curGridItem)
    return

  girid.curGridItem.name = search.keyword
  open.value = false
}
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="dialog-overlay" />
      <DialogContent
        :aria-describedby="undefined"
        class="dialog-content min-h-0 flex flex-col overflow-hidden bg-white p-3 shadow-xl outline-none dark:border-gray-700 dark:bg-dark-300 sm:p-4"
      >
        <DialogClose as-child>
          <button
            type="button"
            class="dialog-icon-button absolute right-1 top-1"
            :aria-label="t('button.close')"
          >
            <span class="i-ri-close-line" aria-hidden="true" />
          </button>
        </DialogClose>

        <div m="t-2 b-3">
          <DialogTitle as-child>
            <h1 class="text-center text-2xl font-bold">
              {{ t('modal.title') }}
            </h1>
          </DialogTitle>
        </div>

        <div v-if="!search.curAnimation" relative my-2>
          <button
            v-if="search.keyword"
            type="button"
            class="dialog-icon-button absolute right-0 top-1/2 opacity-70 -translate-y-1/2"
            :aria-label="t('button.clear')"
            @click="search.keyword = ''"
          >
            <span class="i-ri-close-line" aria-hidden="true" />
          </button>
          <input
            id="character-search"
            v-model="search.keyword"
            class="search-input"
            :placeholder="t('search.anime')"
            :aria-label="t('search.anime')"
            type="search"
            name="character-search"
            autocomplete="off"
            p="x4 y2"
            w="full"
            text="center"
            bg="transparent"
            border="~ rounded gray-200 dark:gray-700"
            @keydown.enter="go"
          >
          <label class="sr-only" for="character-search">{{ t('search.anime') }}</label>
        </div>
        <div v-else mb-2>
          <div h="42px" flex items="center">
            <button
              type="button"
              class="dialog-icon-button"
              :aria-label="t('button.back')"
              @click="search.removeCurAnimation"
            >
              <span class="i-ri-arrow-left-s-line" aria-hidden="true" />
            </button>
            <span>
              {{ search.curAnimation?.name_cn }}
            </span>
          </div>
        </div>

        <div class="scroll-content rounded py-3" flex="~ grow" justify="center" items="start" overflow="auto">
          <AnimationListGrid v-if="!search.curAnimation" />
          <CharacterListGrid v-else />
        </div>

        <div mt-2 flex="~ col" gap="2">
          <button
            class="girid-btn"
            :disabled="!search.keyword"
            @click="go"
          >
            {{ t('modal.search_from_bangumi') }}
          </button>

          <div flex gap="2">
            <button class="girid-btn" @click="setCharacterName">
              {{ t('modal.use_search_input') }}
            </button>

            <UploadImageBtn class="h-full" />
          </div>
        </div>

        <slot />
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  z-index: 100;
  inset: 0;
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(2px);
}

.dialog-content {
  position: fixed;
  z-index: 101;
  top: 50%;
  left: 50%;
  width: min(calc(100vw - 2rem), 40rem);
  height: min(80dvh, 48rem);
  transform: translate(-50%, -50%);
  border-radius: 0.75rem;
}

.dialog-icon-button {
  display: inline-flex;
  width: 2.75rem;
  height: 2.75rem;
  flex: none;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  font-size: 1.25rem;
  touch-action: manipulation;

  &:focus-visible {
    outline: 2px solid var(--c-primary, #6366f1);
    outline-offset: 2px;
  }
}

.search-input {
  min-height: 2.75rem;
}

.scroll-content {
  min-height: 0;
  background: rgba(233, 233, 233, 1) linear-gradient(transparent, rgba(0, 0, 0, 0.1) 100%);
  background-attachment: local, scroll;
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100% 100px;
  overscroll-behavior: contain;
}

.dark .scroll-content {
  background: rgba(60, 60, 60, 1) linear-gradient(transparent, rgba(0, 0, 0, 0.3) 100%);
}

@media (max-width: 639px) {
  .dialog-content {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: min(92dvh, 48rem);
    max-height: calc(100dvh - max(0.75rem, env(safe-area-inset-top)));
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
    transform: none;
    border-radius: 1rem 1rem 0 0;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .dialog-overlay[data-state='open'] {
    animation: overlay-in 160ms ease-out;
  }

  .dialog-overlay[data-state='closed'] {
    animation: overlay-out 120ms ease-in;
  }

  .dialog-content[data-state='open'] {
    animation: dialog-in 180ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .dialog-content[data-state='closed'] {
    animation: dialog-out 120ms ease-in;
  }

  @media (max-width: 639px) {
    .dialog-content[data-state='open'] {
      animation-name: sheet-in;
    }

    .dialog-content[data-state='closed'] {
      animation-name: sheet-out;
    }
  }
}

@keyframes overlay-in {
  from {
    opacity: 0;
  }
}

@keyframes overlay-out {
  to {
    opacity: 0;
  }
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }
}

@keyframes dialog-out {
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.98);
  }
}

@keyframes sheet-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes sheet-out {
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>
