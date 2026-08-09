<template>
  <div class="app-shell">
    <header class="site-header">
      <GiridLogo />
    </header>

    <main class="home-main">
      <slot />
      <Footer />
    </main>

    <TheBottomMenu fixed bottom-0 left-0 right-0 />
  </div>
</template>
