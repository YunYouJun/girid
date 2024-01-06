import { createVfm } from 'vue-final-modal'

// https://vue-final-modal.org/
export default defineNuxtPlugin((nuxtApp) => {
  // Doing something with nuxtApp
  const vfm = createVfm()
  nuxtApp.vueApp.use(vfm)
})
