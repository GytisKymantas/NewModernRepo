import styled from '@emotion/styled';
import { Box, Divider, Grid, Typography } from '@mui/material';
import {
  RcSesAlert,
  RcSesCheckbox,
  RcSesDatepicker,
  RcSesNumberStepper,
  RcSesPhoneInput,
  RcSesRadioButtonGroup,
  RcSesSelect,
  RcSesTextField,
} from '@registrucentras/rc-ses-react-components';

import FileDropzone from '../Service/components/FileDropzone';
import { BodyText, BodyTextSmall } from '../Service/components/ServiceDetailsForm';
import ObjectIdentifierSearchModal from './components/ObjectIdentifierSearchModal';
import SearchableField from './components/SearchableField';
import TextAreaField from './components/TextAreaField';
import useFormTranslation from './hooks/useFormTranslation';
import {
  AlertFieldConfig,
  CheckboxFieldConfig,
  CustomFieldConfig,
  DateFieldConfig,
  FieldRendererProps,
  FileFieldConfig,
  NumberStepperConfig,
  RadioFieldConfig,
  SearchFieldConfig,
  SelectFieldConfig,
  SubgroupRendererProps,
  TextFieldConfig,
} from './types';
import { parseAcceptTypes, useConditionalLogic } from './utils';

// Styled components for subgroups
const SubgroupContainer = styled.div<{ variant: string }>`
  ${({ variant }) => {
    switch (variant) {
      case 'bordered':
        return `
          border: 1px solid #8e959e;
          background-color: #f9fafb;
          padding: 16px;
          border-radius: 4px;
        `;
      case 'elevated':
        return `
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 8px;
        `;
      default:
        return `
          padding: 0;
        `;
    }
  }}
`;

const SubgroupHeader = styled.div`
  margin-bottom: 16px;
`;

const SubgroupTitle = styled(Typography)`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.24px;
  margin: 0 0 8px 0;
`;

const SubgroupDescription = styled(Typography)`
  color: #4a5361;
  font-size: 14px;
  font-weight: 400;
  margin: 0;
`;

