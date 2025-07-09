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
import React from 'react';
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
function ObjectIdentifierSearchModal({ open, onSubmit, onClose }: Props) {
  const [results, setResults] = React.useState<FormModelOutput[]>();

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
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
    setResults([]);
    reset();
  };

  const handleOnSubmit = () => {
    setResults([]);
    reset();
    onSubmit('1099-2018-8012');
    onClose();
  };

  const handleOnSearch = () => {
    setResults([
      {
        regNo: '44/446848',
        type: 'Mišrus pastatas',
        uniqueIdentifier: '1099-2018-8012',
        address: 'Vilnius, Vydūno g. 17',
      },
      {
        regNo: '44/446848',
        type: 'Mišrus pastatas',
        uniqueIdentifier: '1111-1111-1111',
        address: 'Vilnius, Vydūno g. 17',
      },
    ]);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <DialogTitle>Nekilnojamo turto objekto paieška</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(handleOnSearch)} noValidate>
          <Grid container columnSpacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Savivaldybė'
                errors={errors?.addressNo}
                {...register('district', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Gyvenamoji vietovė'
                errors={errors?.city}
                {...register('city')}
                slotProps={{ wrapper: { labelOnTop: false }, field: { name: 'test' } }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <RcSesTextField
                label='Gatvė'
                required
                errors={errors?.street}
                {...register('street', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Namo nr.'
                errors={errors?.housingNo}
                {...register('housingNo', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <RcSesTextField
                required
                label='Buto nr.'
                errors={errors?.aptNo}
                {...register('aptNo', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
          </Grid>

          <Stack justifyContent='flex-end' direction='row' spacing={1}>
            <Button type='submit'>Ieškoti</Button>
            <Button variant='outlined' onClick={handleOnReset}>
              Išvalyti
            </Button>
          </Stack>
        </form>

        <Divider />
        {results && (
          <TableContainer sx={{ background: 'red' }}>
            <Table sx={{ background: 'blue' }}>
              <TableHead sx={{ background: 'yellow' }}>
                <TableRow>
                  <TableCell>Reg.&nbsp;Nr.</TableCell>
                  <TableCell>Objektas</TableCell>
                  <TableCell>Unikalus&nbsp;Nr.</TableCell>
                  <TableCell>Adresas</TableCell>
                  <TableCell>Veiksmai</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {results?.map((row) => (
                  <TableRow key={row.regNo}>
                    <TableCell component='th' scope='row'>
                      {row.regNo}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.uniqueIdentifier}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>
                      {' '}
                      <Button onClick={handleOnSubmit}>Pridėti</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions>
        {/* <Button disabled={!results?.length} onClick={handleOnSubmit}>
          Pridėti
        </Button> */}
        <Button color='error' variant='outlined' onClick={onClose}>
          Atšaukti
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ObjectIdentifierSearchModal;
