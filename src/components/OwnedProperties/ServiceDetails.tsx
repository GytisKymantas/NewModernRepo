import { Divider, Typography } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { RcSesFormControlWrapper } from '@registrucentras/rc-ses-react-components';
import { HeaderMain } from '../Service/components/ServiceDetailsForm';

type Row = {
  label: string;
  value: string;
};

type ServiceDetailsProps = {
  title: string;
  rows: Row[];
  sxStyle?: SxProps;
  isWithoutDivider?: boolean;
  withHeading?: boolean;
  textSpacing?: SxProps;
};

function ServiceDetails({
  title,
  rows,
  sxStyle,
  isWithoutDivider,
  withHeading,
  textSpacing,
}: ServiceDetailsProps) {
  return (
    <>
      {withHeading && (
        <Box sx={sxStyle}>
          <HeaderMain>{title}</HeaderMain>
          {!isWithoutDivider && <Divider />}
        </Box>
      )}
      {rows &&
        rows.map(({ label, value }) => (
          <Box sx={textSpacing} key={`${label}-${value}`}>
            <RcSesFormControlWrapper label={label}>
              <Typography
                sx={{
                  maxWidth: '100%',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {value}
              </Typography>
            </RcSesFormControlWrapper>
          </Box>
        ))}
    </>
  );
}

export default ServiceDetails;
