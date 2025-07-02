// Optional: props for label text and SVG size

import { Box } from '@mui/system';

type DownloadIconLabelProps = {
  label?: string;
  svg: React.ReactNode;
  style?: React.CSSProperties;
};

function DownloadIconLabel({ label = 'Atsisiųsti', svg, style }: DownloadIconLabelProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', ...style }}>
      {svg}
      <p style={{ margin: 0 }}>{label}</p>
    </Box>
  );
}

export default DownloadIconLabel;
