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
  name: string;
  lastName: string;
  personalCo: string;
  address: string;
  actions: null;
};

export type FormModelOutput = {
  personalCo: string;
  legalName: string;
  address: string;
  actions: React.ReactNode;
};

type Props = {
  open: boolean;
  onSubmit: (data: FormModel) => void;
  onClose: () => void;
};
function PersonModal({ open, onSubmit, onClose }: Props) {
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
      personalCo: '',
      address: '',
      actions: null,
    },
  });

  const handleOnReset = () => {
    setResults(undefined);
    reset();
  };

  const handleOnSubmit = () => {
    handleOnReset();
    setResults(undefined);
    onClose();
  };

  const handleOnSearch = () => {
    setResults([
      {
        personalCo: '39001201234',
        name: 'Vardenis',
        lastName: 'Pavardenis',
        address: 'Vilnius, Savanorių pr. 25-5',
        actions: null,
      },
    ]);
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <DialogTitle>Asmens paieška</DialogTitle>
      <Divider />

      <DialogContent>
        <form ref={formRef} onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <Grid container columnSpacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                label='Asmens kodas'
                {...register('personalCo', { required: true })}
                slotProps={{ wrapper: { labelOnTop: false } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                label='Vardas'
                {...register('name')}
                slotProps={{ wrapper: { labelOnTop: false }, field: { name: 'test' } }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <RcSesTextField
                label='Pavardė'
                {...register('lastName')}
                slotProps={{ wrapper: { labelOnTop: false }, field: { name: 'test' } }}
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
                    <TableCell>Asmens kodas</TableCell>
                    <TableCell>Vardas</TableCell>
                    <TableCell>Pavardė</TableCell>
                    <TableCell>Korespondencijos adresas</TableCell>
                    <TableCell>Veiksmai</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results?.map((row) => (
                    <TableRow key={`${row.legalName}`}>
                      <TableCell component='th' scope='row'>
                        {row.personalCo}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        <Button
                          type='submit'
                          onClick={() => {
                            onSubmit(row);
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

export default PersonModal;
