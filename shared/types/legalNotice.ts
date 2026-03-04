export interface LegalNotice {
    full_name: string;
    street_and_number?: string | null;
    zipcode_and_town: string;
    mail_address: string;
    contact_form_url: string;
    country: string;
    body?: any;
    address_info: string;
}
