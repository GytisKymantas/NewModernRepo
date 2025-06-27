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
import OwnedProperties from './components/OwnedProperties';
import './i18n/i18n';
import './styles.css';
// import Service from './components/Service';
import Signature from './components/Signature';
import Home from './pages/Home';
import MultiStepServiceForm from './pages/form-examples/MultiStepServiceForm';
import theme from './theme';

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
      <Route path='/' element={<Home />}>
        <Route path='09eec1a3-0674-479b-85fe-b9140879de7b' element={<Home />} />
        <Route path='77ca7f18-07d3-4f4a-8da7-758e4fa7aee1' element={<Home />} />
      </Route>
      <Route path='form-examples/multi-step-service' element={<MultiStepServiceForm />} />
      <Route path='self-service-dashboard' element={<Signature />}>
        <Route path='09eec1a3-0674-479b-85fe-b9140879de7b' element={<Home />} />
        <Route path='77ca7f18-07d3-4f4a-8da7-758e4fa7aee1' element={<Home />} />
      </Route>
      <Route path='/ricardas' element={<OwnedProperties />}>
        <Route
          path='177c5181-8710-443e-8335-327365835826'
          element={<OwnedProperties />}
        />
      </Route>
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
