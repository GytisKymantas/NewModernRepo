import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

import App from './App';

/*
 * @MICROFRONTEND
 *
 * Vietoje `ReactDOM.createRoot` aplikacija turi būti sukuriama
 * naudojant `singleSpaReact`.
 * Parametras įprastai paduodamas `ReactDOM.createRoot(...).render(...)
 * šiuo atveju analogiškai perduodamas kaip `rootComponent` reikšmė.
 *
 * Bylos pavadinimas, šiuo atveju `rc-ses-self-service-provider-demo-react-ui.tsx`,
 * privalo atitikti tokią pat konvenciją, t.y. projekto pavadinimas su `rec-ses`
 * prefix'u. Atitinkamai bylos pavadinimas turi atitikti webpack.config.js
 * konfigūracijoje nurodytą reikšmę `projectName` be prefix'o, bei `package.json`
 * projekto pavadinimą `@rc-ses/self-service-provider-demo-react-ui` formatu.
 */
const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: App,
  errorBoundary(err, info, props) {
    console.debug(err, info, props);
    return <div>This renders when a catastrophic error occurs</div>;
  },
});

/*
 * @MICROFRONTEND
 *
 * single-spa pateikiami lifecycle hook'ai.
 */
export const { bootstrap, mount, unmount } = lifecycles;
