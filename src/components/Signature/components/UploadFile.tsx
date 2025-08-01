import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import React from 'react';
import ObjectIdentifierSearchModal from './ObjectIdentifierSearchModal';

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  padding: 12px 16px;
  border-radius: 8px;
  color: #0079ad;
  cursor: pointer;
  width: fit-content;
  margin: 0 auto;
  transition: background-color 0.2s ease;

  svg {
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
`;

function UploadFile() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <Box
      sx={{
        marginBottom: '0',
        marginTop: '-24px',
        borderBottom: '1px solid #eff1f3',
        marginLeft: '-15px',
        marginRight: '-15px',
      }}
    >
      <UploadWrapper onClick={handleOpenModal}>
        <svg
          width='25'
          height='24'
          viewBox='0 0 25 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M21.5 12C21.5 12.1989 21.421 12.3897 21.2803 12.5303C21.1397 12.671 20.9489 12.75 20.75 12.75H13.25V20.25C13.25 20.4489 13.171 20.6397 13.0303 20.7803C12.8897 20.921 12.6989 21 12.5 21C12.3011 21 12.1103 20.921 11.9697 20.7803C11.829 20.6397 11.75 20.4489 11.75 20.25V12.75H4.25C4.05109 12.75 3.86032 12.671 3.71967 12.5303C3.57902 12.3897 3.5 12.1989 3.5 12C3.5 11.8011 3.57902 11.6103 3.71967 11.4697C3.86032 11.329 4.05109 11.25 4.25 11.25H11.75V3.75C11.75 3.55109 11.829 3.36032 11.9697 3.21967C12.1103 3.07902 12.3011 3 12.5 3C12.6989 3 12.8897 3.07902 13.0303 3.21967C13.171 3.36032 13.25 3.55109 13.25 3.75V11.25H20.75C20.9489 11.25 21.1397 11.329 21.2803 11.4697C21.421 11.6103 21.5 11.8011 21.5 12Z'
            fill='#0079AD'
          />
        </svg>
        <Typography sx={{ fontSize: '15px !important', fontWeight: '600 !important' }}>
          Įkelti dokumentą
        </Typography>
      </UploadWrapper>

      <ObjectIdentifierSearchModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </Box>
  );
}

export default UploadFile;
