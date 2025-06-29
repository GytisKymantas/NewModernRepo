// import type {} from '@emotion/styled'
import { createTheme } from '@mui/material';
import { RcSesTheme } from '@registrucentras/rc-ses-react-components';
import { error, grey, primary, secondary, warning } from './palette';

const themePalette = createTheme({
  palette: {
    mode: 'light',
    text: {
      primary: grey['900'],
    },
    primary,
    secondary,
    warning,
    error,
    grey,
  },
  typography: {
    fontFamily: 'Public sans, sans-serif, Arial',
  },
})



const theme = createTheme(RcSesTheme,themePalette);

export default theme;
