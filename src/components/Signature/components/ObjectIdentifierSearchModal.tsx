import { Button, DialogActions, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import {
  RcSesDatepicker,
  RcSesFileDropzone,
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
const StyledFormSection = styled.div`
  border: 1px solid #8e959e;
  background-color: #f9fafb;
  padding: 16px;
  margin-bottom: 24px;
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

  const handleOnSubmit = (data: FormModel) => {
    if (onSubmit) onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md">
      <DialogTitle>Dokumento įkėlimas</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <StyledFormSection>
            <RcSesSelect
              id="documentType"
              name="documentType"
              control={control}
              placeholder="Pasirinkite dokumento tipą"
              rules={{ required: true }}
              label="Dokumento tipas"
              errors={errors?.documentType}
              options={[
                { value: 'tikslas1', label: 'Tikslas 1' },
                { value: 'tikslas2', label: 'Tikslas 2' },
                { value: 'tikslas3', label: 'Tikslas 3' },
              ]}
            />

            <RcSesDatepicker
              id="documentDate"
              name="documentDate"
              clearable
              control={control}
              rules={{ required: true }}
              label="Data"
              errors={errors?.documentDate}
            />

            <RcSesTextField
              id="documentNumber"
              label="Dokumento numeris"
              placeholder="Įrašykite dokumento numerį"
              required
              {...register('documentNumber', { required: true })}
              errors={errors?.documentNumber}
            />

            <RcSesFileDropzone
              id="documentFile"
              name="documentFile"
              control={control}
              rules={{ required: true }}
              label="Dokumento įkėlimas"
              errors={errors?.documentFile}
              slotProps={{
                dropzone: {
                  onDrop: (files: File[]) => {
                    setValue('documentFile', files);
                    files.forEach((file: Blob) => {
                      const reader = new FileReader();
                      reader.onload = () => console.log(file);
                      reader.readAsArrayBuffer(file);
                    });
                  },
                },
              }}
            />
          </StyledFormSection>
          <DialogActions>
            <Button type="submit">Pridėti</Button>
            <Button color="error" variant="outlined" onClick={onClose}>
              Atšaukti
            </Button>
          </DialogActions>
        </form>
        <Divider />
      </DialogContent>
    </Dialog>
  );
}

export default ObjectIdentifierSearchModal;
