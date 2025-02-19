
import { SupportedLanguage } from "./types";

type Content = {
  language: string;
  shorttitle: string;
  title: string;
  description: string;
};

const content: Record<SupportedLanguage, Content> = {
    ja: {
        language: '日本語',
        shorttitle: 'UWJSA',
        title: 'ウォータールー大学公式日本学生協会',
        description: 'なんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとかなんとかかんとか...'
    },
    en: {
        language: 'English',
        shorttitle: 'UWJSA',
        title: 'UWaterloo Japanese Student Association',
        description: 'Official Website for the University of Waterloo Japanese Student Association'
    }
};

export default content;