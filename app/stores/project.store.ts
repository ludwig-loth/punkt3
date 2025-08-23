import { defineStore } from "pinia";
import { type Ref } from "vue";

export const useProjectStore = defineStore("Project", () => {
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
