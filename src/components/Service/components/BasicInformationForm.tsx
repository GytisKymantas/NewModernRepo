import { getToken } from '@rc-ses/mfe-host';
import { RcSesTextField } from '@registrucentras/rc-ses-react-components';

function BasicInformationForm() {
  return (
    <RcSesTextField
      label='JWT'
      slotProps={{
        field: {
          InputProps: {
            inputComponent: 'text',
            inputProps: {},
          },
          slots: {
            input: 'text',
          },
        },
      }}
      value={getToken()}
    />
  );
}

export default BasicInformationForm;
