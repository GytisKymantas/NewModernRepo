import {
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
import { RcSesTextField } from '@registrucentras/rc-ses-react-components';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

type FormModel = {
  city: string;
  street: string;
  addressNo: string;
  housingNo: string;
  aptNo: string;
  district: string;
};

type FormModelOutput = {
  regNo: string;
  type: string;
  uniqueIdentifier: string;
  address: string;
};

type Props = {
  open: boolean;
  onSubmit: (value: string) => void;
  onClose: () => void;
};
function SearchModal({ open, onSubmit, onClose }: Props) {
  const [results, setResults] = React.useState<FormModelOutput[] | FormModel[]>();
  const formRef = useRef(null);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      city: '',
      street: '',
      addressNo: '',
      housingNo: '',
      aptNo: '',
      district: '',
    },
  });

  const handleOnReset = () => {
    setResults(undefined);
    reset();
  };

  const handleOnSubmit = () => {
    handleOnReset();
    onClose();
  };

  const handleOnSearch = () => {
    setResults([
      {
        regNo: '10/201729',
        type: 'Mišrus pastatas',
        uniqueIdentifier: '1099-2018-8012',
        address: 'Vilnius, Vydūno g. 17',
      },
      {
        regNo: '10/201728',
        type: 'Negyvenamoji patalpa',
        uniqueIdentifier: '1096-2030-1019:0080	',
        address: 'Vilnius, Savanorių pr. 25',
      },
      {
        regNo: '10/2017287	',
        type: 'Negyvenamoji patalpa',
        uniqueIdentifier: '1096-2030-1019:0080',
        address: 'Vilnius, Savanorių pr. 25',
      },
    ]);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <DialogTitle>Adreso Lietuvoje paieška</DialogTitle>
      <Divider />

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <Grid container columnSpacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Savivaldybė'
                placeholder='Pasirinkite savivaldybę'
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Gyvenamoji vietovė'
                placeholder='Įrašykite gyvenamąją vietovę'
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                label='Gatvė'
                required
                placeholder='Įrašykite gatvę'
                errors={errors?.street}
                {...register('street', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Namo nr.'
                placeholder='Įrašykite namo numerį'
                errors={errors?.housingNo}
                {...register('housingNo', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Buto nr.'
                placeholder='Įrašykite buto numerį'
                errors={errors?.aptNo}
                {...register('aptNo', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
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
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reg. Nr.</TableCell>
                    <TableCell>Objektas</TableCell>
                    <TableCell>Unikalus nr.</TableCell>
                    <TableCell>Adresas</TableCell>
                    <TableCell>Veiksmai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results?.map((row) => (
                    <TableRow key={`${row.regNo}`}>
                      <TableCell component='th' scope='row'>
                        {row.regNo}
                      </TableCell>
                      <TableCell>{row.type}</TableCell>
                      <TableCell>{row.uniqueIdentifier}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Button
                          type='submit'
                          onClick={() => {
                            onSubmit(row.address);
                          }}
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

export default SearchModal;
