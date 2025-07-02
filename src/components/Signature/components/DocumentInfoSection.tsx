import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import { RcSesAlert } from '@registrucentras/rc-ses-react-components';
import React from 'react';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import OverviewIcon from '../../../assets/icons/OverviewIcon';
import theme from '../../../theme';
import { InfoHeader } from '../../Service copy/components/ServiceDetailsForm';
import PrimaryButton from '../../common/PrimaryButton';
import DeleteItemModal from './DeleteItemModal';
import SignaturesSection from './SignaturesSection';
import ViewItemModal from './ViewObjectModa';

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
  color: #4a5361;
  font-family: 'Public Sans';
  font-size: 12px;
  font-weight: 300;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  flex-direction: row;

  @media (min-width: 900px) {
    flex-direction: column;
  }
`;

const StatusLabel = styled.div<{ status?: 'inQueue' | 'inProgress' | 'signed' }>`
  color: #1f2733;
  font-size: 13px;
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
        return '#dcf4fc';
    }
  }};
  border-radius: 100px;
  margin-right: 40px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 108px;
  justify-content: center;
  letter-spacing: 0.16px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function DocumentInfoSection({ index }: { index: number }) {
  const [openModal, setOpenModal] = React.useState<null | 'view' | 'delete'>(null);
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleOpenModal = (modal: 'view' | 'delete') => setOpenModal(modal);
  const handleCloseModal = () => setOpenModal(null);

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
              <Box sx={{ cursor: 'pointer' }}>
                <PrimaryButton
                  variant='text'
                  size='small'
                  startIcon={<DownloadIcon />}
                  sx={{
                    color: '#1F2733',
                    '&:hover': {
                      backgroundColor: 'inherit', // Keeps background unchanged
                      boxShadow: 'none', // Removes shadow on hover
                    },
                  }}
                >
                  Atsisiųsti
                </PrimaryButton>
              </Box>
              <Box onClick={() => handleOpenModal('view')} sx={{ cursor: 'pointer' }}>
                <PrimaryButton
                  variant='text'
                  size='small'
                  startIcon={<OverviewIcon />}
                  sx={{
                    color: '#1F2733',
                    '&:hover': {
                      backgroundColor: 'inherit', // Keeps background unchanged
                      boxShadow: 'none', // Removes shadow on hover
                    },
                  }}
                >
                  Peržiūrėti
                </PrimaryButton>
              </Box>

              <Box onClick={() => handleOpenModal('delete')} sx={{ cursor: 'pointer' }}>
                <PrimaryButton
                  variant='text'
                  startIcon={<DeleteIcon />}
                  size='small'
                  sx={{
                    color: '#1F2733',
                    '&:hover': {
                      backgroundColor: 'inherit', // Keeps background unchanged
                      boxShadow: 'none', // Removes shadow on hover
                    },
                  }}
                >
                  Ištrinti
                </PrimaryButton>
              </Box>
            </Actions>

            {index === 2 && upMd && (
              <PrimaryButton sx={{ fontWeight: '600', marginLeft: 'auto' }}>
                Pasirašyti
              </PrimaryButton>
            )}
          </Left>
        </Row>

        <SignaturesSection />
        {index === 2 && !upMd && (
          <Box>
            <PrimaryButton sx={{ fontWeight: '600', width: '100%' }}>
              Pasirašyti
            </PrimaryButton>
          </Box>
        )}
      </Inner>

      {index === 2 && (
        <Box sx={{ padding: '0 24px', background: '#FFFFFF' }}>
          <RcSesAlert severity='warning' sx={{ borderRadius: '6px' }}>
            <InfoHeader noMargin>
              Yra neužpildytų laukų. Prašome peržiūrėti privalomus laukus ir užpildyti
              reikiamą informaciją.
            </InfoHeader>
          </RcSesAlert>
        </Box>
      )}

      {/* Modals */}
      {openModal === 'view' && <ViewItemModal open onClose={handleCloseModal} />}
      {openModal === 'delete' && <DeleteItemModal open onClose={handleCloseModal} />}
    </Wrapper>
  );
}

export default DocumentInfoSection;
