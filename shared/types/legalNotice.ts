export interface LegalNotice {
    full_name: string | null;
    status: "published" | "draft" | "archived";
    street_and_number: string | null;
    zipcode_and_town: string | null;
    mail_address: string | null;
    contact_form_url: string | null;
    translations: LegalNoticeTranslation[];
}
export interface LegalNoticeTranslation {
    languages_code: string;
    country: string | null;
    text: string | null;
    address_info: string | null;
}