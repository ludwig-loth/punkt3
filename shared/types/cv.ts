import type { Section } from "./section";

export interface CV {
    id: string | number;
    status: "published" | "draft" | "archived";
    date_created: string;
    date_updated: string;
    image: string | null;
    educational_stages: EducationalStage[];
    career_stages: CareerStage[];
    accumulate_work_experience: boolean | null;
    birthdate: string | null;
    work_status_attention: boolean;
    skills: Skill[];
    publications: Publication[];
    translations: CVTranslation[];
}

export interface EducationalStage {
    id: string | number;
    from: string | null;
    to: string | null;
    until_today: boolean | null;
    date_display: "year" | "month_year" | "full" | null; // nuxt-time automaically converts this format for your language
    final_grade: string | null;
    translations: EducationalStageTranslation[];
}

export interface EducationalStageTranslation {
    languages_code: string;
    degree: string | null;
    institution: string | null;
    location: string | null;
    final_thesis_title: string | null;
    final_thesis_grade: string | null;
    additional_info: string | null;
}

export interface CareerStage {
    id: string | number;
    status: "published" | "draft" | "archived";
    sort: number | string | null;
    date_created: string;
    date_updated: string;
    from: string | null;
    to: string | null;
    until_today: boolean | null;
    date_display: "year" | "month_year" | "full" | null; // nuxt-time automatically converts this format for your language
    use_in_accumulate_work_experience: boolean;
    translations: CareerStageTranslation[];
}

export interface CareerStageTranslation {
    languages_code: string;
    position: string | null;
    company: string | null;
    location: string | null;
    additional_info: string | null;
    employment_level: "part_time" | "full_time" | "contract" | "internship" | null;
}

export interface Skill {
    id: string | number;
    sort: number | string | null;
    tags: Tag[] | null;
    section: Section;
    translations: SkillTranslation[];
}

export interface SkillTranslation {
    languages_code: string;
    subsection: string | null;
}

export interface CVTranslation {
    languages_code: string;
    welcome_heading: string | null;
    work_status: string | null;
    summary: string | null;
    skills_summary: string | null;
    stages_summary: string | null;
    additional_info: string | null;
}

export interface Publication {
    id: string | number;
    title: string | null;
    subtitle: string | null;
    authors: Author[] | null;
    publisher: string | null;
    identifier: {
        type: string | null; //e.g. URL, DOI, ISBN ...
        value: string | null;
    };
    location: string | null;
    year: string | null;
    conference: string | null;
    journal: string | null;
    url: string | null;
    additional_fields: { name: string; value: string }[] | null; // value is only used as key, for now 
}

export interface Author {
    prefix: string | null;
    first_name: string | null;
    last_name: string | null;
}
