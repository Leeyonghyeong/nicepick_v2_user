import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isShareModal = ref<boolean>(false)

  return { isShareModal }
})
