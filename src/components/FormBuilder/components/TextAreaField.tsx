import {
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { forwardRef, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import palette from '@/theme/palette';
import {
  RcSesFormControlWrapper,
  RcSesFormControlWrapperProps,
} from '@registrucentras/rc-ses-react-components';

type TFieldProps = Omit<MuiOutlinedTextFieldProps, 'variant'>;
type ImmediateFieldProps =
  | 'onChange'
  | 'onBlur'
  | 'disabled'
  | 'name'
  | 'ref'
  | 'required'
  | 'multiline';

type TWrapperProps = RcSesFormControlWrapperProps;
type ImmediateWrapperProps = 'label' | 'errors';

type Props = Pick<TFieldProps, ImmediateFieldProps> &
  Pick<TWrapperProps, ImmediateWrapperProps> & {
    id?: string;
    sx?: SxProps;
    slotProps?: {
      field?: Partial<Omit<TFieldProps, ImmediateFieldProps>>;
      wrapper?: Partial<Omit<TWrapperProps, ImmediateWrapperProps>>;
    };
  };

const RcSesTextField = forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
  const { errors, label, slotProps, ...fieldProps } = props;
  const [text, setText] = useState<string>('');
  const charCount = text.replace(/\s/g, '').length;
  const id = useMemo(() => fieldProps.id ?? uuidv4(), [fieldProps.id]);
  return (
    <RcSesFormControlWrapper
      id={id}
      errors={errors}
      label={label}
      required={props.required}
      {...slotProps?.wrapper}
    >
      <TextField
        {...fieldProps}
        id={id}
        maxRows={20}
        minRows={5}
        // inputProps={{ maxLength: 300 }}
        multiline
        style={{
          width: '100%',
        }}
        inputRef={ref}
        {...slotProps?.field}
        onChange={(e) => setText(e.target.value)}
      />
      <Typography
        variant='body1'
        sx={{
          pt: '4px',
          color: palette.grey[700],
          fontSize: '14px',
        }}
      >
        Ženklų skaičius: {charCount}
      </Typography>
    </RcSesFormControlWrapper>
  );
});

export default RcSesTextField;
