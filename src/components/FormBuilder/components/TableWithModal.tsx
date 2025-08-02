/* eslint-disable no-console */
import { RcSesFormControlWrapperProps } from '@registrucentras/rc-ses-react-components';
import { v4 as uuidv4 } from 'uuid';

import {
  MenuItem,
  OutlinedTextFieldProps,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { forwardRef, useRef, useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import ChangeAddressIcon from '@/assets/icons/ChangeAddressIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import palette from '@/theme/palette';
import { useController, UseControllerProps } from 'react-hook-form';
import toast from 'react-hot-toast';

type ModalComponentProps = {
  open: boolean | string;
  onSubmit: (value: string) => void;
  onClose: () => void;
  currentIndex?: number;
};

// eslint-disable-next-line react-hooks/exhaustive-deps
type TControllerProps = UseControllerProps<any, any>;
type ImmediateControllerProps = 'control' | 'rules' | 'disabled' | 'name';

type TFieldProps = Omit<OutlinedTextFieldProps, 'variant'>;

type TWrapperProps = RcSesFormControlWrapperProps;
type ImmediateWrapperProps = 'id' | 'label' | 'errors';

export type CombinedProps = Pick<TControllerProps, ImmediateControllerProps> &
  Pick<TWrapperProps, ImmediateWrapperProps> & {
    ModalComponent: React.JSXElementConstructor<ModalComponentProps>;
    slotProps?: {
      controller?: Partial<Omit<TControllerProps, ImmediateControllerProps>>;
      field?: Partial<TFieldProps>;
      wrapper?: Partial<Omit<TWrapperProps, ImmediateWrapperProps>>;
    };
    withTriggerText?: boolean;
  };

export type ModalStates =
  | 'person'
  | 'address'
  | 'Lietuvos adresas'
  | 'Užsienio adresas'
  | '';

const TableWithModal = forwardRef<HTMLInputElement, CombinedProps>((props) => {
  const {
    control,
    errors,
    label,
    ModalComponent,
    rules,
    slotProps,
    withTriggerText,
    ...fieldProps
  } = props;
  const { name } = fieldProps;
  const [modalOpen, setModalOpen] = useState<ModalStates>('');
  const [currentIndex, setCurrentIndex] = useState(null);
  const [submitedData, setSubmitedData] = useState([]);
  const selectRef = useRef<HTMLInputElement | null>(null);

  const {
    field: { value },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister: true,
    ...slotProps?.controller,
  });

  const handleSubmit = (data) => {
    if (modalOpen === 'address') {
      setSubmitedData((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          address: data.address, // Only update address
        };
        return updated;
      });
    } else {
      setSubmitedData((prev) => [...prev, data]);
    }
    setModalOpen('');
    // console.log(data, 'data submitted');
  };

  // const handleChange = (event) => {
  //   // console.log(event.target.value, 'Selected address type');
  //   setModalOpen(event.target.value);
  // };

  return (
    <>
      <p>{value as string}</p>
      {submitedData.length > 0 && (
        <TableContainer>
          <Table
            sx={{
              backgroundColor: '#f9fafb',
              borderCollapse: 'collapse',
              width: '100%',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: '#f9fafb' }}>Juridinis Asmuo</TableCell>
                <TableCell sx={{ backgroundColor: '#f9fafb' }}>Buveinė</TableCell>
                <TableCell sx={{ backgroundColor: '#f9fafb' }}>Veiksmai</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {submitedData && submitedData.length > 0 ? (
                submitedData.map((person, index) => (
                  <TableRow key={uuidv4()}>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        color: palette.grey[600],
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {person.firstName} {person.lastName}
                      <PrimaryButton
                        variant='text'
                        size='small'
                        onClick={() => {
                          setSubmitedData((prev) => {
                            const updated = [...prev];
                            updated[index] = {
                              ...updated[index],
                              firstName: 'bam',
                              lastName: 'bim',

                              // Only update name
                            };

                            toast.success('Vardas pakeistas.', {
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

                            return updated;
                          });
                        }}
                        startIcon={<ChangeAddressIcon />}
                        sx={{
                          color: '#1F2733',
                          '&:hover': {
                            backgroundColor: 'inherit',
                            boxShadow: 'none',
                          },
                        }}
                      >
                        Keisti Asmenį
                      </PrimaryButton>
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                      {person.personalCo}
                    </TableCell>
                    <TableCell
                      sx={{
                        textAlign: 'center',
                        color: palette.grey[600],
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {person.address}
                      <>
                        <PrimaryButton
                          variant='text'
                          size='small'
                          onClick={() => {
                            if (selectRef.current) {
                              selectRef.current.focus(); // opens the Select dropdown
                            }
                          }}
                          startIcon={<ChangeAddressIcon />}
                          sx={{
                            color: '#1F2733',
                            '&:hover': {
                              backgroundColor: 'inherit',
                              boxShadow: 'none',
                            },
                          }}
                        >
                          Keisti Asmenį
                        </PrimaryButton>

                        <Select
                          inputRef={selectRef}
                          value='Lietuvos adresas'
                          onChange={(event) => {
                            const selectedValue = event.target.value as
                              | 'Lietuvos adresas'
                              | 'Užsienio adresas';
                            setCurrentIndex(index);
                            setModalOpen(selectedValue);
                          }}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          sx={{
                            position: 'absolute',
                            opacity: 0,
                            pointerEvents: 'none',
                            height: 0,
                            width: 0,
                          }}
                        >
                          <MenuItem value='Lietuvos adresas'>Lietuvos adresas</MenuItem>
                          <MenuItem value='Užsienio adresas'>Užsienio adresas</MenuItem>
                        </Select>
                      </>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    sx={{ textAlign: 'center', color: palette.grey[600] }}
                  >
                    Nenurodytas atstovaujamas asmuo
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <PrimaryButton
        variant='contained'
        onClick={() => setModalOpen('person')}
        size='medium'
        startIcon={<AddIcon />}
        sx={{
          mt: '10px',
          backgroundColor: `${palette.grey[100]} !important`,
          color: palette.grey[900],
          padding: '8px 16px',
          fontSize: '1rem',
        }}
      >
        Pridėti asmenį
      </PrimaryButton>
      <ModalComponent
        open={modalOpen}
        onClose={() => setModalOpen('')}
        currentIndex={currentIndex}
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onSubmit={handleSubmit}
      />
    </>
  );
});

export default TableWithModal;
