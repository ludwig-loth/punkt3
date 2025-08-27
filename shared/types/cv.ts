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
    work_status_attention: boolean; //work_blink
    skills: Skill[];
    translations: CVTranslation[];
}

export interface EducationalStage {
    from: string | null;
    to: string | null;
    until_today: boolean | null;
    date_display: "year" | "month_year" | "full" | null; // nuxt-time automaically converts this format for your language
    final_grade: string | null;
    final_thesis_grade: string | null;
    translations: EducationalStageTranslation[];
}

export interface EducationalStageTranslation {
    languages_code: string;
    degree: string | null;
    institution: string | null;
    location: string | null;
    final_thesis: string | null;
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
    date_display: "year" | "month_year" | "full" | null; // nuxt-time automaically converts this format for your language
    use_in_accumulate_work_experience: boolean; //use_in_accumulate_work_years
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
    tags: Tag[] | null; // tags
    translations: SkillTranslation[];
}

export interface SkillTranslation {
    languages_code: string;
    name: string | null;
}

export interface CVTranslation {
    languages_code: string;
    welcome_heading: string | null;
    work_status: string | null;
    summary: string | null; // introduction_text
    skills_summary: string | null; // skills_introduction
    stages_summary: string | null; // life_stages_introduction
    additional_info: string | null;
}
