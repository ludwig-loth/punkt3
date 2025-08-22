import { createDirectus, rest, readItems } from '@directus/sdk'
// import type { Landing } from '~/shared/types/landing'

const directus = createDirectus(process.env.NUXT_API_URL!).with(rest())

export async function getAdapterName() {
    return 'directus'
}

// Convert Directus data structure to our Landing interface
function convertDirectusToLanding(directusData: any): Landing {
    return {
        id: directusData.id,
        status: directusData.status,
        date_updated: directusData.date_updated,
        my_name: directusData.my_name,
        image: directusData.image_me,
        menu_items: directusData.page_menu_items_v2?.map((item: any) => ({
            slug: item.global_menu_items_id.slug,
            status: item.global_menu_items_id.status,
            translations: item.global_menu_items_id.translations?.map((translation: any) => ({
                languages_code: translation.languages_code,
                heading: translation.heading,
                subheading: translation.subheading,
                slug: translation.slug
            })) || []
        })) || [],
        translations: directusData.translations?.map((translation: any) => ({
            languages_code: translation.languages_code,
            about_me_summary: translation.about_me,
            about_me_prefix: translation.about_me_prefix,
            opening_line: translation.hookup_line
        })) || []
    }
}

export async function getLandingPageData(): Promise<Landing> {
    const directusData = await directus.request(readItems('landing_page', {
        fields: [
            '*',
            'translations.*',
            'page_menu_items_v2.global_menu_items_id.*',
            'page_menu_items_v2.global_menu_items_id.translations.*',
        ],
    }))

    // Convert single item or array to our Landing format
    // if (Array.isArray(directusData)) {
    //     return directusData.map(convertDirectusToLanding)
    // }
    return convertDirectusToLanding(directusData)
}