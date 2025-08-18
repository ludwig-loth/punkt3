import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDesignStore = defineStore('design', () => {
    const landingPageDesign = ref({
        hookup_line: { width: 0, height: 0, top: 0, left: 0 },
        about_me: { width: 0, height: 0, top: 0, left: 0 },
        menu_items: { width: 0, height: 0, top: 0, left: 0 },
    });
    const sidebarDesign = ref({
        section_heading: { width: 0, height: 0, top: 0, left: 0 },
        section_content: { width: 0, height: 0, top: 0, left: 0 },
    });
    const mobileMenuOpen = ref(false);

    function setLandingPageDesign(key, design) {
        landingPageDesign.value[key] = design;
    }
    function setSidebarDesign(key, design) {
        sidebarDesign.value[key] = design;
    }

    return {
        landingPageDesign,
        setLandingPageDesign,
        sidebarDesign,
        setSidebarDesign,
        mobileMenuOpen,
    };
});