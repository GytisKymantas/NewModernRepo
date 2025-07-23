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
};
function NotaryPersonModal({ open, onSubmit, onClose }: Props) {
  const [results, setResults] = React.useState<FormModelOutput[] | FormModel[]>();
  const formRef = useRef(null);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      personalCo: '',
      firstName: '',
      lastName: '',
      actions: null,
      municipality: '',
      address: '',
      street: '',
      houseNumber: '',
      apartmentNumber: '',
    },
  });
  const values = getValues();

  const handleOnReset = () => {
    setResults(undefined);
    reset();
  };

  const handleOnSubmit = () => {
    console.log('Submitting form with values:', values);
    onClose();
    onSubmit(values);
    handleOnReset();
  };

  const handleOnSearch = () => {
    console.log('Searching with form values:', values);

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
  };
  console.log('openopenopen:', open);

  console.log('Form values inside modal:', values);

  return (
    <Dialog onClose={onClose} open={!!open} maxWidth='md'>
      <DialogTitle>Asmens Paieška</DialogTitle>
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
              {open === 'address' ? (
                <>
                  <RcSesSelect
                    id='Savivaldybė'
                    name='Municipality'
                    control={control}
                    placeholder='Pasirinkite Savivaldybė'
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
                    label='Asmens Kodas'
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
                    id='radioSelection1'
                    name='radioSelection1'
                    control={control}
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
            <Button onClick={handleOnSearch}>Ieškoti</Button>
            <Button variant='outlined' onClick={handleOnReset}>
              Išvalyti
            </Button>
          </Stack>
          {results && (
            <TableContainer sx={{ background: 'red' }}>
              <Table sx={{ background: 'blue' }}>
                <TableHead sx={{ background: 'yellow' }}>
                  <TableRow>
                    <TableCell>Juridinio asmens kodas</TableCell>
                    <TableCell>Juridinio asmens pavadinimas</TableCell>
                    <TableCell>Adresas</TableCell>
                    <TableCell>Veiksmai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results?.map((row) => (
                    <TableRow key={`${row.legalName}`}>
                      <TableCell component='th' scope='row'>
                        {row.personalCo}
                      </TableCell>
                      <TableCell>{row.legalName}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Button
                          type='submit'
                          // onClick={() => {
                          //   onSubmit(row);
                          // }}
                        >
                          Pridėti
                        </Button>
                      </TableCell>
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
