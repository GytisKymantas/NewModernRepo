declare module '@rc-ses/mfe-host' {
  import * as React from 'react'

  /*
   * Funkcija, skirta nukreipti naudotoją į savitarnos krepšelio puslapį.
   */
  export const getToken: () => string;

  /*
   * Funkcija, skirta gauti paslaugos router'io `basename`
   */
  export const getServiceFormBaseUrl: () => string;

  /*
   * Funkcija, skirta gauti MFE router'io basename
   */
  export const getMFEBaseUrl: () => string;

  /*
   * Funkcija, skirta gauti "Paslaugos" router'io nuorodos fragmentą
   */
  export const getServiceFormUrlFragment: () => string;

  /*
   * Funkcija, skirta gauti "Mano Turtas" router'io nuorodos fragmentą
   */
  export const getOwnedPropertiesUrlFragment: () => string;

  /*
   * Funkcija, skirta nukreipti naudotoją į savitarnos krepšelio puslapį.
   */
  export const redirectToCart: () => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į viešojo portalo titulinį puslapį.
   */
  export const redirectToLanding: () => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į savitarnos titulinį puslapį.
   */
  export const redirectToSelfServiceDashboard: () => void;

  /*
  * Funkcija, skirta nukreipti naudotoją į savitarnos titulinį puslapį su klaidos pranešimu.
  */
  export const redirectToSelfServiceDashboardWithError: (type: 'failedToRetrieveOrderData' | 'failedToRetrieveListData') => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į savitarnos "Mano Turtas" puslapį.
   */
  export const redirectToSelfServiceOwnedProperties: () => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į paslaugos aprašymo puslapį.
   */
  export const redirectToServiceDescriptionPage: (id: string) => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į paslaugos aprašymo puslapį su nurodytu klaidos pranešimu.
   */
  export const redirectToServiceDescriptionPageWithError: (id: string, type: 'notAuthorizedToProvideBeneficiaries' | 'unsupportedRole') => void;

  /*
   * Funkcija, skirta nukreipti naudotoją į paslaugos aprašymo puslapį su klaidos pranešimu.
   */
  export const unsupportedServiceRedirect: (id: string, message: string) => void;
}
