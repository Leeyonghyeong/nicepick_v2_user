import { defineStore } from 'pinia'
import { Rank } from '~/types/rank'
import api from '~/config/axios.config'

export const useKeywordRankStore = defineStore('keywordRank', () => {
  const currentRank = ref<Rank[]>([])
  const lastRank = ref<Rank[]>([])
  const recentlyKeyword = ref<string[]>([])

  const addKeywordRank = async (): Promise<void> => {
    const { data } = await api.get('/search/rank')

    if (data.success) {
      currentRank.value = data.currentRank
      lastRank.value = data.lastRank

      currentRank.value.map((current) => {
        const test = lastRank.value.find(
          (last) => current.keyword === last.keyword
        )

        if (test) {
          current.variance = test.rank - current.rank
        } else {
          current.variance = 'new'
        }

        return current
      })
    }
  }

  return { currentRank, recentlyKeyword, addKeywordRank }
})
