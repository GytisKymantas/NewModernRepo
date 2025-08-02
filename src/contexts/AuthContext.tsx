import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authConfig, isAuthEnabled } from '../config/auth.config';
import { createHttpClient, getHttpClient } from '../services/httpClient';

export interface AuthContextType {
  user: User | null;
  userManager: UserManager | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  renewToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userManager, setUserManager] = useState<UserManager | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize UserManager
  useEffect(() => {
    if (!isAuthEnabled()) {
      setIsLoading(false);
      return undefined;
    }

    const manager = new UserManager({
      ...authConfig,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    });

    setUserManager(manager);

    // Setup event listeners
    manager.events.addUserLoaded((loadedUser: User) => {
      setUser(loadedUser);
      setIsLoading(false);
    });

    manager.events.addUserUnloaded(() => {
      setUser(null);
    });

    manager.events.addAccessTokenExpiring(() => {
      manager.signinSilent().catch(() =>
        // err
        {
          if (process.env.NODE_ENV === 'development') {
            // console.error('Silent token renewal failed:', err);
          }
        },
      );
    });

    manager.events.addAccessTokenExpired(() => {
      setUser(null);
      manager.removeUser();
    });

    manager.events.addSilentRenewError(() =>
      // error
      {
        if (process.env.NODE_ENV === 'development') {
          // console.error('Silent renew error:', error);
        }
      },
    );

    // Check if user is already logged in
    manager
      .getUser()
      .then((currentUser) => {
        if (currentUser && !currentUser.expired) {
          setUser(currentUser);
        }
        setIsLoading(false);
      })
      .catch(() =>
        // error
        {
          if (process.env.NODE_ENV === 'development') {
            // console.error('Error getting user:', error);
          }
          setIsLoading(false);
        },
      );

    // Create HTTP client with user manager
    createHttpClient(manager);

    return () => {
      manager.events.removeUserLoaded(() => {});
      manager.events.removeUserUnloaded(() => {});
      manager.events.removeAccessTokenExpiring(() => {});
      manager.events.removeAccessTokenExpired(() => {});
      manager.events.removeSilentRenewError(() => {});
    };
  }, []);

  // Update HTTP client when user manager changes
  useEffect(() => {
    if (userManager) {
      getHttpClient().updateUserManager(userManager);
    }
  }, [userManager]);

  const login = useCallback(async (): Promise<void> => {
    if (!userManager || !isAuthEnabled()) {
      throw new Error('Auth is not enabled or UserManager is not initialized');
    }
    try {
      await userManager.signinRedirect();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // console.error('Login error:', error);
      }
      throw error;
    }
  }, [userManager]);

  const logout = useCallback(async (): Promise<void> => {
    if (!userManager || !isAuthEnabled()) {
      throw new Error('Auth is not enabled or UserManager is not initialized');
    }
    try {
      await userManager.signoutRedirect();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // console.error('Logout error:', error);
      }
      throw error;
    }
  }, [userManager]);

  const renewToken = useCallback(async (): Promise<void> => {
    if (!userManager || !isAuthEnabled()) {
      throw new Error('Auth is not enabled or UserManager is not initialized');
    }
    try {
      await userManager.signinSilent();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // console.error('Token renewal error:', error);
      }
      throw error;
    }
  }, [userManager]);

  const isAuthenticated = isAuthEnabled() ? !!user && !user.expired : true;

  const contextValue = useMemo(
    (): AuthContextType => ({
      user,
      userManager,
      isLoading,
      isAuthenticated,
      login,
      logout,
      renewToken,
    }),
    [user, userManager, isLoading, isAuthenticated, login, logout, renewToken],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
