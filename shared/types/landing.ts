export interface Landing {
    initials: string;
    my_name: string;
    image: string;
    opening_line: string;
    body?: any;
    seo: {
        title: string;
        meta_description: string;
        keywords: string | null;
        no_index: boolean;
        no_follow: boolean;
        og_image?: string;
    };
    menu_items: MenuItem[];
}
