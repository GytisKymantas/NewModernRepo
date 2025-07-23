import { getHttpClient } from './httpClient';

// Define proper types instead of using 'any'
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

interface Item {
  id: string;
  name: string;
  description?: string;
}

interface ItemsResponse {
  items: Item[];
  total: number;
  page: number;
}

interface CreateItemRequest {
  name: string;
  description?: string;
}

interface UpdateItemRequest {
  name?: string;
  description?: string;
}

interface FileUploadResponse {
  id: string;
  filename: string;
  url: string;
}

// Example API service showing how to use the HTTP client
export class ExampleApiService {
  private httpClient = getHttpClient();

  // Example: Get user profile
  async getUserProfile(): Promise<UserProfile> {
    return this.httpClient.get<UserProfile>('/user/profile');
  }

  // Example: Get list of items
  async getItems(params?: { page?: number; limit?: number }): Promise<ItemsResponse> {
    return this.httpClient.get<ItemsResponse>('/items', { params });
  }

  // Example: Create new item
  async createItem(data: CreateItemRequest): Promise<Item> {
    return this.httpClient.post<Item>('/items', data);
  }

  // Example: Update item
  async updateItem(id: string, data: UpdateItemRequest): Promise<Item> {
    return this.httpClient.put<Item>(`/items/${id}`, data);
  }

  // Example: Delete item
  async deleteItem(id: string): Promise<void> {
    return this.httpClient.delete<void>(`/items/${id}`);
  }

  // Example: Upload file
  async uploadFile(file: File): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post<FileUploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

// Create singleton instance
export const exampleApiService = new ExampleApiService();
