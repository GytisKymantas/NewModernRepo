import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { getMFEBaseUrl } from '@rc-ses/mfe-host';
import { lt } from 'date-fns/locale/lt';
import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import './i18n/i18n';
import MultiStepServiceForm from './pages/form-examples/MultiStepServiceForm';
import './styles.css';
import theme from './theme';
// import Service from './components/Service';

/*
 * Pavyzdine router'io konfigūracija, jei nėra aktualūs "Mano turtas" micro-frontend'ai.
 * Past.: atkreipti dėmesį į `basename` konfigūraciją.
 */
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Service />}>
//       <Route path='09eec1a3-0674-479b-85fe-b9140879de7b' element={<Service />} />
//       <Route path='77ca7f18-07d3-4f4a-8da7-758e4fa7aee1' element={<Service />} />
//     </Route>
//   ),
//   { basename: getServiceFormBaseUrl() },
// );

/*
 * Pavyzdine router'io konfigūracija, teikiant puslapius "Mano turtas" duomenų peržiūrai
 * Past.: atkreipti dėmesį į `basename` ir tėvinių `Route` elementų `path` konfigūraciją.
 */
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<MultiStepServiceForm />} />
      <Route path='form-examples/multi-step-service' element={<MultiStepServiceForm />} />
      {/* <Route path='/self-service-owned-properties' element={<OwnedProperties />}>
        <Route
          path='177c5181-8710-443e-8335-327365835826'
          element={<OwnedProperties />}
        />
      </Route> */}
    </>,
  ),
  { basename: getMFEBaseUrl() },
);

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={lt}>
          <CssBaseline />
          <RouterProvider router={router} />
        </LocalizationProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}
