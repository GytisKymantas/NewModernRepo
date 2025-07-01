import { Container, Grid } from '@mui/material';
import { ContainerProps } from '@mui/system';
import React from 'react';



type Props = {
  children: React.ReactNode;

  slotProps?: {
    container: Partial<ContainerProps>;
  };
};

function FormContainer({ children, slotProps }: Props) {
  return (
    <Container
      maxWidth='md'
      {...slotProps?.container}
      sx={{
        backgroundColor: { xs: 'grey', md: 'white' },
        pb: { md: 8 },
        pt: { xs: 0, md: 6 },
        px: { xs: 0, md: 3 },
        ...slotProps?.container?.sx,
      }}
    >
      <Grid
        container
        columns={1}
        sx={{ columnGap: 7.5, flexWrap: 'nowrap', justifyContent: 'center' }}
      >
        <Grid item sx={{ flexGrow: 1 }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormContainer;
