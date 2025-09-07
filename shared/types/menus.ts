export interface MenuItem {
    slug: 'contact' | 'portfolio' | 'about' | 'blog' | 'other-projects';
    status: 'published' | 'draft' | 'archived';
    sort: number | string | null;
    icon?: string | null;
    translations: MenuItemTranslation[];
}
export interface MenuItemTranslation {
    languages_code: string;
    heading: string;
    description: string;
}

export interface SidebarMenu {
    translations: SidebarMenuTranslation[];
    items: MenuItem[] | SubMenuItem[];
    buttons:{
        show: boolean;
        position: 'top' | 'bottom';
    }
}
export interface SidebarMenuTranslation {
    languages_code: string;
    heading: string | null;
}

export interface SubMenuItem {
    slug: string;
    icon?: string | null;
    translations: SubMenuItemTranslation[];
}

export interface SubMenuItemTranslation {
    languages_code: string;
    heading: string | null;
}