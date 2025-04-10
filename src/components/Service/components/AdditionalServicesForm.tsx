import React from 'react'
import { useForm } from 'react-hook-form'

import { RcSesTextField } from '@registrucentras/rc-ses-react-components'

type FormModel = {
  additionalServices: string
}

function AdditionalServicesForm() {
  const {
    formState: { errors },
    register,
  } = useForm<FormModel>({
    defaultValues: {
      additionalServices: 'Tekstinė reikšmė',
    },
  })

  return (
    <RcSesTextField
      id='serviceName'
      label='Paslaugos pavadinimas'
      errors={errors?.additionalServices}
      {...register('additionalServices', { required: true, disabled: true })}
    />
  )
}

export default AdditionalServicesForm
