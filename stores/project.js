import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProjectStore = defineStore('project', () => {
    const projects = ref(null)

    function setProjectsData(data) {
        projects.value = data;
    }

    function clearStore() {
        projects.value = null;
    }

    return {
        setProjectsData,
        clearStore,
        projects
    }
}, {
    persist: true,
})