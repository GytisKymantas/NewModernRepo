import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { commonFieldConfigs } from '@/components/FormBuilder/index';
import NaturalPersonModal from '@/components/FormBuilder/modals/NaturalPersonModal';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import { ServiceDetail } from '../form-examples/MultiStepServiceForm.deps';
import { PricingTableData, TableWithModalData } from './statementForm.deps';

const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');

function NaturalStatementForm() {
  const localData = localStorage.getItem('serviceRequestDraft');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'public-statement-form',
    title: 'Viešas pranešimas',
    description: 'Viešas pranešimas',
    multiStep: true,
    steps: [
      {
        id: 'public-statement-form',
        title: 'Pranešimo duomenys',
        sxStyle: {
          pb: '48px',
        },
        expanded: true,
        subgroups: [
          {
            fields: [
              {
                id: 'legal-entity',
                name: 'legal entity',
                type: 'custom',
                label: 'legal entity',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Bendrovė, išleidusi obligacijas',
                  withHeading: true,
                },
              },
              {
                id: 'publicStatement',
                name: 'publicStatement',
                type: 'custom',
                label: 'publicStatement',
                required: false,
                component: TableWithModalData,
                props: {
                  ModalComponent: NaturalPersonModal,
                },
              },
              {
                id: 'public-announcement',
                name: 'public-announcement',
                type: 'custom',
                label: 'public-announcement',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Viešas pranešimas',
                  withHeading: true,
                  sxStyle: { pt: '48.5px' },
                },
              },
              {
                id: 'Kategorija',
                name: 'Kategorija',
                type: 'select',
                label: 'Kategorija',
                required: true,
                placeholder: 'Pasirinkite pranešimo kategoriją',
                defaultValue: '',
                options: [
                  { value: 'tikslas1', label: 'Tikslas 1' },
                  { value: 'tikslas2', label: 'Tikslas 2' },
                  { value: 'tikslas3', label: 'Tikslas 3' },
                ],
              },
              {
                id: 'Tekstas',
                name: 'Tekstas',
                type: 'textarea',
                label: 'Tekstas',
                placeholder: 'Įveskite viešąjį pranešimą',
                required: true,
                // sxStyle: { }
              },
              {
                id: 'submittedBy',
                name: 'submittedBy',
                type: 'custom',
                label: 'submittedBy',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Prašymą teikia',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Asmens Kodas',
                      value: 303180528,
                    },
                    {
                      label: 'Vardas, Pavardė',
                      value: 'Vardenis Pavardenis',
                    },
                  ],
                },
              },
              {
                ...phoneField,
                required: true,
                label: 'Telefono nr.',
              },
              {
                ...emailField,
                required: true,
                label: 'El. paštas',
              },
            ],

            id: '',
          },
        ],
      },
      {
        id: 'request_view',
        title: 'Pranešimo užsakymas',
        expanded: true,
        sxStyle: {
          pb: '48px',
        },
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
                id: 'publicRequestObject',
                name: 'publicRequestObject',
                type: 'custom',
                label: 'publicRequestObject',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Viešą pranešimą teikiantis juridinis asmuo',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Pavadinimas',
                      value: 'UAB Pavadinimas',
                    },
                    {
                      label: 'Juridinio asmens kodas',
                      value: '303180528',
                    },
                    {
                      label: 'Buveinės adresas',
                      value: 'Pakruojis, Saulėtekio g. 1, LT-83140',
                    },
                  ],
                },
              },
              {
                id: 'publicStatementUser',
                name: 'publicStatementUser',
                type: 'custom',
                label: 'Viešą pranešimą pateikė',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Viešą pranešimą pateikė',
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
                id: 'requestUser',
                name: 'requestUser',
                type: 'custom',
                label: 'Viešas pranešimas',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Viešas pranešimas',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Kategorija',
                      value: formData?.companyName ?? '39005201234',
                    },
                    {
                      label: 'Tekstas',
                      value: formData?.companyName ?? 'Vardenis Pavardenis',
                    },
                  ],
                },
              },
              {
                id: 'servicePrice',
                name: 'servicePrice',
                type: 'custom',
                label: 'servicePrice',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Paslaugos Kaina',
                  withHeading: true,
                },
              },
              {
                id: 'pricingTableData',
                name: 'pricingTableData',
                type: 'custom',
                label: 'pricingTableData',
                component: PricingTableData,
                props: {
                  document: 'Viešo pranešimo publikavimo prašymas (Prašymas nr. 7107622)',
                  price: '7,83 Eur',
                },
              },
            ],
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      // console.log('Service request submitted:', data);
      localStorage.setItem('submittedData', JSON.stringify(data));
      // alert('Service request submitted successfully!');
    },
    onInvalidSubmit: async () =>
      // errors, data
      {
        // console.log(data, 'data submitted');
        // console.log('Invalid submit:', errors);
      },
    onSaveDraft: async (data) => {
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
      // console.log('Draft saved:', data);
    },
    onStepChange: (
      // step,
      data,
    ) => {
      // console.log(`Moved to step ${step}:`, data);
      // Auto-save on step change
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
    },
    onDiscard: async () => {
      localStorage.removeItem('serviceRequestDraft');
      // console.log('Draft discarded');
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('serviceRequestDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return <FormBuilder config={config} />;
}

export default NaturalStatementForm;
