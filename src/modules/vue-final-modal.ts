import { createVfm } from 'vue-final-modal'
import { type UserModule } from '~/types'

// https://vue-final-modal.org/
export const install: UserModule = ({ app }) => {
  const vfm = createVfm()
  app.use(vfm)
}
