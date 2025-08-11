import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', () => {
  const data = ref(null)

  function setData(params) {
    data.value = params;
  }

  function clearStore() {
    data.value = null;
  }

  return {
    setData,
    clearStore,
    data
  }
}, {
  persist: true,
})
