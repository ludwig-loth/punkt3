import { defineStore } from 'pinia'

interface TranslationItem {
  translations?: Array<{
    languages_code: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

interface MenuItemType {
  translations?: Array<{
    languages_code: string;
    [key: string]: any;
  }>;
  [key: string]: any;
}

export const useLanguageStore = defineStore('Language', () => {
  const currentLanguage: Ref<string> = ref('')
  const staticTranslations: Ref<StaticTranslation> = ref({})

  function initLanguage(): void {
    const storedLanguage = localStorage.getItem('language')
    if (!storedLanguage) {
      const { detectLanguage } = useLanguageDetection()
      const detectedLanguage = detectLanguage()
      localStorage.setItem('language', detectedLanguage)
      currentLanguage.value = detectedLanguage
    } else {
      currentLanguage.value = storedLanguage
    }
    loadStaticTranslations()
  }

  function setLanguage(data: string): void {
    localStorage.setItem('language', data)
    currentLanguage.value = data
    loadStaticTranslations()
  }

  async function loadStaticTranslations(): Promise<void> {
    try {
      const langCode = currentLanguage.value.split('-')[0]
      const { default: translationData } = await import(`@/assets/i18n/locales/${langCode}.json`)
      staticTranslations.value = translationData
    } catch (error) {
      console.error(`Translation file not found for language: ${currentLanguage.value}`)
      staticTranslations.value = {}
    }
  }

  function getCurrentLanguage(): string {
    return currentLanguage.value
  }

  const getStaticTranslation = (key: string): string => {
    return staticTranslations.value[key] || key
  }

  const getTranslation = (item: TranslationItem | null | undefined, field: string): string => {
    if (!item?.translations || !Array.isArray(item.translations)) {
      return item?.[field] || ''
    }

    const translation = item.translations.find(
      t => t.languages_code === currentLanguage.value
    )
    // Fallback to the original field if language-specific field doesn't exist
    if (!translation) {
      return item?.[field] || ''
    }

    return translation?.[field] || item?.[field] || ''
  }

  const getMenuItemTranslation = (menuItem: MenuItemType | null | undefined, field: string): string => {
    if (!menuItem?.translations || !Array.isArray(menuItem.translations)) {
      return menuItem?.[field] || ''
    }

    const translation = menuItem.translations.find(
      t => t.languages_code === currentLanguage.value
    )

    return translation?.[field] || menuItem?.[field] || ''
  }

  return {
    initLanguage,
    setLanguage,
    getCurrentLanguage,
    getTranslation,
    getStaticTranslation,
    getMenuItemTranslation,
    currentLanguage,
    staticTranslations
  } as const
})