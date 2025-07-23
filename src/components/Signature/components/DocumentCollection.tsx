import { Box } from '@mui/system';
import DocumentInfoSection from './DocumentInfoSection';

function DocumentCollection() {
  return (
    <Box>
      {[...Array(3)].map((_, index) => (
        <DocumentInfoSection key={`document-info-${index + 1}`} index={index + 1} />
      ))}
    </Box>
  );
}

export default DocumentCollection;
