import { defineVitestConfig } from '@nuxt/test-utils/config'
import { isWindows } from 'std-env'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    testTimeout: isWindows ? 60000 : 10000,
  },
})
