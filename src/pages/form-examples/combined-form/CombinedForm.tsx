import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { commonFieldConfigs } from '@/components/FormBuilder/index';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import DocumentCollection from '@/components/Signature/components/DocumentCollection';
import UploadFile from '@/components/Signature/components/UploadFile';
import {
  FormTableData,
  PricingTableData,
  ServiceDetail,
} from '../MultiStepServiceForm.deps';
import CombinedFormTableData from './CombinedForm.deps';

const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');
const searchField = commonFieldConfigs.search('search');

function CombinedForm() {
  const localData = localStorage.getItem('serviceRequestDraft');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Service Application Request',
    description: 'Complete this multi-step form to submit your service application',
    multiStep: true,
    steps: [
      {
        id: 'combined-form',
        title: 'Prašymo Duomenys',
        subgroups: [
          {
            fields: [
              {
                id: 'userFullName',
                name: 'userFullName',
                type: 'custom',
                label: 'userFullName',
                required: false,
                component: ServiceDetail,
                props: {
                  rows: [
                    {
                      label: 'Teikėjo vardas, pavardė',
                      value: formData.companyName,
                    },
                    {
                      label: 'Teikėjo asmens kodas',
                      value: formData.personalCode,
                    },
                  ],
                },
              },
              {
                ...searchField,
                id: 'SearchableField',
                required: false,
                type: 'search',
                props: {
                  withTriggerText: true,
                },
              },
              {
                ...phoneField,
                required: true,
                label: 'Kontaktinis telefonas',
              },
              {
                ...emailField,
                required: true,
                label: 'El. paštas',
              },
              {
                id: 'requestDate',
                name: 'requestDate',
                type: 'custom',
                label: 'requestDate',
                required: false,
                component: ServiceDetail,
                props: {
                  rows: [
                    {
                      label: 'Prašymo data',
                      value: '2099-01-01',
                    },
                  ],
                  textSpacing: {
                    pb: '48px',
                  },
                },
              },
            ],
            id: '',
          },
        ],
      },
      {
        id: 'documents',
        title: 'Dokumentų pasirašymas',
        fields: [
          {
            id: 'infoAlert',
            name: 'infoAlert',
            type: 'alert',
            label: 'infoAlert',
            message: <div>Visi dokumentai yra pasirašomi eilės tvarka.</div>,
            severity: 'info',
            icon: <InfoIcon />,
          },
          {
            id: 'DocumentSection',
            name: 'DocumentSection',
            type: 'custom',
            label: 'DocumentSection',
            required: false,
            placeholder: '',
            component: DocumentCollection,
          },
          {
            id: 'uploadFile',
            name: 'uploadFile',
            type: 'custom',
            label: 'uploadFile',
            required: false,
            placeholder: '',
            component: UploadFile,
          },
        ],
      },
      {
        id: 'request_view',
        title: 'Prašymo pateikimas',
        subgroups: [
          {
            id: 'request-object',
            variant: 'default',
            fields: [
              {
                id: 'requestObject',
                name: 'requestObject',
                type: 'custom',
                label: 'requestObject',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Prašymo informacija',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Prašymo numeris',
                      value: formData.companyName,
                    },
                    {
                      label: 'Prašymo būsena',
                      value: formData.companyName,
                    },
                  ],
                },
              },
              {
                id: 'requestObject',
                name: 'requestObject',
                type: 'custom',
                label: 'requestObject',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Prašymo objektas',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Jungtinė pažyma',
                      value: formData.companyName,
                    },
                  ],
                },
              },
              {
                id: 'requestUser',
                name: 'requestUser',
                type: 'custom',
                label: 'requestUser',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Prašymą teikia',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Asmens kodas',
                      value: formData.companyName,
                    },
                    {
                      label: 'Vardas, Pavardė',
                      value: formData.companyName,
                    },
                  ],
                },
              },
              {
                id: 'documents',
                name: 'documents',
                type: 'custom',
                label: 'Custom Field',
                required: false,
                component: ServiceDetail,
                props: {
                  withHeading: true,
                  sxStyle: { pt: '34.5px' },
                  title: 'Teikiami Dokumentai',
                },
              },
              {
                id: 'tableData',
                name: 'tableData',
                type: 'custom',
                label: 'tableData',
                component: FormTableData,
                props: {
                  sxStyle: { borderCollapse: 'collapse' },
                  title: 'Teikiami Dokumentai',
                  cols: CombinedFormTableData.cols,
                  rows: CombinedFormTableData.rows,
                },
              },
              {
                id: 'servicePrice',
                name: 'servicePrice',
                type: 'custom',
                label: 'servicePrice',
                component: ServiceDetail,
                props: {
                  withHeading: true,
                  title: 'Paslaugos kaina',
                },
              },
              {
                id: 'pricingTableData',
                name: 'pricingTableData',
                type: 'custom',
                label: 'pricingTableData',
                component: PricingTableData,
              },
            ],
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Service request submitted:', data);
      alert('Service request submitted successfully!');
    },
    onInvalidSubmit: async (errors, data) => {
      console.log('Invalid submit:', errors);
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
    onDiscard: async () => {
      localStorage.removeItem('serviceRequestDraft');
      console.log('Draft discarded');
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('serviceRequestDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return <FormBuilder config={config} />;
}

export default CombinedForm;
