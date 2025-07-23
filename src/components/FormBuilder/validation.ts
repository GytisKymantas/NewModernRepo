/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { FieldConfig, FormStep } from './types';

// Translation function type
type TranslateFunction = (key: string, values?: Record<string, any>) => string;

export const createFieldValidation = (
  field: FieldConfig,
  t?: TranslateFunction,
): z.ZodType<any> => {
  // Prioritize user-provided zodValidation
  if (field.zodValidation) {
    return field.zodValidation;
  }

  // Helper function for getting error messages with priority:
  // 1. Custom messages from field config
  // 2. Translated messages
  // 3. Fallback English messages
  const getMessage = (key: string, values?: Record<string, any>): string => {
    // First check for custom message from field config
    if (field.customErrorMessages?.[key]) {
      let message = field.customErrorMessages[key]!;
      // Handle interpolation in custom messages
      if (values) {
        Object.keys(values).forEach((placeholder) => {
          message = message.replace(`{{${placeholder}}}`, String(values[placeholder]));
        });
      }
      return message;
    }

    // Then check for translated message
    if (t) {
      return t(`formBuilder.validation.${key}`, values);
    }

    // Finally fall back to English defaults
    const fallbacks: Record<string, string> = {
      required: 'This field is required',
      fieldRequired: '{{field}} is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      personalCode: 'Personal code must be 11 digits',
      companyCode: 'Company code must be 9 digits',
      selectOption: 'Please select an option',
      selectAtLeastOne: 'Please select at least one option',
      minLength: 'Minimum length is {{min}} characters',
      maxLength: 'Maximum length is {{max}} characters',
      min: 'Minimum value is {{min}}',
      max: 'Maximum value is {{max}}',
      fileSize: 'File size must be less than {{size}}MB',
      fileRequired: '{{field}} is required',
      invalidNumber: 'Please enter a valid number',
      invalidString: 'Please enter valid text',
    };
    let message = fallbacks[key] || key;
    if (values) {
      Object.keys(values).forEach((placeholder) => {
        message = message.replace(`{{${placeholder}}}`, String(values[placeholder]));
      });
    }
    return message;
  };

  let schema: z.ZodType<any>;

  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'password':
      schema = z.string({ message: getMessage('invalidString') });
      if (field.validation?.maxLength) {
        schema = (schema as z.ZodString).max(
          field.validation.maxLength as number,
          getMessage('maxLength', { max: field.validation.maxLength }),
        );
      }
      if (field.validation?.minLength) {
        schema = (schema as z.ZodString).min(
          field.validation.minLength as number,
          getMessage('minLength', { min: field.validation.minLength }),
        );
      }
      break;

    case 'email':
      schema = z.string().email(getMessage('email'));
      break;

    case 'number':
    case 'numberStepper':
      schema = z.number({ message: getMessage('invalidNumber') });
      if (field.validation?.min !== undefined) {
        schema = (schema as z.ZodNumber).min(
          field.validation.min as number,
          getMessage('min', { min: field.validation.min }),
        );
      }
      if (field.validation?.max !== undefined) {
        schema = (schema as z.ZodNumber).max(
          field.validation.max as number,
          getMessage('max', { max: field.validation.max }),
        );
      }
      break;

    case 'phone':
      schema = z.string().regex(/^\+?[1-9]\d{1,14}$/, getMessage('phone'));
      break;

    case 'select':
    case 'multiselect':
      if ((field as any).multiple) {
        schema = z.array(z.string()).min(1, getMessage('selectAtLeastOne'));
      } else {
        schema = z.string().min(1, getMessage('selectOption'));
      }
      break;

    case 'radio':
      schema = z.string().min(1, getMessage('selectOption'));
      break;

    case 'checkbox':
      schema = z.boolean();
      if (field.required) {
        schema = (schema as z.ZodBoolean).refine((val) => val === true, {
          message: getMessage('required'),
        });
      }
      break;

    case 'date':
      schema = z.union(
        [
          z.date({ message: getMessage('invalidDate') }),
          z.string().pipe(z.coerce.date({ message: getMessage('invalidDate') })),
        ],
        { message: getMessage('invalidDate') },
      );
      break;

    case 'file': {
      const fileField = field as any;

      // Simplified file validation that handles empty states properly
      if (field.required) {
        // For required files, check if we have a valid file
        schema = z.any().refine(
          (value) => {
            // Handle different input formats
            if (!value || value === '' || value === null || value === undefined) {
              return false;
            }

            // Handle File object
            if (value instanceof File) {
              return true;
            }

            // Handle FileList
            if (value instanceof FileList) {
              return value.length > 0;
            }

            // Handle array of Files
            if (Array.isArray(value)) {
              return value.length > 0 && value.every((file) => file instanceof File);
            }

            return false;
          },
          { message: getMessage('fileRequired', { field: field.label }) },
        );
      } else {
        // For optional files, allow any value including empty
        schema = z.any().optional();
      }

      // Add file size validation if specified
      if (fileField.maxSize) {
        schema = schema.refine(
          (value) => {
            if (!value || value === '' || value === null || value === undefined) {
              return true; // Allow empty values
            }

            let filesToCheck: File[] = [];

            if (value instanceof File) {
              filesToCheck = [value];
            } else if (value instanceof FileList) {
              filesToCheck = Array.from(value);
            } else if (Array.isArray(value)) {
              filesToCheck = value.filter((item) => item instanceof File);
            }

            return filesToCheck.every((file) => file.size <= fileField.maxSize);
          },
          {
            message: getMessage('fileSize', {
              size: Math.round(fileField.maxSize / 1024 / 1024),
            }),
          },
        );
      }
      break;
    }

    case 'custom':
      // Custom validation should be provided in the field config
      schema = z.any();
      break;

    default:
      schema = z.any();
  }

  // Apply required validation
  if (field.required && field.type !== 'checkbox') {
    if (schema instanceof z.ZodString) {
      schema = schema.min(1, getMessage('fieldRequired', { field: field.label }));
    } else if (schema instanceof z.ZodArray) {
      schema = schema.min(1, getMessage('fieldRequired', { field: field.label }));
    } else if (!(schema instanceof z.ZodBoolean)) {
      schema = schema.refine((val) => val !== undefined && val !== null && val !== '', {
        message: getMessage('fieldRequired', { field: field.label }),
      });
    }
  } else if (!field.required) {
    // For optional fields, if it's not already optional, make it optional
    if (field.type !== 'file') {
      schema = schema.optional();
    }
    // Note: File fields are already handled with .optional() in their case above
  }

  return schema;
};

