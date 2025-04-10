import React from 'react'

import {
  RcSesAccordion,
  RcSesServiceFormActions,
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController
} from '@registrucentras/rc-ses-react-components'

import BasicInformationForm from './components/BasicInformationForm'
import ServiceDetailsForm from './components/ServiceDetailsForm'
import ServiceIssuanceForm from './components/ServiceIssuanceForm'
import AdditionalServicesForm from './components/AdditionalServicesForm'
import TermsAndConditionsForm from './components/TermsAndConditionsForm'
import { redirectToSelfServiceDashboard, redirectToServiceDescriptionPage } from '@rc-ses/mfe-host'

function Service() {
  const accordionController = useAccordionController({
    initialState: {
      basicInformation: {
        expanded: false,
        state: 'completed',
        title: 'Bazinė informacija',
      },
      serviceDetails: {
        expanded: true,
        state: 'active',
        title: 'Paslaugos užsakymas',
      },
      serviceIssuance: {
        expanded: false,
        state: 'pending',
        title: 'Išdavimas',
      },
      additionalServices: {
        expanded: false,
        state: 'pending',
        title: 'Reikalingos papildomos paslaugos',
      },
      termsAndConditions: {
        expanded: false,
        state: 'pending',
        title: 'Terminai ir sąlygos',
      },
    },
  })

  return (
    <RcSesServicePage>
      <RcSesServiceFormContainer accordionController={accordionController} showProgressStepper>
        <RcSesAccordion id='basicInformation' controller={accordionController}>
          <BasicInformationForm />
        </RcSesAccordion>

        <RcSesAccordion id='serviceDetails' controller={accordionController}>
          <ServiceDetailsForm />
        </RcSesAccordion>

        <RcSesAccordion id='serviceIssuance' controller={accordionController}>
          <ServiceIssuanceForm />
        </RcSesAccordion>

        <RcSesAccordion id='additionalServices' controller={accordionController}>
          <AdditionalServicesForm />
        </RcSesAccordion>

        <RcSesAccordion id='termsAndConditions' controller={accordionController}>
          <TermsAndConditionsForm />
        </RcSesAccordion>

        <RcSesServiceFormActions
          onDiscard={() => redirectToServiceDescriptionPage('00000000-0000-0000-0000-000000000000')}
          onSaveDraft={() => redirectToSelfServiceDashboard()}
          onSubmit={() => redirectToSelfServiceDashboard()}
        />
      </RcSesServiceFormContainer>
    </RcSesServicePage>
  )
}

export default Service
