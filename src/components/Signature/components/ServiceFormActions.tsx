import { Box, Card, Grid, IconProps } from '@mui/material';

import palette from '../../../theme/palette';
import PrimaryButton from '../../common/PrimaryButton';
// import palette from '@/theme/palette'

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
  isFirstStep?: boolean;
  className?: string;
};
function ServiceFormActions({
  onDiscard,
  onSaveDraft,
  onSubmit,
  onBack,
  draftDisabled,
  submitDisabled,
  isFirstStep,
  className,
}: Props) {
  return (
    <Box className={className}>
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
            {!isFirstStep && (
              <Grid item>
                <PrimaryButton
                  disabled={submitDisabled === true}
                  onClick={() => onBack()}
                  size='large'
                  sx={{ color: '#0079AD', fontWeight: 600, backgroundColor: '#F3FBFE' }}
                  variant='outlined'
                >
                  Atgal
                </PrimaryButton>
              </Grid>
            )}
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
          backgroundColor: { xs: '#F3FBFE', md: '#FFFFFF' },
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
    </Box>
  );
}

export default ServiceFormActions;
