import { createDirectus, rest, readItems } from '@directus/sdk'

class DirectusAdapter {
    private directus: any

    constructor() {
        if (!process.env.NUXT_PUBLIC_API_URL) {
            throw new Error('NUXT_PUBLIC_API_URL environment variable is required')
        }
        this.directus = createDirectus(process.env.NUXT_PUBLIC_API_URL).with(rest())
    }

    async getAdapterName() {
        return 'directus'
    }

    private convertToLanding(directusData: any): Landing {
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

    async getLandingPageData(): Promise<Landing> {
        try {
            const directusData = await (this.directus as any).request((readItems as any)('landing_page', {
                fields: [
                    '*',
                    'translations.*',
                    'page_menu_items_v2.global_menu_items_id.*',
                    'page_menu_items_v2.global_menu_items_id.translations.*',
                ],
            }))
            return this.convertToLanding(directusData)
        } catch (error) {
            console.error('Error fetching landing page data:', error);
            throw error;
        }
    }

    private convertToContact(directusData: any): Contact {
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

    async getContactData(): Promise<Contact> {
        try {
            const directusData = await (this.directus as any).request((readItems as any)('contact', {
                fields: ['*',
                    'translations.*',
                    'socials.contact_socials_id.*'
                ]
            }))
            return this.convertToContact(directusData)
        } catch (error) {
            console.error('Error fetching contact data:', error);
            throw error;
        }
    }

    private convertToProject(directusData: any): Project {
        return {
            id: directusData.id,
            status: directusData.status,
            slug: directusData.slug,
            year: directusData.year,
            post_image: directusData.post_image,
            project_url: directusData.link,
            source_code_url: directusData.source_code_link,
            date_created: directusData.date_created,
            date_updated: directusData.date_updated,
            content_blocks: directusData.content_blocks?.map((block: any) => ({
                id: block.content_blocks_id.id,
                show_heading: block.content_blocks_id.show_heading,
                image: block.content_blocks_id.image,
                image_position: block.content_blocks_id.image_position,
                divider_at_bottom: block.content_blocks_id.divider,
                sort: block.content_blocks_id.sort,
                translations: block.content_blocks_id.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    heading: trans.heading,
                    text: trans.text,
                    image_caption: trans.image_caption
                })) || []

            })) || [],
            tags: directusData.tags?.map((tag: any) => ({
                id: tag.tags_id.id,
                icon: tag.tags_id.icon,
                sort: tag.tags_id.sort,
                color: tag.tags_id.color,
                type: tag.tags_id.type,
                translations: tag.tags_id.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    name: trans.name,
                    skill_level: trans.skill_level
                })) || []
            })) || [],
            translations: directusData.translations?.map((translation: any) => ({
                languages_code: translation.languages_code,
                title: translation.title,
                subtitle: translation.subtitle,
                description: translation.description,
                type: translation.type,
                role: translation.role
            })) || []
        }
    }

    async getProjectData(): Promise<Project[]> {
        try {
            const directusData = await (this.directus as any).request((readItems as any)('projects', {
                fields: ['*',
                    'translations.*',
                    'content_blocks.content_blocks_id.*',
                    'content_blocks.content_blocks_id.translations.*',
                    'tech_tags.tech_stack_tags_id.*',
                    'tags.tags_id.*',
                    'tags.tags_id.translations.*'
                ]
            }))
            return Array.isArray(directusData) ? directusData.map(item => this.convertToProject(item)) : []
        } catch (error) {
            console.error('Error fetching project data:', error);
            throw error;
        }
    }

    private convertToCV(directusData: any): CV {
        return {
            id: directusData.id,
            status: directusData.status,
            date_created: directusData.date_created,
            date_updated: directusData.date_updated,
            image: directusData.cv_image,
            accumulate_work_experience: directusData.accumulate_work_years,
            birthdate: directusData.birthdate,
            work_status_attention: directusData.work_blink,
            educational_stages: directusData.educational_stages?.map((stage: any) => ({
                from: stage.from,
                to: stage.to,
                show_only_year: stage.show_only_year,
                show_month_and_year: stage.show_month_and_year,
                final_grade: stage.final_grade,
                final_thesis_grade: stage.final_thesis_grade,
                translations: stage.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    degree: trans.degree,
                    institution: trans.institution,
                    location: trans.location,
                    final_thesis: trans.final_thesis,
                    additional_info: trans.additional_info
                })) || []
            })) || [],
            career_stages: directusData.career_stages?.map((stage: any) => ({
                from: stage.from,
                to: stage.to,
                show_only_year: stage.show_only_year,
                show_month_and_year: stage.show_month_and_year,
                use_in_accumulate_work_experience: stage.use_in_accumulate_work_years,
                translations: stage.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    position: trans.position,
                    company: trans.company,
                    location: trans.location,
                    description: trans.description,
                    additional_info: trans.additional_info,
                    responsibilities: trans.responsibilities,
                    employment_level: trans.employment_level
                })) || [],
            })) || [],
            skills: directusData.skills?.map((skill: any) => ({
                id: skill.item.id,
                sort: skill.item.sort,
                tags: skill.item.tags ? skill.item.tags.map((tag: any) => ({
                    id: tag.id,
                    name: tag.name,
                    icon: tag.icon
                })) : [],
                translations: skill.item.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    name: trans.name
                })) || []
            })) || [],
            translations: directusData.translations?.map((translation: any) => ({
                languages_code: translation.languages_code,
                welcome_heading: translation.welcome_heading,
                work_status: translation.work_status,
                summary: translation.introduction_text,
                skills_summary: translation.skills_introduction,
                stages_summary: translation.life_stages_introduction,
                additional_info: translation.additional_info
            })) || []
        }
    }

    async getCVData(): Promise<CV> {
        try {
            const directusData = await (this.directus as any).request((readItems as any)('Curriculum_vitae', {
                fields: ['*',
                    'field.*',
                    'translations.*',
                    'images.directus_files_id.*',
                    'skills.item.*',
                    'skills.collection',
                    'skills.item.tags.*',
                    'skills.item.tech_tags.tech_stack_tags_id.*',
                    'skills.item.tech_tags.tech_stack_tags_id.skill_level.*',
                    'skills.item.tools_tags.tags_tools_id.*',
                    'skills.item.other_tags.tags_id.*',
                    'skills.item.languages_tags.tags_languages_id.*',
                    'skills.item.tags_soft_skills.tags_soft_skills_id.*',
                    'publications.publications_id.*',
                    'socials.contact_socials_id.*'
                ]
            }))
            return this.convertToCV(directusData);
        } catch (error) {
            console.error('Error fetching CV data:', error);
            throw error;
        }
    }
}

export default DirectusAdapter