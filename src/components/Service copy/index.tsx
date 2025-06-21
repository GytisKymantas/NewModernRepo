import {
  RcSesAccordion,
  RcSesServiceFormActions,
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import React from 'react';
import {
  redirectToSelfServiceDashboard,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import ServiceDetailsForm from './components/ServiceDetailsForm';
import ServiceHeader from './components/ServiceHeader';

function ServiceCopy() {
  const accordionController = useAccordionController({
    initialState: {
      serviceDetails: {
        expanded: true,
        state: 'active',
        title: 'Paslaugos užsakymas',
      },
      serviceIssuance: {
        expanded: false,
        state: 'pending',
        title: 'Dokumentų pasirašymas',
      },
      additionalServices: {
        expanded: false,
        state: 'pending',
        title: 'Prašymo peržiūra',
      },
    },
  });

  return (
    <RcSesServicePage>

<ServiceHeader
        breadcrumbsProps={{
          path: [
            { label: 'Pagrindinis', path: '/' },
            { label: 'Formos su vedliu pavyzdys', path: '/sample-form-multiple-steps' },
          ],
        }}
        title='Nekilnojamojo turto registro išrašas pagal nurodytą turto adresą'
       >Šiame puslapyje Jūs galite užsisakyti Nekilnojamojo turto registro išrašus, pažymas bei kitus dokumentus. Užsakytą NTR išrašą, pažymą ar kitą dokumentą galėsite gauti elektroniniu būdu arba atsiimti pasirinktame VĮ Registrų centro padalinyje.

</ServiceHeader>
      
      <RcSesServiceFormContainer
        accordionController={accordionController}
        showProgressStepper
      >
 

        <RcSesAccordion id='serviceDetails' controller={accordionController}>
          <ServiceDetailsForm />
        </RcSesAccordion>


        <RcSesServiceFormActions
          onDiscard={() =>
            redirectToServiceDescriptionPage('00000000-0000-0000-0000-000000000000')
          }
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceDashboard()}
        />
      </RcSesServiceFormContainer>
    </RcSesServicePage>
  );
}

export default ServiceCopy;