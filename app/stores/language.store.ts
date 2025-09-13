import { defineStore } from 'pinia'

interface TranslationItem {
  translations?: Array<{ languages_code: string;[key: string]: any }>
  [key: string]: any
}

interface MenuItemType {
  global_menu_items_id?: {
    translations?: Array<{ languages_code: string;[key: string]: any }>
    [key: string]: any
  }
  [key: string]: any
}

const toBackendLang = (loc: string) => {
  if (loc === 'de' || loc === 'de-DE') return 'de-DE'
  if (loc === 'en' || loc === 'en-US') return 'en-US'
  return loc || 'en-US'
}

export const useLanguageStore = defineStore('Language', () => {
  const { locale } = useI18n()
  const currentLanguage = computed<string>(() => locale.value)

  function setLanguage(data: string): void {
    if (data === 'de-DE' || data === 'en-US') {
      locale.value = data
    } else {
      // fallback or handle invalid locale
      locale.value = 'en-US'
    }
  }

  function getCurrentLanguage(): string {
    return currentLanguage.value
  }

  const getTranslation = (item: TranslationItem | null | undefined, field: string): string => {
    if (!item?.translations || !Array.isArray(item.translations)) {
      return item?.[field] ?? ''
    }
    const code = toBackendLang(currentLanguage.value)
    const tr = item.translations.find(t => t.languages_code === code)
    return tr?.[field] ?? item?.[field] ?? ''
  }

  const getMenuItemTranslation = (menuItem: MenuItemType | null | undefined, field: string): string => {
    const base = menuItem?.global_menu_items_id
    if (!base?.translations || !Array.isArray(base.translations)) {
      return base?.[field] ?? ''
    }
    const code = toBackendLang(currentLanguage.value)
    const tr = base.translations.find(t => t.languages_code === code)
    return tr?.[field] ?? base?.[field] ?? ''
  }

  return {
    setLanguage,
    getCurrentLanguage,
    getTranslation,
    getMenuItemTranslation,
    currentLanguage
  } as const
})