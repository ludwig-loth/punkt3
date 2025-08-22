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
    about_me_summary: string | null;
    about_me_prefix: string | null;
    opening_line: string | null;
}

export interface MenuItem {
    slug: string;
    status: 'draft' | 'published' | 'archived';
    translations: MenuItemTranslation[];
}

export interface MenuItemTranslation {
    languages_code: 'de-De' | 'en-US'; // add more as you wish
    heading: string | null;
    subheading: string | null;
    slug: string | null;
}
