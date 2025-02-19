
import { SupportedLanguage } from "./types";

type Content = {
  language: string;
  title: string;
  description: string;
};

const content: Record<SupportedLanguage, Content> = {
    ja: {
        language: '日本語',
        title: 'ウォータールー大学公式日本学生協会',
        description: 'なんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとか...'
    },
    en: {
        language: 'English',
        title: 'UWaterloo Japanese Student Assoc.',
        description: 'something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something something'
    }
};

export default content;