import { defineStore } from 'pinia'

export const useLandingStore = defineStore('LandingPage', () => {
  const landingData = ref<Landing | null>(null)

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
