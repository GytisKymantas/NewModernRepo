import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import { RcSesAlert } from '@registrucentras/rc-ses-react-components';
import React from 'react';
import DeleteIcon from '../../../assets/icons/DeleteIcon';
import DownloadIcon from '../../../assets/icons/DownloadIcon';
import OverviewIcon from '../../../assets/icons/OverviewIcon';
import theme from '../../../theme';
import { InfoHeader } from '../../Service/components/ServiceDetailsForm';
import PrimaryButton from '../../common/PrimaryButton';
import DeleteItemModal from './DeleteItemModal';
import SignaturesSection from './SignaturesSection';
import ViewItemModal from './ViewObjectModal';

const Wrapper = styled.div`
  background-color: #f9fafb;
`;

const Inner = styled.div<{ isBeingSigned?: boolean }>`
  border-top: 1px solid #eef1f3;
  border-bottom: 1px solid #eef1f3;
  padding: 24px 16px;
  background: ${({ isBeingSigned }) => (isBeingSigned ? '#F9FAFB' : 'white')};
  margin: 0px -24px 0 -24px;

  @media (max-width: 900px) {
    padding: 1rem;
    margin: 0 -16px 0 -16px;
  }
`;
const Title = styled.h2`
  color: #1f2733;
  font-size: 16px;
  font-weight: 500;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #4a5361;
  font-size: 12px;
  font-weight: 300;
  margin: 4px 0 0 0;
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

const StatusLabel = styled.div<{ status?: string; noMarginRight?: boolean }>`
  color: #1f2733;
  font-size: 15px;
  font-weight: 300;
  background-color: ${({ status }) => status || '#F0F2F5'};
  border-radius: 100px;
  margin-right: ${({ noMarginRight }) => (noMarginRight ? '0' : '40px')};

  padding: 2px 8px;
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 54px;
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

type DocumentInfoSectionProps = {
  index: number;
  onDelete?: () => void; // optional in case it's not always passed
};
function DocumentInfoSection({ index, onDelete }: DocumentInfoSectionProps) {
  const [openModal, setOpenModal] = React.useState<null | 'view' | 'delete'>(null);
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleOpenModal = (modal: 'view' | 'delete') => setOpenModal(modal);
  const handleCloseModal = () => setOpenModal(null);
  const getStatusLabelColor = (() => {
    if (index === 1) {
      return '#A5F3D3';
    }

    if (index === 2) {
      return '#B9E9FA';
    }

    return '#F0F2F5';
  })();

  const getStatusLabel = (() => {
    if (index === 1) {
      return 'Pasirašytas';
    }

    if (index === 2) {
      return 'Pasirašomas';
    }

    return 'Laukiama parašo';
  })();

  const handleDownload = () => {
    const draft = localStorage.getItem('serviceRequestDraft');
    if (!draft) return;

    try {
      const parsedDraft = JSON.parse(draft);
      const filePath = parsedDraft?.fileUpload?.[0]?.path;

      if (filePath) {
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filePath.split('/').pop(); // Gets the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error parsing file from localStorage:', error);
    }
  };

  return (
    <Wrapper>
      <Inner isBeingSigned={index === 1}>
        <Title>{index}. Dokumento tipo pavadinimas</Title>
        <Subtitle>Dokumento pavadinimas.pdf</Subtitle>

        <Row>
          <Left>
            <StatusLabel status={getStatusLabelColor}>{getStatusLabel}</StatusLabel>

            <Actions>
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
                  onClick={handleDownload}
                >
                  Atsisiųsti
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

        {index !== 0 && (
          <SignaturesSection
            signedStatusComponent={
              <StatusLabel noMarginRight status={index === 1 ? '#B9E9FA' : '#FCE09F'}>
                {index === 1 ? 'Pasirašė' : 'Nepasirašė'}
              </StatusLabel>
            }
          />
        )}

        {index === 2 && !upMd && (
          <Box>
            <PrimaryButton sx={{ fontWeight: '600', width: '100%' }}>
              Pasirašyti
            </PrimaryButton>
          </Box>
        )}

        {index === 1 && (
          <Box sx={{ background: '#FFFFFF' }}>
            <RcSesAlert severity='warning' sx={{ borderRadius: '6px' }}>
              <InfoHeader noMargin>
                Yra neužpildytų laukų. Prašome peržiūrėti privalomus laukus ir užpildyti
                reikiamą informaciją.
              </InfoHeader>
            </RcSesAlert>
          </Box>
        )}
      </Inner>

      {/* Modals */}

      {openModal === 'view' && <ViewItemModal open onClose={handleCloseModal} />}
      {openModal === 'delete' && (
        <DeleteItemModal open onClose={handleCloseModal} onDelete={onDelete} />
      )}
    </Wrapper>
  );
}

export default DocumentInfoSection;
