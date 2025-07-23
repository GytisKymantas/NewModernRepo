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
import IconProps from '../../../assets/IconProps';
import useAccordionController from '../../hooks/useAccordionController';

function CaretDownIcon({ className = undefined }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.031 9.53104L12.531 17.031C12.4614 17.1008 12.3787 17.1561 12.2876 17.1938C12.1966 17.2316 12.099 17.251 12.0004 17.251C11.9019 17.251 11.8043 17.2316 11.7132 17.1938C11.6222 17.1561 11.5394 17.1008 11.4698 17.031L3.96979 9.53104C3.82906 9.39031 3.75 9.19944 3.75 9.00042C3.75 8.80139 3.82906 8.61052 3.96979 8.46979C4.11052 8.32906 4.30139 8.25 4.50042 8.25C4.69944 8.25 4.89031 8.32906 5.03104 8.46979L12.0004 15.4401L18.9698 8.46979C19.0395 8.40011 19.1222 8.34483 19.2132 8.30712C19.3043 8.26941 19.4019 8.25 19.5004 8.25C19.599 8.25 19.6965 8.26941 19.7876 8.30712C19.8786 8.34483 19.9614 8.40011 20.031 8.46979C20.1007 8.53947 20.156 8.6222 20.1937 8.71324C20.2314 8.80429 20.2508 8.90187 20.2508 9.00042C20.2508 9.09896 20.2314 9.19654 20.1937 9.28759C20.156 9.37863 20.1007 9.46136 20.031 9.53104Z'
        fill='#6B747F'
      />
    </svg>
  );
}
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
