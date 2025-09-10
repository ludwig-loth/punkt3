import { createDirectus, rest, readItems, createItem } from '@directus/sdk'

class DirectusAdapter {
    private directus: any

    constructor() {
        if (!process.env.NUXT_PUBLIC_API_URL) {
            throw new Error('NUXT_PUBLIC_API_URL environment variable is required')
        }
        this.directus = createDirectus<any>(process.env.NUXT_PUBLIC_API_URL).with(rest())
    }

    async getAdapterName() {
        return 'directus'
    }

    private convertToLanding(directusData: any): Landing {
        return {
            id: directusData.id,
            status: directusData.status,
            date_updated: directusData.date_updated,
            initials: directusData.initials,
            my_name: directusData.my_name,
            image: directusData.image_me,
            menu_items: directusData.page_menu_items_v2?.map((item: any) => ({
                slug: item.global_menu_items_id.slug,
                status: item.global_menu_items_id.status,
                sort: item.global_menu_items_id.sort,
                icon: item.global_menu_items_id.icon,
                translations: item.global_menu_items_id.translations?.map((translation: any) => ({
                    languages_code: translation.languages_code,
                    heading: translation.heading,
                    description: translation.subheading,
                })) || []
            })) || [],
            translations: directusData.translations?.map((translation: any) => ({
                languages_code: translation.languages_code,
                about_me_short: translation.about_me_short,
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

    async submitContactForm(formData: { name: string; mail: string; text: string }): Promise<void> {
        try {
            await (this.directus as any).request((createItem as any)('contact_form', formData));
        } catch (error) {
            console.error('Error submitting contact form:', error);
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
            educational_stages: directusData.educational_stage_v2?.map((stage: any) => ({
                id: stage.id,
                from: stage.from,
                to: stage.to,
                until_today: stage.until_today,
                date_display: stage.date_display,
                final_grade: stage.final_grade,
                translations: stage.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    degree: trans.degree,
                    institution: trans.institution,
                    location: trans.location,
                    final_thesis_title: trans.final_thesis_title,
                    final_thesis_grade: trans.final_thesis_grade,
                    additional_info: trans.additional_info
                })) || []
            })) || [],
            career_stages: directusData.career_stages_v2?.map((stage: any) => ({
                id: stage.id,
                from: stage.from,
                to: stage.to,
                status: stage.status,
                until_today: stage.until_today,
                date_display: stage.date_display,
                use_in_accumulate_work_experience: stage.use_in_accumulate_work_years,
                translations: stage.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    position: trans.role,
                    company: trans.company,
                    location: trans.location,
                    additional_info: trans.additional_info,
                    employment_level: trans.employment_level
                })) || [],
            })) || [],
            skills: directusData.skills_v2?.map((skill: any) => ({
                id: skill.skills_id.id,
                sort: skill.skills_id.sort,
                tags: skill.skills_id.tags.map((tag: any) => ({
                    id: tag.tags_id.id,
                    value: tag.tags_id.value,
                    icon: tag.tags_id.icon,
                    color: tag.tags_id.color,
                    sort: tag.tags_id.sort,
                    translations: tag.tags_id.translations?.map((trans: any) => ({
                        languages_code: trans.languages_code,
                        name: trans.name,
                        skill_level: trans.skill_level
                    })) || [],
                })) || [],
                section: {
                    id: skill.skills_id.section.section_id,
                    sort: skill.skills_id.section.sort,
                    date_created: skill.skills_id.section.date_created,
                    date_updated: skill.skills_id.section.date_updated,
                    translations: skill.skills_id.section.translations?.map((trans: any) => ({
                        languages_code: trans.languages_code,
                        heading: trans.heading,
                    })) || [],
                },
                translations: skill.skills_id.translations?.map((trans: any) => ({
                    languages_code: trans.languages_code,
                    subsection: trans.subsection
                })) || []
            })) || [],
            publications: directusData.publications?.map((pub: any) => ({
                id: pub.publications_id.id,
                title: pub.publications_id.title,
                subtitle: pub.publications_id.subtitle,
                authors: pub.publications_id.authors?.map((author: any) => ({
                    prefix: author.prefix,
                    first_name: author.first_name,
                    last_name: author.last_name
                })) || [],
                publisher: pub.publications_id.publisher,
                identifier: {
                    type: pub.publications_id.identifier_type,
                    value: pub.publications_id.identifier
                },
                location: pub.publications_id.location,
                year: pub.publications_id.year,
                conference: pub.publications_id.conference,
                journal: pub.publications_id.journal,
                url: pub.publications_id.link,
                additional_fields: pub.publications_id.additional_fields?.map((field: any) => ({
                    name: field.name,
                    value: field.value
                })) || []
            })) || [],
            translations: directusData.translations?.map((trans: any) => ({
                languages_code: trans.languages_code,
                welcome_heading: trans.welcome_heading,
                work_status: trans.work_status,
                summary: trans.introduction_text,
                skills_summary: trans.skills_introduction,
                stages_summary: trans.life_stages_introduction,
                additional_info: trans.additional_info
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
                    'skills_v2.*',
                    'skills_v2.skills_id.*',
                    'skills_v2.skills_id.translations.*',
                    'skills_v2.skills_id.translations.section.*',
                    'skills_v2.skills_id.tags.tags_id.*',
                    'skills_v2.skills_id.tags.tags_id.translations.*',
                    'skills_v2.skills_id.section.*',
                    'skills_v2.skills_id.section.translations.*',
                    'career_stages_v2.*',
                    'career_stages_v2.translations.*',
                    'educational_stage_v2.*',
                    'educational_stage_v2.translations.*',
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

    private convertToLegalNotice(directusData: any): LegalNotice {
        return {
            status: directusData.status,
            full_name: directusData.full_name,
            street_and_number: directusData.street_and_number,
            zipcode_and_town: directusData.zipcode_and_town,
            mail_address: directusData.mail_address,
            contact_form_url: directusData.contact_form_url,
            translations: directusData.translations?.map((translation: any) => ({
                languages_code: translation.languages_code,
                text: translation.text,
                address_info: translation.address_info,
                country: translation.country,
            })) || []
        }
    }

    async getLegalNoticeData(): Promise<LegalNotice> {
        try {
            const directusData = await (this.directus as any).request((readItems as any)('imprint', {
                fields: ['*',
                    'translations.*',
                ]
            }))
            return this.convertToLegalNotice(directusData)
        } catch (error) {
            console.error('Error fetching legal notice data:', error);
            throw error;
        }
    }

}

export default DirectusAdapter