export const createStepValidation = (
  step: FormStep,
  t?: TranslateFunction,
): z.ZodObject<any> => {
  // Use custom step validation if provided
  if (step.validation) {
    return step.validation as z.ZodObject<any>;
  }

  const schemaShape: Record<string, z.ZodType<any>> = {};

  // Handle both direct fields and subgroup fields
  const allFields = [
    ...(step.fields || []),
    ...(step.subgroups?.flatMap((subgroup) => subgroup.fields) || []),
  ];

  allFields.forEach((field) => {
    schemaShape[field.name] = createFieldValidation(field, t);
  });

  return z.object(schemaShape);
};

export const createFormValidation = (
  steps: FormStep[],
  globalValidation?: z.ZodSchema,
  t?: TranslateFunction,
): z.ZodObject<any> => {
  // Use global validation if provided
  if (globalValidation) {
    return globalValidation as z.ZodObject<any>;
  }

  const schemaShape: Record<string, z.ZodType<any>> = {};

  steps.forEach((step) => {
    // Handle both direct fields and subgroup fields
    const allFields = [
      ...(step.fields || []),
      ...(step.subgroups?.flatMap((subgroup) => subgroup.fields) || []),
    ];

    allFields.forEach((field) => {
      schemaShape[field.name] = createFieldValidation(field, t);
    });
  });

  return z.object(schemaShape);
};

// Create translated custom validation rules that can be used in field configs
export const createCustomValidationRules = (
  t?: TranslateFunction,
  customMessages?: Record<string, string>,
) => {
  const getMessage = (key: string, values?: Record<string, any>): string => {
    // First check for custom messages passed to this function
    if (customMessages?.[key]) {
      let message = customMessages[key];
      if (values) {
        Object.keys(values).forEach((placeholder) => {
          message = message.replace(`{{${placeholder}}}`, String(values[placeholder]));
        });
      }
      return message;
    }

    // Then check for translated message
    if (t) {
      return t(`formBuilder.validation.${key}`, values);
    }

    // Finally fall back to English defaults
    const fallbacks: Record<string, string> = {
      personalCode: 'Personal code must be 11 digits',
      companyCode: 'Company code must be 9 digits',
      invalidUrl: 'Please enter a valid URL',
      positiveNumber: 'Must be a positive number',
      'strongPassword.minLength': 'Password must be at least 8 characters',
      'strongPassword.uppercase': 'Password must contain at least one uppercase letter',
      'strongPassword.lowercase': 'Password must contain at least one lowercase letter',
      'strongPassword.number': 'Password must contain at least one number',
      'strongPassword.special': 'Password must contain at least one special character',
      fileSize: 'File size must be less than {{maxSizeMB}}MB',
    };
    let message = fallbacks[key] || key;
    if (values) {
      Object.keys(values).forEach((placeholder) => {
        message = message.replace(`{{${placeholder}}}`, String(values[placeholder]));
      });
    }
    return message;
  };

  return {
    lithuanianPersonalCode: z.string().regex(/^[0-9]{11}$/, getMessage('personalCode')),

    lithuanianCompanyCode: z.string().regex(/^[0-9]{9}$/, getMessage('companyCode')),

    strongPassword: z
      .string()
      .min(8, getMessage('strongPassword.minLength'))
      .regex(/[A-Z]/, getMessage('strongPassword.uppercase'))
      .regex(/[a-z]/, getMessage('strongPassword.lowercase'))
      .regex(/[0-9]/, getMessage('strongPassword.number'))
      .regex(/[^A-Za-z0-9]/, getMessage('strongPassword.special')),

    url: z.string().url(getMessage('invalidUrl')),

    positiveNumber: z.number().positive(getMessage('positiveNumber')),

    fileSize: (maxSizeMB: number) =>
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= maxSizeMB * 1024 * 1024,
          getMessage('fileSize', { maxSizeMB }),
        ),

    fileType: (allowedTypes: string[]) =>
      z
        .instanceof(File)
        .refine(
          (file) => allowedTypes.includes(file.type),
          `File type must be one of: ${allowedTypes.join(', ')}`,
        ),
  };
};

// Export the default custom validation rules for backward compatibility
export const customValidationRules = createCustomValidationRules();
