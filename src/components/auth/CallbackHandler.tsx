import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function CallbackHandler() {
  const navigate = useNavigate();
  const { userManager } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      if (!userManager) {
        setError('User manager not initialized');
        return;
      }

      try {
        // Handle the callback from the OIDC provider
        const user = await userManager.signinRedirectCallback();

        if (user) {
          // Successfully authenticated, redirect to the intended page or home
          const redirectPath = sessionStorage.getItem('auth_redirect_path') || '/';
          sessionStorage.removeItem('auth_redirect_path');
          navigate(redirectPath, { replace: true });
        } else {
          setError('Authentication failed - no user returned');
        }
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          // console.error('Callback handling error:', err);
        }
        setError(err instanceof Error ? err.message : 'Authentication callback failed');
      }
    };

    handleCallback();
  }, [userManager, navigate]);

  if (error) {
    return (
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        gap={2}
        px={2}
      >
        <Alert severity='error' sx={{ maxWidth: 400 }}>
          <Typography variant='h6' gutterBottom>
            Authentication Error
          </Typography>
          <Typography variant='body2'>{error}</Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      minHeight='100vh'
      gap={2}
    >
      <CircularProgress size={48} />
      <Typography variant='h6' color='textSecondary'>
        Completing authentication...
      </Typography>
    </Box>
  );
}

export default CallbackHandler;
