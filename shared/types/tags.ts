export interface Tag {
  id: string | number;
  value: string | number;
  icon: string | null;
  color: string | null;
  type: "tech" | "tool" | "language" | "other";
  sort: number | string | null;
  translations: TagTranslation[];
}

export interface TagTranslation {
  languages_code: string;
  name: string;
}
