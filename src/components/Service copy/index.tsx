import { useMediaQuery } from '@mui/material';
import {
  redirectToSelfServiceDashboard,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import {
  RcSesServiceFormActions,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import theme from '../../theme';

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
      />

      <ServiceFormAccordion
        accordionController={accordionController}
        showProgressStepper={upMd}
      >
        {!upMd && <ServiceFormContainer steps={accordionController.state} />}

        <AccordionWrapper id='serviceDetails' controller={accordionController}>
          <ServiceDetailsForm />
        </AccordionWrapper>

        <RcSesServiceFormActions
          onDiscard={() =>
            redirectToServiceDescriptionPage('00000000-0000-0000-0000-000000000000')
          }
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceDashboard()}
        />
      </ServiceFormAccordion>
    </RcSesServicePage>
  );
}

export default ServiceCopy;
