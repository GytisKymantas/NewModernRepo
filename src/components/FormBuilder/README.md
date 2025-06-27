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
  accept: '.pdf,.doc,.docx',
  maxSize: 5 * 1024 * 1024, // 5MB
  multiple: false,
}
```

### Custom Component

```tsx
{
  type: 'custom',
  label: 'Custom Field',
  component: MyCustomComponent,
  props: {
    customProp: 'value',
  },
}
```

## Multi-Step Forms

```tsx
const config: FormBuilderConfig = {
  id: 'multi-step-form',
  title: 'Registration Form',
  multiStep: true,
  steps: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      fields: [
        // Step 1 fields
      ],
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      description: 'How can we reach you?',
      fields: [
        // Step 2 fields
      ],
    },
  ],
  onSubmit: async (data) => {
    // Handle final submission
  },
  onStepChange: (stepIndex, data) => {
    // Handle step navigation
    console.log(`Moving to step ${stepIndex}`, data);
  },
};
```

## Conditional Logic

Show or hide fields based on other field values:

```tsx
{
  id: 'hasCompany',
  name: 'hasCompany',
  type: 'checkbox',
  label: 'I represent a company',
},
{
  id: 'companyName',
  name: 'companyName',
  type: 'text',
  label: 'Company Name',
  conditionalLogic: {
    showWhen: {
      field: 'hasCompany',
      operator: 'equals',
      value: true,
    },
  },
}
```

### Conditional Operators

- `equals`: Field value equals specified value
- `notEquals`: Field value does not equal specified value
- `contains`: Field value contains specified value (for arrays/strings)
- `isEmpty`: Field is empty or null
- `isNotEmpty`: Field has a value

## Validation with Zod

The form builder automatically creates Zod schemas based on field configurations:

```tsx
// Automatic validation rules based on field type and properties
{
  type: 'email',
  required: true,
  // Automatically validates email format and required
}

{
  type: 'text',
  required: true,
  validation: {
    minLength: 3,
    maxLength: 50,
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: 'Only letters and spaces allowed',
    },
  },
}
```

### Custom Validation Rules

Use pre-built validation rules:

```tsx
import { customValidationRules } from '@/components/FormBuilder';

