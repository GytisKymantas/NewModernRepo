/* eslint-disable no-console */
import {
  RcSesFormControlWrapper,
  RcSesFormControlWrapperProps,
} from '@registrucentras/rc-ses-react-components';

import { Box, OutlinedTextFieldProps, TextField } from '@mui/material';
import React, { useMemo } from 'react';

import ChangeAddressIcon from '@/assets/icons/ChangeAddressIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

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

const SearchableField = React.forwardRef<HTMLInputElement, CombinedProps>(
  (props, ref) => {
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

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const id = useMemo(() => fieldProps.id ?? uuidv4(), [fieldProps.id]);

    const {
      field: { onChange, value },
    } = useController({
      control,
      name,
      rules,
      shouldUnregister: true,
      ...slotProps?.controller,
    });

    return (
      <Box sx={{ paddingBottom: '50px' }}>
        <RcSesFormControlWrapper
          id={id}
          errors={errors}
          label={label}
          required={!!rules?.required}
          {...slotProps?.wrapper}
        >
          <TextField
            id={id}
            inputRef={ref}
            InputProps={{
              inputProps: {
                onClick: () => setModalOpen(true),
                sx: { cursor: 'pointer' },
              },
              readOnly: true,
              sx: { cursor: 'pointer' },
            }}
            error={!!errors}
            fullWidth
            {...slotProps?.field}
            label={undefined}
            value={value ?? ''}
          />
          {withTriggerText && (
            <Box
              sx={{
                cursor: 'pointer',
                position: 'absolute',
                top: '0px',
                paddingTop: '50px',
              }}
            >
              <PrimaryButton
                variant='text'
                size='small'
                onClick={() => setModalOpen(true)}
                startIcon={<ChangeAddressIcon />}
                sx={{
                  color: '#1F2733',
                  '&:hover': {
                    backgroundColor: 'inherit', // Keeps background unchanged
                    boxShadow: 'none', // Removes shadow on hover
                  },
                }}
              >
                Keisti Adresą
              </PrimaryButton>
            </Box>
          )}
        </RcSesFormControlWrapper>

        <ModalComponent
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={(val: string) => onChange(val)}
        />
      </Box>
    );
  },
);

export default SearchableField;
