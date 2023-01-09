import VueKakaoSdk from 'vue-kakao-sdk'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueKakaoSdk, {
    apiKey: '584152981ebd246c0681ccf96cbf37d2',
  })
})
