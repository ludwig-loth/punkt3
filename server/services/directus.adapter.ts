import { createDirectus, rest, readItems } from '@directus/sdk'
// import type { Landing } from '~/shared/types/landing'

const directus = createDirectus(process.env.NUXT_API_URL!).with(rest())

export async function getAdapterName() {
    return 'directus'
}

// Convert Directus data structure to our Landing interface
function convertToLanding(directusData: any): Landing {
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
    try {
        const directusData = await directus.request(readItems('landing_page', {
            fields: [
                '*',
                'translations.*',
                'page_menu_items_v2.global_menu_items_id.*',
                'page_menu_items_v2.global_menu_items_id.translations.*',
            ],
        }))
        return convertToLanding(directusData)
    } catch (error) {
        console.error('Error fetching landing page data:', error);
        throw error;
    }
}

function convertToContact(directusData: any): Contact {
    return {
        id: directusData.id,
        show_direct_message: directusData.show_direct_message,
        date_updated: directusData.date_updated,
        status: directusData.status,
        socials: directusData.socials?.map((social: any) => ({
            id: social.contact_socials_id.id,
            active: social.contact_socials_id.active,
            date_created: social.contact_socials_id.date_created,
            name: social.contact_socials_id.name,
            link: social.contact_socials_id.link,
            icon: social.contact_socials_id.icon,
            sort: social.contact_socials_id.sort
        })) || [],
        translations: directusData.translations?.map((translation: any) => ({
            languages_code: translation.languages_code,
            contact_introduction: translation.contact_introduction,
            direct_message_introduction: translation.direct_message_introduction,
            gdpr_info: translation.gdpr_info
        })) || []
    }
}

export async function getContactData(): Promise<Contact> {
    try {
        const directusData = await directus.request(readItems('contact', {
            fields: ['*',
                'translations.*',
                'socials.contact_socials_id.*'
            ]
        }))
        return convertToContact(directusData)
    } catch (error) {
        console.error('Error fetching contact data:', error);
        throw error;
    }
}

function convertToProject(directusData: any): Project {
    return {
        id: directusData.id,
        slug: directusData.slug,
        status: directusData.status,
        date_created: directusData.date_created,
        date_updated: directusData.date_updated,
        role: directusData.role,
        project_url: directusData.link,
        type: directusData.type,
        year: directusData.year,
        post_image: directusData.post_image,
        source_code_url: directusData.source_code_link,
        tags: directusData.tags || [],
        content_blocks: directusData.content_blocks?.map((block: any) => ({
            content_blocks_id: {
                date_updated: block.content_blocks_id.date_updated,
                show_heading: block.content_blocks_id.show_heading,
                image: block.content_blocks_id.image,
                image_position: block.content_blocks_id.image_position,
                divider: block.content_blocks_id.divider,
                sort: block.content_blocks_id.sort,
                translations: block.content_blocks_id.translations?.map((translation: any) => ({
                    languages_code: translation.languages_code,
                    heading: translation.heading,
                    text: translation.text,
                    image_caption: translation.image_caption
                })) || [],
                projects: block.content_blocks_id.projects || []
            }
        })) || [],
        tech_tags: directusData.tech_tags?.map((tag: any) => ({
            tech_stack_tags_id: {
                id: tag.tech_stack_tags_id.id,
                name: tag.tech_stack_tags_id.name,
                value: tag.tech_stack_tags_id.value,
                icon: tag.tech_stack_tags_id.icon,
                special: tag.tech_stack_tags_id.special,
                color: tag.tech_stack_tags_id.color,
                skill_level: tag.tech_stack_tags_id.skill_level
            }
        })) || [],
        translations: directusData.translations?.map((translation: any) => ({
            languages_code: translation.languages_code,
            title: translation.title,
            subtitle: translation.subtitle,
            description: translation.description,
            post_image_caption: translation.post_image_caption
        })) || []
    }
}

export async function getProjectData(): Promise<Project[]> {
    try {
        const directusData = await directus.request(readItems('projects', {
            fields: ['*',
                'translations.*',
                'content_blocks.content_blocks_id.*',
                'content_blocks.content_blocks_id.translations.*',
                'tech_tags.tech_stack_tags_id.*'
            ]
        }))
        return Array.isArray(directusData) ? directusData.map(convertToProject) : []
    } catch (error) {
        console.error('Error fetching project data:', error);
        throw error;
    }
}