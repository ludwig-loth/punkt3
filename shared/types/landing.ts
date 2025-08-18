export interface Landing {
    id: string | number;
    status: 'draft' | 'published' | 'archived';
    date_updated: string | null;
    my_name: string | null;
    image: string | null;
    menu_items: MenuItem[];
    translations: LandingTranslation[];
}

export interface LandingTranslation {
    languages_code: string;
    my_name: string | null;
    about_me_summary: string | null; // about_me
    about_me_prefix: string | null;
}

export interface MenuItem {
    id: string | number;
    translations: MenuItemTranslation[];
}

export interface MenuItemTranslation {
    languages_code: string;
    heading: string | null;
    subheading: string | null;
    slug: string | null;
}
