export { default as FieldRenderer, SubgroupRenderer } from './FieldRenderer';
export { default as FormBuilder } from './FormBuilder';
export { default as FormActions } from './components/FormActions';
export { default as FormContent } from './components/FormContent';
export { default as FormHeader } from './components/FormHeader';
export * from './components/StepIcons';
export * from './styled';
export type * from './types';
export * from './utils';
export * from './validation';

// Export translation hooks
export { default as useFormTranslation } from './hooks/useFormTranslation';
export { default as useLanguageSwitcher } from './hooks/useLanguageSwitcher';

// All MIME type utilities are exported via 'export * from ./utils' above
// Now using external libraries: 'mime' and 'attr-accept'

// Pre-built field configs for common use cases
export const commonFieldConfigs = {
  email: (name: string, required = true) => ({
    id: name,
    name,
    type: 'email' as const,
    label: 'formBuilder.fields.email',
    placeholder: 'formBuilder.placeholders.email',
    required,
  }),

  phone: (name: string, required = true) => ({
    id: name,
    name,
    type: 'phone' as const,
    label: 'formBuilder.fields.phone',
    required,
  }),

  personalCode: (name: string, required = true) => ({
    id: name,
    name,
    type: 'text' as const,
    label: 'formBuilder.fields.personalCode',
    placeholder: 'formBuilder.placeholders.personalCode',
    required,
    validation: {
      pattern: {
        value: /^[0-9]{11}$/,
        message: 'formBuilder.messages.personalCodeInvalid',
      },
    },
  }),

  termsAndConditions: (name: string) => ({
    id: name,
    name,
    type: 'checkbox' as const,
    label: 'formBuilder.fields.termsAndConditions',
    required: true,
    variant: 'flat' as const,
    children: 'formBuilder.messages.termsAccept',
  }),

  dateOfBirth: (name: string, required = true) => ({
    id: name,
    name,
    type: 'date' as const,
    label: 'formBuilder.fields.dateOfBirth',
    required,
    clearable: true,
  }),

  address: (name: string, required = true) => ({
    id: name,
    name,
    type: 'textarea' as const,
    label: 'formBuilder.fields.address',
    placeholder: 'formBuilder.placeholders.address',
    required,
    rows: 3,
  }),

  documentUpload: (name: string, required = true) => ({
    id: name,
    name,
    type: 'file' as const,
    label: 'formBuilder.fields.documentUpload',
    required,
    accept: '.pdf,.doc,.docx,.jpg,.png',
    maxSize: 5 * 1024 * 1024, // 5MB
  }),
};
