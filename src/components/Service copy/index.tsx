import { useMediaQuery } from '@mui/material';
import {
  redirectToSelfServiceDashboard,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import {
  RcSesAccordion,
  RcSesServiceFormActions,
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import theme from '../../theme';

import ServiceDetailsForm from './components/ServiceDetailsForm';
import ServiceFormContainer from './components/ServiceFormContainer';
import ServiceHeader from './components/ServiceHeader';
import React from 'react';

function ServiceCopy() {
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

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
            { label: 'Savitarna', path: '/' },
            {
              label: 'Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą',
              path: '/sample-form-multiple-steps',
            },
          ],
        }}
        title='Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą'
      ></ServiceHeader>

      <RcSesServiceFormContainer
        accordionController={accordionController}
        showProgressStepper={upMd}
      >
        {!upMd && <ServiceFormContainer steps={accordionController.state} />}

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
