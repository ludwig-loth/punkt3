import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('language', () => {
  const currentLanguage = ref('')
  const staticTranslations = ref({})

  function initLanguage() {
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

  function setLanguage(data) {
    localStorage.setItem('language', data)
    currentLanguage.value = data
    loadStaticTranslations()
  }

  async function loadStaticTranslations() {
    try {
      const langCode = currentLanguage.value.split('-')[0]
      const { default: translationData } = await import(`@/assets/i18n/${langCode}.json`)
      staticTranslations.value = translationData
    } catch (error) {
      console.error(`Translation file not found for language: ${currentLanguage.value}`)
      staticTranslations.value = {}
    }
  }

  function getCurrentLanguage() {
    return currentLanguage.value
  }

  const getStaticTranslation = (key) => {
    return staticTranslations.value[key] || key
  }

  const getTranslation = (item, field) => {
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

  const getTranslationBySuffix = (item, field) => {
    if (!item || !field) {
      return ''
    }

    const langCode = currentLanguage.value.split('-')[0]
    const fieldWithSuffix = `${field}_${langCode}`

    if (item[fieldWithSuffix] !== undefined) {
      return item[fieldWithSuffix]
    }

    // Fallback to the original field if language-specific field doesn't exist
    if (item[field] !== undefined) {
      return item[field]
    }

    return ''
  }

  const getMenuItemTranslation = (menuItem, field) => {
    if (!menuItem?.global_menu_items_id?.translations || !Array.isArray(menuItem.global_menu_items_id.translations)) {
      return menuItem?.global_menu_items_id?.[field] || ''
    }

    const translation = menuItem.global_menu_items_id.translations.find(
      t => t.languages_code === currentLanguage.value
    )

    return translation?.[field] || menuItem?.global_menu_items_id?.[field] || ''
  }

  return {
    initLanguage,
    setLanguage,
    getCurrentLanguage,
    getTranslation,
    getTranslationBySuffix,
    getStaticTranslation,
    getMenuItemTranslation,
    currentLanguage,
    staticTranslations
  }
})