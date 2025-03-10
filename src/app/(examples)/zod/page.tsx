'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userInfoSchema, type UserInfo } from '@/lib/schemas/example-schemas';
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

export default function ZodExamplePage() {
  // State to store and display submitted form data
  const [submittedData, setSubmittedData] = useState<UserInfo | null>(null);

  // Initialize form with Zod schema validation
  const form = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      username: '',
      email: '',
      age: 0,
    },
    // Enable real-time validation as user types
    mode: 'onChange',
  });

  // Form submission handler
  const onSubmit = (data: UserInfo) => {
    setSubmittedData(data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Zod Validation Example</h1>

      {/* Educational section explaining the example */}
      <Card className="mb-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">🎓 Learning Zod</h2>
        <div className="prose dark:prose-invert">
          <p>
            This example demonstrates how to use Zod for form validation in your Next.js
            application. Try the form below to see validation in action:
          </p>
          <ul className="space-y-2">
            <li>
              <strong>Username:</strong> 3-20 characters, only letters, numbers, underscores, and
              hyphens
            </li>
            <li>
              <strong>Email:</strong> Must be a valid email format
            </li>
            <li>
              <strong>Age:</strong> Must be between 13 and 120
            </li>
          </ul>
        </div>
      </Card>

      {/* Interactive form example */}
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // Show validation state visually
                      className={`${
                        form.formState.errors.username
                          ? 'border-red-500 focus:ring-red-500'
                          : field.value && 'border-green-500 focus:ring-green-500'
                      }`}
                    />
                  </FormControl>
                  <FormDescription>
                    Only letters, numbers, underscores, and hyphens allowed
                  </FormDescription>
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
                    <Input
                      type="email"
                      {...field}
                      className={`${
                        form.formState.errors.email
                          ? 'border-red-500 focus:ring-red-500'
                          : field.value && 'border-green-500 focus:ring-green-500'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={`${
                        form.formState.errors.age
                          ? 'border-red-500 focus:ring-red-500'
                          : field.value > 0 && 'border-green-500 focus:ring-green-500'
                      }`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className={`${!form.formState.isValid ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              Submit
            </Button>
          </form>
        </Form>

        {/* Display submitted data for demonstration */}
        {submittedData && (
          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">✅ Submitted Data:</h3>
            <pre className="overflow-auto rounded-md bg-muted p-4">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </Card>

      {/* Developer documentation */}
      <Card className="mt-8 p-6">
        <h2 className="mb-4 text-xl font-semibold">📚 Implementation Guide</h2>
        <div className="prose dark:prose-invert">
          <h3>1. Define your schema:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`const userInfoSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_-]+$/),
  email: z.string().email(),
  age: z.number().min(13).max(120),
});`}
          </pre>

          <h3>2. Create a type from your schema:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`type UserInfo = z.infer<typeof userInfoSchema>;`}
          </pre>

          <h3>3. Use with React Hook Form:</h3>
          <pre className="rounded-md bg-muted p-4">
            {`const form = useForm<UserInfo>({
  resolver: zodResolver(userInfoSchema),
  mode: 'onChange', // Enable real-time validation
});`}
          </pre>

          <div className="mt-4 rounded-md bg-blue-500/10 p-4">
            <h4 className="font-semibold">💡 Pro Tips:</h4>
            <ul className="mt-2">
              <li>
                Use <code>mode: 'onChange'</code> for real-time validation
              </li>
              <li>Add visual feedback for validation states</li>
              <li>Disable submit button until form is valid</li>
              <li>Provide clear error messages in your schema</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
