/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@mui/material';
import {
  RcSesServiceFormContainer,
  RcSesServicePage,
  useAccordionController,
} from '@registrucentras/rc-ses-react-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import '../../i18n/i18n';
import theme from '../../theme';
import FormActions from './components/FormActions';
import FormContent from './components/FormContent';
import FormHeader from './components/FormHeader';
import useFormTranslation from './hooks/useFormTranslation';
import { FormBuilderProps } from './types';
import { formatFormDataForSubmission, getDefaultValues } from './utils';
import { createFormValidation } from './validation';

function FormBuilder({ config, initialData, className }: FormBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [preservedFormData, setPreservedFormData] = useState<Record<string, any>>({});

  const upMd = useMediaQuery(theme.breakpoints.up('md'));
  const { translateValidation } = useFormTranslation();

  const currentStepConfig = config.steps[currentStep];
  const isLastStep = currentStep === config.steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Memoize validation schema to avoid recreation on every render
  const validationSchema = useMemo(
    () =>
      createFormValidation(config.steps, config.globalValidation, translateValidation),
    [config.steps, config.globalValidation, translateValidation],
  );

  // Memoize default values to avoid recreation on every render
  const defaultValues = useMemo(
    () => ({
      ...getDefaultValues(config.steps),
      ...initialData,
      ...preservedFormData, // Include preserved data in default values
    }),
    [config.steps, initialData, preservedFormData],
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onChange',
  });

  const formData = watch();

  // Fix: Restore preserved values after form reset - avoid infinite loop by not including preservedFormData in deps
  useEffect(() => {
    if (Object.keys(preservedFormData).length > 0) {
      Object.keys(preservedFormData).forEach((key) => {
        if (
          preservedFormData[key] !== undefined &&
          preservedFormData[key] !== null &&
          preservedFormData[key] !== ''
        ) {
          setValue(key, preservedFormData[key], {
            shouldValidate: false,
            shouldDirty: true,
          });
        }
      });
    }
  }, [currentStep, setValue]); // Removed preservedFormData from deps to prevent infinite loop

  // Check if current step is valid for navigation
  const isCurrentStepValid = useCallback(() => {
    if (!config.multiStep) return isValid;

    // Get current step fields
    const currentStepFields = [
      ...(currentStepConfig.fields || []),
      ...(currentStepConfig.subgroups?.flatMap((subgroup) => subgroup.fields) || []),
    ];

    // Get only required fields
    const requiredStepFields = currentStepFields.filter((field) => field.required);

    // If no required fields, step is always valid
    if (requiredStepFields.length === 0) return true;

    // Check if any required field has errors
    const hasErrors = requiredStepFields.some((field) => errors[field.name]);

    // Check if any required field is empty
    const currentFormData = getValues();
    const hasEmptyRequired = requiredStepFields.some((field) => {
      const value = currentFormData[field.name];
      return !value || value === '' || (Array.isArray(value) && value.length === 0);
    });

    return !hasErrors && !hasEmptyRequired;
  }, [config.multiStep, isValid, currentStepConfig, errors, getValues]);

  // Simplified loading states - only keep essential ones
  const combinedLoadingStates = useMemo(
    () => ({
      isSubmitting: config.loading?.states?.isSubmitting ?? isSubmitting,
      isSavingDraft: config.loading?.states?.isSavingDraft ?? isSavingDraft,
      isDataLoading: config.loading?.states?.isDataLoading ?? isDataLoading,
    }),
    [
      config.loading?.states?.isSubmitting,
      config.loading?.states?.isSavingDraft,
      config.loading?.states?.isDataLoading,
      isSubmitting,
      isSavingDraft,
      isDataLoading,
    ],
  );

  // Determine if any loading is active
  const isAnyLoading = useMemo(
    () => Object.values(combinedLoadingStates).some(Boolean),
    [combinedLoadingStates],
  );

  // Determine if form should be disabled
  const isFormDisabled = useMemo(
    () => (config.loading?.disableFormDuringLoading ? isAnyLoading : false),
    [config.loading?.disableFormDuringLoading, isAnyLoading],
  );

  // Memoize accordion state to avoid recreation on every render
  const initialAccordionState = useMemo(
    () =>
      config.steps.reduce((acc, step, index) => {
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
      }, {} as any),
    [config.steps, currentStep],
  );

  // Use accordion controller hook - required for RcSesServiceFormContainer
  const accordionController = useAccordionController({
    initialState: initialAccordionState,
  });

  // Load draft data on component mount
  useEffect(() => {
    const loadDraft = async () => {
      if (config.onLoadDraft) {
        setIsDataLoading(true);
        try {
          const draftData = await config.onLoadDraft();
          if (draftData) {
            // Set preserved data for form restoration
            setPreservedFormData(draftData);
            Object.keys(draftData).forEach((key) => {
              setValue(key, draftData[key]);
            });
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to load draft:', error);
        } finally {
          setIsDataLoading(false);
        }
      }
    };
    loadDraft();
  }, [config, setValue]);

  // Handle draft saving
  const handleSaveDraft = useCallback(async () => {
    if (!config.onSaveDraft) return;

    // Don't override external loading state
    if (!config.loading?.states?.isSavingDraft) {
      setIsSavingDraft(true);
    }
    try {
      const currentData = getValues();
      await config.onSaveDraft(currentData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save draft:', error);
    } finally {
      if (!config.loading?.states?.isSavingDraft) {
        setIsSavingDraft(false);
      }
    }
  }, [config, getValues]);

  // Handle discard functionality
  const handleDiscard = useCallback(async () => {
    if (config.onDiscard) {
      await config.onDiscard();
    }
  }, [config]);

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
      const currentValues = getValues();

      // Preserve form values in state for restoration after step change
      setPreservedFormData((prevData) => ({
        ...prevData,
        ...currentValues,
      }));

      if (config.onStepChange) {
        config.onStepChange(targetStep, currentValues);
      }
      setCurrentStep(targetStep);
      updateAccordionState(targetStep);
    },
    [config, getValues, updateAccordionState],
  );

  // Handle step navigation - with proper validation
  const handleNext = useCallback(async () => {
    if (config.multiStep) {
      // Get current step fields
      const currentStepFields = [
        ...(currentStepConfig.fields || []),
        ...(currentStepConfig.subgroups?.flatMap((subgroup) => subgroup.fields) || []),
      ];

      // Get only required fields for validation
      const requiredStepFields = currentStepFields.filter((field) => field.required);

      // If no required fields, navigate directly
      if (requiredStepFields.length === 0) {
        navigateToStep(currentStep + 1);
        return;
      }

      // Trigger validation for current step's required fields
      const fieldNames = requiredStepFields.map((field) => field.name);
      const isStepValid = await trigger(fieldNames);

      if (isStepValid) {
        // If validation passes, navigate to next step
        navigateToStep(currentStep + 1);
      } else if (config.onInvalidSubmit) {
        // Validation failed - errors will be automatically displayed by React Hook Form
        // Get current errors for the step fields
        const stepErrors = fieldNames.reduce((acc, fieldName) => {
          if (errors[fieldName]) {
            acc[fieldName] = errors[fieldName];
          }
          return acc;
        }, {} as any);

        await config.onInvalidSubmit(stepErrors, getValues());
      }
    } else {
      // For single-step forms, use normal submit
      handleSubmit(
        (data) => config.onSubmit(formatFormDataForSubmission(data)),
        (formErrors) => config.onInvalidSubmit?.(formErrors, getValues()),
      )();
    }
  }, [
    config,
    currentStepConfig,
    navigateToStep,
    currentStep,
    trigger,
    errors,
    getValues,
    handleSubmit,
  ]);

  const handlePrevious = useCallback(() => {
    navigateToStep(currentStep - 1);
  }, [navigateToStep, currentStep]);

  // Handle successful form submission
  const handleFormSubmit = useCallback(
    async (data: any) => {
      // Don't override external loading state
      if (!config.loading?.states?.isSubmitting) {
        setIsSubmitting(true);
      }
      try {
        const formattedData = formatFormDataForSubmission(data);
        await config.onSubmit(formattedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Form submission error:', error);
      } finally {
        if (!config.loading?.states?.isSubmitting) {
          setIsSubmitting(false);
        }
      }
    },
    [config],
  );

  // Handle validation failure on form submission
  const handleFormError = useCallback(
    async (formErrors: FieldErrors) => {
      if (config.onInvalidSubmit) {
        await config.onInvalidSubmit(formErrors, getValues());
      }
    },
    [config, getValues],
  );

  // Memoize form container props
  const formContainerProps = useMemo(
    () =>
      config.multiStep
        ? { accordionController, showProgressStepper: upMd }
        : { accordionController },
    [config.multiStep, accordionController, upMd],
  );

  // Memoize form actions submit handler
  const formActionsSubmitHandler = useMemo(
    () =>
      config.multiStep && !isLastStep
        ? handleNext
        : handleSubmit(handleFormSubmit, handleFormError),
    [
      config.multiStep,
      isLastStep,
      handleNext,
      handleSubmit,
      handleFormSubmit,
      handleFormError,
    ],
  );

  // Determine if form actions should be valid (for submit/next button)
  const isFormActionsValid = useMemo(
    () => (config.multiStep ? isCurrentStepValid() : isValid),
    [config.multiStep, isCurrentStepValid, isValid],
  );

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
          loadingStates={combinedLoadingStates}
          loadingConfig={config.loading}
        />
        <FormActions
          multiStep={config.multiStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
          isValid={isFormActionsValid && !isFormDisabled}
          isSubmitting={combinedLoadingStates.isSubmitting}
          isSavingDraft={combinedLoadingStates.isSavingDraft}
          loadingStates={combinedLoadingStates}
          loadingConfig={config.loading}
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
