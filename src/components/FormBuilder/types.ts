/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, ReactNode } from 'react';
import { Control, FieldErrors, RegisterOptions } from 'react-hook-form';
import { z } from 'zod';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

export interface FileDropzoneProps {
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  onDrop?: (files: File[]) => void;
}

export interface SlotProps {
  [key: string]: any;
}

// Custom error messages interface
export interface CustomErrorMessages {
  required?: string;
  email?: string;
  phone?: string;
  minLength?: string;
  maxLength?: string;
  min?: string;
  max?: string;
  pattern?: string;
  fileSize?: string;
  fileType?: string;
  selectOption?: string;
  selectAtLeastOne?: string;
  custom?: string; // For custom validation rules
  [key: string]: string | undefined; // Allow additional custom message types
}

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'password'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'
  | 'numberStepper'
  | 'alert'
  | 'custom';

export interface BaseFieldConfig {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  validation?: RegisterOptions;
  zodValidation?: z.ZodType<any>;
  customErrorMessages?: CustomErrorMessages; // New property for custom error messages
  slotProps?: SlotProps;
  gridColumn?: number; // For layout (1-12)
  conditionalLogic?: ConditionalLogic;
}

export interface ConditionalLogic {
  showWhen?: {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'isEmpty' | 'isNotEmpty';
    value?: any;
  };
  hideWhen?: {
    field: string;
    operator: 'equals' | 'notEquals' | 'contains' | 'isEmpty' | 'isNotEmpty';
  };
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text' | 'textarea' | 'email' | 'password';
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
}

export interface NumberStepperConfig extends BaseFieldConfig {
  type: 'numberStepper';
  min?: number;
  max?: number;
  step?: number;
  displayStepperControls?: boolean;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: 'select' | 'multiselect';
  options: SelectOption[];
  multiple?: boolean;
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: 'radio';
  options: RadioOption[];
  hideNativeRadio?: boolean;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: 'checkbox';
  variant?: 'flat' | 'outlined';
  children?: ReactNode;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date';
  clearable?: boolean;
  format?: string;
}

export interface PhoneFieldConfig extends BaseFieldConfig {
  type: 'phone';
  defaultCountry?: string;
}

export interface FileFieldConfig extends BaseFieldConfig {
  type: 'file';
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
}

export interface AlertFieldConfig extends BaseFieldConfig {
  type: 'alert';
  severity?: 'error' | 'warning' | 'info' | 'success';
  message: ReactNode;
  icon?: ReactNode;
  sx?: Record<string, any>;
}

export interface CustomFieldConfig extends BaseFieldConfig {
  type: 'custom';
  component: ComponentType<CustomFieldProps>;
  props?: Record<string, any>;
}

export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | NumberStepperConfig
  | SelectFieldConfig
  | RadioFieldConfig
  | CheckboxFieldConfig
  | DateFieldConfig
  | PhoneFieldConfig
  | FileFieldConfig
  | AlertFieldConfig
  | CustomFieldConfig;

// New interfaces for subgroup support
export interface FieldSubgroup {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'bordered' | 'elevated';
  fields: FieldConfig[];
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields?: FieldConfig[]; // Direct fields (backwards compatibility)
  subgroups?: FieldSubgroup[]; // New subgroup support
  validation?: z.ZodSchema;
}

// Loading state configuration
export interface LoadingStates {
  isSubmitting?: boolean; // Form submission
  isSavingDraft?: boolean; // Saving draft
  isDataLoading?: boolean; // Initial data loading
}

export interface LoadingConfig {
  states?: LoadingStates;
  disableFormDuringLoading?: boolean; // Disable form interactions during loading
  loadingMessages?: {
    submitting?: string;
    savingDraft?: string;
    dataLoading?: string;
  };
}

export interface FormBuilderConfig {
  id: string;
  title: string;
  description?: string;
  loading?: LoadingConfig; // New loading configuration
  multiStep?: boolean;
  steps: FormStep[];
  globalValidation?: z.ZodSchema;
  onSubmit: (data: any) => void | Promise<void>;
  onInvalidSubmit?: (errors: FieldErrors, data: any) => void | Promise<void>;
  onStepChange?: (stepIndex: number, data: any) => void;
  onSaveDraft?: (data: any) => void | Promise<void>;
  onLoadDraft?: () => any | Promise<any>;
  onDiscard?: () => void | Promise<void>;
}

export interface CustomFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  errors?: FieldErrors;
  label: string;
  required?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

export interface FormBuilderProps {
  config: FormBuilderConfig;
  initialData?: Record<string, any>;
  className?: string;
}

export interface FieldRendererProps {
  field: FieldConfig;
  control: Control<any>;
  errors?: FieldErrors;
  register: any;
  setValue: any;
  watch: any;
  formData: any;
  disabled?: boolean;
}

export interface SubgroupRendererProps {
  subgroup: FieldSubgroup;
  control: Control<any>;
  errors?: FieldErrors;
  register: any;
  setValue: any;
  watch: any;
  formData: any;
  disabled?: boolean;
}

// New component prop interfaces
export interface FormHeaderProps {
  title: string;
  description?: string;
}

export interface ProgressStepperProps {
  steps: FormStep[];
  currentStep: number;
  upSm: boolean;
  upMd: boolean;
}

export interface FormActionsProps {
  multiStep: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  isSavingDraft: boolean;
  loadingStates?: LoadingStates;
  loadingConfig?: LoadingConfig;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
  onSaveDraft?: () => void;
  onDiscard?: () => void;
}

export interface FormContentProps {
  step: FormStep;
  control: Control<any>;
  errors?: FieldErrors;
  register: any;
  setValue: any;
  watch: any;
  formData: any;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  accordionController: any;
  loadingStates?: LoadingStates;
  loadingConfig?: LoadingConfig;
}
