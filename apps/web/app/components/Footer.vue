<script lang="ts" setup>
const { t } = useI18n()
</script>

<template>
  <footer class="app-footer">
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
  </footer>
</template>

<style scoped>
.app-footer {
  max-width: 42rem;
  margin: 1.5rem auto 0;
  color: var(--app-c-muted);
  font-size: 0.75rem;
  line-height: 1.6;
  text-align: center;
}

.app-footer a {
  text-underline-offset: 0.2em;
}
</style>
