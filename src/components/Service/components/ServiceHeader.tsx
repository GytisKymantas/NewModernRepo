import { Box, Container, Typography } from '@mui/material';
import { RcSesBreadcrumbs } from '@registrucentras/rc-ses-react-components';
import React from 'react';
import theme from '../../../theme';

type Props = {
  breadcrumbsProps: React.ComponentProps<typeof RcSesBreadcrumbs>;
  children?: React.ReactNode;
  title: string;
  headerDescription?: string;
};
function ServiceHeader({ breadcrumbsProps, children, title, headerDescription }: Props) {
  // Theme debug removed for production
  return (
    <Box sx={{ backgroundColor: '#F3FBFE' }}>
      <Container
        sx={{
          pb: { xs: '2rem', md: '2.25rem' },
          pt: { xs: '.375rem', md: '1.5rem' },
          px: '1rem',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: '#F3FBFE ',
        }}
      >
        <Box sx={{ mb: { xs: '.875rem', md: '.375rem' } }}>
          <RcSesBreadcrumbs {...breadcrumbsProps} />
        </Box>

        <Typography
          variant='h1'
          sx={{
            lineHeight: { xs: '2rem', md: '2.125rem' },
            fontSize: { xs: '24px', md: '36px' },
            fontWeight: 500,
            letterSpacing: '-.24px',
          }}
        >
          {title}
        </Typography>
        {headerDescription && (
          <Typography variant='body1' sx={{ marginTop: '8px' }}>
            Šiame puslapyje Jūs galite užsisakyti Nekilnojamojo turto registro išrašus,
            pažymas bei kitus dokumentus. Užsakytą NTR išrašą, pažymą ar kitą dokumentą
            galėsite gauti elektroniniu būdu arba atsiimti pasirinktame VĮ Registrų centro
            padalinyje.
          </Typography>
        )}

        {!!children && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: { xs: '.25rem', md: '.5rem' },
              rowGap: '10px',

              '.MuiTypography-body1': {
                lineHeight: '1.3125rem',

                [theme.breakpoints.down('md')]: {
                  fontSize: '.8125rem',
                  lineHeight: '1.125rem',
                },
              },
            }}
          >
            {children}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default ServiceHeader;
