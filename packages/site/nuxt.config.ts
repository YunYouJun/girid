import path from 'node:path'
import { componentsDir } from '@yunlefun/vue'
import { pwa } from './config/pwa'
import { config } from './config'

export default defineNuxtConfig({
  alias: {
    '~/': `${path.resolve(__dirname)}/`,
    'bangumi-api': `${path.resolve(__dirname, '../bangumi-api')}/src/index.ts`,
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
  ],

  i18n: {
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
    lazy: true,
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
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/safari-pinned-tab.svg' },
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
})
