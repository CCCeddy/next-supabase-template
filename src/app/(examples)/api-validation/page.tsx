'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { mockUsers, simulateApiCall } from '@/lib/mocks/api-responses';

// Define our schemas
const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['user', 'admin'], {
    required_error: 'Please select a role',
  }),
});

const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: z.union([dataSchema, z.null()]), // Allow data to be null
    error: z.string().nullable(),
    timestamp: z.string().datetime().optional(),
  });

type UserFormData = z.infer<typeof userSchema>;
type ApiResponse<T> = {
  success: boolean;
  data: T | null;
  error: string | null;
  timestamp?: string;
};

export default function ApiValidationExample() {
  const [apiResponse, setApiResponse] = useState<ApiResponse<UserFormData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState<'success' | 'error' | 'validation' | 'network'>(
    'success'
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      const response = await simulateApiCall(data, scenario);
      const validatedResponse = apiResponseSchema(userSchema).parse(response);
      setApiResponse(validatedResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setApiResponse({
          success: false,
          data: data,
          error: 'API response validation failed',
          timestamp: new Date().toISOString(),
        });
      } else {
        setApiResponse({
          success: false,
          data: null,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
          timestamp: new Date().toISOString(),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load mock data into form
  const loadMockUser = (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role as 'user' | 'admin',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">API Validation Example</h1>

      {/* Educational section */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">🎓 Learning API Validation</h2>
        <div className="prose dark:prose-invert">
          <p>
            This example demonstrates how to validate both API requests and responses using Zod:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Request Validation:</strong> Form data is validated before submission
            </li>
            <li>
              <strong>Response Validation:</strong> API responses are validated against a schema
            </li>
            <li>
              <strong>Type Safety:</strong> TypeScript types are inferred from Zod schemas
            </li>
          </ul>
        </div>
      </Card>

      {/* Mock data controls */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">🔧 Test Controls</h2>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-medium">Load Mock User:</h3>
            <div className="flex gap-2">
              {mockUsers.map((user) => (
                <Button key={user.id} variant="outline" onClick={() => loadMockUser(user.id)}>
                  {user.name}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-medium">Response Scenario:</h3>
            <div className="flex gap-2">
              <Button
                variant={scenario === 'success' ? 'default' : 'outline'}
                onClick={() => setScenario('success')}
              >
                Success
              </Button>
              <Button
                variant={scenario === 'error' ? 'default' : 'outline'}
                onClick={() => setScenario('error')}
              >
                Error
              </Button>
              <Button
                variant={scenario === 'validation' ? 'default' : 'outline'}
                onClick={() => setScenario('validation')}
              >
                Validation Error
              </Button>
              <Button
                variant={scenario === 'network' ? 'default' : 'outline'}
                onClick={() => setScenario('network')}
              >
                Network Error
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive form */}
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Enter your full name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>

        {/* Display API response */}
        {apiResponse && (
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">
              {apiResponse.success ? '✅ API Response:' : '❌ API Error:'}
            </h3>
            <pre className="overflow-auto rounded-md bg-muted p-4">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </Card>

      {/* Implementation guide */}
      <Card className="mt-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">📚 Implementation Guide</h2>
        <div className="prose dark:prose-invert">
          <h3>1. Define your schemas:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["user", "admin"]),
});

const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    error: z.string().nullable(),
    timestamp: z.string().datetime().optional(),
  });`}
          </pre>

          <h3>2. Create TypeScript types:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`type UserFormData = z.infer<typeof userSchema>;
type ApiResponse<T> = z.infer<
  ReturnType<typeof apiResponseSchema<z.ZodType<T>>>
>;`}
          </pre>

          <h3>3. Validate API responses:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`const validatedResponse = apiResponseSchema(userSchema)
  .parse(response);`}
          </pre>

          <div className="mt-4 rounded-md bg-blue-500/10 p-4">
            <h4 className="font-semibold">💡 Pro Tips:</h4>
            <ul className="mt-2">
              <li>Always validate both request and response data</li>
              <li>Use type inference to maintain type safety</li>
              <li>Handle validation errors gracefully</li>
              <li>Consider adding retry logic for failed requests</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
