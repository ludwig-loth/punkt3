import { defineStore } from "pinia";
import { ref, computed, type Ref, type ComputedRef } from "vue";

export const useProjectStore = defineStore(
  "project",
  () => {
    const projects: Ref<Project[] | null> = ref(null);
    function setProjectsData(data: Project[]) {
      projects.value = data;
    }

    function clearStore() {
      projects.value = null;
    }

    return {
      setProjectsData,
      clearStore,
      projects,
    };
  }
);
