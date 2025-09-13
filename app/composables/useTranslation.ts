import { useI18n } from '#imports'

interface TranslationComposable {
    t: (item: any, field: string) => string
    tMenuItem: (menuItem: any, field: string) => string
    tStatic: (key: string) => string
}

export const useTranslation = (): TranslationComposable => {
    const { locale, t: $t } = useI18n()

    const t = (item: any, field: string): string => {
        if (!item) return ''
        const code = locale.value
        const tr = Array.isArray(item?.translations)
            ? item.translations.find((t: any) => t.languages_code === code)
            : null
        return tr?.[field] ?? item?.[field] ?? ''
    }

    const tMenuItem = (menuItem: any, field: string): string => {
        if (!menuItem) return ''
        const code = locale.value
        const base = menuItem?.global_menu_items_id ?? menuItem
        const tr = Array.isArray(base?.translations)
            ? base.translations.find((t: any) => t.languages_code === code)
            : null
        return tr?.[field] ?? base?.[field] ?? ''
    }

    const tStatic = (key: string): string => String($t(key))

    return { t, tMenuItem, tStatic }
}