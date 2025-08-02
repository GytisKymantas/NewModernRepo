import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { UserManager } from 'oidc-client-ts';
import { apiConfig, isAuthEnabled } from '../config/auth.config';

export interface ApiError {
  status: number;
  message: string;
  data?: unknown;
}

export class HttpClient {
  private axiosInstance: AxiosInstance;

  private userManager?: UserManager;

  constructor(userManager?: UserManager) {
    this.userManager = userManager;
    this.axiosInstance = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        if (isAuthEnabled() && this.userManager) {
          try {
            const user = await this.userManager.getUser();
            if (user?.access_token) {
              config.headers.Authorization = `Bearer ${user.access_token}`;
            }
          } catch (error) {
            if (process.env.NODE_ENV === 'development') {
              // console.warn('Failed to get user token:', error);
            }
          }
        }
        return config;
      },
      (error) => Promise.reject(HttpClient.handleError(error)),
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 Unauthorized
        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          isAuthEnabled() &&
          this.userManager
        ) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token silently
            await this.userManager.signinSilent();
            const user = await this.userManager.getUser();

            if (user?.access_token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${user.access_token}`;
              return await this.axiosInstance.request(originalRequest);
            }
            // If silent renewal fails, redirect to login
            return await this.userManager
              .signinRedirect()
              .then(() => Promise.reject(HttpClient.handleError(error)));
          } catch (refreshError) {
            // If token refresh fails, redirect to login
            return await this.userManager
              .signinRedirect()
              .then(() => Promise.reject(HttpClient.handleError(error)));
          }
        }

        return Promise.reject(HttpClient.handleError(error));
      },
    );
  }

  private static handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: error.message || 'An unexpected error occurred',
      data: error.response?.data,
    };

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      // console.error('API Error:', apiError);
    }

    return apiError;
  }

  // HTTP methods
  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.axiosInstance.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  // Update user manager (useful when auth context changes)
  updateUserManager(userManager: UserManager): void {
    this.userManager = userManager;
  }

  // Get the axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Create singleton instance
let httpClientInstance: HttpClient;

export const createHttpClient = (userManager?: UserManager): HttpClient => {
  httpClientInstance = new HttpClient(userManager);
  return httpClientInstance;
};

export const getHttpClient = (): HttpClient => {
  if (!httpClientInstance) {
    httpClientInstance = new HttpClient();
  }
  return httpClientInstance;
};

export default getHttpClient;
