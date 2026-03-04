interface TranslationComposable {
    t: (item: any, field: string) => string
    tMenuItem: (menuItem: any, field: string) => string
    tStatic: (key: string) => string
}

export const useTranslation = (): TranslationComposable => {
    const { t: $t } = useI18n()

    /**
     * Get a field value from a content item.
     * With flat YAML content (Nuxt Content), fields are directly on the item.
     * Falls back to translations array lookup for backward compatibility.
     */
    const t = (item: any, field: string): string => {
        if (!item) return ''
        if (item?.[field] !== undefined) return item[field] ?? ''
        return ''
    }

    /**
     * Get a field value from a menu item.
     * With flat YAML content, heading/description are directly on the item.
     */
    const tMenuItem = (menuItem: any, field: string): string => {
        if (!menuItem) return ''
        const base = menuItem?.global_menu_items_id ?? menuItem
        if (base?.[field] !== undefined) return base[field] ?? ''
        return ''
    }

    const tStatic = (key: string): string => String($t(key))

    return { t, tMenuItem, tStatic }
}
