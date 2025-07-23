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
import { useTranslation } from 'react-i18next';

type ModalComponentProps = {
  open: any;
  onSubmit: (value: string) => void;
  onClose: () => void;
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
  const [localData, setLocalData] = useState(null);
  const [submitedData, setSubmitedData] = useState([]);

  // const submittedData = localStorage.getItem('submittedData');

  // useEffect(() => {
  //   if (submittedData) setLocalData(JSON.parse(submittedData));
  // }, [submittedData]);

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
    setSubmitedData((prev) => [...prev, data]);
    setModalOpen('');
    console.log(data, 'data any');
  };

  console.log(submitedData, 'submitedData');

  // const { watch } = useFormContext();
  return (
    <>
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
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    {person.firstName}
                    {person.lastName}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    {person.personalCo}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    {person.address}

                    <PrimaryButton
                      variant='text'
                      size='small'
                      onClick={() => setModalOpen('address')}
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
                  Nenurodytas atstovaujamas asmuo xx
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
        onSubmit={handleSubmit}
      />
    </>
  );
});

export default TableWithModal;
