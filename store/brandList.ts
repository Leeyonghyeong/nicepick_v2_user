import { defineStore } from 'pinia'
import { Brand, BrandList } from '~~/types/brand'

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

  const promotionList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  const rankList = ref<BrandList>({
    brandItems: [],
    page: 1,
    nextPage: false,
    totalCount: 0,
  })

  const compareList = ref<Brand[]>([])

  return {
    categoryList,
    searchList,
    themeList,
    expectList,
    promotionList,
    rankList,
    compareList,
  }
})
