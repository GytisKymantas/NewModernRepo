import { useTranslation } from 'react-i18next';

/**
 * Custom hook for FormBuilder translations
 * Handles both translation keys (starting with 'formBuilder.') and direct text
 */
export default function useFormTranslation() {
  const { t } = useTranslation();

  /**
   * Translates text if it's a translation key, otherwise returns the text as-is
   */
  const translateText = (text: string | undefined): string => {
    if (!text) return '';

    // Check if it's a translation key (starts with 'formBuilder.')
    if (text.startsWith('formBuilder.')) {
      return t(text) as string;
    }

    // Return as-is if it's not a translation key
    return text;
  };

  /**
   * Translates validation messages with interpolation support
   */
  const translateValidation = (message: string, values?: Record<string, any>): string => {
    if (message.startsWith('formBuilder.')) {
      return t(message, values) as string;
    }
    return message;
  };

  return {
    t,
    translateText,
    translateValidation,
  };
}
