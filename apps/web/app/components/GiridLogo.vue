<template>
  <NuxtLink class="brand-lockup" to="/" :aria-label="`Girid — ${$t('brand.tagline')}`">
    <img class="brand-mark" src="/girid-mark.svg" alt="" width="52" height="52">
    <span class="brand-copy">
      <strong class="brand-name">Girid</strong>
      <span class="brand-tagline">{{ $t('brand.tagline') }}</span>
    </span>
  </NuxtLink>
</template>

<style scoped>
.brand-lockup {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--app-c-text);
  text-decoration: none;
}

.brand-mark {
  width: 3.25rem;
  height: 3.25rem;
  flex: none;
  filter: drop-shadow(0 8px 14px rgb(48 52 119 / 18%));
}

.brand-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.brand-tagline {
  margin-top: 0.3rem;
  color: var(--app-c-muted);
  font-size: 0.75rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .brand-mark {
    width: 2.75rem;
    height: 2.75rem;
  }

  .brand-tagline {
    font-size: 0.6875rem;
  }
}
</style>
