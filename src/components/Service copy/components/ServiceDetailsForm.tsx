import styled from '@emotion/styled';
import React from 'react';
import { Divider } from '@mui/material';
import {
  RcSesAlert,
  RcSesCheckbox,
  RcSesDatepicker,
  RcSesFileDropzone,
  RcSesPhoneInput,
  RcSesRadioButtonGroup,
  RcSesSelect,
  RcSesTextField,
} from '@registrucentras/rc-ses-react-components';
import { useForm } from 'react-hook-form';
import { Info } from '@mui/icons-material';
import InfoIcon from '../../../assets/icons/InfoIcon';


type FormModel = {
  purpose: string;
  legalBasis: string;
  agreement: boolean;
  deadline: string;
  address: string;
  numberOfCopies: number;
  companyName: string;
  termDate: string;
  docNumber: string;
  phoneNo: string;
  radioSelection1: string;
  fileUpload: string;
  fileUpload2: string;
  fileUpload3: string;
  personalCode: string;
  fullName: string;
  email: string;
  formDate: string;
}; 

const HeaderMain = styled.p`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.24px;
  margin: 0;
`;

const BodyText = styled.p`
  color: #4a5361;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  max-width: 250px;
  margin: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;

  .MuiFormGroup-root {
    display: flex;
    flex-direction: column;
  }

  .custom-flex-radio-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const SectionBox = styled.div`
  border: 1px solid #8e959e;
  background-color: #f9fafb;
  padding: 16px;
  margin-bottom: 24px;
`;

const ServiceDetailsForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      purpose: '',
      legalBasis: '',
      agreement: false,
      deadline: '',
      address: '',
      numberOfCopies: 0,
      companyName: '',
      termDate: '2024-04-06',
      docNumber: '',
      phoneNo: '',
      radioSelection1: '',
      fileUpload: '',
      fileUpload2: '',
      fileUpload3: '',
      personalCode: '39005201234',
      fullName: 'Vardenis Pavardenis',
      email: 'vardenis.pavardenis@gmail.com',
      formDate: '2024-04-06',
    },
  });

return (
    <StyledForm onSubmit={handleSubmit(console.debug)} noValidate>
      <HeaderMain>Prašymo objektas</HeaderMain>
      <Divider />

      <RcSesSelect
        id='purpose'
        name='purpose'
        control={control}
        placeholder='Pasirinkite teisinę formą'
        rules={{ required: true }}
        sx={{ backgroundColor: '#f5f5f5' }}
        label='Juridinio asmens teisinė forma'
        errors={errors?.purpose}
        options={[
          { value: 'tikslas1', label: 'Tikslas 1' },
          { value: 'tikslas2', label: 'Tikslas 2' },
          { value: 'tikslas3', label: 'Tikslas 3' },
        ]}
      />

      <RcSesTextField
        id='companyName'
        label='Laikinai įrašomas pavadinimas'
        errors={errors?.companyName}
        placeholder='Įrašykite pavadinimą'
        required
        {...register('companyName', { required: true })}
      />

      <RcSesAlert
        severity='info'
        icon={
        <InfoIcon />
        }
      >
        <p style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>
          Reikalavimai pavadinimui
        </p>
        <ul style={{ maxWidth: '640px', margin: 0, marginBottom: '4px' }}>
          <li>Teisinės formos žodžiai ar jų trumpiniai (pvz., IĮ)</li>
          <li>Simbolinis pavadinimas turi būti kabutėse</li>
          <li>Neturi būti klaidinantis ar per daug panašus į kitus</li>
          <li>Filialo pavadinime turi būti žodis „filialas“</li>
        </ul>
      </RcSesAlert>

      <SectionBox>
        <RcSesDatepicker
          id='termDate'
          name='termDate'
          clearable
          control={control}
          rules={{ required: true }}
          label='Terminas'
          errors={errors?.termDate}
        />

        <RcSesTextField
          id='docNumber'
          label='Dokumento numeris'
          placeholder='Įrašykite dokumento numerį'
          required
          {...register('docNumber', { required: true })}
          errors={errors?.docNumber}
        />

        <RcSesFileDropzone
          id='fileUpload3'
          name='fileUpload3'
          control={control}
          rules={{ required: true }}
          label='Failo įkėlimas'
          errors={errors?.fileUpload3}
          slotProps={{
            dropzone: {
              onDrop: (files: any) => {
                setValue('deadline', files);
                files.forEach((file: Blob) => {
                  const reader = new FileReader();
                  reader.onload = () => console.debug(file);
                  reader.readAsArrayBuffer(file);
                });
              },
            },
            wrapper: {
              description: 'Maksimalus failo dydis: 5MB',
              labelSubtitle: 'Tinkami formatai: .doc, .xdoc, .pdf, .pages',
            },
          }}
        />
      </SectionBox>

      <RcSesCheckbox
        id='agreement'
        name='agreement'
        control={control}
        errors={errors?.agreement}
        label={
          <>
            <strong>Sutikimas naudoti prekinį ženklą</strong>
            <br />
            <BodyText>
              Pažymėkite, jei naudojate prekinio ženklo pavadinimą ar jo dalį
            </BodyText>
          </>
        }
      />

      <Divider />

      <RcSesRadioButtonGroup
        id='radioSelection1'
        name='radioSelection1'
        control={control}
        label={
          <>
            <strong>Sutikimas naudoti juridinio asmens pavadinimą</strong>
            <br />
            <BodyText>
              Pažymėkite, jei naudojate juridinio asmens pavadinimą ar jo dalį
            </BodyText>
          </>
        }
        errors={errors?.radioSelection1}
        className='custom-flex-radio-group'
        options={[
          { label: 'El. paštu', value: 'email' },
          { label: 'Padalinyje', value: 'branch' },
          { label: 'Paštu užsienyje', value: 'mail-abroad' },
        ]}
      />

      <HeaderMain>Prašymą teikia</HeaderMain>
      <Divider />

      <RcSesTextField
        id='personalCode'
        label='Asmens kodas'
        errors={errors?.personalCode}
        required
        {...register('personalCode', { required: true })}
      />

      <RcSesTextField
        id='fullName'
        label='Vardas, Pavardė'
        errors={errors?.fullName}
        required
        InputProps={{ readOnly: true }}
        {...register('fullName', { required: true })}
      />

      <RcSesPhoneInput
        control={control}
        id='phoneNo'
        errors={errors?.phoneNo}
        label='Telefono nr.'
        name='phoneNo'
        rules={{ required: true }}
      />

      <RcSesTextField
        id='email'
        label='El. paštas'
        errors={errors?.email}
        required
        {...register('email', { required: true })}
      />

      <RcSesTextField
        id='formDate'
        label='Prašymo data'
        errors={errors?.formDate}
        required
        {...register('formDate', { required: true })}
      />
    </StyledForm>
  );
};

export default ServiceDetailsForm;


