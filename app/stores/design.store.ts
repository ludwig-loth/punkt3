import { defineStore } from 'pinia'
import { type Ref } from "vue";

type ThemeMode = 'dark' | 'light';

export const useDesignStore = defineStore('Design', () => {
  const isDarkMode: Ref<boolean> = ref(false);
  const isThemeInitialized: Ref<boolean> = ref(false);

  const landingPageDesign: Ref<LandingPageDesign> = ref({
    opening_line: { width: 0, height: 0, top: 0, left: 0 },
    about_me: { width: 0, height: 0, top: 0, left: 0 },
    menu_items: { width: 0, height: 0, top: 0, left: 0 },
  });

  const sidebarDesign: Ref<SidebarDesign> = ref({
    section_heading: { width: 0, height: 0, top: 0, left: 0 },
    section_content: { width: 0, height: 0, top: 0, left: 0 },
  });

  const mobileMenuOpen: Ref<boolean> = ref(false);

  function setLandingPageDesign(key: keyof LandingPageDesign, design: ElementDimensions): void {
    landingPageDesign.value[key] = design;
  }

  function setSidebarDesign(key: keyof SidebarDesign, design: ElementDimensions): void {
    sidebarDesign.value[key] = design;
  }

  function initTheme(): void {
    if (import.meta.client && !isThemeInitialized.value) {
      try {
        const savedTheme: string | null = localStorage?.getItem('theme');

        if (savedTheme) {
          isDarkMode.value = savedTheme === 'dark';
        } else {
          isDarkMode.value = false;
        }

        applyTheme();
        isThemeInitialized.value = true;
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        isDarkMode.value = false;
        applyTheme();
        isThemeInitialized.value = true;
      }
    }
  }

  function toggleTheme(): void {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    applyTheme();
  }

  function setTheme(theme: ThemeMode): void {
    isDarkMode.value = theme === 'dark';
    localStorage.setItem('theme', theme);
    applyTheme();
  }

  function applyTheme(): void {
    if (import.meta.client) {
      try {
        const html: HTMLElement = document.documentElement;
        if (isDarkMode.value) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      } catch (error) {
        console.warn('Failed to apply theme:', error);
      }
    }
  }

  return {
    isDarkMode,
    isThemeInitialized,
    landingPageDesign,
    setLandingPageDesign,
    sidebarDesign,
    setSidebarDesign,
    mobileMenuOpen,
    initTheme,
    toggleTheme,
    setTheme,
    applyTheme
  } as const;
})
