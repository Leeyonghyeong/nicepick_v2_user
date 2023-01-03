import { defineStore } from 'pinia'
import { Brand } from '~~/types/brand'

export const useBrandListStore = defineStore('brandList', () => {
  const categoryList = ref<Brand[]>([])
  const categoryListPage = ref<number>(1)
  const categoryListNextPage = ref<boolean>(false)
  const categoryListTotalCount = ref<number>(0)
  const searchList = ref<Brand[]>([])
  const searchListPage = ref<number>(1)
  const searchListNextPage = ref<boolean>(false)
  const searchListTotalCount = ref<number>(0)
  const themeList = ref<Brand[]>([])
  const themeListPage = ref<number>(1)
  const themeListNextPage = ref<boolean>(false)
  const themeListTotalCount = ref<number>(0)
  const expectList = ref<Brand[]>([])
  const expectListPage = ref<number>(1)
  const expectListNextPage = ref<boolean>(false)
  const expectListTotalCount = ref<number>(0)

  return {
    categoryList,
    categoryListPage,
    categoryListNextPage,
    categoryListTotalCount,
    searchList,
    searchListPage,
    searchListNextPage,
    searchListTotalCount,
    themeList,
    themeListPage,
    themeListNextPage,
    themeListTotalCount,
    expectList,
    expectListPage,
    expectListNextPage,
    expectListTotalCount,
  }
})
