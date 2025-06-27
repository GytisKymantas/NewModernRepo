import React from 'react';
import { FormBuilder, FormBuilderConfig, commonFieldConfigs } from '../index';

// Custom component for fee calculation display
function FeeCalculationDisplay({ label }: { label: string }) {
  return (
    <div
      style={{
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        margin: '16px 0',
      }}
    >
      <strong>Fee Calculation:</strong>
      <br />
      Base registration fee: €50
      <br />
      Property value fee (0.1%): Calculated automatically
      <br />
      <em>{label}</em>
    </div>
  );
}

// Example 1: Simple Contact Form with Draft
export function SimpleContactFormExample() {
  const config: FormBuilderConfig = {
    id: 'contact-form-example',
    title: 'Contact Information Form',
    description: 'Please provide your contact details. You can save as draft anytime.',
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
            placeholder: 'Enter your first name',
            required: true,
            gridColumn: 6,
          },
          {
            id: 'lastName',
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true,
            gridColumn: 6,
          },
          commonFieldConfigs.email('email'),
          commonFieldConfigs.phone('phone'),
          {
            id: 'company',
            name: 'company',
            type: 'text',
            label: 'Company (Optional)',
            placeholder: 'Enter your company name',
            required: false,
          },
          commonFieldConfigs.address('address'),
          {
            id: 'newsletter',
            name: 'newsletter',
            type: 'checkbox',
            label: 'Newsletter Subscription',
            required: false,
            children: 'I would like to receive newsletters and updates',
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      // eslint-disable-next-line no-console
      console.log('Contact form submitted:', data);
      // Simulate API call
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert('Contact form submitted successfully!');
          resolve();
        }, 1000);
      });
    },
    onSaveDraft: async (data) => {
      // eslint-disable-next-line no-console
      console.log('Contact form draft saved:', data);
      localStorage.setItem('contact-form-draft', JSON.stringify(data));
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          // eslint-disable-next-line no-alert
          alert('Draft saved successfully!');
          resolve();
        }, 500);
      });
    },
    onLoadDraft: async () => {
      const saved = localStorage.getItem('contact-form-draft');
      return saved ? JSON.parse(saved) : null;
    },
  };

  return <FormBuilder config={config} />;
}

// Example 2: Multi-Step Service Request with Draft Auto-Save
export function MultiStepServiceRequestExample() {
  const config: FormBuilderConfig = {
    id: 'service-request-multistep',
    title: 'Service Request Application',
    description:
      'Complete your service request in multiple steps. Progress is automatically saved.',
    multiStep: true,
    steps: [
      {
        id: 'personal-info',
        title: 'Personal Information',
        description: 'Tell us about yourself',
        fields: [
          {
            id: 'personalCode',
            name: 'personalCode',
            type: 'text',
            label: 'Personal Code',
            placeholder: 'Enter 11-digit personal code',
            required: true,
            validation: {
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Personal code must be 11 digits',
              },
            },
          },
          {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true,
          },
          commonFieldConfigs.dateOfBirth('dateOfBirth'),
          commonFieldConfigs.email('email'),
          commonFieldConfigs.phone('phone'),
        ],
      },
      {
        id: 'service-details',
        title: 'Service Selection',
        description: 'Choose the service you need',
        fields: [
          {
            id: 'serviceType',
            name: 'serviceType',
            type: 'select',
            label: 'Service Type',
            required: true,
            options: [
              { value: 'property-registration', label: 'Property Registration' },
              { value: 'document-certification', label: 'Document Certification' },
              { value: 'legal-consultation', label: 'Legal Consultation' },
              { value: 'notary-services', label: 'Notary Services' },
            ],
          },
          {
            id: 'urgency',
            name: 'urgency',
            type: 'radio',
            label: 'Processing Speed',
            required: true,
            options: [
              { value: 'standard', label: 'Standard (5-7 business days) - €25' },
              { value: 'priority', label: 'Priority (2-3 business days) - €50' },
              { value: 'express', label: 'Express (Next business day) - €100' },
            ],
          },
          {
            id: 'numberOfCopies',
            name: 'numberOfCopies',
            type: 'numberStepper',
            label: 'Number of Copies',
            required: false,
            min: 1,
            max: 10,
            displayStepperControls: true,
            defaultValue: 1,
          },
          {
            id: 'additionalNotes',
            name: 'additionalNotes',
            type: 'textarea',
            label: 'Additional Notes',
            placeholder: 'Any additional information or special requests...',
            required: false,
            rows: 4,
          },
        ],
      },
      {
        id: 'documents',
        title: 'Document Upload',
        description: 'Upload required documents',
        fields: [
          {
            id: 'identityDocument',
            name: 'identityDocument',
            type: 'file',
            label: 'Identity Document',
            required: true,
            accept: '.pdf,.jpg,.png',
            maxSize: 5 * 1024 * 1024, // 5MB
          },
          {
            id: 'supportingDocuments',
            name: 'supportingDocuments',
            type: 'file',
            label: 'Supporting Documents',
            required: false,
            multiple: true,
            accept: '.pdf,.doc,.docx,.jpg,.png',
            maxSize: 10 * 1024 * 1024, // 10MB
          },
        ],
      },
      {
        id: 'confirmation',
        title: 'Confirmation',
        description: 'Review and confirm your application',
        fields: [
          {
            id: 'dataProcessingConsent',
            name: 'dataProcessingConsent',
            type: 'checkbox',
            label: 'Data Processing Consent',
            required: true,
            variant: 'flat',
            children:
              'I consent to the processing of my personal data in accordance with the Privacy Policy',
          },
          {
            id: 'termsAccepted',
            name: 'termsAccepted',
            type: 'checkbox',
            label: 'Terms and Conditions',
            required: true,
            variant: 'flat',
            children: React.createElement('span', {}, [
              'I have read and agree to the ',
              React.createElement(
                'a',
                {
                  key: 'terms-link',
                  href: '/terms',
                  target: '_blank',
                  rel: 'noreferrer',
                },
                'Terms and Conditions',
              ),
            ]),
          },
          {
            id: 'marketingConsent',
            name: 'marketingConsent',
            type: 'checkbox',
            label: 'Marketing Communications',
            required: false,
            variant: 'flat',
            children: 'I would like to receive updates about new services and offers',
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Service request submitted:', data);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert(
            'Service request submitted successfully! You will receive a confirmation email shortly.',
          );
          // Clear draft after successful submission
          localStorage.removeItem('service-request-draft');
          resolve();
        }, 2000);
      });
    },
    onStepChange: (stepIndex, data) => {
      console.log(`Moved to step ${stepIndex}:`, data);
      // Auto-save draft when moving between steps
      localStorage.setItem('service-request-draft', JSON.stringify(data));
    },
    onSaveDraft: async (data) => {
      console.log('Service request draft saved:', data);
      localStorage.setItem('service-request-draft', JSON.stringify(data));
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert('Draft saved successfully!');
          resolve();
        }, 500);
      });
    },
    onLoadDraft: async () => {
      const saved = localStorage.getItem('service-request-draft');
      return saved ? JSON.parse(saved) : null;
    },
  };

  return <FormBuilder config={config} />;
}

