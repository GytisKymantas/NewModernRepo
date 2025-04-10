import React from 'react'
import { getToken } from '@rc-ses/mfe-host'
import { RcSesTextField } from '@registrucentras/rc-ses-react-components'

function BasicInformationForm() {
  return (
    <RcSesTextField
      label='JWT'
      slotProps={{
        field: {
          InputProps:{
            inputComponent: 'textarea',
            inputProps: {
              rows: 10,
              sx: { minHeight: '200px' },
            }
          },
          slots: {
            input: 'textarea'
          },
        },
      }}
      value={getToken()}
    />
  )
}

export default BasicInformationForm
