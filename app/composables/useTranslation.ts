// import { useLanguageStore } from '@/stores/language'

// export const useTranslation = () => {
//   const languageStore = useLanguageStore()

//   const t = (item, field) => {
//     return languageStore.getTranslation(item, field)
//   }
//   const tBySuffix = (item, field, suffix) => {
//     return languageStore.getTranslationBySuffix(item, field, suffix)
//   }
//   const tMenuItem = (menuItem, field) => {
//     return languageStore.getMenuItemTranslation(menuItem, field)
//   }
//   const tStatic = (key) => {
//     return languageStore.getStaticTranslation(key)
//   }

//   return {
//     t,
//     tMenuItem,
//     tStatic,
//     tBySuffix,
//   }
// }

import { useLanguageStore } from '@/stores/language'

interface TranslationComposable {
    t: (item: any, field: string) => string;
    // tBySuffix: (item: any, field: string, suffix?: string) => string;
    tMenuItem: (menuItem: any, field: string) => string;
    tStatic: (key: string) => string;
}

export const useTranslation = (): TranslationComposable => {
    const languageStore = useLanguageStore()

    const t = (item: any, field: string): string => {
        return languageStore.getTranslation(item, field)
    }

    // const tBySuffix = (item: any, field: string, suffix?: string): string => {
    //     return languageStore.getTranslationBySuffix(item, field, suffix)
    // }

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
        // tBySuffix,
    }
}