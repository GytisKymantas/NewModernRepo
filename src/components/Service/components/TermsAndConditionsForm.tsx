import React from 'react'
import { useForm } from 'react-hook-form'
import { RcSesCheckbox } from '@registrucentras/rc-ses-react-components'

type FormModel = {
  agreement: boolean
}

function TermsAndConditionsForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      agreement: false,
    },
  })

  return (
    // eslint-disable-next-line no-console
    <form onSubmit={handleSubmit(console.debug)} noValidate>
      <RcSesCheckbox
        id='agreement'
        name='agreement'
        control={control}
        errors={errors?.agreement}
        slotProps={{
          label: {
            slotProps: {
              typography: {
                fontWeight: 600,
                lineHeight: '1.3125rem',
                variant: 'body1',
              },
            },
          },
          wrapper: {
            hideLabel: true,
          },
        }}
        variant='flat'
      >
        Užsakydamas darbus esu susipažinęs su{' '}
        <a href='https://www.registrucentras.lt/p/775' target='_blank' rel='noreferrer'>
          darbų atlikimo ir atlyginimo tvarka
        </a>{' '}
        ir įsipareigoju apmokėti už užsakytus darbus. Esu informuotas, kad per nurodytą
        terminą neapmokėjus apskaičiuoto mokesčio, darbų užsakymas per pasiriktą terminą
        nebus įvykdytas.
      </RcSesCheckbox>
    </form>
  )
}

export default TermsAndConditionsForm
