import { useLanguageStore } from '@/stores/language'

export const useTranslation = () => {
  const languageStore = useLanguageStore()

  const t = (item, field) => {
    return languageStore.getTranslation(item, field)
  }
  const tBySuffix = (item, field, suffix) => {
    return languageStore.getTranslationBySuffix(item, field, suffix)
  }
  const tMenuItem = (menuItem, field) => {
    return languageStore.getMenuItemTranslation(menuItem, field)
  }
  const tStatic = (key) => {
    return languageStore.getStaticTranslation(key)
  }

  return {
    t,
    tMenuItem,
    tStatic,
    tBySuffix,
  }
}