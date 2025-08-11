import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore('global', () => {
    const landingPageData = ref(null)
    const pages = ref(null)

    function setLandingPageData(data) {
        landingPageData.value = data;
    }

    function setPages(data) {
        pages.value = data;
    }

    function clearStrore() {
        landingPageData.value = null;
        pages.value = null;
    }

    return {
        setLandingPageData,
        clearStrore,
        landingPageData,
        setPages,
        pages
    }
}, {
    persist: true,
})