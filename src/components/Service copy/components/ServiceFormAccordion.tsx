import { Container, Grid, useMediaQuery } from '@mui/material';
import React from 'react';

import theme from '@/theme';
import ServiceFormContainer from './ServiceFormContainer';

type Props = {
  children: React.ReactNode;
  initialAccordionStateArray: any;
};

function ServiceFormAccordion({ initialAccordionStateArray, children }: Props) {
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));

  console.log(initialAccordionStateArray, 'this is state');
  return (
    <Container
      maxWidth={'lg'}
      sx={{
        backgroundColor: { xs: 'grey', md: 'white' },
        pb: { md: 8 },
        pt: { xs: 0, md: 6 },
        px: { xs: 0, md: 3 },
        mb: { xs: 0, md: 6 },
      }}
    >
      <Grid
        container
        columns={2}
        sx={{
          columnGap: 7.5,
          flexWrap: 'nowrap',
          justifyContent: 'center',
          flexDirection: upSm ? 'row' : 'column',
        }}
      >
        <Grid
          item
          sx={{
            display: 'block',
            flex: upSm ? '0 0 270px' : '0 0 50px',
          }}
        >
          <ServiceFormContainer steps={initialAccordionStateArray} isVertical={upSm} />
        </Grid>

        <Grid item sx={{ flexGrow: 1 }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServiceFormAccordion;
