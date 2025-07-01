import { Box, Card, Grid, IconProps } from '@mui/material';

import palette from '../../../theme/palette';
import PrimaryButton from '../../common/PrimaryButton';
// import palette from '@/theme/palette'
function ArrowRightIcon({ className = undefined }: IconProps) {
  return (
    <svg
      className={className}
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M20.7806 12.531L14.0306 19.281C13.8899 19.4218 13.699 19.5008 13.5 19.5008C13.301 19.5008 13.1101 19.4218 12.9694 19.281C12.8286 19.1403 12.7496 18.9494 12.7496 18.7504C12.7496 18.5514 12.8286 18.3605 12.9694 18.2198L18.4397 12.7504H3.75C3.55109 12.7504 3.36032 12.6714 3.21967 12.5307C3.07902 12.3901 3 12.1993 3 12.0004C3 11.8015 3.07902 11.6107 3.21967 11.4701C3.36032 11.3294 3.55109 11.2504 3.75 11.2504H18.4397L12.9694 5.78104C12.8286 5.64031 12.7496 5.44944 12.7496 5.25042C12.7496 5.05139 12.8286 4.86052 12.9694 4.71979C13.1101 4.57906 13.301 4.5 13.5 4.5C13.699 4.5 13.8899 4.57906 14.0306 4.71979L20.7806 11.4698C20.8504 11.5394 20.9057 11.6222 20.9434 11.7132C20.9812 11.8043 21.0006 11.9019 21.0006 12.0004C21.0006 12.099 20.9812 12.1966 20.9434 12.2876C20.9057 12.3787 20.8504 12.4614 20.7806 12.531Z'
        fill='#1F2733'
      />
    </svg>
  );
}

function CaretLeftIcon({ className = undefined }: IconProps) {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.3541 12.6465C10.4006 12.693 10.4374 12.7481 10.4626 12.8088C10.4877 12.8695 10.5007 12.9346 10.5007 13.0003C10.5007 13.066 10.4877 13.131 10.4626 13.1917C10.4374 13.2524 10.4006 13.3076 10.3541 13.354C10.3077 13.4005 10.2525 13.4373 10.1918 13.4625C10.1311 13.4876 10.0661 13.5006 10.0004 13.5006C9.9347 13.5006 9.86964 13.4876 9.80895 13.4625C9.74825 13.4373 9.6931 13.4005 9.64664 13.354L4.64664 8.35403C4.60015 8.30759 4.56328 8.25245 4.53811 8.19175C4.51295 8.13105 4.5 8.06599 4.5 8.00028C4.5 7.93457 4.51295 7.86951 4.53811 7.80881C4.56328 7.74811 4.60015 7.69296 4.64664 7.64653L9.64664 2.64653C9.74046 2.55271 9.86771 2.5 10.0004 2.5C10.1331 2.5 10.2603 2.55271 10.3541 2.64653C10.448 2.74035 10.5007 2.8676 10.5007 3.00028C10.5007 3.13296 10.448 3.26021 10.3541 3.35403L5.70727 8.00028L10.3541 12.6465Z'
        fill='#0E6790'
      />
    </svg>
  );
}
type Props = {
  onDiscard: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onBack?: () => void;
  draftDisabled?: boolean;
  submitDisabled?: boolean;
  isFirstStep?:boolean;
};
function ServiceFormActions({
  onDiscard,
  onSaveDraft,
  onSubmit,
  onBack,
  draftDisabled,
  submitDisabled,
  isFirstStep,
}: Props) {

  return (
    <>
      <Card
        sx={{
          backgroundColor: palette.primary['50'],
          borderColor: palette.primary['300'],
          borderRadius: { xs: 0, md: '.375rem' },
          borderLeftWidth: { xs: 0, md: '1px' },
          borderRightWidth: { xs: 0, md: '1px' },
          px: { xs: 2, md: 4 },
          py: 4,
        }}
      >
        <Grid
          container
          sx={{
            alignItems: 'center',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
          }}
        >
          <Grid item>
            <PrimaryButton
              disabled={draftDisabled === true}
              onClick={() => onSaveDraft()}
              startIcon={<CaretLeftIcon />}
              variant='text'
            >
              Baigti pildyti vėliau
            </PrimaryButton>
          </Grid>

          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {!isFirstStep && <Grid item>
              <PrimaryButton
                disabled={submitDisabled === true}
                onClick={() => onBack()}
                size='large'
                sx={{ color: '#0079AD', fontWeight: 600, backgroundColor: '#F3FBFE' }}
                variant='outlined'
              >
                Atgal
              </PrimaryButton>
            </Grid>}
            <Grid item>
              <PrimaryButton
                disabled={submitDisabled === true}
                onClick={() => onSubmit()}
                size='large'
                variant='contained'
                sx={{ fontWeight: 600 }}
              >
                Tęsti{' '}
              </PrimaryButton>
            </Grid>
          </Box>
        </Grid>
      </Card>

      <Grid
        container
        sx={{
          justifyContent: 'center',
          py: { xs: '1.5rem', md: '.875rem' },
          backgroundColor:  { xs:'#F3FBFE',md:'#FFFFFF' },
        }}
      >
        <Grid item>
          <PrimaryButton
            variant='text'
            size='small'
            sx={{ fontWeight: 400, textDecoration: 'underline', color: '#6B747F' }}
            onClick={() => onDiscard()}
          >
            Atšaukti pildymą ir ištrinti formos duomenis{' '}
          </PrimaryButton>
        </Grid>
      </Grid>
    </>
  );
}

export default ServiceFormActions;
