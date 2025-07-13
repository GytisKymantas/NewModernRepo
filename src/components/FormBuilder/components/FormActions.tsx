import theme from '@/theme';
import { ArrowBack } from '@mui/icons-material';
import { Button, Card, Grid } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormActionsProps } from '../types';
import DiscardConfirmationModal from './DiscardConfirmationModal';

export default function FormActions({
  multiStep,
  isFirstStep,
  isLastStep,
  isValid,
  isSubmitting,
  isSavingDraft,
  loadingStates,
  loadingConfig,
  onNext,
  onPrevious,
  onSubmit,
  onSaveDraft,
  onDiscard,
}: FormActionsProps) {
  const { t } = useTranslation('common', { keyPrefix: 'components.ServiceFormActions' });
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  // Determine if any loading is active
  const isAnyLoading = loadingStates ? Object.values(loadingStates).some(Boolean) : false;

  // Determine if form should be disabled during loading
  const isFormDisabled = loadingConfig?.disableFormDuringLoading && isAnyLoading;

  // Get the appropriate submit handler
  const getSubmitHandler = () => {
    if (!multiStep) return onSubmit;
    return isLastStep ? onSubmit : onNext;
  };

  const getSubmitText = () => {
    // Check for custom loading messages first
    if (isSubmitting && loadingConfig?.loadingMessages?.submitting) {
      return loadingConfig.loadingMessages.submitting;
    }

    if (!multiStep) {
      return isSubmitting
        ? t('formBuilder.actions.submitting', 'Submitting...')
        : t('submit');
    }

    if (isLastStep) {
      return isSubmitting
        ? t('formBuilder.actions.submitting', 'Submitting...')
        : t('submit', 'Pateikti');
    }
    return t('formBuilder.actions.next', 'Tęsti');
  };

  const getDraftText = () => {
    // Check for custom loading message first
    if (isSavingDraft && loadingConfig?.loadingMessages?.savingDraft) {
      return loadingConfig.loadingMessages.savingDraft;
    }

    return isSavingDraft
      ? t('formBuilder.actions.saving', 'Išsaugoma...')
      : t('draft', 'Baigti pildyti vėliau');
  };

  // Determine if submit button should be disabled
  const isSubmitDisabled = () => {
    if (isFormDisabled) return true;
    if (isLastStep) return !isValid || isSubmitting;
    return false; // For next button, don't disable based on validity
  };

  // Determine if draft button should be disabled
  const isDraftDisabled = () => isFormDisabled || isSavingDraft;

  // Determine if previous/discard button should be disabled
  const isPreviousDisabled = () => isFormDisabled;

  return (
    <>
      <Card
        sx={{
          backgroundColor: theme.palette.primary['50'],
          borderColor: theme.palette.primary['300'],
          borderRadius: { xs: 0, sm: '.375rem' },
          borderLeftWidth: { xs: 0, sm: '1px' },
          borderRightWidth: { xs: 0, sm: '1px' },
          px: { xs: 2, md: 4 },
          mx: { xs: 0, sm: '2rem', md: 0 },
          py: 4,
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left side - Draft functionality */}
          <Grid item>
            {onSaveDraft && (
              <Button
                variant='text'
                onClick={onSaveDraft}
                disabled={isDraftDisabled()}
                startIcon={<ArrowBack fontSize='small' />}
                sx={{
                  p: 0,
                  color: 'primary.main',
                  textDecoration: 'none',
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  '&:hover': {
                    textDecoration: 'underline',
                    backgroundColor: 'transparent',
                  },
                  '&:disabled': {
                    color: 'text.disabled',
                  },
                }}
              >
                {getDraftText()}
              </Button>
            )}
          </Grid>

          {/* Right side - Action buttons */}
          <Grid item>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              {/* Previous button - only show when not on first step of multi-step form */}
              {multiStep && !isFirstStep && (
                <Grid item>
                  <Button
                    variant='outlined'
                    disabled={isPreviousDisabled()}
                    onClick={onPrevious}
                    sx={{
                      minWidth: '120px',
                    }}
                  >
                    {t('formBuilder.actions.previous', 'Atgal')}
                  </Button>
                </Grid>
              )}

              {/* Submit/Next button */}
              <Grid item>
                <Button
                  disabled={isSubmitDisabled()}
                  onClick={getSubmitHandler()}
                  size='large'
                  variant='contained'
                  sx={{
                    minWidth: '120px',
                  }}
                >
                  {getSubmitText()}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      {/* Bottom discard link - always visible across all steps */}
      {onDiscard && (
        <>
          <Grid
            container
            sx={{ justifyContent: 'center', py: { xs: '1.5rem', md: '.875rem' } }}
          >
            <Grid item>
              <Button
                variant='text'
                size='small'
                disabled={isPreviousDisabled()}
                sx={{
                  fontWeight: 400,
                  textDecoration: 'underline',
                  color: 'text.secondary',
                  textTransform: 'none',
                }}
                onClick={() => setShowDiscardModal(true)}
              >
                {t('discard', 'Atšaukti pildymą ir ištrinti formos duomenis')}
              </Button>
            </Grid>
          </Grid>

          <DiscardConfirmationModal
            open={showDiscardModal}
            onConfirm={onDiscard}
            onClose={() => setShowDiscardModal(false)}
          />
        </>
      )}
    </>
  );
}
