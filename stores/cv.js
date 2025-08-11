import { defineStore } from 'pinia'

export const useCvStore = defineStore('cv', () => {
  const data = ref(null)

  function setData(d) {
    data.value = d;
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
