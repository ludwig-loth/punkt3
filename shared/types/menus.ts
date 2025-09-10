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

export interface SubMenuMeta {
    type: 'projects' | 'blog',
    headingSlug?: string
}

export interface SubMenuItem {
    slug: string;
    title: string;
    icon: string | null;
}
export interface SubMenu {
    heading: string | null;
    items: SubMenuItem[] | [];
}