// Example 3: Conditional Fields Form with Smart Logic
export function ConditionalFieldsExample() {
  const config: FormBuilderConfig = {
    id: 'conditional-form-example',
    title: 'Smart Form with Conditional Logic',
    description:
      'Fields will show and hide based on your selections. Draft is saved automatically.',
    multiStep: false,
    steps: [
      {
        id: 'main-step',
        title: 'Dynamic Form',
        fields: [
          {
            id: 'applicantType',
            name: 'applicantType',
            type: 'radio',
            label: 'I am applying as...',
            required: true,
            options: [
              { value: 'individual', label: 'Individual Person' },
              { value: 'company', label: 'Company Representative' },
              { value: 'organization', label: 'Non-profit Organization' },
            ],
          },
          // Individual fields
          {
            id: 'personalCode',
            name: 'personalCode',
            type: 'text',
            label: 'Personal Code',
            placeholder: 'Enter 11-digit personal code',
            required: true,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'individual',
              },
            },
            validation: {
              pattern: {
                value: /^[0-9]{11}$/,
                message: 'Personal code must be 11 digits',
              },
            },
          },
          {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            placeholder: 'Enter your full name',
            required: true,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'individual',
              },
            },
          },
          // Company fields
          {
            id: 'companyCode',
            name: 'companyCode',
            type: 'text',
            label: 'Company Code',
            placeholder: 'Enter 9-digit company code',
            required: true,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'company',
              },
            },
            validation: {
              pattern: {
                value: /^[0-9]{9}$/,
                message: 'Company code must be 9 digits',
              },
            },
          },
          {
            id: 'companyName',
            name: 'companyName',
            type: 'text',
            label: 'Company Name',
            placeholder: 'Enter company name',
            required: true,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'company',
              },
            },
          },
          // Organization fields
          {
            id: 'organizationName',
            name: 'organizationName',
            type: 'text',
            label: 'Organization Name',
            placeholder: 'Enter organization name',
            required: true,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'organization',
              },
            },
          },
          // Common fields
          commonFieldConfigs.email('email'),
          commonFieldConfigs.phone('phone'),
          // Document upload with conditional requirements
          {
            id: 'hasDocuments',
            name: 'hasDocuments',
            type: 'checkbox',
            label: 'I have supporting documents to upload',
            required: false,
          },
          {
            id: 'documents',
            name: 'documents',
            type: 'file',
            label: 'Upload Supporting Documents',
            required: false,
            multiple: true,
            accept: '.pdf,.doc,.docx,.jpg,.png',
            maxSize: 10 * 1024 * 1024, // 10MB
            conditionalLogic: {
              showWhen: {
                field: 'hasDocuments',
                operator: 'equals',
                value: true,
              },
            },
          },
          // Terms and conditions
          {
            id: 'termsAccepted',
            name: 'termsAccepted',
            type: 'checkbox',
            label: 'Terms and Conditions',
            required: true,
            variant: 'flat',
            children: 'I agree to the terms and conditions',
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Conditional form submitted:', data);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert('Form submitted successfully!');
          localStorage.removeItem('conditional-form-draft');
          resolve();
        }, 1000);
      });
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('conditional-form-draft', JSON.stringify(data));
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert('Draft saved!');
          resolve();
        }, 300);
      });
    },
    onLoadDraft: async () => {
      const saved = localStorage.getItem('conditional-form-draft');
      return saved ? JSON.parse(saved) : null;
    },
  };

  return <FormBuilder config={config} />;
}

