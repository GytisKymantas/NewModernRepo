/* eslint-disable @typescript-eslint/no-explicit-any */
import accept from 'attr-accept';
import { ConditionalLogic, FieldConfig } from './types';

// Use require to avoid type conflicts with @types/mime from webpack-dev-server
// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const mime = require('mime').default as {
  getType: (path: string) => string | null;
  getExtension: (type: string) => string | null;
};

const evaluateCondition = (
  condition: ConditionalLogic['showWhen'] | ConditionalLogic['hideWhen'],
  formData: any,
): boolean => {
  if (!condition) return true;

  const fieldValue = formData[condition.field];

  switch (condition.operator) {
    case 'equals':
      return fieldValue === (condition as any).value;
    case 'notEquals':
      return fieldValue !== (condition as any).value;
    case 'contains':
      return Array.isArray(fieldValue)
        ? fieldValue.includes((condition as any).value)
        : String(fieldValue).includes(String((condition as any).value));
    case 'isEmpty':
      return (
        !fieldValue ||
        fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      );
    case 'isNotEmpty':
      return (
        fieldValue &&
        fieldValue !== '' &&
        (!Array.isArray(fieldValue) || fieldValue.length > 0)
      );
    default:
      return true;
  }
};

export const useConditionalLogic = (field: FieldConfig, formData: any): boolean => {
  if (!field.conditionalLogic) {
    return true;
  }

  const { showWhen, hideWhen } = field.conditionalLogic;

  if (showWhen) {
    return evaluateCondition(showWhen, formData);
  }

  if (hideWhen) {
    return !evaluateCondition(hideWhen, formData);
  }

  return true;
};

export const generateFieldId = (stepId: string, fieldName: string): string =>
  `${stepId}-${fieldName}`;

export const getDefaultValues = (steps: any[]): Record<string, any> => {
  const defaultValues: Record<string, any> = {};

  const processField = (field: FieldConfig) => {
    if (field.defaultValue !== undefined) {
      defaultValues[field.name] = field.defaultValue;
    } else {
      switch (field.type) {
        case 'text':
        case 'textarea':
        case 'email':
        case 'password':
        case 'phone':
        case 'search':
          defaultValues[field.name] = '';
          break;
        case 'number':
        case 'numberStepper':
          defaultValues[field.name] = 0;
          break;
        case 'select':
        case 'radio':
          defaultValues[field.name] = '';
          break;
        case 'multiselect':
          defaultValues[field.name] = [];
          break;
        case 'checkbox':
          defaultValues[field.name] = false;
          break;
        case 'date':
          defaultValues[field.name] = null;
          break;
        case 'file':
          defaultValues[field.name] = (field as any).multiple ? [] : null;
          break;
        default:
          defaultValues[field.name] = null;
      }
    }
  };

  steps.forEach((step) => {
    // Process direct fields
    if (step.fields && Array.isArray(step.fields)) {
      step.fields.forEach(processField);
    }

    // Process subgroup fields
    if (step.subgroups && Array.isArray(step.subgroups)) {
      step.subgroups.forEach((subgroup: any) => {
        if (subgroup.fields && Array.isArray(subgroup.fields)) {
          subgroup.fields.forEach(processField);
        }
      });
    }
  });

  return defaultValues;
};

export const validateStep = (stepFields: FieldConfig[], formData: any): string[] => {
  const errors: string[] = [];

  stepFields.forEach((field) => {
    const value = formData[field.name];

    if (field.required) {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors.push(`${field.label} is required`);
      }
    }

    // Note: Additional validation like email/phone is handled by Zod validation
    // in the FormBuilder component through zodResolver integration
  });

  return errors;
};

export const formatFormDataForSubmission = (formData: any): any => {
  const formatted = { ...formData };

  Object.keys(formatted).forEach((key) => {
    const value = formatted[key];

    // Convert empty strings to null for optional fields
    if (value === '') {
      formatted[key] = null;
    }

    // Ensure arrays are properly formatted
    if (Array.isArray(value) && value.length === 0) {
      formatted[key] = null;
    }
  });

  return formatted;
};

