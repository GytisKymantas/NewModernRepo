import theme from '@/theme';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Button, Card, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormActionsProps } from '../types';

export default function FormActions({
  multiStep,
  isFirstStep,
  isLastStep,
  isValid,
  isSubmitting,
  isSavingDraft,
  onNext,
  onPrevious,
  onSubmit,
  onSaveDraft,
  onDiscard,
}: FormActionsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'components.ServiceFormActions' });

  // Get the appropriate submit handler
  const getSubmitHandler = () => {
    if (!multiStep) return onSubmit;
    return isLastStep ? onSubmit : onNext;
  };

  const getSubmitText = () => {
    if (!multiStep) {
      return isSubmitting
        ? t('formBuilder.actions.submitting', 'Submitting...')
        : t('submit');
    }

    if (isLastStep) {
      return isSubmitting
        ? t('formBuilder.actions.submitting', 'Submitting...')
        : t('submit');
    }
    return t('formBuilder.actions.next', 'Tęsti');
  };

  const getDraftText = () =>
    isSavingDraft ? t('formBuilder.actions.saving', 'Išsaugoma...') : t('draft');

  return (
    <>
      <Card
        sx={{
          backgroundColor: theme.palette.primary['50'],
          borderColor: theme.palette.primary['300'],
          borderRadius: { xs: 0, md: '.375rem' },
          borderLeftWidth: { xs: 0, md: '1px' },
          borderRightWidth: { xs: 0, md: '1px' },
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'center',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
          }}
        >
          <Grid item>
            {onSaveDraft && (
              <Button
                disabled={isSavingDraft}
                onClick={onSaveDraft}
                variant='text'
                startIcon={<ArrowBack />}
              >
                {getDraftText()}
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button
              disabled={isLastStep ? !isValid || isSubmitting : false}
              onClick={getSubmitHandler()}
              size='large'
              variant='contained'
              endIcon={<ArrowForward />}
            >
              {getSubmitText()}
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Discard/Previous button - always visible */}
      <Grid
        container
        sx={{ justifyContent: 'center', py: { xs: '1.5rem', md: '.875rem' } }}
      >
        <Grid item>
          <Button
            variant='text'
            size='small'
            sx={{
              fontWeight: 400,
              textDecoration: 'underline',
              color: 'text.secondary',
            }}
            onClick={multiStep && !isFirstStep ? onPrevious : onDiscard}
          >
            {multiStep && !isFirstStep
              ? t('formBuilder.actions.previous', 'Atgal')
              : t('discard', 'Atšaukti')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
