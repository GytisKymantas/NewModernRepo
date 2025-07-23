import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import toast, { Toaster } from 'react-hot-toast';
import { ServiceDetail } from '../form-examples/MultiStepServiceForm.deps';

function OrderReviewForm() {
  const localData = localStorage.getItem('serviceRequestDraft');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'esi-order-form',
    title: 'Elektroninio sertifikuoto išrašo išdavimas',
    description: 'Elektroninio sertifikuoto išrašo užsakymo peržiūra',
    multiStep: false,
    steps: [
      {
        id: 'order-review',
        title: 'Užsakymo Peržiūra',
        subgroups: [
          {
            id: 'request-object',
            variant: 'default',
            fields: [
              {
                id: 'orderInformation',
                name: 'orderInformation',
                type: 'custom',
                label: 'orderInformation',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Užsakymo Informacija',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Užsakymo numeris',
                      value: formData?.orderNumber ?? '7107622',
                    },
                    {
                      label: 'Prašymo būsena',
                      value: formData?.requestStatus ?? 'Vykdomas',
                    },
                    {
                      label: 'Užsakymo įvykdymo trukmė',
                      value: formData?.requestLength ?? '3 darbo dienos',
                    },
                    {
                      label: 'Numatyta atlikimo data',
                      value: formData?.dueDate ?? '2025-07-04 09:31',
                    },
                  ],
                },
              },
              {
                id: 'legalPerson',
                name: 'legalPerson',
                type: 'custom',
                label: 'legalPerson',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Juridinis asmuo',
                  withHeading: true,
                  sxStyle: {
                    paddingTop: '48px',
                  },
                  rows: [
                    {
                      label: 'Pavadinimas',
                      value: formData?.legalPerson ?? 'UAB Pavadinimas',
                    },
                    {
                      label: 'Juridinio asmens kodas',
                      value: formData?.legalPersonalCode ?? '303180528',
                    },
                    {
                      label: 'Buveinės adresas',
                      value: formData?.address ?? 'Pakruojis, Saulėtekio g. 1, LT-83410',
                    },
                  ],
                },
              },
              {
                id: 'contactInfo',
                name: 'contactInfo',
                type: 'custom',
                label: 'contactInfo',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Kontaktinė informacija',
                  withHeading: true,
                  sxStyle: {
                    paddingTop: '48px',
                  },
                  rows: [
                    {
                      label: 'El. paštas',
                      value: formData?.email ?? 'vardenis.pavardenis@gmail.com',
                    },
                    {
                      label: 'Telefono nr.',
                      value: formData?.legalPersonalCode ?? '303180528',
                    },
                  ],
                  textSpacing: {
                    pb: '48px',
                  },
                },
              },
            ],
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Service request submitted:', data);

      toast.success('Dokumentas sėkmingai pasirašytas.', {
        style: {
          border: '1px solid #008561',
          background: '#008561',
          padding: '16px',
          color: 'white',
          width: '350px',
          whiteSpace: 'nowrap',
        },
        iconTheme: {
          primary: 'white',
          secondary: '#008561',
        },
      });
    },
    onInvalidSubmit: async (errors, data) => {
      console.log('Invalid submit:', errors, data);
      toast.error('Yra Klaidų.');
    },
    onSaveDraft: async (data) => {
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
      console.log('Draft saved:', data);
      toast.success('Draft saved successfully!');
    },
    onStepChange: (step, data) => {
      console.log(`Moved to step ${step}:`, data);
      // Auto-save on step change
      localStorage.setItem('serviceRequestDraft', JSON.stringify(data));
    },
    onDiscard: async () => {
      localStorage.removeItem('serviceRequestDraft');
      console.log('Draft discarded');
      toast.error('Draft discarded.');
    },
    onLoadDraft: async () => {
      const draft = localStorage.getItem('serviceRequestDraft');
      return draft ? JSON.parse(draft) : null;
    },
  };

  return (
    <>
      <Toaster />
      <FormBuilder config={config} />;
    </>
  );
}

export default OrderReviewForm;
