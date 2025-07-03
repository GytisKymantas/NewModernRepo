import { useMediaQuery } from '@mui/material';
import {
  redirectToSelfServiceDashboard,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import {
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import theme from '../../theme';

import ServiceFormActions from '../Signature/components/ServiceFormActions';
import AccordionWrapper from './components/AccordionWrapper';
import ServiceDetailsForm from './components/ServiceDetailsForm';
import ServiceFormAccordion from './components/ServiceFormAccordion';
import ServiceFormContainer from './components/ServiceFormContainer';
import ServiceHeader from './components/ServiceHeader';

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
    <RcSesServicePage className='serviceForm-container'>
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
        className='serviceHeader-container'
      />

      <ServiceFormAccordion
        accordionController={accordionController}
        showProgressStepper={upMd}
        className='serviceFormAccordion-container'
      >
        {!upMd && <ServiceFormContainer steps={accordionController.state} />}

        <AccordionWrapper
          className='accordionWrapper-container'
          id='serviceDetails'
          controller={accordionController}
        >
          <ServiceDetailsForm className='serviceDetailsForm-container' />
        </AccordionWrapper>

        <ServiceFormActions
          className='serviceFormActions-container'
          onDiscard={() =>
            redirectToServiceDescriptionPage('00000000-0000-0000-0000-000000000000')
          }
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceDashboard()}
          isFirstStep
        />
      </ServiceFormAccordion>
    </RcSesServicePage>
  );
}

export default ServiceCopy;
