import styled from '@emotion/styled';
import { Box, useMediaQuery } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import theme from '../../../theme';

const ProgressContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: -17px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: #d1fae7;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressBarFill = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  background-color: #008561;
  height: 100%;
`;

const ProgressTextContainer = styled.div`
  padding-left: 24px;
`;

const StepInfo = styled.p`
  margin-top: 8px;
  color: #008561;
  font-weight: bold;
`;

function ActiveStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='6' fill='#1F2733' />
    </svg>
  );
}

function CompletedStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='12' fill='#00A879' />
      <path
        d='M18.5326 9.03032L10.5326 17.0303C10.4629 17.1002 10.3801 17.1557 10.2889 17.1936C10.1978 17.2314 10.1 17.2509 10.0013 17.2509C9.90259 17.2509 9.80485 17.2314 9.71369 17.1936C9.62252 17.1557 9.53973 17.1002 9.47005 17.0303L5.97005 13.5303C5.90029 13.4606 5.84495 13.3777 5.80719 13.2866C5.76943 13.1954 5.75 13.0977 5.75 12.9991C5.75 12.9004 5.76943 12.8027 5.80719 12.7116C5.84495 12.6204 5.90029 12.5376 5.97005 12.4678C6.03982 12.3981 6.12264 12.3427 6.21379 12.305C6.30494 12.2672 6.40264 12.2478 6.5013 12.2478C6.59996 12.2478 6.69766 12.2672 6.78881 12.305C6.87996 12.3427 6.96279 12.3981 7.03255 12.4678L10.0019 15.4372L17.4713 7.96907C17.6122 7.82818 17.8033 7.74902 18.0026 7.74902C18.2018 7.74902 18.3929 7.82818 18.5338 7.96907C18.6747 8.10997 18.7539 8.30107 18.7539 8.50032C18.7539 8.69958 18.6747 8.89068 18.5338 9.03157L18.5326 9.03032Z'
        fill='white'
      />
    </svg>
  );
}

function PendingStepIcon() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
      <circle cx='12' cy='12' r='3' fill='#C5CAD1' />
    </svg>
  );
}

type AccordionState = {
  canToggle?: boolean;
  disabled?: boolean;
  expanded: boolean;
  state: 'active' | 'completed' | 'pending';
  title: string;
};

type AccordionControllerState = Record<string, AccordionState>;

type Props = {
  steps: AccordionControllerState;
  isVertical?: boolean;
  className?:string;
};

function ServiceFormContainer({ steps, isVertical,className }: Props) {
  const upSm = useMediaQuery(theme.breakpoints.up('sm'));
  const activeStep =
    Object.values(steps).findIndex((step) => step.state === 'active') ?? 0;
  const percentage = ((activeStep + 1) / Object.keys(steps).length) * 100;

  const getStepIcon = (state: AccordionState['state']) => {
    switch (state) {
      case 'active':
        return ActiveStepIcon;
      case 'completed':
        return CompletedStepIcon;
      default:
        return PendingStepIcon;
    }
  };

  if (isVertical) {
    return (
      <Box
      className={className}
        sx={{
          width: '100%',
          backgroundColor: '#ffffff',
          margin: '0 0 -8px 0',
          paddingTop: '32px',
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          orientation={isVertical ? 'vertical' : 'horizontal'}
        >
          {Object.values(steps).map((step, stepIndex) => (
            <Step key={step.title}>
              <StepLabel
                StepIconComponent={getStepIcon(step.state)}
                style={{ flexDirection: 'row', gap: '10px', alignItems: 'flex-end',zIndex:'4' }}
              >
                {step.title}
                {/* Vertical Line */}
                {(stepIndex === 0 || stepIndex === 1) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: stepIndex === 0 ? '31px' : '27.5px',
                      left: '12px',
                      height: stepIndex === 0 ? '26px' : '33px', // Adjust default height if needed
                      width: '3px', 
                      backgroundColor: '#F0F2F5',
                      transform: 'translateX(-50%)',
                      zIndex: '1',
                    }}
                  />
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  }

  return (
    <>
      {!upSm ? (
        <ProgressContainer       className={className}
>
          <ProgressBarWrapper>
            <ProgressBarFill percentage={percentage} />
          </ProgressBarWrapper>
          <ProgressTextContainer>
            <StepInfo>
              {activeStep + 1} žingsnis iš {Object.keys(steps).length}
            </StepInfo>
            {/* <StepTitle>Paslaugos užsakymas</StepTitle> */}
          </ProgressTextContainer>
        </ProgressContainer>
      ) : (
        <Box
          sx={{
            width: '100%',
            backgroundColor: '#ffffff',
            margin: '0 0 -8px 0',
            paddingTop: '32px',
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {Object.values(steps).map((step) => (
              <Step key={step.title}>
                <StepLabel StepIconComponent={getStepIcon(step.state)}>
                  {step.title}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      )}
    </>
  );
}

export default ServiceFormContainer;
