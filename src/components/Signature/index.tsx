import styled from '@emotion/styled';
import {
  redirectToSelfServiceDashboard,
  redirectToServiceDescriptionPage,
} from '@rc-ses/mfe-host';
import {
  RcSesAccordion,
  RcSesAlert,
  RcSesServiceFormActions,
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import InfoIcon from '../../assets/icons/InfoIcon';
import ServiceHeader from '../Service copy/components/ServiceHeader';
import DocumentInfoSection from './components/DocumentInfoSection';
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
        state: 'pending',
        title: 'Dokumentų pasirašymas',
      },
      serviceIssuance: {
        expanded: false,
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
    <RcSesServicePage>
      <ServiceHeader
        breadcrumbsProps={{
          path: [
            { label: 'Pagrindinis', path: '/' },
            { label: 'Formos su vedliu pavyzdys', path: '/sample-form-multiple-steps' },
          ],
        }}
        title='Prašymas laikinai įrašyti pavadinimą į juridinių asmenų registrą'
      />

      <RcSesServiceFormContainer
        accordionController={accordionController}
        showProgressStepper
      >
        <RcSesAccordion id='serviceDetails' controller={accordionController}>
          <RcSesAlert icon={<InfoIcon />} severity='info'>
            <StyledAlertText>
              Visi dokumentai yra pasirašomi eilės tvarka.
            </StyledAlertText>
          </RcSesAlert>

          {[...Array(3)].map((_, index) => (
            <DocumentInfoSection key={`document-info-${index + 1}`} index={index + 1} />
          ))}

          <UploadFile />
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

export default Signature;
