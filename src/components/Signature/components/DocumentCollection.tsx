import InfoIcon from '@/assets/icons/InfoIcon';
import { Box } from '@mui/system';
import { RcSesAlert } from '@registrucentras/rc-ses-react-components';
import { useState } from 'react';
import DocumentInfoSection from './DocumentInfoSection';

function DocumentCollection() {
  const [documents, setDocuments] = useState([1, 2, 3]); // document IDs or indexes

  const handleDelete = (indexToRemove: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Box>
      <Box sx={{ marginTop: '-16px' }}>
        <RcSesAlert icon={<InfoIcon />} severity='info'>
          Dokumentai yra pasirašomi eilės tvarka.
        </RcSesAlert>
      </Box>

      {documents.map((_, index) => (
        <DocumentInfoSection
          key={`document-info-${index + 1}`}
          index={index + 1}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Box>
  );
}

export default DocumentCollection;
