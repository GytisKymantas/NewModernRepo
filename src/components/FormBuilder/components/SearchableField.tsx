/* eslint-disable no-nested-ternary */
import { RcSesFormControlWrapperProps } from '@registrucentras/rc-ses-react-components';

import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedTextFieldProps,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import AddPlusIcon from '@/assets/icons/AddPlusIcon';
import ChangeAddressIcon from '@/assets/icons/ChangeAddressIcon';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useController, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import FormControlWrapper from './FormControlWrapper';

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
    placeholderText?: string;
    sxStyle?: SxProps;
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
      placeholderText,
      sxStyle,
      ...fieldProps
    } = props;
    const { name } = fieldProps;

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const id = useMemo(() => fieldProps.id ?? uuidv4(), [fieldProps.id]);
    const [localData, setLocalData] = useState(null);
    const submittedData = localStorage.getItem('combinedFormData');

    useEffect(() => {
      if (submittedData) setLocalData(JSON.parse(submittedData));
    }, [submittedData]);

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
      <Box sx={sxStyle}>
        <FormControlWrapper
          id={id}
          errors={errors}
          label={label}
          withTriggerText={withTriggerText}
          required={!!rules?.required}
        >
          {withTriggerText ? (
            <>
              <TextField
                placeholder={placeholderText}
                id={id}
                multiline
                maxRows={2}
                inputRef={ref}
                InputProps={{
                  inputProps: {
                    onClick: () => setModalOpen(true),
                    style: {
                      paddingLeft: 0,
                      paddingTop: 0,
                      paddingBottom: 50,
                    },
                  },
                  readOnly: true,
                }}
                error={!!errors}
                fullWidth
                sx={{
                  '& fieldset': { border: 'none' },
                  '& .MuiOutlinedInput-input::placeholder': {
                    opacity: 1,
                  },
                }}
                {...slotProps?.field}
                label={undefined}
                value={localData?.address ?? ''}
              />
              <Box
                sx={{
                  cursor: 'text',
                  position: 'absolute',
                  top: '0px',
                  paddingTop: '35px',
                }}
              >
                <PrimaryButton
                  variant='text'
                  size='small'
                  onClick={() => setModalOpen(true)}
                  startIcon={<ChangeAddressIcon />}
                  sx={{
                    color: '#1F2733',
                  }}
                >
                  Keisti Adresą
                </PrimaryButton>
              </Box>
            </>
          ) : !localData?.[id] && !withTriggerText ? (
            <TextField
              placeholder={placeholderText}
              id={id}
              inputRef={ref}
              multiline
              minRows={1}
              InputProps={{
                inputProps: {
                  onClick: () => setModalOpen(true),
                  sx: { cursor: 'pointer', whiteSpace: 'pre-line' },
                },
                readOnly: true,
                startAdornment: !localData?.[id] ? (
                  <InputAdornment position='start'>
                    <IconButton
                      aria-label={t('searchAriaLabel')}
                      onClick={() => setModalOpen(true)}
                    >
                      <AddPlusIcon />
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
                sx: { cursor: 'pointer' },
              }}
              error={!!errors}
              fullWidth
              sx={{
                '& fieldset': { border: 'none' },
                '& .MuiOutlinedInput-input::placeholder': { opacity: 1 },
              }}
              {...slotProps?.field}
              label={undefined}
            />
          ) : (
            <Grid container spacing={0.1}>
              <Grid item xs={3}>
                <Typography variant='body2'>Vardas</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1'>
                  {localData?.[id]?.name ?? 'Nenurodytas'}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body2'>Pavardė</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1'>
                  {localData?.[id]?.lastName ?? 'Nenurodytas'}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant='body2'>Asmens kodas</Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant='body1'>{localData[id].personalCo}</Typography>
              </Grid>
              <Grid item xs={12}>
                <PrimaryButton
                  variant='text'
                  size='small'
                  onClick={() => setModalOpen(true)}
                  startIcon={<ChangeAddressIcon />}
                  sx={{
                    color: '#1F2733',
                    textTransform: 'none',
                  }}
                >
                  Keisti Asmenį
                </PrimaryButton>
              </Grid>
            </Grid>
          )}
        </FormControlWrapper>

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
