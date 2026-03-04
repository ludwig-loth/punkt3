export interface CV {
    image: string;
    birthdate: string;
    accumulate_work_experience: boolean;
    work_status_attention: boolean;
    welcome_heading: string;
    work_status: string;
    summary: string;
    skills_summary: string;
    stages_summary: string;
    additional_info?: string | null;
    educational_stages: EducationalStage[];
    career_stages: CareerStage[];
    skills: Skill[];
    publications: Publication[];
}

export interface EducationalStage {
    id: string;
    from: string;
    to?: string | null;
    until_today: boolean;
    date_display?: string | null;
    final_grade?: string | null;
    degree: string;
    institution: string;
    location: string;
    final_thesis_title?: string | null;
    final_thesis_grade?: string | null;
    additional_info?: string | null;
}

export interface CareerStage {
    id: string;
    status: string;
    sort: number;
    from: string;
    to?: string | null;
    until_today: boolean;
    date_display?: string | null;
    use_in_accumulate_work_experience: boolean;
    position: string;
    company: string;
    location: string;
    additional_info?: string | null;
    employment_level: string;
}

export interface Skill {
    id: string;
    sort: number;
    subsection: string;
    section: Section;
    tags: Tag[];
}

export interface Publication {
    id: string;
    title: string;
    subtitle?: string | null;
    authors: Author[];
    publisher?: string | null;
    identifier?: {
        type: string;
        value: string;
    };
    location?: string | null;
    year: number;
    conference?: string | null;
    journal?: string | null;
    url?: string | null;
    additional_fields?: { name: string; value: string }[];
}

export interface Author {
    prefix?: string | null;
    first_name: string;
    last_name: string;
}
