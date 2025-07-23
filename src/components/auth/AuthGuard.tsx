import { Box, Button, CircularProgress, Container, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { isAuthEnabled } from '../../config/auth.config';
import { useAuth } from '../../contexts/AuthContext';

export interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

function LoadingSpinner() {
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
        Loading...
      </Typography>
    </Box>
  );
}

function LoginPrompt({ onLogin }: { onLogin: () => void }) {
  return (
    <Container maxWidth='sm'>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        gap={3}
        textAlign='center'
      >
        <Typography variant='h4' component='h1' gutterBottom>
          Authentication Required
        </Typography>
        <Typography variant='body1' color='textSecondary' paragraph>
          You need to sign in to access this application.
        </Typography>
        <Button variant='contained' size='large' onClick={onLogin} sx={{ minWidth: 200 }}>
          Sign In
        </Button>
      </Box>
    </Container>
  );
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading, login } = useAuth();

  // If auth is disabled, render children directly
  if (!isAuthEnabled()) {
    return <>{children}</>;
  }

  // Show loading spinner while checking authentication
  if (isLoading) {
    return fallback || <LoadingSpinner />;
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return fallback || <LoginPrompt onLogin={login} />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}

export default AuthGuard;