function FieldRenderer({
  field,
  control,
  errors,
  register,
  formData,
}: FieldRendererProps) {
  const { translateText } = useFormTranslation();
  const shouldShow = useConditionalLogic(field, formData);

  if (!shouldShow) {
    return null;
  }

  const commonProps = {
    id: field.id,
    name: field.name,
    label: translateText(field.label),
    required: field.required,
    disabled: field.disabled,
    slotProps: field.slotProps,
    description: field.description,
  };

  // Get field error directly - RcSes components expect the error object directly
  const fieldError = errors?.[field.name];

  const renderField = () => {
    switch (field.type) {
      case 'email':
      case 'password': {
        const textField = field as TextFieldConfig;
        return (
          <RcSesTextField
            {...commonProps}
            type={field.type}
            placeholder={translateText(textField.placeholder)}
            errors={fieldError}
            {...register(field.name)}
          />
        );
      }
      case 'text': {
        const textField = field as TextFieldConfig;
        return (
          <RcSesTextField
            {...commonProps}
            type={field.type}
            placeholder={translateText(textField.placeholder)}
            errors={fieldError}
            {...register(field.name)}
          />
        );
      }

      case 'textarea': {
        const textField = field as TextFieldConfig;
        return (
          <TextAreaField
            sx={textField.sxStyle}
            {...commonProps}
            placeholder={translateText(textField.placeholder)}
            errors={fieldError}
            {...register(field.name)}
            slotProps={{
              ...field.slotProps,
              field: {
                ...field.slotProps?.field,
                InputProps: {
                  inputComponent: 'textarea',
                  inputProps: {
                    rows: textField.rows || 4,
                  },
                },
                slots: {
                  input: 'textarea',
                },
              },
            }}
          />
        );
      }

      case 'select':
      case 'multiselect': {
        const selectField = field as SelectFieldConfig;
        return (
          <RcSesSelect
            {...commonProps}
            control={control}
            placeholder={translateText(selectField.placeholder)}
            errors={fieldError}
            options={selectField.options}
            multiple={selectField.multiple}
          />
        );
      }

      case 'radio': {
        const radioField = field as RadioFieldConfig;
        return (
          <RcSesRadioButtonGroup
            {...commonProps}
            control={control}
            errors={fieldError}
            options={radioField.options}
            hideNativeRadio={radioField.hideNativeRadio}
            label={
              <Box sx={{ marginBottom: { md: '28px' } }}>
                <BodyText>{field.label}</BodyText>
                <BodyTextSmall>
                  {field.description ? translateText(field.description) : undefined}
                </BodyTextSmall>
              </Box>
            }
            slotProps={{
              ...field.slotProps,
              wrapper: {
                ...field.slotProps?.wrapper,
              },
            }}
          />
        );
      }

      case 'checkbox': {
        const checkboxField = field as CheckboxFieldConfig;
        return (
          <RcSesCheckbox
            {...commonProps}
            control={control}
            errors={fieldError}
            variant={checkboxField.variant}
            label={
              <Box sx={{ marginBottom: { md: '5px' } }}>
                <BodyText>{checkboxField.label}</BodyText>
                <BodyTextSmall>
                  {field.description ? translateText(field.description) : undefined}
                </BodyTextSmall>
              </Box>
            }
            slotProps={{
              ...field.slotProps,
              wrapper: {
                ...field.slotProps?.wrapper,
              },
            }}
          >
            {typeof checkboxField.children === 'string'
              ? translateText(checkboxField.children)
              : checkboxField.children}
          </RcSesCheckbox>
        );
      }

      case 'date': {
        const dateField = field as DateFieldConfig;
        return (
          <RcSesDatepicker
            {...commonProps}
            control={control}
            rules={{ required: true }}
            errors={fieldError}
            clearable={dateField.clearable}
          />
        );
      }

      case 'search': {
        const customField = field as SearchFieldConfig;

        return (
          <SearchableField
            {...customField.props}
            control={control}
            id='searchable'
            label='Teikėjo adresas'
            name='searchable'
            rules={{ required: true }}
            ModalComponent={ObjectIdentifierSearchModal}
            errors={undefined}
          />
        );
      }

      case 'phone': {
        return (
          <RcSesPhoneInput
            {...commonProps}
            rules={{ required: true }}
            control={control}
            errors={fieldError}
            sx={{ letterSpacing: '1.2px' }}
          />
        );
      }

      case 'numberStepper': {
        const stepperField = field as NumberStepperConfig;
        return (
          <RcSesNumberStepper
            {...commonProps}
            control={control}
            errors={fieldError}
            displayStepperControls={stepperField.displayStepperControls}
          />
        );
      }

      case 'file': {
        const fileField = field as FileFieldConfig;

        const validatedAccept = parseAcceptTypes(fileField.accept);

        // Build dropzone props conditionally - only include accept if we have a valid value
        const dropzoneProps = {
          maxSize: fileField.maxSize,
          maxFiles: fileField.maxFiles || 1,
          multiple: fileField.multiple || false,
          ...field.slotProps?.dropzone,
        };

        // Only add accept property if we have a valid value
        if (validatedAccept) {
          dropzoneProps.accept = validatedAccept;
        }

        return (
          <FileDropzone
            {...commonProps}
            control={control}
            errors={fieldError}
            slotProps={{
              ...field.slotProps,
              dropzone: dropzoneProps,
              wrapper: {
                description: translateText(field.description),
                ...field.slotProps?.wrapper,
              },
            }}
          />
        );
      }

      case 'alert': {
        const alertField = field as AlertFieldConfig;
        return (
          <RcSesAlert
            severity={alertField.severity || 'info'}
            icon={alertField.icon}
            sx={alertField.sx}
          >
            {typeof alertField.message === 'string'
              ? translateText(alertField.message)
              : alertField.message}
          </RcSesAlert>
        );
      }

      case 'custom': {
        const customField = field as CustomFieldConfig;
        const CustomComponent = customField.component;
        return (
          <CustomComponent
            {...commonProps}
            control={control}
            errors={errors}
            {...customField.props}
          />
        );
      }

      default:
        return null;
    }
  };

  return (
    <Grid item xs={12} md={field.gridColumn || 12} key={field.id}>
      {renderField()}
    </Grid>
  );
}

// SubgroupRenderer component
export function SubgroupRenderer({
  subgroup,
  control,
  errors,
  register,
  setValue,
  watch,
  formData,
}: SubgroupRendererProps) {
  const { translateText } = useFormTranslation();

  return (
    <SubgroupContainer variant={subgroup.variant || 'default'}>
      {(subgroup.title || subgroup.description) && (
        <>
          <SubgroupHeader>
            {subgroup.title && (
              <SubgroupTitle>{translateText(subgroup.title)}</SubgroupTitle>
            )}
            {subgroup.description && (
              <SubgroupDescription>
                {translateText(subgroup.description)}
              </SubgroupDescription>
            )}
          </SubgroupHeader>
          {subgroup.variant !== 'bordered' && subgroup.variant !== 'elevated' && (
            <Divider sx={{ mb: 2 }} />
          )}
        </>
      )}

      <Grid container spacing={0}>
        {subgroup.fields.map((field) => (
          <FieldRenderer
            key={field.id}
            field={field}
            control={control}
            errors={errors}
            register={register}
            setValue={setValue}
            watch={watch}
            formData={formData}
          />
        ))}
      </Grid>
    </SubgroupContainer>
  );
}

export default FieldRenderer;
