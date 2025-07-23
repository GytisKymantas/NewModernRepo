import AccordionWrapperNotExpanded from '@/components/Service/components/AccordionWrapperNotExpanded';
import { Box, Grid, Typography } from '@mui/material';
import FieldRenderer, { SubgroupRenderer } from '../FieldRenderer';
import { StyledAccordionWrapper, StyledFormContent } from '../styled';
import { FormContentProps } from '../types';

export default function FormContent({
  step,
  control,
  errors,
  register,
  setValue,
  watch,
  formData,
  onSubmit,
  accordionController,
  loadingStates,
  loadingConfig,
  sxStyle,
}: FormContentProps) {
  // Determine if form should be disabled
  const isFormDisabled =
    loadingConfig?.disableFormDuringLoading &&
    loadingStates &&
    Object.values(loadingStates).some(Boolean);
  return (
    <StyledAccordionWrapper>
      <AccordionWrapperNotExpanded
        key={step.id}
        id={step.id}
        controller={accordionController}
        data-testid={`accordion-${step.id}`}
      >
        <Box component='form' onSubmit={onSubmit} noValidate sx={sxStyle}>
          <StyledFormContent data-testid={`step-content-${step.id}`}>
            {step.description && (
              <Typography variant='body1' color='text.secondary' sx={{ mb: 2 }}>
                {step.description}
              </Typography>
            )}

            {/* Render subgroups if they exist */}
            {step.subgroups ? (
              <>
                {step.subgroups.map((subgroup) => (
                  <SubgroupRenderer
                    key={subgroup.id}
                    subgroup={subgroup}
                    control={control}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    formData={formData}
                    disabled={isFormDisabled}
                  />
                ))}
              </>
            ) : (
              /* Render fields directly (backwards compatibility) */
              <Grid container spacing={3}>
                {step.fields?.map((field) => (
                  <FieldRenderer
                    key={field.id}
                    field={field}
                    control={control}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    formData={formData}
                    disabled={isFormDisabled}
                  />
                ))}
              </Grid>
            )}
          </StyledFormContent>
        </Box>
      </AccordionWrapperNotExpanded>
    </StyledAccordionWrapper>
  );
}
