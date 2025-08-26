export interface Tag {
  id: string | number;
  value: string | number | null;
  icon: string | null;
  color: string | null;
  type: "tech" | "tool" | "language" | "other";
  sort: number | string | null;
  translations: TagTranslation[];
}

export interface TagTranslation {
  languages_code: string | null;
  name: string | null;
  skill_level: number | string | null;
}
