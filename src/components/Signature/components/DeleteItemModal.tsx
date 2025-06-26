import styled from '@emotion/styled';
import { Button, DialogActions, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';

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
  background-color: #f9fafb;
  padding: 16px;
  margin-bottom: 24px;
`;

function DeleteItemModal({ open, onSubmit, onClose }: Props) {
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
    <Dialog onClose={onClose} open={open} maxWidth='md'>
      <DialogContent>
        <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
          <StyledFormSection>
            <div style={{ margin: '0 auto' }}>
              <svg
                width='68'
                height='68'
                viewBox='0 0 68 68'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <rect width='68' height='68' rx='34' fill='#FEF4F2' />
                <path
                  d='M49.0936 32.4137L35.5865 18.9053C35.165 18.4862 34.5947 18.251 34.0003 18.251C33.4059 18.251 32.8356 18.4862 32.4141 18.9053L18.914 32.4137C18.495 32.8353 18.2598 33.4055 18.2598 33.9999C18.2598 34.5944 18.495 35.1646 18.914 35.5862L32.4211 49.0946C32.8426 49.5137 33.4129 49.7489 34.0073 49.7489C34.6017 49.7489 35.172 49.5137 35.5936 49.0946L49.1006 35.5862C49.5197 35.1646 49.7549 34.5944 49.7549 33.9999C49.7549 33.4055 49.5197 32.8353 49.1006 32.4137H49.0936ZM32.8753 27.2499C32.8753 26.9516 32.9938 26.6654 33.2048 26.4545C33.4158 26.2435 33.7019 26.1249 34.0003 26.1249C34.2987 26.1249 34.5848 26.2435 34.7958 26.4545C35.0068 26.6654 35.1253 26.9516 35.1253 27.2499V35.1249C35.1253 35.4233 35.0068 35.7095 34.7958 35.9204C34.5848 36.1314 34.2987 36.2499 34.0003 36.2499C33.7019 36.2499 33.4158 36.1314 33.2048 35.9204C32.9938 35.7095 32.8753 35.4233 32.8753 35.1249V27.2499ZM34.0003 41.8749C33.6665 41.8749 33.3403 41.776 33.0628 41.5906C32.7853 41.4051 32.569 41.1416 32.4413 40.8332C32.3135 40.5249 32.2801 40.1856 32.3452 39.8582C32.4103 39.5309 32.5711 39.2302 32.8071 38.9942C33.0431 38.7582 33.3437 38.5975 33.6711 38.5324C33.9984 38.4673 34.3377 38.5007 34.6461 38.6284C34.9544 38.7561 35.218 38.9724 35.4034 39.2499C35.5888 39.5274 35.6878 39.8537 35.6878 40.1874C35.6878 40.635 35.51 41.0642 35.1935 41.3807C34.8771 41.6972 34.4479 41.8749 34.0003 41.8749Z'
                  fill='#C84838'
                />
              </svg>
            </div>

            <h2>Ištrinti dokumentą</h2>
            <p
>Atkreipiame dėmesį, kad jūsų įkeltas dokumentas bus ištrintas.</p>
          </StyledFormSection>
          <DialogActions>
            <Button type='submit'>Taip</Button>
            <Button color='error' variant='outlined' onClick={onClose}>
              Ne
            </Button>
          </DialogActions>
        </form>
        <Divider />
      </DialogContent>
    </Dialog>
  );
}

export default DeleteItemModal;
