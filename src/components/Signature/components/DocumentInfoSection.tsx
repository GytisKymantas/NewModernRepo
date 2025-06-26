import styled from '@emotion/styled';
import {
  RcSesAlert,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import React from 'react';
import ColorBallIcon from '../../../assets/icons/ColorBallIcon';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import OverviewIcon from '../../../assets/icons/OverviewIcon';
import AccordionWrapper from '../../Service copy/components/AccordionWrapper';
import { InfoHeader } from '../../Service copy/components/ServiceDetailsForm';
import DownloadIconLabel from './DownloadIconLabel'; // adjust path if needed
import ObjectIdentifierSearchModal from './ObjectIdentifierSearchModal';
import DeleteItemModal from './DeleteItemModal';

const Wrapper = styled.div`
  background-color: #f9fafb;
  margin: 0 -2rem;
`;

const Inner = styled.div`
  border-top: 1px solid #eef1f3;
  border-bottom: 1px solid #eef1f3;
  padding: 20px 2rem;
  background: white;
`;

const Title = styled.h2`
  color: #1f2733;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const Subtitle = styled.p`
color:  #4A5361
font-family: "Public Sans";
font-size: 12px;
font-weight: 300;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const StatusLabel = styled.div<{ status?: 'inQueue' | 'inProgress' | 'signed' }>`
  color: #1f2733;
  font-size: 14px;
  font-weight: 500;
  background-color: ${({ status }) => {
    switch (status) {
      case 'inQueue':
        return '#F0F2F5';
      case 'inProgress':
        return '#dcf4fc';
      case 'signed':
        return '#D1FAE7';
      default:
        return '#dcf4fc'; // Default to inProgress if status is undefined
    }
  }};
  border-radius: 100px;
  margin-right: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 90px;
  justify-content: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
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
  cursor: pointer;
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

function DocumentInfoSection({ index }: { index: number }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
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
        <Subtitle>Dokumento pavadinimas.pdf</Subtitle>
        <Row>
          <Left>
            <StatusLabel status={index === 1 ? 'signed' : 'inQueue'}>
              {index === 1 ? 'Pasirašytas' : 'Pasirašomas'}
            </StatusLabel>
            <Actions>
              <DownloadIconLabel label='Atsisiųsti' svg={<DownloadIcon />} />
              <DownloadIconLabel label='Peržiūrėti' svg={<OverviewIcon />} />
              <div onClick={handleOpenModal}>
                {' '}
                <DownloadIconLabel label='Ištrinti' svg={<DeleteIcon />} />
                <DeleteItemModal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                />
              </div>
            </Actions>
          </Left>
          {index === 2 && (
            <div>
              <SignButton>Pasirašyti</SignButton>
            </div>
          )}
        </Row>
        <AccordionWrapper
          id='basicInformation'
          controller={accordionController}
          sx={{ borderWidth: 0, border: 'none' }}
          titleComponent={
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M14.4329 13.2502C13.481 11.6046 12.0142 10.4246 10.3023 9.86524C11.1491 9.36115 11.8069 8.59303 12.1749 7.67886C12.5429 6.76468 12.6006 5.75499 12.3392 4.80483C12.0778 3.85468 11.5117 3.01661 10.7279 2.41931C9.94408 1.82202 8.98587 1.49854 8.00041 1.49854C7.01496 1.49854 6.05674 1.82202 5.27293 2.41931C4.48911 3.01661 3.92304 3.85468 3.66163 4.80483C3.40022 5.75499 3.45793 6.76468 3.82591 7.67886C4.19388 8.59303 4.85177 9.36115 5.69854 9.86524C3.98666 10.424 2.51979 11.604 1.56791 13.2502C1.53301 13.3072 1.50985 13.3705 1.49982 13.4365C1.48978 13.5025 1.49307 13.5699 1.50949 13.6346C1.52591 13.6993 1.55512 13.7601 1.59541 13.8133C1.63569 13.8666 1.68624 13.9112 1.74405 13.9446C1.80187 13.978 1.86579 13.9995 1.93204 14.0078C1.9983 14.0161 2.06554 14.011 2.1298 13.9929C2.19407 13.9748 2.25405 13.944 2.30622 13.9023C2.35838 13.8606 2.40168 13.8089 2.43354 13.7502C3.61104 11.7152 5.69229 10.5002 8.00041 10.5002C10.3085 10.5002 12.3898 11.7152 13.5673 13.7502C13.5991 13.8089 13.6424 13.8606 13.6946 13.9023C13.7468 13.944 13.8068 13.9748 13.871 13.9929C13.9353 14.011 14.0025 14.0161 14.0688 14.0078C14.135 13.9995 14.199 13.978 14.2568 13.9446C14.3146 13.9112 14.3651 13.8666 14.4054 13.8133C14.4457 13.7601 14.4749 13.6993 14.4913 13.6346C14.5078 13.5699 14.511 13.5025 14.501 13.4365C14.491 13.3705 14.4678 13.3072 14.4329 13.2502ZM4.50041 6.00024C4.50041 5.308 4.70568 4.63131 5.09027 4.05574C5.47485 3.48017 6.02148 3.03156 6.66102 2.76666C7.30056 2.50175 8.0043 2.43244 8.68323 2.56749C9.36216 2.70254 9.9858 3.03588 10.4753 3.52536C10.9648 4.01485 11.2981 4.63849 11.4332 5.31742C11.5682 5.99635 11.4989 6.70009 11.234 7.33963C10.9691 7.97917 10.5205 8.52579 9.94491 8.91038C9.36934 9.29496 8.69265 9.50024 8.00041 9.50024C7.07246 9.49924 6.1828 9.13018 5.52664 8.47401C4.87047 7.81785 4.50141 6.92819 4.50041 6.00024Z'
                  fill='black'
                />
              </svg>

              <p style={{ fontSize: '14px', margin: '0' }}>Pasirašantys asmenys (2)</p>
            </div>
          }
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
        </AccordionWrapper>
      </Inner>
      {index === 2 && (
        <div style={{ padding: '0 24px' }}>
          <RcSesAlert severity='warning' sx={{ borderRadius: '6px' }}>
            <InfoHeader noMargin>
              Yra neužpildytų laukų. Prašome peržiūrėti privalomus laukus ir užpildyti
              reikiamą informaciją.
            </InfoHeader>
          </RcSesAlert>
        </div>
      )}
    </Wrapper>
  );
}

export default DocumentInfoSection;
