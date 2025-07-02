import styled from '@emotion/styled';
import {
  redirectToSelfServiceDashboard,
  redirectToSelfServiceOwnedProperties,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import {
  RcSesAlert,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import InfoIcon from '../../assets/icons/InfoIcon';
import AccordionWrapper from '../Service copy/components/AccordionWrapper';
import ServiceFormAccordion from '../Service copy/components/ServiceFormAccordion';
import ServiceHeader from '../Service copy/components/ServiceHeader';
import DocumentInfoSection from './components/DocumentInfoSection';
import ServiceFormActions from './components/ServiceFormActions';
import UploadFile from './components/UploadFile';

const StyledAlertText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #275698;
  margin: 0;
`;

function Signature() {
  const accordionController = useAccordionController({
    initialState: {
      serviceDetails: {
        expanded: false,
        state: 'completed',
        title: 'Dokumentų pasirašymas',
      },
      serviceIssuance: {
        expanded: true,
        state: 'active',
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
    <RcSesServicePage className='signatureForm-container'>
      <ServiceHeader
        breadcrumbsProps={{
          path: [
            { label: 'Pagrindinis', path: '/' },
            { label: 'Formos su vedliu pavyzdys', path: '/sample-form-multiple-steps' },
          ],
        }}
        title='Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą'
        className='signatureHeader-container'
      />

      <ServiceFormAccordion
        accordionController={accordionController}
        showProgressStepper
        className='signatureFormAccordion-container'
      >
        <AccordionWrapper
          id='serviceDetails'
          controller={accordionController}
          noPadding
          className='accordionWrapper-container'
        >
          <RcSesAlert icon={<InfoIcon />} severity='info'>
            <StyledAlertText>
              Visi dokumentai yra pasirašomi eilės tvarka.
            </StyledAlertText>
          </RcSesAlert>

          {[...Array(3)].map((_, index) => (
            <DocumentInfoSection key={`document-info-${index + 1}`} index={index + 1} />
          ))}

          <UploadFile />
        </AccordionWrapper>

        <ServiceFormActions
          className='signatureFormActions-container'
          onDiscard={() => redirectToServiceDescriptionPage('redirect')}
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceOwnedProperties()}
          onBack={() => (window.location.href = '/')}
        />
      </ServiceFormAccordion>
    </RcSesServicePage>
  );
}

export default Signature;
