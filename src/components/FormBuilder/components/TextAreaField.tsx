import {
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  SxProps,
  TextareaAutosize,
} from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

  const id = useMemo(() => fieldProps.id ?? uuidv4(), [fieldProps.id]);

  return (
    <RcSesFormControlWrapper
      id={id}
      errors={errors}
      label={label}
      required={props.required}
      {...slotProps?.wrapper}
    >
      <TextareaAutosize
        {...fieldProps}
        id={id}
        minRows={5}
        maxRows={20}
        style={{
          width: '100%',
        }}
        ref={ref}
      />
    </RcSesFormControlWrapper>
  );
});

export default RcSesTextField;
