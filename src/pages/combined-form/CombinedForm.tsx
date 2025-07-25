import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { commonFieldConfigs } from '@/components/FormBuilder/index';
import ObjectSearchModal from '@/components/FormBuilder/modals/ObjectSearchModal';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import DocumentCollection from '@/components/Signature/components/DocumentCollection';
import UploadFile from '@/components/Signature/components/UploadFile';
import palette from '@/theme/palette';
import toast from 'react-hot-toast';
import {
  CombinedFormTableData,
  FormTableData,
  PricingTableData,
  SearchableModalInput,
  ServiceDetail,
} from './CombinedForm.deps';

const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');

function CombinedForm() {
  const localData = localStorage.getItem('combinedFormData');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Prašymas išduoti jungtinę pažymą',
    description: 'Prašymas išduoti jungtinę pažymą',
    multiStep: true,
    steps: [
      {
        id: 'combined-form',
        title: 'Prašymo duomenys',
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
                      value: formData?.companyName ?? 'Vardenis Pavardenis',
                    },
                    {
                      label: 'Teikėjo asmens kodas',
                      value: formData?.personalCode ?? '39005201234',
                    },
                  ],
                },
              },
              {
                id: 'address',
                name: 'address',
                type: 'custom',
                label: 'Teikėjo adresas',
                required: false,
                component: SearchableModalInput,
                props: {
                  placeholderText:
                    'Vilniaus r. sav., Marijampolio sen., Rakonių k., Eugenijušo Venckovičiaus g. 35',
                  withTriggerText: true,
                  ModalComponent: ObjectSearchModal,
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
                id: 'requestInformation',
                name: 'requestInformation',
                type: 'custom',
                label: 'requestInformation',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Prašymo informacija',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Prašymo numeris',
                      value: formData?.companyName ?? '7107622',
                    },
                    {
                      label: 'Prašymo būsena',
                      value: formData?.companyName ?? 'Laukiama apmokėjimo',
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
                  sxStyle: { pt: '48px' },
                  title: 'Prašymo objektas',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Jungtinė pažyma',
                      value:
                        formData?.companyName ??
                        'Apie fizinį asmenį, dalyvaujantį viešųjų pirkimų procedūroje',
                    },
                    {
                      label: 'Pristatymo būdas',
                      value: 'Registrų centro savitarna',
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
                  sxStyle: { pt: '48px' },
                  title: 'Prašymą teikia',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Vardas, pavardė',
                      value: formData?.companyName ?? 'Vardenis Pavardenis',
                    },
                    {
                      label: 'Asmens kodas',
                      value: formData?.companyName ?? '39005201234',
                    },
                    {
                      label: 'Telefono nr.',
                      value: '+370 654-23-123',
                    },
                    {
                      label: 'El. paštas',
                      value: 'vardenis.pavardenis@gmail.com',
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
                  sxStyle: { pt: '48px' },
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
                  sxStyle: { borderCollapse: 'collapse', pb: '0' },
                  title: 'Teikiami Dokumentai',
                  hasAdditionalRowActions: true,
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
                  sxStyle: { pt: '48px' },
                  title: 'Paslaugos kaina',
                },
              },
              {
                id: 'infoAlert',
                name: 'infoAlert',
                type: 'alert',
                label: 'infoAlert',
                message: (
                  <div style={{ color: palette.grey[900] }}>
                    Įvykdžius užsakymą, pažyma bus pateikta Registrų centro savitarnos
                    portale.
                  </div>
                ),
                severity: 'info',
                icon: <InfoIcon />,
              },
              {
                id: 'pricingTableData',
                name: 'pricingTableData',
                type: 'custom',
                label: 'pricingTableData',
                component: PricingTableData,
                props: {
                  sxStyle: { mb: '36px' },
                  document: 'Prašymas išduoti jungtinę pažymą (Prašymas nr. 7107622)',
                  price: '12,42 Eur',
                },
              },
            ],
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      localStorage.setItem('combinedFormData', JSON.stringify(data));
      console.log(data);
      toast.success('Dokumentas sėkmingai pasirašytas', {
        style: {
          border: '1px solid #008561',
          background: '#008561',
          padding: '16px',
          color: 'white',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#FFFAEE',
        },
      });
    },
    onInvalidSubmit: async (errors, data) => {
      console.log('Invalid submit:', errors);
      toast.error('Yra Klaidų.');
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
