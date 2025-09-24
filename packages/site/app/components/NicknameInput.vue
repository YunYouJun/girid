<script lang="ts" setup>
const { t } = useI18n()

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()

function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}
</script>

<template>
  <input
    id="input"
    v-model="name"
    :placeholder="t('intro.whats-your-name')"
    :aria-label="t('intro.whats-your-name')"
    type="text"
    autocomplete="false"
    p="x4 y2"
    w="full"
    text="center"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    @keydown.enter="go"
  >
  <label class="hidden" for="input">{{ t('intro.whats-your-name') }}</label>
  <div>
    <button
      mt-4 btn
      :disabled="!name"
      @click="go"
    >
      {{ t('button.go') }}
    </button>
  </div>
</template>
