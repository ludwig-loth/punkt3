export interface Landing {
    id: string | number;
    status: 'draft' | 'published' | 'archived';
    date_updated: string | null;
    my_name: string | null;
    image: string | null;
    menu_items: MenuItem[];
    translations: LandingTranslation[];
    [key: string]: any;
}

export interface LandingTranslation {
    languages_code: string;
    my_name: string | null;
    about_me_summary: string | null;
    about_me_prefix: string | null;
    opening_line: string | null;
    [key: string]: any;
}