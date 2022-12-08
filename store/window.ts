import { defineStore } from 'pinia'

export const useWindowStore = defineStore('windows', () => {
  const windowWidth = ref<number>(0)

  const getDevice = computed<string>(() => {
    if (windowWidth.value >= 1200) {
      return 'pc'
    } else if (windowWidth.value < 1200 && windowWidth.value >= 768) {
      return 'tablet'
    } else {
      return 'mobile'
    }
  })

  return { windowWidth, getDevice }
})
