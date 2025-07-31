import styled from '@emotion/styled';

// Progress components
export const ProgressContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: -17px;
`;

export const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: #d1fae7;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  background-color: #008561;
  height: 100%;
`;

export const ProgressTextContainer = styled.div`
  padding-left: 24px;
`;

export const StepInfo = styled.p`
  margin-top: 8px;
  color: #008561;
  font-weight: bold;
`;

// Form content styling
export const StyledFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  .MuiFormGroup-root {
    display: flex;
    flex-direction: column;
  }
`;

// Fix for accordion jumping issue
export const StyledAccordionWrapper = styled.div`
  /* Override the problematic margin behavior from rc-ses-react-components */
  .MuiAccordion-root {
    margin: 1rem 0 !important;
    border:none !important;
    border-radius:8px !important;
    background:none !important;

    /* Ensure consistent margin for all states */
    &.Mui-expanded:first-of-type {
      margin-top: 1rem !important;
          background:none !important;

    }

    &:first-of-type {
      margin-top: 1rem !important;
      background:none !important;

    }

    &:last-of-type {
      margin-bottom: 1rem !important;
      background:none !important;

    }
  }



    @media (min-width: 600px) {
    .MuiAccordion-root {
        margin: 1rem 0 !important;
       border: 1px solid #BEC3CA !important;

 &.Mui-expanded:first-of-type {
      margin-top: -1rem !important;
      margin: 1.5rem 2rem 2rem 2rem !important;
    }

    &:first-of-type {
      margin-top: 1rem !important;
      margin: 1.5rem 2rem 2rem 2rem !important;
    }

    &:last-of-type {
      margin-bottom: 1rem !important;
      margin: 1.5rem 2rem 2rem 2rem !important;
    }
}

  @media (min-width: 900px) {
    .MuiAccordion-root {
      margin: 1rem 0 !important;

      &.Mui-expanded:first-of-type {
        margin-top: -1rem !important;
        margin: 1.5rem 0 !important;

      }

      &:first-of-type {
        margin-top: 1rem !important;
      }
    }
  }

`;

export const StyledAccordionWrapperTwo = styled.div`
  .MuiAccordion-root {
    border: none !important;
    margin: 0 !important;
    background: none !important;
  }
  .MuiAccordion-root:last-of-type {
    border: none !important;
    margin: 0 !important;
    background: none !important;
  }

  .MuiAccordion-root.Mui-expanded:first-of-type {
    border: none !important;
    margin: 0 !important;
    background: none !important;
  }

  .MuiAccordion-root.Mui-expanded:last-of-type {
    border: none !important;
    margin: 0 !important;
    background: none !important;
  }
`;
