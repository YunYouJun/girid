<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <div class="mt-2 mx-auto text-center opacity-75" text="xs">
    <div>
      <div>
        <span>
          Made 💗 <a href="https://www.yunyoujun.cn">{{ t('author.name') }}</a>
        </span>
      </div>

      <div mt="1">
        <a href="https://github.com/YunYouJun/girid" target="_blank" class="underline" title="GitHub">
          <span>
            YunYouJun/girid
          </span>
        </a>
        <span>Inspired by </span>
        <a href="https://github.com/itorr/anime-grid" target="_blank" class="underline">
          <span>
            itorr/anime-grid
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
