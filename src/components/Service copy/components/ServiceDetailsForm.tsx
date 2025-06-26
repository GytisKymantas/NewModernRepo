import styled from '@emotion/styled';
import { Box, Divider } from '@mui/material';
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

export const InfoHeader = styled.p<{ noMargin?: boolean }>`
  font-size: 16px;
  font-weight: 500;
  color: #1f2733;
  margin: ${({ noMargin }) => (noMargin ? '0' : '0 0 4px 0')};
`;
const UnorderedList = styled.ul`
  max-width: 640px;
  margin: 0;
  marginbottom: 4px;
`;

const ListItem = styled.li`
  font-size: 15px;
  font-weight: 400;
  color: #1f2733;
`;

const BodyText = styled.p`
  color: #4a5361;
  font-family: 'Public Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  max-width: 242px;
  margin: 0 0 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

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

function ServiceDetailsForm() {
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
    <StyledForm onSubmit={handleSubmit(() => {})} noValidate id='testid'>
      <RcSesAlert severity='error' sx={{ borderRadius: '6px' }}>
        <InfoHeader noMargin>
          Yra neužpildytų laukų. Prašome peržiūrėti privalomus laukus ir užpildyti
          reikiamą informaciją.
        </InfoHeader>
      </RcSesAlert>

      <HeaderMain>Prašymo objektas</HeaderMain>
      <Divider />

      <RcSesSelect
        id='purpose'
        name='purpose'
        control={control}
        placeholder='Pasirinkite teisinę formą'
        rules={{ required: true }}
        sx={{
          backgroundColor: '#f5f5f5',

          '.MuiInputBase-input::placeholder': {
            color: '#6B747F',
            opacity: 1, // Ensure the color isn't faded
          },
        }}
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
          <Box sx={{ marginBottom: '110px' }}>
            <InfoIcon />
          </Box>
        }
        sx={{ borderRadius: '6px' }}
      >
        <InfoHeader>Reikalavimai pavadinimui</InfoHeader>
        <UnorderedList>
          <ListItem>
            pavadinime turi būti teisinę formą nusakantys žodžiai arba jų trumpiniai
            (pvz., individuali įmonė arba IĮ);
          </ListItem>
          <ListItem>simbolinis pavadinimas turi būti išskirtas kabutėmis;</ListItem>
          <ListItem>
            pavadinimas neturi būti klaidinantis ar panašus į kitų juridinių asmenų
            pavadinimus, žinomesnių užsienio įmonių, įstaigų ar organizacijų vardus,
            prekių ir paslaugų ženklus;
          </ListItem>
          <ListItem>
            filialo pavadinime privalo būti juridinio asmens (steigėjo) pavadinimas ir
            žodis &bdquo;filialas&ldquo;.
          </ListItem>
        </UnorderedList>
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
              onDrop: (files: File[]) => {
                setValue('fileUpload3', files[0]?.name || '');
                files.forEach((file: Blob) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                    // File processing logic here
                  };
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
        variant='flat'
        label={
          <>
            <strong>Sutikimas naudoti prekinį ženklą</strong>
            <br />
            <BodyText>
              Pažymėkite, jei naudojate prekinio ženklo pavadinimą ar jo dalį
            </BodyText>
          </>
        }
      >
        Pridedamas
      </RcSesCheckbox>

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
              Pažymėkite, jei naudojate Lietuvos ar užsienio juridinio asmens pavadinimą
              ar jo dalį
            </BodyText>
          </>
        }
        errors={errors?.radioSelection1}
        className='custom-flex-radio-group'
        options={[
          { label: 'Nepridedamas', value: 'Nepridedamas' },
          { label: 'Pridedamas Lietuvos juridinio asmens', value: 'JA' },
          { label: 'Pridedamas užsienio juridinio asmens', value: 'UJA' },
        ]}
      />

      <HeaderMain>Prašymą teikia</HeaderMain>
      <Divider />

      <RcSesTextField
        id='personalCode'
        label='Asmens kodas'
        errors={errors?.personalCode}
        slotProps={{
          field: {
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                boxShadow: 'none', // Removes Material UI shadow on focus
              },
              '& .MuiOutlinedInput-input': {
                outline: 'none', // Removes native browser outline inside input
              },
            },
          },
        }}
        required
        {...register('personalCode', { required: true })}
      />

      <RcSesTextField
        id='fullName'
        label='Vardas, Pavardė'
        errors={errors?.fullName}
        required
        slotProps={{
          field: {
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                boxShadow: 'none', // Removes Material UI shadow on focus
              },
              '& .MuiOutlinedInput-input': {
                outline: 'none', // Removes native browser outline inside input
              },
            },
          },
        }}
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
        slotProps={{
          field: {
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { border: 'none' },
                '&:hover fieldset': { border: 'none' },
                '&.Mui-focused fieldset': { border: 'none' },
              },
              '& .MuiOutlinedInput-root.Mui-focused': {
                boxShadow: 'none', // Removes Material UI shadow on focus
              },
              '& .MuiOutlinedInput-input': {
                outline: 'none', // Removes native browser outline inside input
              },
            },
          },
        }}
        required
        {...register('formDate', { required: true })}
      />
    </StyledForm>
  );
}

export default ServiceDetailsForm;
