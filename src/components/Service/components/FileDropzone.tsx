import { Box, IconButton, Stack, SvgIcon, Typography, styled } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { UseControllerProps, useController } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import palette from '@/theme/palette';

import {
  RcSesFormControlWrapper,
  RcSesFormControlWrapperProps,
} from '@registrucentras/rc-ses-react-components';

import IconWithCircularBackground from './IconWithCircularBackground';

function XCircleFillIcon(props) {
  return (
    <SvgIcon {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <path
          d='M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm3.53 12.22a.75.75 0 1 1-1.06 1.06L12 13.06l-2.47 2.47a.75.75 0 1 1-1.06-1.06L10.94 12 8.47 9.53a.75.75 0 0 1 1.06-1.06L12 10.94l2.47-2.47a.751.751 0 0 1 1.06 1.06L13.06 12l2.47 2.47Z'
          fill='currentColor'
        />
      </svg>
    </SvgIcon>
  );
}

function UploadSimpleIcon({ className = undefined }) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M21 13.4996V19.4996C21 19.6985 20.921 19.8893 20.7803 20.0299C20.6397 20.1706 20.4489 20.2496 20.25 20.2496H3.75C3.55109 20.2496 3.36032 20.1706 3.21967 20.0299C3.07902 19.8893 3 19.6985 3 19.4996V13.4996C3 13.3007 3.07902 13.1099 3.21967 12.9693C3.36032 12.8286 3.55109 12.7496 3.75 12.7496C3.94891 12.7496 4.13968 12.8286 4.28033 12.9693C4.42098 13.1099 4.5 13.3007 4.5 13.4996V18.7496H19.5V13.4996C19.5 13.3007 19.579 13.1099 19.7197 12.9693C19.8603 12.8286 20.0511 12.7496 20.25 12.7496C20.4489 12.7496 20.6397 12.8286 20.7803 12.9693C20.921 13.1099 21 13.3007 21 13.4996ZM8.78063 7.28024L11.25 4.80993V13.4996C11.25 13.6985 11.329 13.8893 11.4697 14.0299C11.6103 14.1706 11.8011 14.2496 12 14.2496C12.1989 14.2496 12.3897 14.1706 12.5303 14.0299C12.671 13.8893 12.75 13.6985 12.75 13.4996V4.80993L15.2194 7.28024C15.3601 7.42097 15.551 7.50003 15.75 7.50003C15.949 7.50003 16.1399 7.42097 16.2806 7.28024C16.4214 7.13951 16.5004 6.94864 16.5004 6.74961C16.5004 6.55059 16.4214 6.35972 16.2806 6.21899L12.5306 2.46899C12.461 2.39926 12.3783 2.34394 12.2872 2.30619C12.1962 2.26845 12.0986 2.24902 12 2.24902C11.9014 2.24902 11.8038 2.26845 11.7128 2.30619C11.6217 2.34394 11.539 2.39926 11.4694 2.46899L7.71937 6.21899C7.57864 6.35972 7.49958 6.55059 7.49958 6.74961C7.49958 6.94864 7.57864 7.13951 7.71937 7.28024C7.86011 7.42097 8.05098 7.50003 8.25 7.50003C8.44902 7.50003 8.63989 7.42097 8.78063 7.28024Z'
        fill='#10161F'
      />
    </svg>
  );
}
const StyledCloseIcon = styled(XCircleFillIcon)({
  'path fill': palette.grey[950],
});

type TControllerProps = UseControllerProps<any, any>;
type ImmediateControllerProps = 'control' | 'rules';

type TFieldProps = React.InputHTMLAttributes<HTMLInputElement>;
type ImmediateFieldProps = 'onChange' | 'onBlur' | 'disabled' | 'name';

type TWrapperProps = RcSesFormControlWrapperProps;
type ImmediateWrapperProps = 'label' | 'errors';

type Props = Pick<TControllerProps, ImmediateControllerProps> &
  Pick<TFieldProps, ImmediateFieldProps> &
  Pick<TWrapperProps, ImmediateWrapperProps> & {
    id?: string;
    required?: boolean;
    slotProps?: {
      controller?: Partial<Omit<TControllerProps, ImmediateControllerProps>>;
      dropzone?: Partial<DropzoneOptions>;
      field?: Partial<Omit<TFieldProps, ImmediateFieldProps>>;
      wrapper?: Partial<Omit<TWrapperProps, ImmediateWrapperProps>>;
    };
  };