// Example 4: Property Registration with Custom Components
export function PropertyRegistrationExample() {
  const config: FormBuilderConfig = {
    id: 'property-registration-example',
    title: 'Property Registration Application',
    description: 'Register your property with automated draft saving',
    multiStep: true,
    steps: [
      {
        id: 'applicant-info',
        title: 'Applicant Information',
        fields: [
          commonFieldConfigs.personalCode('personalCode'),
          {
            id: 'fullName',
            name: 'fullName',
            type: 'text',
            label: 'Full Name',
            required: true,
          },
          commonFieldConfigs.dateOfBirth('dateOfBirth'),
          commonFieldConfigs.email('email'),
          commonFieldConfigs.phone('phone'),
          commonFieldConfigs.address('currentAddress'),
        ],
      },
      {
        id: 'property-details',
        title: 'Property Details',
        fields: [
          {
            id: 'propertyType',
            name: 'propertyType',
            type: 'select',
            label: 'Property Type',
            required: true,
            options: [
              { value: 'apartment', label: 'Apartment' },
              { value: 'house', label: 'House' },
              { value: 'land', label: 'Land Plot' },
              { value: 'commercial', label: 'Commercial Property' },
            ],
          },
          {
            id: 'propertyAddress',
            name: 'propertyAddress',
            type: 'textarea',
            label: 'Property Address',
            required: true,
            rows: 3,
            placeholder: 'Enter complete property address',
          },
          {
            id: 'cadastralNumber',
            name: 'cadastralNumber',
            type: 'text',
            label: 'Cadastral Number',
            required: true,
            placeholder: 'Enter cadastral number',
          },
          {
            id: 'propertyArea',
            name: 'propertyArea',
            type: 'number',
            label: 'Property Area (sq.m)',
            required: true,
            min: 1,
            placeholder: 'Enter area in square meters',
          },
          {
            id: 'purchasePrice',
            name: 'purchasePrice',
            type: 'number',
            label: 'Purchase Price (EUR)',
            required: true,
            min: 0,
            placeholder: 'Enter purchase price',
          },
          {
            id: 'purchaseDate',
            name: 'purchaseDate',
            type: 'date',
            label: 'Purchase Date',
            required: true,
            clearable: true,
          },
        ],
      },
      {
        id: 'fees-confirmation',
        title: 'Fees & Confirmation',
        fields: [
          {
            id: 'feeCalculation',
            name: 'feeCalculation',
            type: 'custom',
            label:
              'Registration fee calculation will be displayed here based on property value',
            component: FeeCalculationDisplay,
          },
          {
            id: 'urgentProcessing',
            name: 'urgentProcessing',
            type: 'checkbox',
            label: 'Urgent Processing (+€100)',
            required: false,
            children: 'I need urgent processing (3 business days instead of 10)',
          },
          {
            id: 'paymentMethod',
            name: 'paymentMethod',
            type: 'radio',
            label: 'Payment Method',
            required: true,
            options: [
              { value: 'bank-transfer', label: 'Bank Transfer' },
              { value: 'card', label: 'Credit/Debit Card' },
              { value: 'cash', label: 'Cash at Office' },
            ],
          },
          {
            id: 'termsAccepted',
            name: 'termsAccepted',
            type: 'checkbox',
            label: 'Terms and Conditions',
            required: true,
            variant: 'flat',
            children: 'I agree to the registration terms and fee structure',
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Property registration submitted:', data);
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert('Property registration application submitted successfully!');
          localStorage.removeItem('property-registration-draft');
          resolve();
        }, 2000);
      });
    },
    onStepChange: (stepIndex, data) => {
      // Auto-save on step change
      localStorage.setItem('property-registration-draft', JSON.stringify(data));
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('property-registration-draft', JSON.stringify(data));
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          alert('Application draft saved successfully!');
          resolve();
        }, 500);
      });
    },
    onLoadDraft: async () => {
      const saved = localStorage.getItem('property-registration-draft');
      return saved ? JSON.parse(saved) : null;
    },
  };

  return <FormBuilder config={config} />;
}
