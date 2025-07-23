import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { FormBuilderConfig } from '@/components/FormBuilder/types';

import { Box, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { ServiceDetail } from '../form-examples/MultiStepServiceForm.deps';
import PricingTableData from './OrderForm.deps';

function OrderForm() {
  const localData = localStorage.getItem('serviceRequestDraft');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'esi-order-form',
    title: 'Elektroninio sertifikuoto išrašo išdavimas',
    description: 'Elektroninio sertifikuoto išrašo išdavimas',
    multiStep: false,
    headerDescription:
      'Prieigos raktas prie elektroninio sertifikuoto išrašo išduodamas tik konkrečiam juridiniam asmeniui, filialui ar atstovybei ir išsiunčiama elektroniniu būdu Registro tvarkytojui pateiktais juridinio asmens, filialo ar atstovybės kontaktais: elektroninio pašto adresu ir trumpąja žinute į mobilųjį telefoną.',
    steps: [
      {
        id: 'service-details',
        title: 'Išrašo užsakymas',
        description: '',
        subgroups: [
          {
            id: 'request-object',
            variant: 'default',
            fields: [
              {
                id: 'infoAlert',
                name: 'infoAlert',
                type: 'alert',
                label: 'infoAlert',
                message: (
                  <Box>
                    <Typography
                      sx={{ fontWeight: '600', paddingTop: { xs: '4px', md: '0' } }}
                    >
                      Prašome patikrinti juridinio asmens kontaktinius duomenis
                    </Typography>
                    <ul>
                      <li>
                        Jei nurodyti kontaktiniai duomenys yra netikslūs, prieš teikdami
                        prašymą dėl ESI išdavimo šiuos duomenis nurodykite prašyme keisti
                        juridinio asmens duomenis ir dokumentus (forma JAR-1-E) bei
                        pateikite Registro tvarkytojui elektroniniu būdu per RC savitarnos
                        sistemą.
                      </li>
                      <li>
                        Kontaktinius duomenis taip pat galite pateikti užpildydami
                        rašytinę Kontaktinių duomenų formą (KD-1){' '}
                      </li>
                      <li>
                        Registro tvarkytojui įrašius pakeistus kontaktinius duomenis į
                        Juridinių asmenų registrą, galėsite pateikti prašymą išduoti ESI.
                      </li>
                    </ul>
                  </Box>
                ),
                severity: 'info',
                icon: (
                  <Box sx={{ marginBottom: 'auto' }}>
                    <InfoIcon />
                  </Box>
                ),
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
                    {
                      label: 'Buveinės adresas',
                      value: formData?.address ?? '+370 654-23-123',
                    },
                  ],
                },
              },
              {
                id: 'conditions',
                name: 'conditions',
                type: 'custom',
                label: 'conditions',
                required: false,
                component: ServiceDetail,
                props: {
                  title: 'Sąlygos',
                  withHeading: true,
                  sxStyle: {
                    paddingTop: '48px',
                  },
                },
              },
              {
                id: 'checkAlert',
                name: 'checkAlert',
                type: 'alert',
                label: 'checkAlert',
                message: (
                  <Box>
                    <ul>TBA</ul>
                  </Box>
                ),
                severity: 'info',
                icon: (
                  <Box sx={{ marginBottom: 'auto' }}>
                    <InfoIcon />
                  </Box>
                ),
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
                  widthHeading: true,
                  sxStyle: { pt: '48px' },
                },
              },
              {
                id: 'pricingTableData',
                name: 'pricingTableData',
                type: 'custom',
                label: 'pricingTableData',
                component: PricingTableData,
                props: {
                  sxStyle: { pb: '34.5px' },
                  document: 'ESI išdavimas (per 3 darbo dienas)',
                  price: '1,92 Eur',
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

export default OrderForm;
