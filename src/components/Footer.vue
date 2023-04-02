<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="mt-5 mx-auto text-center opacity-75" text="xs">
    <div>
      <div>
        Made 💗 <a href="https://www.yunyoujun.cn">{{ t('author.name') }}</a>
      </div>

      <div mt="1">
        <a href="https://github.com/YunYouJun/girid" target="_blank" class="underline">
          YunYouJun/girid
        </a>
        Inspired by
        <a href="https://github.com/itorr/anime-grid" target="_blank" class="underline">
          itorr/anime-grid
        </a>
      </div>
    </div>
  </div>
</template>
