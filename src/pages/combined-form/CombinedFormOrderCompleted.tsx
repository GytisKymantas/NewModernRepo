import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import toast from 'react-hot-toast';
import {
  CombinedFormTableData,
  CompletedTableTada,
  FormTableData,
  ServiceDetail,
} from './CombinedForm.deps';

function CombinedFormOrderCompleted() {
  const localData = localStorage.getItem('combinedFormData');
  const formData = JSON.parse(localData);

  const stepperData = localStorage.getItem('serviceRequestDraft');
  const localStepperData = JSON.parse(stepperData);

  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Prašymas išduoti jungtinę pažymą',
    description: 'Prašymas išduoti jungtinę pažymą',
    multiStep: false,
    steps: [
      {
        id: 'request_view',
        title: 'Prašymo peržiūra',
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
                      value: 'Įvykdytas',
                    },
                    {
                      label: 'Prašymo data',
                      value: '2024-04-06',
                    },
                    {
                      label: 'Prašymą vykdo',
                      value: 'Kauno regionas',
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
                  ],
                },
              },
              {
                id: 'representedLegalEntity',
                name: 'representedLegalEntity',
                type: 'custom',
                label: 'representedLegalEntity',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '48px' },
                  title: 'Atstovaujamas juridinis asmuo',
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
                      value: 'Vardenis Pavardenis',
                    },
                    {
                      label: 'Asmens kodas',
                      value: '39005201234',
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
                  title: 'Gauti rezultatai',
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
                  title: 'Pateikti dokumentai',
                  hasAdditionalRowActions: true,
                  cols: CombinedFormTableData.cols,
                  rows: CombinedFormTableData.rows,
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
                  title: 'Pateikti dokumentai',
                },
              },
              {
                id: 'tableData',
                name: 'tableData',
                type: 'custom',
                label: 'tableData',
                component: FormTableData,
                props: {
                  sxStyle: { borderCollapse: 'collapse', mb: '48px' },
                  title: 'Pateikti dokumentai',
                  hasAdditionalRowActions: true,
                  cols: CombinedFormTableData.cols,
                  rows: CombinedFormTableData.rows,
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
                  title: 'Atidėjimo istorija',
                },
              },
              {
                id: 'tableData',
                name: 'tableData',
                type: 'custom',
                label: 'tableData',
                component: FormTableData,
                props: {
                  sxStyle: { borderCollapse: 'collapse', mb: '48px' },
                  title: 'Pateikti dokumentai',
                  hasAdditionalRowActions: true,
                  cols: CompletedTableTada.cols,
                  rows: CompletedTableTada.rows,
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

export default CombinedFormOrderCompleted;
