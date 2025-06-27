/**
 * FormBuilder Component Library
 *
 * Custom Error Messages Feature:
 * You can now override default validation messages on a per-field basis using the `customErrorMessages` property.
 *
 * Priority order for error messages:
 * 1. Custom messages from field config (customErrorMessages)
 * 2. Translated messages from i18n
 * 3. Default English fallback messages
 *
 * Example usage:
 * {
 *   id: 'email',
 *   name: 'email',
 *   type: 'email',
 *   label: 'Email Address',
 *   required: true,
 *   customErrorMessages: {
 *     required: 'Please provide your email - it is mandatory!',
 *     email: 'The email format is incorrect. Please check again.',
 *   },
 * }
 *
 * Available error message types:
 * - required: For required field validation
 * - email: For email format validation
 * - phone: For phone number validation
 * - minLength: For minimum length validation (supports {{min}} placeholder)
 * - maxLength: For maximum length validation (supports {{max}} placeholder)
 * - min: For minimum value validation (supports {{min}} placeholder)
 * - max: For maximum value validation (supports {{max}} placeholder)
 * - fileSize: For file size validation (supports {{size}} placeholder)
 * - selectOption: For select/radio option validation
 * - selectAtLeastOne: For multiselect validation
 * - custom: For custom validation rules
 *
 * Placeholders in custom messages:
 * Use {{placeholder}} syntax for dynamic values:
 * - {{field}}: Field label
 * - {{min}}: Minimum value/length
 * - {{max}}: Maximum value/length
 * - {{size}}: File size limit
 */

// Import for internal use in commonFieldConfigs
import { createCustomValidationRules } from './validation';

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
    // Use Zod validation for proper translation support
    // The validation schema will be created with translations in FormBuilder
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

// Function to create field configs with custom Zod validation (for advanced use cases)
export const createTranslatedFieldConfigs = (
  translateFunction?: (key: string, values?: Record<string, any>) => string,
) => {
  const validationRules = createCustomValidationRules(translateFunction);

  return {
    ...commonFieldConfigs,
    personalCodeWithValidation: (name: string, required = true) => ({
      ...commonFieldConfigs.personalCode(name, required),
      zodValidation: required
        ? validationRules.lithuanianPersonalCode
        : validationRules.lithuanianPersonalCode.optional(),
    }),
    companyCode: (name: string, required = true) => ({
      id: name,
      name,
      type: 'text' as const,
      label: 'Company Code',
      placeholder: 'Enter 9-digit company code',
      required,
      zodValidation: required
        ? validationRules.lithuanianCompanyCode
        : validationRules.lithuanianCompanyCode.optional(),
    }),
  };
};
