// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      titleTemplate: '창업할 땐 창업픽 %s',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, user-scalable=no',
        },
        {
          name: 'description',
          content:
            '프랜차이즈의 모든 정보를 한눈에 비교 분석은 창업픽에서 시작하세요!! 브랜드별 매출, 창업비용, 가맹점 수등을 한번에 비교하고 상권분석을 통해 최적의 입지에 창업을 도와드립니다.',
        },
        { name: 'author', content: '창업픽' },
        {
          property: 'og:title',
          content: '창업정보 no.1 플랫폼! 모든브랜드 직접비교',
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:description',
          content:
            '프랜차이즈의 모든 정보를 한눈에 비교 분석은 창업픽에서 시작하세요!! 브랜드별 매출, 창업비용, 가맹점 수등을 한번에 비교하고 상권분석을 통해 최적의 입지에 창업을 도와드립니다.',
        },
        {
          property: 'og:image',
          content:
            'https://nicepick.s3.ap-northeast-2.amazonaws.com/etc/main.jpeg',
        },
        {
          property: 'og:url',
          content: 'http://3.38.51.90/',
        },
        {
          property: 'og:site:name',
          content: '창업할 땐 창업픽',
        },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css',
        },
      ],
      script: [
        {
          crossorigin: 'anonymous',
          src: 'https://kit.fontawesome.com/a418912500.js',
        },
      ],
    },
  },
  typescript: {
    shim: false,
  },
  css: ['~/assets/scss/font.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/index.scss";',
        },
      },
    },
  },
  modules: ['@pinia/nuxt'],
  build: {
    transpile: [/echarts/],
  },
})
