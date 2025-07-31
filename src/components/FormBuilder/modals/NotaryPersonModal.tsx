import { BodyText } from '@/components/Service/components/ServiceDetailsForm';
import theme from '@/theme';
import styled from '@emotion/styled';
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
  useMediaQuery,
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
  modalType:string;
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

const StyledForm = styled.form`
  @media (max-width: 900px) {
    padding: 16px;
    backgroundcolor: #f9fafb;
  }
`;

function NotaryPersonModal({ open, onSubmit, onClose, currentIndex }: Props) {
  const [results, setResults] = React.useState<any>();
  const formRef = useRef(null);
  const isAddressModal = open === 'address';
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

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
      modalType:'Lietuvos adresas',
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
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 16px !important',
        }}
      >
        <DialogTitle sx={{ fontSize: '18px !important', padding: '0 !important' }}>
          {' '}
          {isAddressModal ? 'Adreso Lietuvoje paieška' : 'Asmens Paieška'}
        </DialogTitle>

        <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M19.2806 18.2198C19.3502 18.2895 19.4055 18.3722 19.4432 18.4632C19.4809 18.5543 19.5003 18.6519 19.5003 18.7504C19.5003 18.849 19.4809 18.9465 19.4432 19.0376C19.4055 19.1286 19.3502 19.2114 19.2806 19.281C19.2109 19.3507 19.1281 19.406 19.0371 19.4437C18.9461 19.4814 18.8485 19.5008 18.7499 19.5008C18.6514 19.5008 18.5538 19.4814 18.4628 19.4437C18.3717 19.406 18.289 19.3507 18.2193 19.281L11.9999 13.0607L5.78055 19.281C5.63982 19.4218 5.44895 19.5008 5.24993 19.5008C5.05091 19.5008 4.86003 19.4218 4.7193 19.281C4.57857 19.1403 4.49951 18.9494 4.49951 18.7504C4.49951 18.5514 4.57857 18.3605 4.7193 18.2198L10.9396 12.0004L4.7193 5.78104C4.57857 5.64031 4.49951 5.44944 4.49951 5.25042C4.49951 5.05139 4.57857 4.86052 4.7193 4.71979C4.86003 4.57906 5.05091 4.5 5.24993 4.5C5.44895 4.5 5.63982 4.57906 5.78055 4.71979L11.9999 10.9401L18.2193 4.71979C18.36 4.57906 18.5509 4.5 18.7499 4.5C18.949 4.5 19.1398 4.57906 19.2806 4.71979C19.4213 4.86052 19.5003 5.05139 19.5003 5.25042C19.5003 5.44944 19.4213 5.64031 19.2806 5.78104L13.0602 12.0004L19.2806 18.2198Z'
              fill='#1F2733'
            />
          </svg>
        </Box>
      </Box>
      <Divider sx={{ marginBottom: '0' }} />

      <DialogContent>
        <Box
          sx={{
            maxWidth: '850px',
            width: '100%',
            margin: '0 auto',
            padding: !upMd ? '0 16px' : '0',
            marginTop: '16px',
            backgroundColor: '#F9FAFB',
          }}
        >
          <RcSesAlert severity='warning'>
            Pagal nurodytus duomenis asmuo nerastas
          </RcSesAlert>{' '}
        </Box>
        <StyledForm ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
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
            <DialogActions
              sx={{
                display: 'flex',
                flexDirection: !upMd ? 'column' : 'row-reverse',
                justifyContent: !upMd ? 'flex-end' : 'flex-start',
                gap: '13px',
                padding: '0 !important',
                width: '100% !important',
              }}
            >
              <Button
                // type='submit'
                variant='contained'
                onClick={handleOnSearch}
                disabled={isAddressModal ? isDisabledAdressModalCTA : isDisabled}
                sx={{ width: !upMd ? '100%' : 'unset', fontWeight: '600' }}
              >
                Ieškoti
              </Button>
              <Button
                color='inherit'
                variant='contained'
                onClick={handleOnReset}
                sx={{
                  backgroundColor: !upMd ? '#F0F2F5' : 'transparent',
                  fontWeight: '600',
                  width: !upMd ? '100%' : 'unset',
                  marginLeft: '0 !important',
                }}
              >
                Išvalyti
              </Button>
            </DialogActions>
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
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}

export default NotaryPersonModal;
