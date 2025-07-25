/* eslint-disable no-console */
import { RcSesFormControlWrapperProps } from '@registrucentras/rc-ses-react-components';

import {
  OutlinedTextFieldProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { forwardRef, useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import ChangeAddressIcon from '@/assets/icons/ChangeAddressIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import palette from '@/theme/palette';
import { useController, UseControllerProps } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

type ModalComponentProps = {
  open: any;
  onSubmit: (value: string) => void;
  onClose: () => void;
  currentIndex?: number;
};

type TControllerProps = UseControllerProps<any, any>;
type ImmediateControllerProps = 'control' | 'rules' | 'disabled' | 'name';

type TFieldProps = Omit<OutlinedTextFieldProps, 'variant'>;

type TWrapperProps = RcSesFormControlWrapperProps;
type ImmediateWrapperProps = 'id' | 'label' | 'errors';

type CombinedProps = Pick<TControllerProps, ImmediateControllerProps> &
  Pick<TWrapperProps, ImmediateWrapperProps> & {
    ModalComponent: React.JSXElementConstructor<ModalComponentProps>;
    slotProps?: {
      controller?: Partial<Omit<TControllerProps, ImmediateControllerProps>>;
      field?: Partial<TFieldProps>;
      wrapper?: Partial<Omit<TWrapperProps, ImmediateWrapperProps>>;
    };
    withTriggerText?: boolean;
  };

export type ModalStates = 'person' | 'address' | '';

const TableWithModal = forwardRef<HTMLInputElement, CombinedProps>((props, ref) => {
  const { t } = useTranslation('input', {
    keyPrefix: 'components.RcSesSearchableField',
  });
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

  const {
    field: { onChange },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister: true,
    ...slotProps?.controller,
  });

  const handleSubmit = (data: any) => {
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
    console.log(data, 'data submitted');
  };

  return (
    <>
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
                  <TableRow key={index}>
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

                      <PrimaryButton
                        variant='text'
                        size='small'
                        onClick={() => {
                          setModalOpen('address');
                          setCurrentIndex(index);
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
        onSubmit={handleSubmit}
      />
    </>
  );
});

export default TableWithModal;
