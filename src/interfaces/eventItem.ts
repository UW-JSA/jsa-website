type TPermission = "public" | "private";

export interface EventItem {
  id: number;
  title: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  start_time: string;
  end_time: string;
  permission?: TPermission;
  link: string;
}
