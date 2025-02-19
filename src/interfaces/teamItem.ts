type TPermission = "public" | "private";

export interface TeamItem {
  id: number;
  imageUrl: string;
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  permission?: TPermission;
}
