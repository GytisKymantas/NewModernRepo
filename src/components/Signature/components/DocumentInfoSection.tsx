import styled from '@emotion/styled';
import {
  RcSesAccordion,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import React from 'react';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import OverviewIcon from '../../../assets/icons/OverviewIcon';
import DownloadIconLabel from './DownloadIconLabel'; // adjust path if needed
import ColorBallIcon from '../../../assets/icons/ColorBallIcon';

const Wrapper = styled.div`
  background-color: #f9fafb;
  margin: 0 -2rem;
`;

const Inner = styled.div`
  border-top: 1px solid #eef1f3;
  border-bottom: 1px solid #eef1f3;
  padding: 20px 2rem;
`;

const Title = styled.h2`
  color: #1f2733;
  font-size: 16px;
  font-weight: 500;
`;

const Subtitle = styled.p`
  color: #4a5361;
  font-size: 13px;
  font-weight: 300;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StatusLabel = styled.div`
  color: #1f2733;
  font-size: 16px;
  font-weight: 500;
  background-color: #dcf4fc;
  display: inline-block;
  padding: 8px;
  border-radius: 100px;
  margin-right: 40px;
`;

const Left = styled.div`
  display: flex;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 18px;
`;

const SignButton = styled.button`
  border: none;
  font-size: 16px;
  font-weight: 600;
  padding: 13px;
  background-color: #b9e9fa;
`;

const AccordionEntry = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const PersonStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DocumentInfoSection = ({ index }: { index: number }) => {
  const accordionController = useAccordionController({
    initialState: {
      basicInformation: {
        expanded: false,
        state: 'completed',
        title: 'Pasirašantys asmenys (2)',
      },
      serviceDetails: {
        expanded: true,
        state: 'active',
        title: 'Paslaugos užsakymas',
      },
      serviceIssuance: {
        expanded: false,
        state: 'pending',
        title: 'Išdavimas',
      },
      additionalServices: {
        expanded: false,
        state: 'pending',
        title: 'Reikalingos papildomos paslaugos',
      },
      termsAndConditions: {
        expanded: false,
        state: 'pending',
        title: 'Terminai ir sąlygos',
      },
    },
  });

  return (
    <Wrapper>
      <Inner>
        <Title>{index}. Dokumento tipo pavadinimas</Title>
        <Subtitle></Subtitle>
        <Row>
          <Left>
            <StatusLabel>Pasirašomas</StatusLabel>
            <Actions>
              <DownloadIconLabel label="Atsisiųsti" svg={<DownloadIcon />} />
              <DownloadIconLabel label="Peržiūrėti" svg={<OverviewIcon />} />
              <DownloadIconLabel label="Ištrinti" svg={<DeleteIcon />} />
            </Actions>
          </Left>
          <div>
            <SignButton>Pasirašyti</SignButton>
          </div>
        </Row>
        <RcSesAccordion
          id="basicInformation"
          controller={accordionController}
          sx={{ borderWidth: 0, border: 'none' }}
        >
          <AccordionEntry>
            <p>Vardenis Pavardenis (Jus)</p>
            <PersonStatus>
              <ColorBallIcon />
              Laukiama
            </PersonStatus>
          </AccordionEntry>
          <AccordionEntry>
            <p>Vardenis Pavardenis (Jus)</p>
            <PersonStatus>
              <ColorBallIcon />
              Laukiama
            </PersonStatus>
          </AccordionEntry>
        </RcSesAccordion>
      </Inner>
    </Wrapper>
  );
};

export default DocumentInfoSection;
