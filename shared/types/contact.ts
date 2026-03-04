export interface Contact {
    show_direct_message: boolean;
    contact_introduction: string;
    direct_message_introduction: string;
    body?: any;
    socials: Social[];
}

export interface Social {
    id: string;
    name: string;
    link: string;
    icon?: string | null;
    sort: number;
}
