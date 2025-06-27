/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@mui/material';
import {
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import { useCallback, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import '../../i18n/i18n';
import theme from '../../theme';
import FormActions from './components/FormActions';
import FormContent from './components/FormContent';
import FormHeader from './components/FormHeader';
import useFormTranslation from './hooks/useFormTranslation';
import { FormBuilderProps } from './types';
import { formatFormDataForSubmission, getDefaultValues } from './utils';
import { createFormValidation, createStepValidation } from './validation';

function FormBuilder({ config, initialData, className }: FormBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { translateValidation } = useFormTranslation();

  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Create validation schema for current step or entire form with translations
  const validationSchema = config.multiStep
    ? createStepValidation(currentStepConfig, translateValidation)
    : createFormValidation(config.steps, config.globalValidation, translateValidation);

  const defaultValues = {
    ...getDefaultValues(config.steps),
    ...initialData,
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'all',
  });

  const formData = watch();

  // Create accordion controller for both single and multi-step forms
  const initialAccordionState = config.steps.reduce((acc, step, index) => {
    let state: 'completed' | 'active' | 'pending';
    if (index < currentStep) {
      state = 'completed';
    } else if (index === currentStep) {
      state = 'active';
    } else {
      state = 'pending';
    }

    acc[step.id] = {
      expanded: index === currentStep,
      state,
      title: step.title,
    };
    return acc;
  }, {} as any);

  // Use accordion controller hook - required for RcSesServiceFormContainer
  const accordionController = useAccordionController({
    initialState: initialAccordionState,
  });

  // Load draft data on component mount
  useEffect(() => {
    const loadDraft = async () => {
      if (config.onLoadDraft) {
        try {
          const draftData = await config.onLoadDraft();
          if (draftData) {
            Object.keys(draftData).forEach((key) => {
              setValue(key, draftData[key]);
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to load draft:', error);
        }
      }
    };
    loadDraft();
  }, [config, setValue]);

  // Handle draft saving
  const handleSaveDraft = async () => {
    if (!config.onSaveDraft) return;

    setIsSavingDraft(true);
    try {
      const currentData = getValues();
      await config.onSaveDraft(currentData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save draft:', error);
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Handle discard functionality
  const handleDiscard = async () => {
    if (config.onDiscard) {
      await config.onDiscard();
    }
  };

  // Helper function to update accordion state for a given step
  const updateAccordionState = useCallback(
    (targetStep: number) => {
      if (!accordionController.setState) return;

      const newState = { ...accordionController.state };
      config.steps.forEach((step, index) => {
        if (newState[step.id]) {
          if (index < targetStep) {
            newState[step.id].state = 'completed';
            newState[step.id].expanded = false;
          } else if (index === targetStep) {
            newState[step.id].state = 'active';
            newState[step.id].expanded = true;
          } else {
            newState[step.id].state = 'pending';
            newState[step.id].expanded = false;
          }
        }
      });
      accordionController.setState(newState);
    },
    [accordionController, config.steps],
  );

  // Helper function to navigate to a specific step
  const navigateToStep = useCallback(
    (targetStep: number) => {
      if (config.onStepChange) {
        config.onStepChange(targetStep, getValues());
      }
      setCurrentStep(targetStep);
      updateAccordionState(targetStep);
    },
    [config, getValues, updateAccordionState],
  );

  // Handle step navigation - use handleSubmit pattern for proper error handling
  const handleNext = useCallback(() => {
    // Use handleSubmit to properly trigger validation and get errors
    const onStepValid = () => {
      navigateToStep(currentStep + 1);
    };

    const onStepInvalid = async (stepErrors: FieldErrors) => {
      if (config.onInvalidSubmit) {
        await config.onInvalidSubmit(stepErrors, getValues());
      }
    };

    // Use handleSubmit which will automatically validate and call the appropriate callback
    return handleSubmit(onStepValid, onStepInvalid)();
  }, [handleSubmit, navigateToStep, currentStep, config, getValues]);

  const handlePrevious = useCallback(() => {
    navigateToStep(currentStep - 1);
  }, [navigateToStep, currentStep]);

  // Handle successful form submission
  const handleFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formattedData = formatFormDataForSubmission(data);
      await config.onSubmit(formattedData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle validation failure on form submission
  const handleFormError = async (formErrors: FieldErrors) => {
    if (config.onInvalidSubmit) {
      await config.onInvalidSubmit(formErrors, getValues());
    }
  };

  // Prepare props for conditional rendering
  const formContainerProps = config.multiStep
    ? { accordionController, showProgressStepper: upMd }
    : { accordionController };

  const formActionsSubmitHandler =
    config.multiStep && !isLastStep
      ? handleNext
      : handleSubmit(handleFormSubmit, handleFormError);

  return (
    <RcSesServicePage className={className}>
      <FormHeader title={config.title} description={config.description} />

      <RcSesServiceFormContainer {...formContainerProps}>
        <FormContent
          step={currentStepConfig}
          control={control}
          errors={errors}
          register={register}
          setValue={setValue}
          watch={watch}
          formData={formData}
          onSubmit={handleSubmit(handleFormSubmit)}
          accordionController={accordionController}
        />
        <FormActions
          multiStep={config.multiStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isValid={isValid}
          isSubmitting={isSubmitting}
          isSavingDraft={isSavingDraft}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSubmit={formActionsSubmitHandler}
          onSaveDraft={config.onSaveDraft ? handleSaveDraft : undefined}
          onDiscard={handleDiscard}
        />
      </RcSesServiceFormContainer>
    </RcSesServicePage>
  );
}

export default FormBuilder;
