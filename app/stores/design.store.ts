import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useDesignStore = defineStore('Design', () => {

  const landingPageDesign: Ref<LandingPageDesign> = ref({
    opening_line: { width: 0, height: 0, top: 0, left: 0 },
    about_me: { width: 0, height: 0, top: 0, left: 0 },
    menu_items: { width: 0, height: 0, top: 0, left: 0 },
  });

  const sidebarDesign: Ref<SidebarDesign> = ref({
    section_heading: { width: 0, height: 0, top: 0, left: 0 },
    section_content: { width: 0, height: 0, top: 0, left: 0 },
    main_menu: { width: 0, height: 0, top: 0, left: 0 },
  });

  const mobileMenuOpen: Ref<boolean> = ref(false);

  function setLandingPageDesign(key: keyof LandingPageDesign, design: ElementDimensions): void {
    landingPageDesign.value[key] = design;
  }

  function setSidebarDesign(key: keyof SidebarDesign, design: ElementDimensions): void {
    sidebarDesign.value[key] = design;
  }
  return {
    landingPageDesign,
    setLandingPageDesign,
    sidebarDesign,
    setSidebarDesign,
    mobileMenuOpen,
  } as const;
})
