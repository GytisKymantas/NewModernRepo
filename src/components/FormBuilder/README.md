# Form Builder Documentation

A powerful, type-safe form builder for React applications using react-hook-form, Zod validation, and RcSes components.

## Features

- ✅ **All Field Types**: Text, email, phone, select, radio, checkbox, date, file upload, number stepper, and more
- ✅ **Custom Components**: Easy integration of custom form components
- ✅ **Zod Validation**: Type-safe schema validation with automatic error handling
- ✅ **React Hook Form**: Performant forms with minimal re-renders
- ✅ **Multi-step Forms**: Built-in stepper with navigation
- ✅ **Conditional Logic**: Show/hide fields based on other field values
- ✅ **TypeScript**: Full type safety and IntelliSense support
- ✅ **Grid Layout**: Responsive field layout with Material-UI Grid
- ✅ **File Upload**: Drag & drop file uploads with validation
- ✅ **Internationalization**: Built-in support for Lithuanian and English with react-i18next
- ✅ **Loading States**: Basic loading state management for form submissions and draft saving

## Quick Start

```tsx
import { FormBuilder, FormBuilderConfig } from '@/components/FormBuilder';

const config: FormBuilderConfig = {
  id: 'my-form',
  title: 'Contact Form',
  multiStep: false,
  steps: [
    {
      id: 'contact-step',
      title: 'Contact Information',
      fields: [
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
        },
        {
          id: 'phone',
          name: 'phone',
          type: 'phone',
          label: 'Phone Number',
          required: true,
        },
      ],
    },
  ],
  onSubmit: async (data) => {
    console.log('Form data:', data);
  },
};

function MyForm() {
  return <FormBuilder config={config} />;
}
```

## Loading State Management

The FormBuilder supports basic loading state management for form submissions and draft operations.

### Basic Loading Configuration

```tsx
const config: FormBuilderConfig = {
  id: 'my-form',
  title: 'Contact Form',
  loading: {
    states: {
      isSubmitting: false,
      isSavingDraft: false,
      isDataLoading: true,
    },
    disableFormDuringLoading: true,
    loadingMessages: {
      submitting: 'Submitting form...',
      savingDraft: 'Saving draft...',
      dataLoading: 'Loading form data...',
    },
  },
  // ... rest of config
};
```

### Available Loading States

- `isSubmitting` - Form submission in progress
- `isSavingDraft` - Draft saving in progress
- `isDataLoading` - Initial data loading

### Loading Configuration Options

- `disableFormDuringLoading` - Disables all form interactions during any loading state
- `loadingMessages` - Custom messages for different loading states

### External Loading State Control

You can control loading states externally by updating the config:

```tsx
function MyFormWithExternalLoading() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config: FormBuilderConfig = {
    id: 'my-form',
    title: 'Contact Form',
    loading: {
      states: {
        isSubmitting,
      },
      disableFormDuringLoading: true,
    },
    steps: [
      // ... your steps
    ],
    onSubmit: async (data) => {
      setIsSubmitting(true);
      try {
        await submitToAPI(data);
      } finally {
        setIsSubmitting(false);
      }
    },
  };

  return <FormBuilder config={config} />;
}
```

### Loading State Behavior

1. **Internal States**: The FormBuilder automatically manages `isSubmitting` and `isSavingDraft` based on form actions
2. **External Override**: If you provide these states in the config, they override the internal states
3. **Form Disabling**: When `disableFormDuringLoading: true`, all form interactions are disabled during any loading state
4. **Button States**: Submit and draft buttons show appropriate loading text and are disabled during relevant operations

## Available Field Types

### Text Fields

```tsx
{
  type: 'text',
  label: 'Full Name',
  placeholder: 'Enter your name',
  maxLength: 100,
}
```

### Email Field

```tsx
{
  type: 'email',
  label: 'Email Address',
  placeholder: 'Enter your email',
}
```

### Textarea

```tsx
{
  type: 'textarea',
  label: 'Description',
  rows: 4,
  maxLength: 500,
}
```

### Select Dropdown

```tsx
{
  type: 'select',
  label: 'Country',
  options: [
    { value: 'lt', label: 'Lithuania' },
    { value: 'lv', label: 'Latvia' },
    { value: 'ee', label: 'Estonia' },
  ],
}
```

### Multi-Select

```tsx
{
  type: 'multiselect',
  label: 'Skills',
  multiple: true,
  options: [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
    { value: 'react', label: 'React' },
  ],
}
```

### Radio Buttons

```tsx
{
  type: 'radio',
  label: 'Preferred Contact Method',
  options: [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'sms', label: 'SMS' },
  ],
  hideNativeRadio: true,
}
```

### Checkbox

```tsx
{
  type: 'checkbox',
  label: 'Terms and Conditions',
  variant: 'flat',
  children: 'I agree to the terms and conditions',
}
```

### Date Picker

```tsx
{
  type: 'date',
  label: 'Date of Birth',
  clearable: true,
}
```

### Phone Input

```tsx
{
  type: 'phone',
  label: 'Phone Number',
  defaultCountry: 'LT',
}
```

### Number Stepper

```tsx
{
  type: 'numberStepper',
  label: 'Quantity',
  min: 0,
  max: 100,
  displayStepperControls: true,
}
```

### File Upload

```tsx
{
  type: 'file',
  label: 'Upload Document',
  required: true,
  accept: '.pdf,.doc,.docx',
  maxSize: 5, // 5MB
  multiple: false,
}
```

### Custom Fields

```tsx
{
  type: 'custom',
  component: MyCustomField,
  props: {
    customProp: 'value',
  },
}
```

## API Reference

### FormBuilderConfig

| Property        | Type                                   | Description                        |
| --------------- | -------------------------------------- | ---------------------------------- |
| `id`            | string                                 | Unique form identifier             |
| `title`         | string                                 | Form title                         |
| `description?`  | string                                 | Form description                   |
| `multiStep?`    | boolean                                | Enable multi-step form             |
| `steps`         | FormStep[]                             | Array of form steps                |
| `onSubmit`      | (data: any) => void \| Promise<void>   | Form submission handler            |
| `onStepChange?` | (stepIndex: number, data: any) => void | Step change handler                |
| `onSaveDraft?`  | (data: any) => void \| Promise<void>   | Draft save handler (no validation) |
| `onLoadDraft?`  | () => any \| Promise<any>              | Draft load handler                 |
| `onDiscard?`    | () => void \| Promise<void>            | Form discard handler               |

### FieldConfig

| Property        | Type      | Description               |
| --------------- | --------- | ------------------------- |
| `id`            | string    | Unique field identifier   |
| `name`          | string    | Field name for form data  |
| `type`          | FieldType | Field type                |
| `label`         | string    | Field label               |
| `required?`     | boolean   | Whether field is required |
| `disabled?`     | boolean   | Whether field is disabled |
| `defaultValue?` | any       | Default field value       |

## Examples

Check the `pages/form-examples/` directory for complete working examples of how to use the FormBuilder component.

## Performance

The FormBuilder is optimized for performance with:

- Memoized validation schemas
- Minimal re-renders through React Hook Form
- Efficient field-level validation
- Conditional rendering based on form state