// MIME Type Utilities using external libraries
// ==============================================

/**
 * Validates if a string is a valid MIME type using the mime library
 */
export const isValidMimeType = (mimeType: string): boolean => {
  if (!mimeType || typeof mimeType !== 'string') {
    return false;
  }

  // Check basic format
  const mimePattern =
    /^[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_]*\/[a-zA-Z0-9][a-zA-Z0-9!#$&\-^_.]*$/;
  if (!mimePattern.test(mimeType)) {
    return false;
  }

  // Try to get extension - if mime library recognizes it, it's valid
  return mime.getExtension(mimeType) !== null;
};

/**
 * Validates if a string is a valid file extension
 */
export const isValidFileExtension = (extension: string): boolean => {
  if (!extension || typeof extension !== 'string') {
    return false;
  }

  const extensionPattern = /^\.[a-zA-Z0-9]+$/;
  if (!extensionPattern.test(extension)) {
    return false;
  }

  // Try to get MIME type - if mime library recognizes it, it's valid
  return mime.getType(extension) !== null;
};

/**
 * Converts a file extension to its corresponding MIME type using the mime library
 */
export const extensionToMimeType = (extension: string): string | undefined =>
  mime.getType(extension) || undefined;

/**
 * Parses accept string and converts it to react-dropzone format
 * Uses attr-accept internally for validation
 */
export const parseAcceptTypes = (
  acceptInput?: string | any,
): Record<string, string[]> | undefined => {
  if (!acceptInput) return undefined;

  // Ensure accept is a string - handle arrays, objects, etc.
  let acceptString: string;
  if (typeof acceptInput === 'string') {
    acceptString = acceptInput;
  } else if (Array.isArray(acceptInput)) {
    acceptString = acceptInput.join(',');
  } else if (typeof acceptInput === 'object') {
    acceptString = Object.values(acceptInput).join(',');
  } else {
    acceptString = String(acceptInput);
  }

  // Split by comma and clean up
  const types = acceptString
    .split(',')
    .map((type) => type.trim())
    .filter((type) => type && !/^\d+$/.test(type)); // Filter empty and numeric-only

  if (types.length === 0) return undefined;

  // Convert to the format expected by react-dropzone
  const acceptObject: Record<string, string[]> = {};

  types.forEach((type) => {
    if (type.startsWith('.')) {
      // It's a file extension
      const mimeType = mime.getType(type);
      if (mimeType) {
        if (!acceptObject[mimeType]) {
          acceptObject[mimeType] = [];
        }
        acceptObject[mimeType].push(type);
      }
    } else if (isValidMimeType(type)) {
      // It's a MIME type
      if (!acceptObject[type]) {
        acceptObject[type] = [];
      }
    }
  });

  return Object.keys(acceptObject).length > 0 ? acceptObject : undefined;
};

/**
 * Helper functions for creating common file accept patterns
 */
export const createFileAcceptPatterns = {
  images: () => parseAcceptTypes('image/jpeg,image/png,image/gif,image/webp'),
  documents: () => parseAcceptTypes('.pdf,.doc,.docx,.txt,.rtf'),
  spreadsheets: () => parseAcceptTypes('.xls,.xlsx,.csv'),
  presentations: () => parseAcceptTypes('.ppt,.pptx'),
  archives: () => parseAcceptTypes('.zip,.rar,.7z'),
  audio: () => parseAcceptTypes('audio/mpeg,audio/wav,audio/ogg'),
  video: () => parseAcceptTypes('video/mp4,video/avi,video/quicktime'),
  all: () => undefined, // Accept all files
  custom: (types: string[]) => parseAcceptTypes(types.join(',')),
};

/**
 * Validates if a file matches the accept criteria
 * Uses attr-accept library for accurate validation
 */
export const validateFileAccept = (file: File, acceptString: string): boolean => {
  if (!acceptString) return true;
  return accept(file, acceptString);
};