{
  type: 'text',
  label: 'Personal Code',
  validation: customValidationRules.lithuanianPersonalCode,
}
```

## Layout and Styling

### Grid Layout

```tsx
{
  id: 'firstName',
  gridColumn: 6, // Takes half width (6/12)
  // ... other props
}
```

### Custom Styling

```tsx
{
  id: 'styledField',
  slotProps: {
    field: {
      sx: {
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
}
```

## Common Use Cases

### Registration Form

```tsx
import { commonFieldConfigs } from '@/components/FormBuilder';

const fields = [
  commonFieldConfigs.email('email'),
  commonFieldConfigs.phone('phone'),
  commonFieldConfigs.personalCode('personalCode'),
  commonFieldConfigs.termsAndConditions('terms'),
];
```

### Document Upload Form

```tsx
const documentForm = {
  steps: [
    {
      fields: [
        commonFieldConfigs.documentUpload('document'),
        {
          type: 'select',
          label: 'Document Type',
          options: [
            { value: 'passport', label: 'Passport' },
            { value: 'id', label: 'ID Card' },
            { value: 'license', label: "Driver's License" },
          ],
        },
      ],
    },
  ],
};
```

## Custom Components

Create and integrate custom form components:

```tsx
import { CustomFieldProps } from '@/components/FormBuilder';

const MyCustomField: React.FC<CustomFieldProps> = ({
  id,
  name,
  control,
  errors,
  label,
  required,
  ...customProps
}) => {
  return (
    <div>
      <label>{label}</label>
      {/* Your custom input implementation */}
    </div>
  );
};

// Use in form config
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

| Property            | Type             | Description                 |
| ------------------- | ---------------- | --------------------------- |
| `id`                | string           | Unique field identifier     |
| `name`              | string           | Field name for form data    |
| `type`              | FieldType        | Field type                  |
| `label`             | string           | Field label                 |
| `required?`         | boolean          | Whether field is required   |
| `disabled?`         | boolean          | Whether field is disabled   |
| `defaultValue?`     | any              | Default field value         |
| `gridColumn?`       | number           | Grid column span (1-12)     |
| `conditionalLogic?` | ConditionalLogic | Show/hide conditions        |
| `validation?`       | RegisterOptions  | Additional validation rules |
| `slotProps?`        | object           | Custom props for styling    |

## Draft Functionality

The Form Builder includes comprehensive draft saving and loading capabilities that allow users to save their progress without validation and return to complete forms later.

### Save Draft Features

- **Manual Save**: Users can manually save drafts using the "Save Draft" button
- **Auto-Save**: Drafts can be automatically saved on step changes in multi-step forms
- **No Validation**: Draft saving bypasses all validation rules
- **Local/Remote Storage**: Works with localStorage, API calls, or any storage solution

### Draft Configuration

```tsx
const config: FormBuilderConfig = {
  // ... other config options
  onSaveDraft: async (data) => {
    // Save draft without validation
    localStorage.setItem('form-draft', JSON.stringify(data));
    // Or send to API
    await fetch('/api/drafts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  onLoadDraft: async () => {
    // Load draft data on form initialization
    const saved = localStorage.getItem('form-draft');
    return saved ? JSON.parse(saved) : null;
    // Or load from API
    // const response = await fetch('/api/drafts/123');
    // return response.json();
  },
  onStepChange: (stepIndex, data) => {
    // Optional: Auto-save on step changes
    localStorage.setItem('form-draft', JSON.stringify(data));
  },
};
```

### Draft UI Features

- **Save Draft Button**: Appears alongside submit/next buttons when `onSaveDraft` is provided
- **Loading States**: Shows "Saving..." state during draft save operations
- **Auto-Loading**: Automatically loads saved drafts when form initializes
- **Multi-Step Support**: Works seamlessly with multi-step forms

## Discard Functionality

The Form Builder includes a discard feature that allows users to cancel form completion and navigate away from the form safely.

### Discard Behavior

- **Single-Step Forms**: Discard button always appears at the bottom and triggers the discard handler
- **Multi-Step Forms**:
  - On first step: Shows "Discard" button that triggers the discard handler
  - On subsequent steps: Shows "Previous" button for navigation back through steps
- **Custom vs Default**: If no `onDiscard` handler is provided, defaults to `window.history.back()`

### Discard Configuration

```tsx
const config: FormBuilderConfig = {
  // ... other config options
  onDiscard: async () => {
    // Custom discard logic
    const shouldDiscard = confirm('Are you sure you want to discard your changes?');
    if (shouldDiscard) {
      // Clear any saved drafts
      localStorage.removeItem('form-draft');
      // Navigate to a specific page
      window.location.href = '/dashboard';
      // Or use router navigation
      // router.push('/dashboard');
    }
  },
};
```

### Discard UI Features

- **Always Visible**: Discard/Previous button is always visible at the bottom of the form
- **Smart Labels**: Shows appropriate text based on form type and current step
- **Custom Styling**: Styled as a subtle underlined text button
- **No Validation**: Discard actions bypass all form validation

## Examples

### Basic Single-Step Form

```tsx
import { FormBuilder, FormBuilderConfig } from '@/components/FormBuilder';

const basicFormConfig: FormBuilderConfig = {
  id: 'contact-form',
  title: 'Contact Information',
  multiStep: false,
  steps: [
    {
      id: 'contact-step',
      title: 'Contact Details',
      fields: [
        {
          id: 'firstName',
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          required: true,
        },
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
    console.log('Form submitted:', data);
    // Handle form submission
  },
  onDiscard: () => {
    window.history.back();
  },
};

function ContactForm() {
  return <FormBuilder config={basicFormConfig} />;
}
```

### Multi-Step Form Example

```tsx
const multiStepConfig: FormBuilderConfig = {
  id: 'multi-step-form',
  title: 'Service Request',
  multiStep: true,
  steps: [
    {
      id: 'personal-info',
      title: 'Personal Information',
      fields: [
        {
          id: 'fullName',
          name: 'fullName',
          type: 'text',
          label: 'Full Name',
          required: true,
        },
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
      ],
    },
    {
      id: 'service-details',
      title: 'Service Details',
      fields: [
        {
          id: 'serviceType',
          name: 'serviceType',
          type: 'select',
          label: 'Service Type',
          required: true,
          options: [
            { value: 'consultation', label: 'Consultation' },
            { value: 'support', label: 'Technical Support' },
          ],
        },
      ],
    },
  ],
  onSubmit: async (data) => {
    console.log('Multi-step form submitted:', data);
  },
  onSaveDraft: async (data) => {
    localStorage.setItem('service-draft', JSON.stringify(data));
  },
  onLoadDraft: async () => {
    const saved = localStorage.getItem('service-draft');
    return saved ? JSON.parse(saved) : null;
  },
  onDiscard: () => {
    if (confirm('Are you sure you want to discard this form?')) {
      localStorage.removeItem('service-draft');
      window.location.href = '/dashboard';
    }
  },
};
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions for all configuration options, ensuring type safety and excellent developer experience.

## Field Types

### File Upload Fields

File upload fields support MIME type validation using industry-standard libraries:

- **MIME Type Parsing**: Uses the `mime` library (97M+ weekly downloads) for accurate MIME type detection
- **File Validation**: Uses the `attr-accept` library from react-dropzone team for HTML5-compliant file validation
- **Accept Patterns**: Pre-built patterns for common file types (images, documents, audio, video, etc.)

#### Available Accept Patterns

```javascript
import { createFileAcceptPatterns } from './FormBuilder';

// Pre-built patterns
createFileAcceptPatterns.images(); // image/jpeg, image/png, etc.
createFileAcceptPatterns.documents(); // .pdf, .doc, .docx, etc.
createFileAcceptPatterns.spreadsheets(); // .xls, .xlsx, .csv
createFileAcceptPatterns.presentations(); // .ppt, .pptx
createFileAcceptPatterns.archives(); // .zip, .rar, .7z
createFileAcceptPatterns.audio(); // audio/mpeg, audio/wav, etc.
createFileAcceptPatterns.video(); // video/mp4, video/avi, etc.
createFileAcceptPatterns.all(); // Accept all files
createFileAcceptPatterns.custom(['pdf', '.doc']); // Custom types
```

#### File Validation

```javascript
import { validateFileAccept, parseAcceptTypes } from './FormBuilder';

// Validate a file against accept string
const isValid = validateFileAccept(file, 'image/*,.pdf');

// Parse accept string for react-dropzone
const acceptObject = parseAcceptTypes('image/*,.pdf,.doc');
```

## Usage

```jsx
import { FormBuilder, createFileAcceptPatterns } from './FormBuilder';

const formConfig = {
  steps: [
    {
      id: 'upload',
      title: 'File Upload',
      fields: [
        {
          id: 'document',
          name: 'document',
          type: 'file',
          label: 'Upload Document',
          accept: createFileAcceptPatterns.documents(),
          maxSize: 10 * 1024 * 1024, // 10MB
          required: true,
        },
      ],
    },
  ],
};

function MyForm() {
  return <FormBuilder config={formConfig} onSubmit={handleSubmit} />;
}
```

## Internationalization (i18n)

The FormBuilder component includes built-in internationalization support using react-i18next, with Lithuanian and English translations available out of the box.

### Translation Support

The component automatically translates:

- **Field Labels**: Email Address, Phone Number, Personal Code, etc.
- **Form Actions**: Submit, Save Draft, Next, Previous, etc.
- **Validation Messages**: Required field errors, format validation, etc.
- **Placeholders**: Field placeholder text
- **Messages**: Success/error messages and informational text

### Using Translation Keys

You can use translation keys in your field configurations:

```tsx
const config: FormBuilderConfig = {
  steps: [
    {
      id: 'contact',
      title: 'Contact Information',
      fields: [
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'formBuilder.fields.email', // Translates to "Email Address" / "El. pašto adresas"
          placeholder: 'formBuilder.placeholders.email',
          required: true,
        },
        {
          id: 'terms',
          name: 'terms',
          type: 'checkbox',
          label: 'formBuilder.fields.termsAndConditions',
          children: 'formBuilder.messages.termsAccept',
          required: true,
        },
      ],
    },
  ],
};
```

### Available Translation Keys

#### Form Actions

- `formBuilder.actions.next` - "Next" / "Toliau"
- `formBuilder.actions.previous` - "Previous" / "Atgal"
- `formBuilder.actions.submit` - "Submit" / "Pateikti"
- `formBuilder.actions.saveDraft` - "Save Draft" / "Išsaugoti juodraštį"

#### Field Labels

- `formBuilder.fields.email` - "Email Address" / "El. pašto adresas"
- `formBuilder.fields.phone` - "Phone Number" / "Telefono numeris"
- `formBuilder.fields.personalCode` - "Personal Code" / "Asmens kodas"
- `formBuilder.fields.termsAndConditions` - "Terms and Conditions" / "Taisyklės ir sąlygos"

#### Validation Messages

- `formBuilder.validation.required` - "This field is required" / "Šis laukas yra privalomas"
- `formBuilder.validation.email` - "Please enter a valid email address" / "Įveskite teisingą el. pašto adresą"

### Custom Translations

You can extend the translations or add new languages by updating the i18n configuration:

```tsx
// Add your own translations
i18n.addResourceBundle(
  'en',
  'translation',
  {
    myForm: {
      title: 'My Custom Form',
      submitSuccess: 'Form submitted successfully!',
    },
  },
  true,
  true,
);

// Use in your form config
const config = {
  title: 'myForm.title', // Will be translated
  // ...
};
```

### Using Translations

The FormBuilder automatically supports Lithuanian and English translations. You can use translation keys in your field configurations:

```tsx
const translatedFormConfig: FormBuilderConfig = {
  id: 'translated-form',
  title: 'formBuilder.titles.contactForm', // Will be translated
  steps: [
    {
      id: 'contact',
      title: 'formBuilder.steps.contactInfo',
      fields: [
        {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'formBuilder.fields.email', // Translates to "Email Address" / "El. pašto adresas"
          placeholder: 'formBuilder.placeholders.email',
          required: true,
        },
        {
          id: 'terms',
          name: 'terms',
          type: 'checkbox',
          label: 'formBuilder.fields.termsAndConditions',
          children: 'formBuilder.messages.termsAccept',
          required: true,
        },
      ],
    },
  ],
  onSubmit: async (data) => {
    console.log('Translated form submitted:', data);
  },
};
```
