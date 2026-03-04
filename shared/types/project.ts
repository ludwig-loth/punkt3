import type { Tag } from "./tags";

export interface Project {
  slug: string;
  status: string;
  year: number;
  post_image?: string;
  project_url?: string | null;
  source_code_url?: string | null;
  title: string;
  subtitle: string;
  description: string;
  post_image_caption?: string | null;
  role: string;
  type: string;
  tags: Tag[];
  body?: any;
}
