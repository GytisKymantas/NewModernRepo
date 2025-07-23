import { useAuth } from '../contexts/AuthContext';
import { getHttpClient } from '../services/httpClient';

export const useHttpClient = () => {
  const { userManager } = useAuth();

  const httpClient = getHttpClient();

  // Update the HTTP client with the latest user manager
  if (userManager && httpClient) {
    httpClient.updateUserManager(userManager);
  }

  return httpClient;
};

export default useHttpClient;
