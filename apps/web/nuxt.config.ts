import path from 'node:path'
import { componentsDir } from '@yunlefun/vue'
import { config } from './app/config'
import { pwa } from './app/config/pwa'

export default defineNuxtConfig({
  ssr: false,

  alias: {
    'bangumi-api': `${path.resolve(__dirname, '../../packages/bangumi-api')}/src/index.ts`,
  },

  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@vite-pwa/nuxt',

    // extra
    '@nuxtjs/i18n',
    'nuxt-gtag',

    // test
    '@nuxt/test-utils/module',
  ],

  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        code: 'zh-CN',
        file: 'zh-CN.yml',
        name: '简体中文',
      },
      {
        code: 'en',
        file: 'en.yml',
        name: 'English',
      },
    ],
    langDir: 'locales',
    defaultLocale: 'zh-CN',
  },

  components: [
    '~/components',
    {
      path: componentsDir,
      prefix: '',
    },
  ],

  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return ['github-corners'].includes(tag)
          },
        },
      },
    },
  },

  gtag: {
    id: config.gtag.id,
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    // inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/main.css',
    '~/styles/css-vars.scss',
    '~/styles/index.scss',
  ],

  colorMode: {
    classSuffix: '',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/', '/friends', '/settings'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: config.mainColor },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: config.description },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
      ],
    },
  },

  pwa,

  devtools: {
    enabled: true,
  },

  compatibilityDate: '2025-09-24',
})
