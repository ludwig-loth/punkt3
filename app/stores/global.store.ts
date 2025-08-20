import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useLandingPageStore = defineStore('LandingPage', () => {
  const landingPageData: Ref<Landing | null> = ref(null);

  function setLandingPage(data: Landing) {
    landingPageData.value = data;
  }

  function clearStore() {
    landingPageData.value = null;
  }

  return {
    setLandingPage,
    clearStore,
    landingPageData,
  };
});
