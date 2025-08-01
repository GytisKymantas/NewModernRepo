import { StyledAccordionWrapperTwo } from '@/components/FormBuilder';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useAccordionController } from '@registrucentras/rc-ses-react-components';
import AccordionWrapper from '../../Service/components/AccordionWrapper';

// Styled Components declared outside

const AccordionEntry = styled.div<{
  marginBottom?: string;
  marginTop?: string;
  borderPosition?: 'top' | 'bottom';
}>`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ marginTop }) => marginTop || '10px'};
  max-height: 16px;
  margin-bottom: ${({ marginBottom }) => marginBottom || '0px'};

  ${({ borderPosition }) => {
    if (borderPosition === 'top') return 'border-top: 1px solid #DCE0E5;';
    if (borderPosition === 'bottom') return 'border-bottom: 1px solid #DCE0E5;';
    return '';
  }}

  ${({ borderPosition }) => {
    if (borderPosition === 'top') return 'padding-top: 24px;';
    if (borderPosition === 'bottom') return 'padding-bottom: 24px;';
    return '';
  }}
`;

const PersonStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Names = styled.p`
  margin: 0;
  font-size: 14px;
`;

interface SignaturesSectionProps {
  signedStatusComponent: React.ReactNode;
}

function SignaturesSection({ signedStatusComponent }: SignaturesSectionProps) {
  const accordionController = useAccordionController({
    initialState: {
      basicInformation: {
        expanded: false,
        state: 'completed',
        title: 'Pasirašantys asmenys (2)',
      },
      serviceDetails: {
        expanded: true,
        state: 'active',
        title: 'Paslaugos užsakymas',
      },
      serviceIssuance: {
        expanded: false,
        state: 'pending',
        title: 'Išdavimas',
      },
      additionalServices: {
        expanded: false,
        state: 'pending',
        title: 'Reikalingos papildomos paslaugos',
      },
      termsAndConditions: {
        expanded: false,
        state: 'pending',
        title: 'Terminai ir sąlygos',
      },
    },
  });

  return (
    <StyledAccordionWrapperTwo>
      <AccordionWrapper
        id='basicInformation'
        controller={accordionController}
        sx={{
          borderWidth: 0,
          border: 'none !important',
          paddingLeft: '0px',
          bacgkroundColor: 'none',
        }}
        titleComponent={
          <Box
            sx={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
              margin: { xs: '0 0 0 -10px', md: '0 0 0 -24px' },
            }}
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18.4329 17.2502C17.481 15.6046 16.0142 14.4246 14.3023 13.8652C15.1491 13.3611 15.8069 12.593 16.1749 11.6789C16.5429 10.7647 16.6006 9.75499 16.3392 8.80483C16.0778 7.85468 15.5117 7.01661 14.7279 6.41931C13.9441 5.82202 12.9859 5.49854 12.0004 5.49854C11.015 5.49854 10.0567 5.82202 9.27293 6.41931C8.48911 7.01661 7.92304 7.85468 7.66163 8.80483C7.40022 9.75499 7.45793 10.7647 7.82591 11.6789C8.19388 12.593 8.85177 13.3611 9.69854 13.8652C7.98666 14.424 6.51979 15.604 5.56791 17.2502C5.53301 17.3072 5.50985 17.3705 5.49982 17.4365C5.48978 17.5025 5.49307 17.5699 5.50949 17.6346C5.52591 17.6993 5.55512 17.7601 5.59541 17.8133C5.63569 17.8666 5.68624 17.9112 5.74405 17.9446C5.80187 17.978 5.86579 17.9995 5.93204 18.0078C5.9983 18.0161 6.06554 18.011 6.1298 17.9929C6.19407 17.9748 6.25405 17.944 6.30622 17.9023C6.35838 17.8606 6.40168 17.8089 6.43354 17.7502C7.61104 15.7152 9.69229 14.5002 12.0004 14.5002C14.3085 14.5002 16.3898 15.7152 17.5673 17.7502C17.5991 17.8089 17.6424 17.8606 17.6946 17.9023C17.7468 17.944 17.8068 17.9748 17.871 17.9929C17.9353 18.011 18.0025 18.0161 18.0688 18.0078C18.135 17.9995 18.199 17.978 18.2568 17.9446C18.3146 17.9112 18.3651 17.8666 18.4054 17.8133C18.4457 17.7601 18.4749 17.6993 18.4913 17.6346C18.5078 17.5699 18.511 17.5025 18.501 17.4365C18.491 17.3705 18.4678 17.3072 18.4329 17.2502ZM8.50041 10.0002C8.50041 9.308 8.70568 8.63131 9.09027 8.05574C9.47485 7.48017 10.0215 7.03156 10.661 6.76666C11.3006 6.50175 12.0043 6.43244 12.6832 6.56749C13.3622 6.70254 13.9858 7.03588 14.4753 7.52536C14.9648 8.01485 15.2981 8.63849 15.4332 9.31742C15.5682 9.99635 15.4989 10.7001 15.234 11.3396C14.9691 11.9792 14.5205 12.5258 13.9449 12.9104C13.3693 13.295 12.6926 13.5002 12.0004 13.5002C11.0725 13.4992 10.1828 13.1302 9.52664 12.474C8.87047 11.8179 8.50141 10.9282 8.50041 10.0002Z'
                fill='black'
              />
            </svg>

            <p style={{ fontSize: '14px', margin: 0 }}>Pasirašantys asmenys (2)</p>
          </Box>
        }
      >
        <Box sx={{ paddingTop: '24px' }}>
          <AccordionEntry id='entry1' borderPosition='bottom'>
            <Names>Vardenis Pavardenis (Jūs)</Names>
            <PersonStatus>{signedStatusComponent}</PersonStatus>
          </AccordionEntry>

          <AccordionEntry id='entry2' marginBottom='24px' marginTop='15px'>
            <Names>Petras Petraitis</Names>
            <PersonStatus>{signedStatusComponent}</PersonStatus>
          </AccordionEntry>
        </Box>
      </AccordionWrapper>
    </StyledAccordionWrapperTwo>
  );
}

export default SignaturesSection;
