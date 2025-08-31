import { defineStore } from 'pinia'

export const useCvStore_old = defineStore('cv', () => {
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
