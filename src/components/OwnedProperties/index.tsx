
import React from 'react'

import { RcSesServicePage } from '@registrucentras/rc-ses-react-components'
import theme from '../../theme'
import { Container } from '@mui/material'

function OwnedProperties() {
  return (
    <RcSesServicePage>
      <Container
        maxWidth='lg'
        sx={{
          backgroundColor: { xs: theme.palette.grey['100'], md: 'white' },
          pb: { md: 8 },
          pt: { xs: 0, md: 6 },
          px: { xs: 0, md: 3 },
        }}
      >
        ...
      </Container>
    </RcSesServicePage>
  )
}

export default OwnedProperties
