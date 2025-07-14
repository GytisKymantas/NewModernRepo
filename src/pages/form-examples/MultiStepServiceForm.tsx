import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { commonFieldConfigs } from '@/components/FormBuilder/index';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import ServiceDetails from '@/components/OwnedProperties/ServiceDetails';
import DocumentCollection from '@/components/Signature/components/DocumentCollection';
import UploadFile from '@/components/Signature/components/UploadFile';
import { Box, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import {
  FormTableData,
  PricingTableData,
  ServiceDetail,
  sampleTableData,
} from './MultiStepServiceForm.deps';
// Create commonly used field instances
const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');
const personalCodeField = commonFieldConfigs.personalCode('personalCode');

function CustomField() {
  return <div>Custom Field</div>;
}

// Component definitions moved outside render to fix lint errors
function DocumentTypeField() {
  return (
    <ServiceDetails
      title=''
      isWithoutDivider
      rows={[
        {
          label: 'Dokumento tipas',
          value: 'Sutikimas naudoti prekinį ženklą',
        },
      ]}
    />
  );
}

function PersonalCodeField() {
  return (
    <ServiceDetails
      title=''
      isWithoutDivider
      rows={[
        {
          label: 'Asmens kodas',
          value: '39005201234',
        },
      ]}
    />
  );
}

function NameField() {
  return (
    <ServiceDetails
      title=''
      isWithoutDivider
      rows={[
        {
          label: 'Vardas, Pavardė',
          value: 'Vardenis Pavardenis',
        },
      ]}
    />
  );
}

function FormDateField() {
  return (
    <ServiceDetails
      title=''
      isWithoutDivider
      textSpacing={{ paddingBottom: '48px' }}
      rows={[
        {
          label: 'Prašymo data',
          value: '2024-04-06',
        },
      ]}
    />
  );
}

function MultiStepServiceForm() {
  const localData = localStorage.getItem('serviceRequestDraft');
  const formData = JSON.parse(localData);

  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą',
    description: 'Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą',
    multiStep: true,
    steps: [
      {
        id: 'service-details',
        title: 'Prašymo duomenys',
        description: '',
        subgroups: [
          {
            id: 'request-object',
            title: 'Prašymo objektas',
            variant: 'default',
            fields: [
              {
                id: 'purpose',
                name: 'purpose',
                type: 'multiselect',
                label: 'Juridinio asmens teisinė forma',
                placeholder: 'Pasirinkite teisinę formą',
                required: true,
                defaultValue: '',
                options: [
                  { value: 'tikslas1', label: 'Tikslas 1' },
                  { value: 'tikslas2', label: 'Tikslas 2' },
                  { value: 'tikslas3', label: 'Tikslas 3' },
                ],
              },
              {
                id: 'companyName',
                name: 'companyName',
                type: 'text',
                label: 'Laikinai įrašomas pavadinimas',
                required: true,
                placeholder: 'Įrašykite pavadinimą',
              },
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
                      Reikalavimai pavadinimui
                    </Typography>
                    <ul>
                      <li>
                        pavadinime turi būti teisinę formą nusakantys žodžiai arba jų
                        trumpiniai (pvz., individuali įmonė arba IĮ);
                      </li>
                      <li>simbolinis pavadinimas turi būti išskirtas kabutėmis;</li>
                      <li>
                        pavadinimas neturi būti klaidinantis ar panašus į kitų juridinių
                        asmenų pavadinimus, žinomesnių užsienio įmonių, įstaigų ar
                        organizacijų vardus, prekių ir paslaugų ženklus;
                      </li>
                      <li>
                        filialo pavadinime privalo būti juridinio asmens (steigėjo)
                        pavadinimas ir žodis &bdquo;filialas&ldquo;.
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
                id: 'agreement',
                name: 'agreement',
                type: 'checkbox',
                label: 'Sutikimas naudoti prekinį ženklą',
                required: false,
                variant: 'flat',
                description:
                  'Pažymėkite, jei naudojate prekinio ženklo pavadinimą ar jo dalį',
                children: 'Pridedamas',
              },
            ],
          },
          {
            id: 'bordered-section',
            title: '',
            variant: 'bordered',
            fields: [
              {
                id: 'DocumentTypedOnlyField',
                name: 'DocumentTypedOnlyField',
                type: 'custom',
                label: 'DocumentTypedOnlyField',
                required: false,
                component: DocumentTypeField,
              },
              {
                id: 'termDate',
                name: 'termDate',
                type: 'date',
                label: 'Data',
                required: true,
                clearable: true,
                defaultValue: '',
              },
              {
                id: 'documentNumber',
                name: 'documentNumber',
                type: 'text',
                label: 'Dokumento numeris',
                required: true,
                placeholder: 'Įrašykite dokumento numerį',
              },
              {
                id: 'fileUpload',
                name: 'fileUpload',
                type: 'file',
                label: 'Dokumentas',
                required: true,
                accept: '.doc,.docx,.pdf,.pages',
                maxSize: 5 * 1024 * 1024, // 5MB
                description: 'Maksimalus failo dydis: 5MB',
                slotProps: {
                  // wrapper: {
                  //   labelSubtitle: 'Tinkami formatai: .doc, .xdoc, .pdf, .pages',
                  // },
                },
              },
            ],
          },
          {
            id: 'agreements',
            title: '',
            variant: 'default',
            fields: [
              {
                id: 'radioSelection',
                name: 'radioSelection',
                type: 'radio',
                label: 'Sutikimas naudoti juridinio asmens pavadinimą',
                required: true,
                description:
                  'Pažymėkite, jei naudojate Lietuvos ar užsienio juridinio asmens pavadinimą ar jo dalį',
                options: [
                  { value: 'Nepridedamas', label: 'Nepridedamas' },
                  { value: 'JA', label: 'Pridedamas Lietuvos juridinio asmens' },
                  { value: 'UJA', label: 'Pridedamas užsienio juridinio asmens' },
                ],
                slotProps: {
                  field: {
                    className: 'custom-flex-radio-group',
                  },
                },
              },
            ],
          },
          {
            id: 'applicant-details',
            title: 'Prašymą teikia',
            variant: 'default',
            fields: [
              {
                id: 'personalCodeReadOnlyField',
                name: 'personalCodeReadOnlyField',
                type: 'custom',
                label: 'personalCodeReadOnlyField',
                required: false,
                component: PersonalCodeField,
              },
              {
                id: 'firstLastNameReadOnlyField',
                name: 'firstLastNameReadOnlyField',
                type: 'custom',
                label: 'firstLastNameReadOnlyField',
                required: false,
                component: NameField,
                props: {
                  rows: [
                    {
                      label: 'Vardas, Pavardė',
                      value: 'Vardenis Pavardenis',
                    },
                  ],
                },
              },
              {
                ...phoneField,
                label: 'Telefono nr.',
                required: true,
              },
              {
                ...emailField,
                defaultValue: 'vardenis.pavardenis@gmail.com',
              },

              {
                id: 'formDateReadOnlyField',
                name: 'formDateReadOnlyField',
                type: 'custom',
                label: 'formDateReadOnlyField',
                required: false,
                component: FormDateField,
              },
            ],
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
                  title: 'Prašymo objektas',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Laikinai įrašomas pavadinimas',
                      value: formData?.companyName ?? 'ff',
                    },
                  ],
                },
              },
              {
                id: 'submittedBy',
                name: 'submittedBy',
                type: 'custom',
                label: 'submittedBy',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Prašymą teikia',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Asmens Kodas',
                      value: formData?.personalCode ?? '',
                    },
                    {
                      label: 'Vardas, Pavardė',
                      value: formData?.fullName ?? '',
                    },
                  ],
                },
              },
              {
                id: 'requestStatus',
                name: 'requestStatus',
                type: 'custom',
                label: 'requestStatus',
                required: false,
                component: ServiceDetail,
                props: {
                  sxStyle: { pt: '34.5px' },
                  title: 'Prašymo būsena',
                  withHeading: true,
                  rows: [
                    {
                      label: 'Būsena',
                      value: 'Pildomas',
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
                  sxStyle: { pt: '34.5px' },
                  withHeading: true,
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
                  cols: sampleTableData.cols,
                  rows: sampleTableData.rows,
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
                  widthHeading: true,
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

export default MultiStepServiceForm;
