import InfoIcon from '@/assets/icons/InfoIcon';
import FormBuilder from '@/components/FormBuilder/FormBuilder';
import { commonFieldConfigs } from '@/components/FormBuilder/index';
import { FormBuilderConfig } from '@/components/FormBuilder/types';
import Header from '@/components/layout/Header';
import TopBanner from '@/components/layout/components/TopBanner';

// Create commonly used field instances
const emailField = commonFieldConfigs.email('email');
const phoneField = commonFieldConfigs.phone('phone');
const personalCodeField = commonFieldConfigs.personalCode('personalCode');

function MultiStepServiceForm() {
  const config: FormBuilderConfig = {
    id: 'service-request-form',
    title: 'Service Application Request',
    description: 'Complete this multi-step form to submit your service application',
    multiStep: true,
    steps: [
      {
        id: 'service-details',
        title: 'Paslaugos užsakymas',
        description: 'Please provide service request details',
        subgroups: [
          {
            id: 'request-object',
            title: 'Prašymo objektas',
            variant: 'default',
            fields: [
              {
                id: 'purpose',
                name: 'purpose',
                type: 'select',
                label: 'Juridinio asmens teisinė forma',
                required: true,
                placeholder: 'Pasirinkite teisinę formą',
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
                  <div>
                    <strong>Reikalavimai pavadinimui</strong>
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
                  </div>
                ),
                severity: 'info',
                icon: <InfoIcon />,
              },
              // TODO: Add info alert about naming requirements here
            ],
          },
          {
            id: 'bordered-section',
            title: '',
            variant: 'bordered',
            fields: [
              {
                id: 'termDate',
                name: 'termDate',
                type: 'date',
                label: 'Terminas',
                required: true,
                clearable: true,
                defaultValue: '2024-04-06',
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
                label: 'Failo įkėlimas',
                required: true,
                accept: '.doc,.docx,.pdf,.pages',
                maxSize: 5 * 1024 * 1024, // 5MB
                description: 'Maksimalus failo dydis: 5MB',
                slotProps: {
                  wrapper: {
                    labelSubtitle: 'Tinkami formatai: .doc, .xdoc, .pdf, .pages',
                  },
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
                ...personalCodeField,
                defaultValue: '39005201234',
              },
              {
                id: 'fullName',
                name: 'fullName',
                type: 'text',
                label: 'Vardas, Pavardė',
                required: true,
                defaultValue: 'Vardenis Pavardenis',
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
                id: 'formDate',
                name: 'formDate',
                type: 'date',
                label: 'Prašymo data',
                required: true,
                defaultValue: '2024-04-06',
              },
              // Example field with custom error messages
              {
                id: 'customMessageExample',
                name: 'customMessageExample',
                type: 'text',
                label: 'Custom Validation Example',
                required: true,
                placeholder: 'Enter at least 5 characters',
                validation: {
                  minLength: 5,
                  maxLength: 20,
                },
                customErrorMessages: {
                  required: 'This custom field is absolutely required!',
                  minLength:
                    'You need at least {{min}} characters for this special field',
                  maxLength: 'Please keep it under {{max}} characters',
                },
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
            id: 'documentUpload',
            name: 'documentUpload',
            type: 'file',
            label: 'Dokumentų pasirašymas',
            required: true,
            accept: '.doc,.docx,.pdf,.pages',
            maxSize: 5 * 1024 * 1024, // 5MB
          },
        ],
      },
    ],
    onSubmit: async (data) => {
      console.log('Service request submitted:', data);
      alert('Service request submitted successfully!');
    },
    onInvalidSubmit: async (errors, data) => {
      console.log('Invalid submit:', errors, data);
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

  return (
    <div>
      <TopBanner />
      <Header />

      {/* FormBuilder handles its own RcSesServiceFormContainer */}
      <FormBuilder config={config} />
    </div>
  );
}

export default MultiStepServiceForm;
