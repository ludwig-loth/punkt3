import { useLanguageStore } from '@/stores/language'

interface TranslationComposable {
    t: (item: any, field: string) => string;
    tMenuItem: (menuItem: any, field: string) => string;
    tStatic: (key: string) => string;
}

export const useTranslation = (): TranslationComposable => {
    const languageStore = useLanguageStore()

    const t = (item: any, field: string): string => {
        return languageStore.getTranslation(item, field)
    }

    const tMenuItem = (menuItem: any, field: string): string => {
        return languageStore.getMenuItemTranslation(menuItem, field)
    }

    const tStatic = (key: string): string => {
        return languageStore.getStaticTranslation(key)
    }

    return {
        t,
        tMenuItem,
        tStatic,
    }
}