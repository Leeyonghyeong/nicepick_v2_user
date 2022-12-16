import { defineStore } from 'pinia'
import { LargeCategory } from '~~/types/category'
import api from '~/config/axios.config'

export const useCategoryStore = defineStore('category', () => {
  const category = ref<LargeCategory[]>([])

  const addCategory = async (): Promise<void> => {
    const { data } = await api.get('/category')

    if (data.success) {
      category.value = data.largeCategory
    }
  }

  return { category, addCategory }
})
