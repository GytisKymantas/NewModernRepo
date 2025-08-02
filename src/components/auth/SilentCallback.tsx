import { UserManager } from 'oidc-client-ts';
import { useEffect } from 'react';
import { authConfig } from '../../config/auth.config';

export function SilentCallback() {
  useEffect(() => {
    const handleSilentCallback = async () => {
      try {
        const userManager = new UserManager(authConfig);
        await userManager.signinSilentCallback();
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          // console.error('Silent callback error:', error);
        }
      }
    };

    handleSilentCallback();
  }, []);

  // This component doesn't render anything visible
  // It's used in an iframe for silent token renewal
  return null;
}

export default SilentCallback;
