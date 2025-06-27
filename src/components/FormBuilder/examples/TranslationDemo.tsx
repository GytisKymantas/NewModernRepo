import { Box, Button, Typography } from '@mui/material';
import FormBuilder from '../FormBuilder';
import { useLanguageSwitcher } from '../index';
import { FormBuilderConfig } from '../types';

export default function TranslationDemo() {
  const { currentLanguage, toggleLanguage } = useLanguageSwitcher();

  const config: FormBuilderConfig = {
    id: 'translation-demo',
    title: currentLanguage === 'lt' ? 'Vertimaų demonstracija' : 'Translation Demo',
    description:
      currentLanguage === 'lt'
        ? 'Ši forma demonstruoja, kaip veikia FormBuilder komponentės vertimai'
        : 'This form demonstrates how FormBuilder component translations work',
    multiStep: false,
    steps: [
      {
        id: 'demo-step',
        title: currentLanguage === 'lt' ? 'Demo žingsnis' : 'Demo Step',
        description:
          currentLanguage === 'lt'
            ? 'Išbandykite kalbos perjungimą'
            : 'Try switching languages',
        fields: [
          {
            id: 'email',
            name: 'email',
            type: 'email',
            label: 'formBuilder.fields.email',
            placeholder: 'formBuilder.placeholders.email',
            required: true,
          },
          {
            id: 'personalCode',
            name: 'personalCode',
            type: 'text',
            label: 'formBuilder.fields.personalCode',
            placeholder: 'formBuilder.placeholders.personalCode',
            required: true,
            validation: {
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'formBuilder.messages.personalCodeInvalid',
              },
            },
          },
          {
            id: 'terms',
            name: 'terms',
            type: 'checkbox',
            label: 'formBuilder.fields.termsAndConditions',
            required: true,
            variant: 'flat',
            children: 'formBuilder.messages.termsAccept',
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      const message =
        currentLanguage === 'lt'
          ? 'Forma sėkmingai pateikta!'
          : 'Form submitted successfully!';
      alert(message);
      console.log('Demo form data:', data);
    },
  };

  return (
    <Box>
      <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant='h6' gutterBottom>
          {currentLanguage === 'lt' ? 'Kalbos perjungimas' : 'Language Switcher'}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
          {currentLanguage === 'lt'
            ? `Dabartinė kalba: ${currentLanguage === 'lt' ? 'Lietuvių' : 'English'}`
            : `Current language: ${currentLanguage === 'lt' ? 'Lithuanian' : 'English'}`}
        </Typography>
        <Button variant='contained' onClick={toggleLanguage}>
          {currentLanguage === 'lt' ? 'Switch to English' : 'Perjungti į lietuvių'}
        </Button>
      </Box>

      <FormBuilder config={config} />
    </Box>
  );
}
