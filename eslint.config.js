import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    formatters: true,
    rules: {
      'pnpm/yaml-enforce-settings': 'off',
    },
  },
)
