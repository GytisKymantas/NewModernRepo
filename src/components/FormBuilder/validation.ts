/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { FieldConfig, FormStep } from './types';

export const createFieldValidation = (field: FieldConfig): z.ZodType<any> => {
  // Prioritize user-provided zodValidation
  if (field.zodValidation) {
    return field.zodValidation;
  }

  let schema: z.ZodType<any>;

  switch (field.type) {
    case 'text':
    case 'textarea':
    case 'password':
      schema = z.string();
      if (field.validation?.maxLength) {
        schema = (schema as z.ZodString).max(field.validation.maxLength as number);
      }
      if (field.validation?.minLength) {
        schema = (schema as z.ZodString).min(field.validation.minLength as number);
      }
      break;

    case 'email':
      schema = z.string().email('Please enter a valid email address');
      break;

    case 'number':
    case 'numberStepper':
      schema = z.number();
      if (field.validation?.min !== undefined) {
        schema = (schema as z.ZodNumber).min(field.validation.min as number);
      }
      if (field.validation?.max !== undefined) {
        schema = (schema as z.ZodNumber).max(field.validation.max as number);
      }
      break;

    case 'phone':
      schema = z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number');
      break;

    case 'select':
    case 'multiselect':
      if ((field as any).multiple) {
        schema = z.array(z.string()).min(1, 'Please select at least one option');
      } else {
        schema = z.string().min(1, 'Please select an option');
      }
      break;

    case 'radio':
      schema = z.string().min(1, 'Please select an option');
      break;

    case 'checkbox':
      schema = z.boolean();
      if (field.required) {
        schema = (schema as z.ZodBoolean).refine((val) => val === true, {
          message: 'This field is required',
        });
      }
      break;

    case 'date':
      schema = z.date().or(z.string().pipe(z.coerce.date()));
      break;

    case 'file': {
      const fileField = field as any;
      if (fileField.multiple) {
        schema = z.array(z.instanceof(File)).min(1, 'Please upload at least one file');
      } else {
        schema = z.instanceof(File);
      }

      if (fileField.maxSize) {
        schema = schema.refine(
          (files) => {
            const fileArray = Array.isArray(files) ? files : [files];
            return fileArray.every((file) => file.size <= fileField.maxSize);
          },
          { message: `File size must be less than ${fileField.maxSize / 1024 / 1024}MB` },
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
      schema = schema.min(1, `${field.label} is required`);
    } else if (schema instanceof z.ZodArray) {
      schema = schema.min(1, `${field.label} is required`);
    } else if (!(schema instanceof z.ZodBoolean)) {
      schema = schema.refine((val) => val !== undefined && val !== null && val !== '', {
        message: `${field.label} is required`,
      });
    }
  } else if (!field.required) {
    schema = schema.optional();
  }

  return schema;
};

export const createStepValidation = (step: FormStep): z.ZodObject<any> => {
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
    schemaShape[field.name] = createFieldValidation(field);
  });

  return z.object(schemaShape);
};

export const createFormValidation = (
  steps: FormStep[],
  globalValidation?: z.ZodSchema,
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
      schemaShape[field.name] = createFieldValidation(field);
    });
  });

  return z.object(schemaShape);
};

// Custom validation rules that can be used in field configs
export const customValidationRules = {
  lithuanianPersonalCode: z
    .string()
    .regex(/^[0-9]{11}$/, 'Personal code must be 11 digits'),

  lithuanianCompanyCode: z.string().regex(/^[0-9]{9}$/, 'Company code must be 9 digits'),

  strongPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  url: z.string().url('Please enter a valid URL'),

  positiveNumber: z.number().positive('Must be a positive number'),

  fileSize: (maxSizeMB: number) =>
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= maxSizeMB * 1024 * 1024,
        `File size must be less than ${maxSizeMB}MB`,
      ),

  fileType: (allowedTypes: string[]) =>
    z
      .instanceof(File)
      .refine(
        (file) => allowedTypes.includes(file.type),
        `File type must be one of: ${allowedTypes.join(', ')}`,
      ),
};

export type ValidationRules = typeof customValidationRules;
