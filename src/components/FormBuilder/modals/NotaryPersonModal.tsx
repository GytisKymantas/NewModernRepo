import { BodyText } from '@/components/Service/components/ServiceDetailsForm';
import {
  Box,
  Button,
  DialogActions,
  Divider,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import {
  RcSesAlert,
  RcSesRadioButtonGroup,
  RcSesSelect,
  RcSesTextField,
} from '@registrucentras/rc-ses-react-components';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ModalStates } from '../components/TableWithModal';

type FormModel = {
  firstName: string;
  lastName: string;
  personalCo: string;
  actions: null;
  municipality: string;
  address: string;
  street: string;
  houseNumber: string;
  apartmentNumber: string;
  radioSelectionPerson: string;
  radioSelectionAddress: string;
};

export type FormModelOutput = {
  personalCo: string;
  legalName: string;
  address: string;
  actions: React.ReactNode;
};

type Props = {
  open: ModalStates;
  onSubmit: (data: FormModel) => void;
  onClose: () => void;
  currentIndex?: number;
};
function NotaryPersonModal({ open, onSubmit, onClose, currentIndex }: Props) {
  const [results, setResults] = React.useState<any>();
  const formRef = useRef(null);
  const isAddressModal = open === 'address';

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      personalCo: '',
      firstName: '',
      lastName: '',
      actions: null,
      municipality: '',
      address: 'Vilnius default',
      street: '',
      radioSelectionPerson: 'LRFA',
      radioSelectionAddress: 'Kaunas',
      houseNumber: '',
      apartmentNumber: '',
    },
  });
  const values = getValues();

  const watchedFirstName = watch('firstName');
  const watchedLastName = watch('lastName');
  const watchedPersonalCo = watch('personalCo');
  const watchedSelectionPerson = watch('radioSelectionPerson');
  const watchedSelectionAddress = watch('radioSelectionAddress');
  const watchedSelectionStreet = watch('street');

  const isDisabled =
    !watchedFirstName ||
    !watchedLastName ||
    !watchedPersonalCo ||
    !watchedSelectionPerson ||
    !watchedSelectionAddress;

  const isDisabledAdressModalCTA =
    !watchedSelectionPerson || !watchedSelectionAddress || !watchedSelectionStreet;

  const handleOnReset = () => {
    setResults(undefined);
    reset();
  };

  const handleOnSubmit = () => {
    console.log('Submitting form with values:', values);
    onClose();
    onSubmit(values);
    handleOnReset();

    toast.success('Asmuo pridėtas.', {
      style: {
        border: '1px solid #008561',
        background: '#008561',
        padding: '16px',
        color: 'white',
        width: '350px',
        whiteSpace: 'nowrap',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#008561',
      },
    });
  };

  const handleOnSubmitIfAddress = () => {
    console.log('Submitting form with values:', values);
    onClose();
    onSubmit({ address: 'Updated Address' } as any);
    handleOnReset();
    toast.success('Adresas pakeistas.', {
      style: {
        border: '1px solid #008561',
        background: '#008561',
        padding: '16px',
        color: 'white',
        width: '350px',
        whiteSpace: 'nowrap',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#008561',
      },
    });
  };

  const handleOnSearch = () => {
    console.log('Searching with form values:', values);

    if (isAddressModal) {
      setResults([
        {
          personalCo: '3931145343',
          firstName: 'Vardas',
          birthDay: '1992-10-21',
          lastName: 'Pavarde',
          address: 'Vilniaus g. 10, Vilnius',
          actions: null,
        },
        {
          personalCo: '3931145343',
          firstName: 'Vardas',
          birthDay: '1992-10-21',
          lastName: 'Pavarde',
          address: 'Vilniaus g. 10, Vilnius',
          actions: null,
        },
      ]);
    } else {
      setResults([
        {
          personalCo: '1099-2018-8012',
          legalName: 'UAB Technologijos',
          address: 'Vilniaus g. 10, Vilnius',
          actions: null,
        },
        {
          personalCo: '2055-6633-9922',
          legalName: 'MB Inovacijos',
          address: 'Kauno g. 20, Kaunas',
          actions: null,
        },
      ]);
    }
  };


  return (
    <Dialog onClose={onClose} open={!!open} maxWidth='md'>
      <DialogTitle> {isAddressModal ? 'Adreso Paieška' : 'Asmens Paieška'}</DialogTitle>
      <Divider />
      <Box sx={{ maxWidth: '808px', width: '100%', margin: '0 auto' }}>
        <RcSesAlert severity='warning'>
          Pagal nurodytus duomenis asmuo nerastas
        </RcSesAlert>{' '}
      </Box>

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <Grid container columnSpacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12}>
              {isAddressModal ? (
                <>
                  <RcSesSelect
                    id='Savivaldybė'
                    name='Municipality'
                    control={control}
                    placeholder='Pasirinkite Savivaldybė'
                    {...register('radioSelectionAddress', { required: true })}
                    rules={{ required: true }}
                    sx={{
                      backgroundColor: '#f5f5f5',

                      '.MuiInputBase-input::placeholder': {
                        color: '#6B747F',
                        opacity: 1, // Ensure the color isn't faded
                      },
                    }}
                    label='Savivaldybė'
                    errors={errors?.municipality}
                    options={[
                      { value: 'Vilnius', label: 'Vilnius' },
                      { value: 'Kaunas', label: 'Kaunas' },
                      { value: 'Alytus', label: 'Alytus' },
                    ]}
                  />
                  <RcSesTextField
                    label='Adresas'
                    {...register('address', { required: true })}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />
                  <RcSesTextField
                    label='Gatvės pavadinimas'
                    {...register('street')}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />
                  <RcSesTextField
                    label='Namo numeris'
                    {...register('houseNumber')}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />{' '}
                  <RcSesTextField
                    label='Apartamento numeris'
                    {...register('apartmentNumber')}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />{' '}
                </>
              ) : (
                <>
                  <RcSesRadioButtonGroup
                    id='radioSelectionPerson'
                    name='radioSelectionPerson'
                    control={control}
                    {...register('radioSelectionPerson', { required: true })}
                    label={
                      <>
                        <BodyText>Asmens tipas</BodyText>
                      </>
                    }
                    errors={errors?.firstName}
                    options={[
                      { label: 'Lietuvos Respublikos fizinis asmuo', value: 'LRFA' },
                      { label: 'Lietuvos Respublikos juridinis asmuo', value: 'LRJA' },
                      { label: 'Užsienio fizinis asmuo', value: 'UFA' },
                      { label: 'Užsienio juridinis asmuo', value: 'UJA' },
                    ]}
                  />
                  <RcSesTextField
                    label='Asmens Kodas'
                    {...register('personalCo', { required: true })}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />
                  <RcSesTextField
                    label='Vardas'
                    {...register('firstName')}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />
                  <RcSesTextField
                    label='Pavardė'
                    {...register('lastName')}
                    slotProps={{ wrapper: { labelOnTop: false } }}
                  />{' '}
                </>
              )}
            </Grid>
          </Grid>

          <Stack
            justifyContent='flex-end'
            direction='row'
            spacing={1}
            sx={{ pb: '32px' }}
          >
            <Button
              onClick={handleOnSearch}
              disabled={isAddressModal ? isDisabledAdressModalCTA : isDisabled}
            >
              Ieškoti
            </Button>
            <Button variant='outlined' onClick={handleOnReset}>
              Išvalyti
            </Button>
          </Stack>
          {results && (
            <TableContainer sx={{ background: 'red' }}>
              <Table sx={{ background: 'blue' }}>
                <TableHead sx={{ background: 'yellow' }}>
                  <TableRow>
                    {isAddressModal ? (
                      <>
                        <TableCell>Vardas</TableCell>
                        <TableCell>Pavardė</TableCell>
                        <TableCell>Asmens kodas</TableCell>
                        <TableCell>Gimimo data</TableCell>
                        <TableCell>Korespondencijos adresas</TableCell>
                        <TableCell>Veiksmai</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>Juridinio asmens kodas</TableCell>
                        <TableCell>Juridinio asmens pavadinimas</TableCell>
                        <TableCell>Adresas</TableCell>
                        <TableCell>Veiksmai</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results?.map((row) => (
                    <TableRow key={`${row.legalName}`}>
                      {isAddressModal ? (
                        <>
                          <TableCell component='th' scope='row'>
                            {row.firstName}
                          </TableCell>
                          <TableCell>{row.lastName}</TableCell>
                          <TableCell> {row.personalCo}</TableCell>
                          <TableCell>{row.birthDay}</TableCell>
                          <TableCell>{row.address}</TableCell>
                          <TableCell>
                            <Button type='button' onClick={handleOnSubmitIfAddress}>
                              Pridėti
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell component='th' scope='row'>
                            {row.personalCo}
                          </TableCell>
                          <TableCell>{row.legalName}</TableCell>
                          <TableCell>{row.address}</TableCell>

                          <TableCell>
                            <Button type='button' onClick={handleOnSubmit}>
                              Pridėti
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='error' variant='outlined' onClick={onClose}>
          Atšaukti
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NotaryPersonModal;
