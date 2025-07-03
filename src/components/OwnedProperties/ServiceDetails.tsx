import { Divider, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { HeaderMain } from '../Service copy/components/ServiceDetailsForm';

type Row = {
  label: string;
  value: string;
};

type ServiceDetailsProps = {
  title: string;
  rows: Row[];
  sxStyle?: SxProps;
};

function ServiceDetails({ title, rows, sxStyle }: ServiceDetailsProps) {
  return (
    <>
      <Box sx={sxStyle}>
        <HeaderMain>{title}</HeaderMain>
        <Divider />
      </Box>
      {rows &&
        rows.map(({ label, value }, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 2 },
              mb: i === rows.length - 1 ? 0 : '20px',
            }}
          >
            <Typography
              sx={{
                maxWidth: '243px',
                width: '100%',
                textAlign: { xs: 'left', sm: 'right' },
                mr: '24px',
              }}
            >
              {label}
            </Typography>
            <Typography sx={{ maxWidth: '525px', width: '100%', textAlign: 'left' }}>
              {value}
            </Typography>
          </Box>
        ))}
    </>
  );
}

export default ServiceDetails;
