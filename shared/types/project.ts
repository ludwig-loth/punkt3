import type { Tag } from "./tags";

export interface Project {
  id: string | number;
  slug: string;
  status: "published" | "draft" | "archived";
  date_created: string;
  date_updated: string;
  project_url: string | null;
  year: number | null;
  post_image: string | null;
  source_code_url: string | null;
  // tags: string[];
  content_blocks: ContentBlock[];
  tech_tags: Tag[];
  translations: ProjectTranslation[];
}

export interface ContentBlock {
  date_updated: string;
  show_heading: boolean;
  image: string | null;
  image_position: string | null;
  divider_at_bottom: boolean; // divider
  sort: number | string | null;
  translations: ContentBlockTranslation[];
}

export interface ProjectTranslation {
  languages_code: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  post_image_caption: string | null;
  role: string | null;
  type: string | null;
}

export interface ContentBlockTranslation {
  languages_code: string;
  heading: string | null;
  text: string | null;
  image_caption: string | null;
}
