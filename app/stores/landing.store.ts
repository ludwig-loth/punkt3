import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useLandingStore = defineStore('LandingPage', () => {
  const landingData: Ref<Landing | null> = ref(null);

  function setLandingData(data: Landing) {
    landingData.value = data;
  }

  function clearStore() {
    landingData.value = null;
  }

  return {
    setLandingData,
    clearStore,
    landingData,
  } as const;
});
