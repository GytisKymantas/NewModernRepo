import { Container, Grid } from '@mui/material';
import { ContainerProps } from '@mui/system';
import React from 'react';

import useAccordionController from '../../hooks/useAccordionController';
import ServiceFormContainer from './ServiceFormContainer';

type Props = {
  accordionController: ReturnType<typeof useAccordionController>;
  children: React.ReactNode;
  showProgressStepper?: boolean;
  slotProps?: {
    container: Partial<ContainerProps>;
  };
};

function ServiceFormAccordion({
  accordionController,
  children,
  showProgressStepper = false,
  slotProps,
}: Props) {
  const { state } = accordionController;

  return (
    <Container
      maxWidth={showProgressStepper ? 'lg' : 'md'}
      {...slotProps?.container}
      sx={{
        backgroundColor: { xs: 'grey', md: 'white' },
        pb: { md: 8 },
        pt: { xs: 0, md: 6 },
        px: { xs: 0, md: 3 },
        mb: { xs: 0, md: 6 },
        ...slotProps?.container?.sx,
      }}
    >
      <Grid
        container
        columns={showProgressStepper ? 2 : 1}
        sx={{ columnGap: 7.5, flexWrap: 'nowrap', justifyContent: 'center' }}
      >
        {showProgressStepper && (
          <Grid item sx={{ display: { xs: 'none', md: 'block' }, flex: '0 0 270px' }}>
            <ServiceFormContainer steps={state} isVertical />
          </Grid>
        )}

        <Grid item sx={{ flexGrow: 1 }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ServiceFormAccordion;