function RcSesFileDropzone(props: Props) {
  const { t } = useTranslation('input', { keyPrefix: 'components.RcSesFileDropzone' });

  const { control, errors, label, rules, slotProps, required, ...fieldProps } = props;
  console.log(props, 'this is propsz');
  const { name } = fieldProps;
  const { description, ...wrapperProps } = slotProps?.wrapper ?? {};

  const id = useMemo(() => fieldProps.id ?? uuidv4(), [fieldProps.id]);

  const {
    field: { value, onChange, ...fieldControlProps },
  } = useController({
    control,
    name,
    rules,
  });

  const onDrop = useCallback((acceptedFiles: Blob[]) => {
    onChange(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    ...slotProps?.dropzone,
  });

  const hasValidFileSelection = value && Array.isArray(value) && value.length > 0;

  const onRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <RcSesFormControlWrapper
      id={id}
      errors={errors}
      label={label}
      required={required}
      {...wrapperProps}
    >
      <Box
        {...getRootProps()}
        sx={{
          backgroundColor: () => {
            if (fieldProps.disabled) return 'white';
            return isDragActive ? palette.primary[50] : 'white';
          },
          borderColor: () => {
            if (errors) return palette.error[600];
            if (fieldProps.disabled) return palette.grey[300];
            return isDragActive ? palette.primary[500] : palette.grey[500];
          },
          borderRadius: '.1875rem',
          borderStyle: 'dashed',
          borderWidth: 1,
          px: 5.5,
          py: 5,

          '&:hover': {
            borderColor: () => {
              if (fieldProps.disabled) return palette.grey[300];
              return palette.primary[300];
            },
            cursor: fieldProps.disabled ? 'default' : 'pointer',
          },
        }}
      >
        <input {...getInputProps()} name={fieldControlProps.name} />

        <Stack direction='column' sx={{ alignItems: 'center', gap: 2 }}>
          <IconWithCircularBackground
            color={!fieldProps.disabled && isDragActive ? 'primary' : 'grey'}
            bgShade={!fieldProps.disabled && isDragActive ? '100' : '50'}
            iconShade={fieldProps.disabled ? '500' : '900'}
            Icon={UploadSimpleIcon}
          />

          <Stack gap={0.5} sx={{ flexGrow: 1 }}>
            {hasValidFileSelection && (
              <Stack>
                {value.map((file: File, index) => (
                  <Stack
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    direction='row'
                    sx={{ alignItems: 'center', gap: 1 }}
                  >
                    <Typography
                      sx={{
                        color: palette.grey[fieldProps.disabled ? 500 : 900],
                        fontSize: '.875rem',
                        fontWeight: 600,
                        lineHeight: '1.125rem',
                      }}
                    >
                      {file.name}
                      <Typography
                        component='span'
                        sx={{ color: palette.grey[500], fontSize: '.75rem', ml: 1 }}
                      >
                        ({Math.round(file.size / 1024)} KB)
                      </Typography>
                    </Typography>

                    <Box sx={{ ml: 'auto' }}>
                      <IconButton size='small' onClick={(e) => onRemoveFile(e, index)}>
                        <StyledCloseIcon />
                      </IconButton>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            )}

            {!hasValidFileSelection && (
              <>
                <Typography
                  sx={{
                    color: '#29323D',
                    fontWeight: 500,
                  }}
                >
                  <Trans t={t} i18nKey='label'>
                    Nutempkite failą čia arba
                    <Typography
                      component='span'
                      sx={{
                        color: '#0079AD',
                        fontSize: '.875rem',
                        fontWeight: 600,
                        lineHeight: '1.125rem',
                        textDecoration: 'underline',
                      }}
                    >
                      {' '}
                      įkelkite{' '}
                    </Typography>
                    iš kompiuterio
                  </Trans>
                </Typography>

                {!!description && (
                  <>
                    <Typography
                      sx={{
                        color: palette.grey[fieldProps.disabled ? 500 : 600],
                        fontSize: '12px',
                        fontStyle: 'italic',
                        lineHeight: '1rem',
                        textAlign: 'center',
                      }}
                    >
                      {description}
                    </Typography>

                    <Typography
                      sx={{
                        color: palette.grey[fieldProps.disabled ? 500 : 600],
                        fontSize: '12px',
                        fontStyle: 'italic',
                        lineHeight: '1rem',
                        textAlign: 'center',
                      }}
                    >
                      Tinkami formatai: PDF
                    </Typography>
                  </>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Box>
    </RcSesFormControlWrapper>
  );
}

export default RcSesFileDropzone;
