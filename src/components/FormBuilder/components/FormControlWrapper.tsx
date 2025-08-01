import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  useMediaQuery,
} from '@mui/material';
import { FieldError } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import '@/i18n/i18n';
import theme from '@/theme';
import FieldSuffix from './FieldSuffix';

type Props = {
  children: React.ReactNode;
  className?: string;
  description?: React.ReactNode;
  errors?: FieldError | undefined;
  fieldSuffix?: React.ReactNode;
  hideLabel?: boolean;
  id: string;
  label?: React.ReactNode;
  labelSubtitle?: React.ReactNode;
  labelOnTop?: boolean;
  required?: boolean;
  withTriggerText?: boolean;
};

function FormControlWrapper({
  children,
  className = undefined,
  description = undefined,
  errors = undefined,
  fieldSuffix = undefined,
  hideLabel = false,
  id,
  label = undefined,
  labelSubtitle = undefined,
  labelOnTop = false,
  required = false,
  withTriggerText,
}: Props) {
  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { t } = useTranslation('input', {
    keyPrefix: 'components.RcSesFormControlWrapper',
  });

  return (
    <FormControl className={className} error={!!errors} sx={{ my: 1, width: '100%' }}>
      <Box
        className='rc-ses-form-control-wrapper'
        sx={{
          alignItems: {
            xs: 'stretch',
            sm: withTriggerText ? 'top' : 'center',
          },
          display: 'flex',
          flexDirection: { xs: 'column', sm: labelOnTop ? 'column' : 'row' },
          width: '100%',
        }}
      >
        {hideLabel !== true && (
          <FormLabel
            sx={{
              alignItems: 'flex-start',
              flex: {
                xs: '0 0 0%',
                sm: labelOnTop ? '0 0 0%' : `0 0 273px`,
              },
              ...(labelOnTop && { fontSize: '.8125rem', fontWeight: 400 }),
              marginBottom: { xs: '.25rem', sm: labelOnTop ? '.25rem' : '0' },
              pr: 3,
              textAlign: { xs: 'left', sm: labelOnTop ? 'left' : 'right' },
            }}
          >
            {label}
            {!!label && required === true && (
              <span aria-hidden='true' className='MuiFormLabel-asterisk'>
                *
              </span>
            )}
            {!upMd && !!fieldSuffix && (
              <FieldSuffix
                sx={{
                  display: 'inline',
                  verticalAlign: 'text-bottom',
                  svg: { height: '14px', width: '14px' },
                }}
              >
                {fieldSuffix}
              </FieldSuffix>
            )}
            {!!labelSubtitle && (
              <span className='rc-ses-label-subtitle'>{labelSubtitle}</span>
            )}
          </FormLabel>
        )}

        <Box
          sx={{ flex: '1 1 0%', position: 'relative' }}
          className='rc-ses-form-field-wrapper'
        >
          {children}
          <FieldSuffix
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              left: '100%',
              ml: 0.5,
              top: '.5rem',
              svg: { height: '18px', width: '18px' },
            }}
          >
            {fieldSuffix}
          </FieldSuffix>
        </Box>
      </Box>

      <Box
        sx={{
          flex: '1 1 0%',
          ml: { sm: labelOnTop || hideLabel ? 0 : '273px' },
        }}
      >
        {!!description && (
          <FormHelperText sx={{ mx: 0, mt: '0.2rem' }}>{description}</FormHelperText>
        )}

        {!!errors && (
          <FormHelperText id={`${id}-errors`} error>
            {errors.type === 'required' && !errors.message && (
              <span>{t('required')}</span>
            )}
            {!!errors.message && <span>{errors.message}</span>}
          </FormHelperText>
        )}
      </Box>
    </FormControl>
  );
}

export default FormControlWrapper;

export { type Props as RcSesFormControlWrapperProps };
