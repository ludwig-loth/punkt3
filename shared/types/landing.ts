export interface Landing {
    id: string | number;
    status: 'draft' | 'published' | 'archived';
    date_updated: string | null;
    initials: string | null;
    my_name: string | null;
    image: string | null;
    menu_items: MenuItem[];
    translations: LandingTranslation[];
}

export interface LandingTranslation {
    languages_code: string;
    about_me_short: string | null;
    opening_line: string | null;
}