declare module '@rc-ses/mfe-navigation' {
  import * as React from 'react'

  /*
   * Funkcija, skirta gauti šiuo metu vartotojo pasirinktą kalbą
   */
  export const getLanguage: () => string

  /*
   * Funkcija, skirta gauti su paslauga susijusio užsakymo ID, jei toks egzistuoja
   */
  export const getOrderId: () => string | undefined
}
