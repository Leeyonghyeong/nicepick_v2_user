import { defineStore } from '@pinia/nuxt/dist/runtime/composables'
import { Brand } from '~~/types/brand'

export const brandListStore = defineStore('brandList', () => {
  const categoryList = ref<Brand[]>([])
  const searchList = ref<Brand[]>([])
  const themeList = ref<Brand[]>([])
  const expectList = ref<Brand[]>([])

  return { categoryList, searchList, themeList, expectList }
})
