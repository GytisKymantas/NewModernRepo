import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import PersonModal from '@/components/FormBuilder/modals/PersonModal';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import DocumentCollection from '@/components/Signature/components/DocumentCollection';
import UploadFile from '@/components/Signature/components/UploadFile';
import toast from 'react-hot-toast';
import {
  CombinedFormTableData,
  FormTableData,
  PricingTableData,
  SearchableModalInput,
  ServiceDetail,
} from './CombinedForm.deps';

function CombinedFormAccountant() {
  const localData = localStorage.getItem('combinedFormData');
  const formData = JSON.parse(localData);

  const stepperData = localStorage.getItem('serviceRequestDraft');
  const localStepperData = JSON.parse(stepperData);

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
                id: 'radioSelection',
                name: 'radioSelection',
                type: 'radio',
                label: 'Jungtinė pažyma',
                required: true,
                options: [
                  {
                    value:
                      'Apie viešųjų pirkimų procedūroje dalyvaujantį tiekėją - juridinį asmenį ir jo vadovą',
                    label:
                      'Apie viešųjų pirkimų procedūroje dalyvaujantį tiekėją - juridinį asmenį ir jo vadovą',
                  },
                  {
                    value:
                      'Apie viešųjų pirkimų procedūroje dalyvaujantį tiekėją - juridinį asmenį, jo vadovą ir buhalterį',
                    label:
                      'Apie viešųjų pirkimų procedūroje dalyvaujantį tiekėją - juridinį asmenį, jo vadovą ir buhalterį',
                  },
                ],
                slotProps: {
                  field: {
                    className: 'custom-flex-radio-group',
                  },
                },
              },
              {
                id: 'userName',
                name: 'userName',
                type: 'custom',
                label: 'userName',
                required: false,
                component: ServiceDetail,
                props: {
                  rows: [
                    {
                      label: 'Teikėjo pavadinimas',
                      value: formData?.name ?? 'UAB Pavadinimas',
                    },
                    {
                      label: 'Teikėjo kodas',
                      value: formData?.name ?? '303180528',
                    },
                    {
                      label: 'Kontaktinis telefonas',
                      value: formData?.name ?? '+370 654-23-123',
                    },
                    {
                      label: 'El. paštas',
                      value: formData?.name ?? 'vardenis.pavardenis@gmail.com',
                    },
                  ],
                },
              },
              {
                id: 'accountant',
                name: 'accountant',
                type: 'custom',
                label: 'accountant',
                component: ServiceDetail,
                props: {
                  rows: [
                    {
                      label: 'Teikėjo pavadinimas',
                      value: formData?.name ?? 'UAB Pavadinimas',
                    },
                  ],
                },
              },
              {
                id: 'accountantField',
                name: 'accountantField',
                type: 'custom',
                label: 'Buhalteris',
                shouldRenderConditionally: {
                  shouldRender: true,
                  checkValue:
                    'Apie viešųjų pirkimų procedūroje dalyvaujantį tiekėją - juridinį asmenį, jo vadovą ir buhalterį',
                  targetField: 'radioSelection',
                },
                required: false,
                component: SearchableModalInput,
                props: {
                  placeholderText: 'Pridėti asmenį',
                  ModalComponent: PersonModal,
                },
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
                    {
                      label: 'Prašymą vykdo',
                      value: 'Kauno regionas',
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
                    {
                      label: 'Prašymą vykdo',
                      value: formData?.companyName ?? 'Kauno regionas',
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
                        localStepperData?.radioSelection ??
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
                      label: 'Asmens kodas',
                      value: formData?.companyName ?? '39005201234',
                    },
                    {
                      label: 'Vardas, Pavardė',
                      value: formData?.companyName ?? 'Vardenis Pavardenis',
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
                id: 'pricingTableData',
                name: 'pricingTableData',
                type: 'custom',
                label: 'pricingTableData',
                component: PricingTableData,
                props: {
                  sxStyle: { pb: '48px' },
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

export default CombinedFormAccountant;
