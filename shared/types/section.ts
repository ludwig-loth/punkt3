export interface Section {
    id: string;
    sort: number | null;
    date_created: string | null;
    date_updated: string | null;
    translations: SectionTranslation[];
}

export interface SectionTranslation {
    languages_code: string;
    heading: string | null;
}
