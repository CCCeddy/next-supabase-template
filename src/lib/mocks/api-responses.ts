import { z } from 'zod';

// Mock user data
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    createdAt: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'user',
    createdAt: '2024-01-03T00:00:00Z',
  },
];

// Mock API responses
export const mockApiResponses = {
  success: (data: unknown) => ({
    success: true,
    data,
    error: null,
    timestamp: new Date().toISOString(),
  }),
  
  error: (message: string) => ({
    success: false,
    data: null,
    error: message,
    timestamp: new Date().toISOString(),
  }),
  
  validation: (errors: z.ZodError) => ({
    success: false,
    data: null,
    error: 'Validation failed',
    validationErrors: errors.errors,
    timestamp: new Date().toISOString(),
  }),
  
  network: () => ({
    success: false,
    data: null,
    error: 'Network error occurred',
    timestamp: new Date().toISOString(),
  }),
};

// Simulate different API scenarios
export const simulateApiCall = async <T>(
  data: T,
  scenario: 'success' | 'error' | 'validation' | 'network' = 'success',
  delay = 1000
) => {
  await new Promise(resolve => setTimeout(resolve, delay));

  switch (scenario) {
    case 'success':
      return mockApiResponses.success(data);
    case 'error':
      return mockApiResponses.error('Server error occurred');
    case 'validation':
      return mockApiResponses.error('Invalid data provided');
    case 'network':
      throw new Error('Network error');
    default:
      return mockApiResponses.success(data);
  }
};