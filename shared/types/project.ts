import type { TechTags } from './tags'

export interface Project {
  id: string | number;
  title: string;
  slug: string;
  status: "published" | "draft" | "archived";
  date_created: string;
  date_updated: string;
  role: string | null;
  link: string | null;
  type: string | null;
  year: number | null;
  post_image: string | null;
  source_code_link: string | null;
  tags: string[];
  content_blocks: ContentBlock[];
  tech_tags: TechTags[];
  translations: P_Translation[];
}

export interface ContentBlock {
  content_blocks_id: {
    date_updated: string;
    show_heading: boolean;
    image: string | null;
    image_position: string | null;
    divider: boolean;
    sort: number | null;
    translations: CB_Translation[];
    projects: number[];
  };
}

export interface P_Translation {
  languages_code: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  post_image_caption: string | null;
}

export interface CB_Translation {
  languages_code: string;
  heading: string | null;
  text: string | null;
  image_caption: string | null;
}
