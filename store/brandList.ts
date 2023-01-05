import { defineStore } from 'pinia'
import { BrandList } from '~~/types/brand'

export const useBrandListStore = defineStore('brandList', () => {
  const categoryList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  const searchList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  const themeList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  const expectList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  return {
    categoryList,
    searchList,
    themeList,
    expectList,
  }
})
