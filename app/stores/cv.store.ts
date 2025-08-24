import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useCvStore_new = defineStore('CV', () => {
  const cvData: Ref<CV | null> = ref(null);

  function setData(data: CV) {
    cvData.value = data;
  }

  function clearStore() {
    cvData.value = null;
  }

  return {
    setData,
    clearStore,
    cvData,
  };
});

