import styled from '@emotion/styled';
import { Box, Button, DialogActions, useMediaQuery } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';

import FileDropzone from '@/components/Service/components/FileDropzone';
import theme from '@/theme';
import {
  RcSesDatepicker,
  RcSesSelect,
  RcSesTextField,
} from '@registrucentras/rc-ses-react-components';

// Correct form type
type FormModel = {
  documentType: string;
  documentDate: string;
  documentNumber: string;
  documentFile: File[];
};

type Props = {
  open: boolean;
  onSubmit?: (values: FormModel) => void;
  onClose: () => void;
};

// Styled component for visual grouping
const StyledFormSection = styled.div<{ isWithoutBorder?: boolean }>`
  border: ${({ isWithoutBorder }) => (isWithoutBorder ? 'none' : '1px solid #8e959e')};
  background-color: ${({ isWithoutBorder }) => (isWithoutBorder ? 'none' : ' #f9fafb;')};
  padding: 16px;
  margin-bottom: 24px;
`;
const StyledForm = styled.form`
  @media (max-width: 900px) {
    padding-bottom: 30px;
    background-color: #f9fafb;
  }
`;

function ObjectIdentifierSearchModal({ open, onSubmit, onClose }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    reset,
  } = useForm<FormModel>({
    mode: 'all',
    defaultValues: {
      documentType: '',
      documentDate: '2024-04-06',
      documentNumber: '',
      documentFile: [],
    },
  });
  const upMd = useMediaQuery(theme.breakpoints.up('md'));

  const handleOnSubmit = (data: FormModel) => {
    if (errors) {
      return;
    }

    if (onSubmit) onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      {upMd && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 20px 0 24px',
          }}
        >
          <DialogTitle sx={{ padding: '0 !important', fontSize: '20px !important' }}>
            Dokumento įkėlimas
          </DialogTitle>
          <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M19.2806 18.2198C19.3502 18.2895 19.4055 18.3722 19.4432 18.4632C19.4809 18.5543 19.5003 18.6519 19.5003 18.7504C19.5003 18.849 19.4809 18.9465 19.4432 19.0376C19.4055 19.1286 19.3502 19.2114 19.2806 19.281C19.2109 19.3507 19.1281 19.406 19.0371 19.4437C18.9461 19.4814 18.8485 19.5008 18.7499 19.5008C18.6514 19.5008 18.5538 19.4814 18.4628 19.4437C18.3717 19.406 18.289 19.3507 18.2193 19.281L11.9999 13.0607L5.78055 19.281C5.63982 19.4218 5.44895 19.5008 5.24993 19.5008C5.05091 19.5008 4.86003 19.4218 4.7193 19.281C4.57857 19.1403 4.49951 18.9494 4.49951 18.7504C4.49951 18.5514 4.57857 18.3605 4.7193 18.2198L10.9396 12.0004L4.7193 5.78104C4.57857 5.64031 4.49951 5.44944 4.49951 5.25042C4.49951 5.05139 4.57857 4.86052 4.7193 4.71979C4.86003 4.57906 5.05091 4.5 5.24993 4.5C5.44895 4.5 5.63982 4.57906 5.78055 4.71979L11.9999 10.9401L18.2193 4.71979C18.36 4.57906 18.5509 4.5 18.7499 4.5C18.949 4.5 19.1398 4.57906 19.2806 4.71979C19.4213 4.86052 19.5003 5.05139 19.5003 5.25042C19.5003 5.44944 19.4213 5.64031 19.2806 5.78104L13.0602 12.0004L19.2806 18.2198Z'
                fill='#1F2733'
              />
            </svg>
          </Box>
        </Box>
      )}
      <DialogContent>
        <StyledForm onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          {!upMd && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 16px 0 16px',
              }}
            >
              <DialogTitle sx={{ padding: '0 !important', fontSize: '18px !important' }}>
                Dokumento įkėlimas
              </DialogTitle>
              <Box onClick={onClose} sx={{ cursor: 'pointer' }}>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19.2806 18.2198C19.3502 18.2895 19.4055 18.3722 19.4432 18.4632C19.4809 18.5543 19.5003 18.6519 19.5003 18.7504C19.5003 18.849 19.4809 18.9465 19.4432 19.0376C19.4055 19.1286 19.3502 19.2114 19.2806 19.281C19.2109 19.3507 19.1281 19.406 19.0371 19.4437C18.9461 19.4814 18.8485 19.5008 18.7499 19.5008C18.6514 19.5008 18.5538 19.4814 18.4628 19.4437C18.3717 19.406 18.289 19.3507 18.2193 19.281L11.9999 13.0607L5.78055 19.281C5.63982 19.4218 5.44895 19.5008 5.24993 19.5008C5.05091 19.5008 4.86003 19.4218 4.7193 19.281C4.57857 19.1403 4.49951 18.9494 4.49951 18.7504C4.49951 18.5514 4.57857 18.3605 4.7193 18.2198L10.9396 12.0004L4.7193 5.78104C4.57857 5.64031 4.49951 5.44944 4.49951 5.25042C4.49951 5.05139 4.57857 4.86052 4.7193 4.71979C4.86003 4.57906 5.05091 4.5 5.24993 4.5C5.44895 4.5 5.63982 4.57906 5.78055 4.71979L11.9999 10.9401L18.2193 4.71979C18.36 4.57906 18.5509 4.5 18.7499 4.5C18.949 4.5 19.1398 4.57906 19.2806 4.71979C19.4213 4.86052 19.5003 5.05139 19.5003 5.25042C19.5003 5.44944 19.4213 5.64031 19.2806 5.78104L13.0602 12.0004L19.2806 18.2198Z'
                    fill='#1F2733'
                  />
                </svg>
              </Box>
            </Box>
          )}

          <StyledFormSection isWithoutBorder>
            <RcSesSelect
              id='documentType'
              name='documentType'
              control={control}
              placeholder='Pasirinkite dokumento tipą'
              rules={{ required: true }}
              label='Dokumento tipas'
              errors={errors?.documentType}
              options={[
                { value: 'tikslas1', label: 'Tikslas 1' },
                { value: 'tikslas2', label: 'Tikslas 2' },
                { value: 'tikslas3', label: 'Tikslas 3' },
              ]}
            />

            <Box sx={{ maxWidth: !upMd ? '170px' : '100%' }}>
              <RcSesDatepicker
                id='documentDate'
                name='documentDate'
                clearable
                control={control}
                rules={{ required: true }}
                label='Data'
                errors={errors?.documentDate}
              />
            </Box>

            <RcSesTextField
              id='documentNumber'
              label='Dokumento numeris'
              placeholder='Įrašykite dokumento numerį'
              required
              {...register('documentNumber', { required: true })}
              errors={errors?.documentNumber}
            />

            <FileDropzone
              id='documentFile'
              name='documentFile'
              control={control}
              rules={{ required: true }}
              label='Dokumentas'
              errors={errors?.documentFile}
              slotProps={{
                dropzone: {
                  onDrop: (files: File[]) => {
                    setValue('documentFile', files);
                    files.forEach((file: Blob) => {
                      const reader = new FileReader();
                      reader.onload = () => {
                        // File processing logic here
                      };
                      reader.readAsArrayBuffer(file);
                    });
                  },
                },
              }}
            />
          </StyledFormSection>
          <DialogActions
            sx={{
              display: 'flex',
              flexDirection: !upMd ? 'column' : 'row-reverse',
              justifyContent: !upMd ? 'flex-end' : 'flex-start',
              gap: '13px',
              padding: '0 16px !important',
            }}
          >
            <Button
              type='submit'
              sx={{ width: !upMd ? '100%' : 'unset', fontWeight: '600' }}
            >
              Patvirtinti
            </Button>
            <Button
              color='inherit'
              variant='contained'
              onClick={onClose}
              sx={{
                backgroundColor: !upMd ? '#F0F2F5' : 'transparent',
                fontWeight: '600',
                width: !upMd ? '100%' : 'unset',
                marginLeft: '0 !important',
              }}
            >
              Atšaukti
            </Button>
          </DialogActions>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}

export default ObjectIdentifierSearchModal;
