import { useTranslation } from 'react-i18next';

export default function useLanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;
  const availableLanguages = ['lt', 'en'];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === 'lt' ? 'en' : 'lt';
    changeLanguage(newLang);
  };

  return {
    currentLanguage,
    availableLanguages,
    changeLanguage,
    toggleLanguage,
  };
}
