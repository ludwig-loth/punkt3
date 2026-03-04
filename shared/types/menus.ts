export interface MenuItem {
    slug: string;
    status: string;
    sort: number;
    icon?: string | null;
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
