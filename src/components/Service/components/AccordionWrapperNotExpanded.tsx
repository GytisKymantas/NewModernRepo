/* eslint-disable react/prop-types */
import palette from '@/theme/palette';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  SxProps,
} from '@mui/material';
import React from 'react';
import useAccordionController from '../../hooks/useAccordionController';

type Props = React.ComponentProps<typeof Accordion> & {
  id: string;
  controller: ReturnType<typeof useAccordionController>;
  title?: string;
  titleComponent?: React.ReactNode;
  noPadding?: boolean;
  sxStyle?: SxProps;
  className?: string;
};

const StyledTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.24px;
`;

function AccordionWrapperNotExpanded(props: Props) {
  const {
    children,
    controller,
    id,
    onChange,
    titleComponent,
    sxStyle,
    className,
    ...accordionProps
  } = props;
  const { state } = controller;
  const { disabled, title } = id in state ? state[id] : { disabled: false, title: '' };

  return (
    <Accordion
      disabled={disabled}
      expanded
      {...accordionProps}
      // onChange={handleOnChange}
      className={className}
      sx={{ cursor: 'arrow' }}
    >
      <AccordionSummary
        id={`${id}-header`}
        aria-controls={`${id}-content`}
        expandIcon={null}
        // expandIcon={canToggle === false ? null : <CaretDownIcon />}
        sx={
          sxStyle ?? {
            backgroundColor: {
              sm: palette.grey[50],
              xs: 'white',
            },
            borderRadius: '8px',
          }
        }
      >
        {titleComponent ? (
          <Box sx={{ margin: '0' }}>{titleComponent}</Box>
        ) : (
          <StyledTitle>{title}</StyledTitle>
        )}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export default AccordionWrapperNotExpanded;
