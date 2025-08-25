export interface Contact {
    id: string | number;
    show_direct_message: boolean;
    date_updated: string;
    status: "published" | "draft" | "archived";
    socials: Social[];
    translations: ContactTranslation[];
}

export interface Social {
    id: string | number;
    sort: number | string | null;
    date_created: string;
    name: string;
    link: string;
    icon: string | null;
}

export interface ContactTranslation {
    languages_code: string;
    contact_introduction: string;
    direct_message_introduction: string;
    gdpr_info: string;
}
