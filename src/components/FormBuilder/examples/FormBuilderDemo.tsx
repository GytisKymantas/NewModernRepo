/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { Box, Card, CardContent, Chip, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

import FormBuilder from '../FormBuilder';
import { commonFieldConfigs } from '../index';
import { FormBuilderConfig } from '../types';

// Create commonly used field instances
const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');
const personalCodeField = commonFieldConfigs.personalCode('personalCode');
const termsField = commonFieldConfigs.termsAndConditions('terms');
const dateOfBirthField = commonFieldConfigs.dateOfBirth('dateOfBirth');
const documentUploadField = commonFieldConfigs.documentUpload('documents');

// Custom component for fee display - defined outside of render
function FeeDisplayComponent() {
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 1,
        bgcolor: '#f5f5f5',
      }}
    >
      <Typography variant='h6'>Registration Fee</Typography>
      <Typography variant='h4' color='primary'>
        €150.00
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        This fee includes all processing and administrative costs.
      </Typography>
    </Box>
  );
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role='tabpanel' hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function SimpleContactFormExample() {
  const config: FormBuilderConfig = {
    id: 'contact-form',
    title: 'Contact Information Form',
    description: 'Please provide your contact details',
    multiStep: false,
    steps: [
      {
        id: 'contact',
        title: 'Contact Details',
        fields: [
          { ...emailField, gridColumn: 6 },
          { ...phoneField, gridColumn: 6 },
          personalCodeField,
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      alert('Form submitted successfully!');
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('contactFormDraft', JSON.stringify(data));
      console.log('Draft saved:', data);
      alert('Draft saved!');
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('contactFormDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return <FormBuilder config={config} />;
}

function MultiStepServiceRequestExample() {
  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Service Application Request',
    description: 'Complete this multi-step form to submit your service application',
    multiStep: true,
    steps: [
      {
        id: 'personal',
        title: 'Personal Information',
        description: 'Please provide your personal details',
        fields: [
          {
            id: 'firstName',
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
            gridColumn: 6,
          },
          {
            id: 'lastName',
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            required: true,
            gridColumn: 6,
          },
          personalCodeField,
          dateOfBirthField,
        ],
      },
      {
        id: 'contact',
        title: 'Contact Information',
        description: 'How can we reach you?',
        fields: [
          { ...emailField, gridColumn: 6 },
          { ...phoneField, gridColumn: 6 },
          {
            id: 'address',
            name: 'address',
            type: 'textarea',
            label: 'Address',
            required: true,
            placeholder: 'Enter your full address',
          },
        ],
      },
      {
        id: 'service',
        title: 'Service Details',
        description: 'What service are you requesting?',
        fields: [
          {
            id: 'serviceType',
            name: 'serviceType',
            type: 'select',
            label: 'Service Type',
            required: true,
            options: [
              { value: 'consultation', label: 'Consultation' },
              { value: 'application', label: 'Application' },
              { value: 'renewal', label: 'Renewal' },
            ],
            gridColumn: 6,
          },
          {
            id: 'priority',
            name: 'priority',
            type: 'radio',
            label: 'Priority Level',
            required: true,
            options: [
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ],
            gridColumn: 6,
          },
          {
            id: 'description',
            name: 'description',
            type: 'textarea',
            label: 'Description',
            required: true,
            placeholder: 'Describe your request in detail',
          },
        ],
      },
      {
        id: 'documents',
        title: 'Document Upload',
        description: 'Please upload any required documents',
        fields: [documentUploadField, termsField],
      },
    ],
    onSubmit: async (data) => {
      console.log('Service request submitted:', data);
      alert('Service request submitted successfully!');
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
      console.log('Draft saved:', data);
    },
    onStepChange: (step, data) => {
      console.log(`Moved to step ${step}:`, data);
      // Auto-save on step change
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('serviceRequestDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return <FormBuilder config={config} />;
}

function ConditionalFieldsExample() {
  const config: FormBuilderConfig = {
    id: 'conditional-form',
    title: 'Application Form with Conditional Fields',
    description: 'Fields will appear based on your selections',
    multiStep: false,
    steps: [
      {
        id: 'application',
        title: 'Application Details',
        fields: [
          {
            id: 'applicantType',
            name: 'applicantType',
            type: 'select',
            label: 'Applicant Type',
            required: true,
            options: [
              { value: 'individual', label: 'Individual' },
              { value: 'company', label: 'Company' },
              { value: 'organization', label: 'Organization' },
            ],
            gridColumn: 6,
          },
          // Individual fields
          {
            id: 'firstName',
            name: 'firstName',
            type: 'text',
            label: 'First Name',
            required: true,
            gridColumn: 6,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'individual',
              },
            },
          },
          {
            id: 'lastName',
            name: 'lastName',
            type: 'text',
            label: 'Last Name',
            required: true,
            gridColumn: 6,
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
            id: 'companyName',
            name: 'companyName',
            type: 'text',
            label: 'Company Name',
            required: true,
            gridColumn: 8,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'company',
              },
            },
          },
          {
            id: 'registrationNumber',
            name: 'registrationNumber',
            type: 'text',
            label: 'Registration Number',
            required: true,
            gridColumn: 4,
            conditionalLogic: {
              showWhen: {
                field: 'applicantType',
                operator: 'equals',
                value: 'company',
              },
            },
          },
          // Organization field
          {
            id: 'organizationName',
            name: 'organizationName',
            type: 'text',
            label: 'Organization Name',
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
          { ...emailField, gridColumn: 6 },
          { ...phoneField, gridColumn: 6 },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Conditional form submitted:', data);
      alert('Form submitted successfully!');
    },
  };

  return <FormBuilder config={config} />;
}

function PropertyRegistrationExample() {
  const config: FormBuilderConfig = {
    id: 'property-registration-form',
    title: 'Property Registration Form',
    description: 'Register your property with our comprehensive form',
    multiStep: true,
    steps: [
      {
        id: 'property',
        title: 'Property Information',
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
              { value: 'commercial', label: 'Commercial' },
            ],
            gridColumn: 6,
          },
          {
            id: 'propertySize',
            name: 'propertySize',
            type: 'number',
            label: 'Property Size (sq m)',
            required: true,
            gridColumn: 6,
          },
          {
            id: 'propertyAddress',
            name: 'propertyAddress',
            type: 'textarea',
            label: 'Property Address',
            required: true,
            placeholder: 'Enter the full property address',
          },
        ],
      },
      {
        id: 'owner',
        title: 'Owner Information',
        fields: [
          personalCodeField,
          { ...emailField, gridColumn: 6 },
          { ...phoneField, gridColumn: 6 },
        ],
      },
      {
        id: 'payment',
        title: 'Payment & Finalization',
        fields: [
          {
            id: 'customFeeDisplay',
            name: 'customFeeDisplay',
            type: 'custom',
            label: 'Registration Fee',
            component: FeeDisplayComponent,
          },
          {
            id: 'paymentMethod',
            name: 'paymentMethod',
            type: 'radio',
            label: 'Payment Method',
            required: true,
            options: [
              { value: 'bank_transfer', label: 'Bank Transfer' },
              { value: 'credit_card', label: 'Credit Card' },
              { value: 'cash', label: 'Cash Payment' },
            ],
          },
          documentUploadField,
          termsField,
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Property registration submitted:', data);
      alert('Property registration completed successfully!');
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('propertyRegDraft', JSON.stringify(data));
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('propertyRegDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return <FormBuilder config={config} />;
}

function FormBuilderDemo() {
  const [activeTab, setActiveTab] = useState(0);

  const examples = [
    {
      label: 'Simple Contact',
      component: <SimpleContactFormExample />,
      description: 'A basic single-step form with draft functionality',
      features: ['Single step', 'Draft saving', 'Basic validation'],
    },
    {
      label: 'Multi-Step Service',
      component: <MultiStepServiceRequestExample />,
      description: 'A comprehensive multi-step service application',
      features: ['Multi-step navigation', 'Auto-save on step change', 'File uploads'],
    },
    {
      label: 'Conditional Fields',
      component: <ConditionalFieldsExample />,
      description: 'Dynamic form with fields that appear based on selections',
      features: ['Conditional logic', 'Dynamic field visibility', 'Smart validation'],
    },
    {
      label: 'Property Registration',
      component: <PropertyRegistrationExample />,
      description: 'Real-world property registration with custom components',
      features: ['Custom components', 'Complex workflow', 'Payment integration'],
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Form Builder Examples
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Explore different form configurations and see how the Form Builder handles
          various scenarios. Each example demonstrates different features and
          capabilities.
        </Typography>

        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          {examples.map((example, index) => (
            <Tab key={index} label={example.label} />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ mb: 4 }}>
        <Card variant='outlined' sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant='h6' gutterBottom>
              {examples[activeTab].label}
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
              {examples[activeTab].description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {examples[activeTab].features.map((feature) => (
                <Chip key={feature} label={feature} size='small' variant='outlined' />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Form Example */}
        {examples[activeTab].component}
      </Box>
    </Box>
  );
}

export default FormBuilderDemo;
