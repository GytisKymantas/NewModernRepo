import { RcSesServiceFormActions } from '@registrucentras/rc-ses-react-components';
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
}: FormActionsProps) {
  const { t } = useTranslation();

  // Helper function to get common save draft props
  const getSaveDraftProps = () => ({
    disabled: isSavingDraft,
    children: isSavingDraft
      ? t('formBuilder.actions.saving')
      : t('formBuilder.actions.saveDraft'),
  });

  // Helper function to get submit props based on form type
  const getSubmitProps = () => {
    if (!multiStep) {
      return {
        disabled: !isValid || isSubmitting,
        children: isSubmitting
          ? t('formBuilder.actions.submitting')
          : t('formBuilder.actions.submit'),
      };
    }

    return {
      disabled: isLastStep ? !isValid || isSubmitting : false,
      children: (() => {
        if (isLastStep) {
          return isSubmitting
            ? t('formBuilder.actions.submitting')
            : t('formBuilder.actions.submit');
        }
        return t('formBuilder.actions.next');
      })(),
    };
  };

  // Helper function to get submit handler based on form type
  const getSubmitHandler = () => {
    if (!multiStep) {
      return onSubmit;
    }
    return isLastStep ? onSubmit : onNext;
  };

  return (
    <RcSesServiceFormActions
      onSaveDraft={onSaveDraft}
      onSubmit={getSubmitHandler()}
      onDiscard={multiStep && !isFirstStep ? onPrevious : undefined}
      saveDraftProps={getSaveDraftProps()}
      submitProps={getSubmitProps()}
      discardProps={
        multiStep
          ? {
              children: t('formBuilder.actions.previous'),
              disabled: isFirstStep,
            }
          : undefined
      }
    />
  );
}
