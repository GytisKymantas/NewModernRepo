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
import { forwardRef, useEffect, useState } from 'react';

import AddIcon from '@/assets/icons/AddIcon';
import ChangeAddressIcon from '@/assets/icons/ChangeAddressIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import palette from '@/theme/palette';
import { useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type ModalComponentProps = {
  open: boolean;
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [localData, setLocalData] = useState(null);
  const submittedData = localStorage.getItem('submittedData');

  useEffect(() => {
    if (submittedData) setLocalData(JSON.parse(submittedData));
  }, [submittedData]);
  const {
    field: { onChange },
  } = useController({
    control,
    name,
    rules,
    shouldUnregister: true,
    ...slotProps?.controller,
  });

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
            <TableRow>
              {localData ? (
                <>
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    {localData.publicStatement.legalName}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    {localData.publicStatement.address}
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center', color: palette.grey[600] }}>
                    <PrimaryButton
                      variant='text'
                      size='small'
                      onClick={() => setModalOpen(true)}
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
                </>
              ) : (
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: 'center', color: palette.grey[600] }}
                >
                  Nenurodytas atstovaujamas asmuo
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <PrimaryButton
        variant='contained'
        onClick={() => setModalOpen(true)}
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
        onClose={() => setModalOpen(false)}
        onSubmit={(val: string) => onChange(val)}
      />
    </>
  );
});

export default TableWithModal;
