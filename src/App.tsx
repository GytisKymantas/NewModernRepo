import React from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import theme from './theme';
import Service from './components/Service';
import { getMFEBaseUrl, getOwnedPropertiesUrlFragment, getServiceFormUrlFragment } from '@rc-ses/mfe-host';
import OwnedProperties from './components/OwnedProperties';

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
      <Route path={getServiceFormUrlFragment()} element={<Service />}>
        <Route path='09eec1a3-0674-479b-85fe-b9140879de7b' element={<Service />} />
        <Route path='77ca7f18-07d3-4f4a-8da7-758e4fa7aee1' element={<Service />} />
      </Route>
      <Route path={getOwnedPropertiesUrlFragment()} element={<OwnedProperties />}>
        <Route path='177c5181-8710-443e-8335-327365835826' element={<OwnedProperties />} />
      </Route>
    </>
  ),
  { basename: getMFEBaseUrl() },
);

export default function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}
