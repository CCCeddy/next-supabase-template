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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { login, signInWithOAuth, signup } from './actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FcGoogle } from 'react-icons/fc';
import { Loader2 } from 'lucide-react';
import { Provider } from '@supabase/supabase-js';

const baseSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = baseSchema.extend({
  mode: z.literal('login'),
});

const signupSchema = baseSchema.extend({
  mode: z.literal('signup'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
});

// Create the discriminated union first
const authSchema = z.discriminatedUnion('mode', [loginSchema, signupSchema]);

// Apply password matching refinement on the entire discriminated union
const validatedAuthSchema = authSchema.refine(
  (data) => data.mode !== 'signup' || data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

type AuthFormData = z.infer<typeof validatedAuthSchema>;

// Initial form setup with correct typing
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Create appropriate default values based on current mode
  const getDefaultValues = (currentMode: 'login' | 'signup') => {
    const baseDefaults = {
      mode: currentMode,
      email: '',
      password: '',
    };

    return currentMode === 'login'
      ? (baseDefaults as z.infer<typeof loginSchema>)
      : ({ ...baseDefaults, confirmPassword: '' } as z.infer<typeof signupSchema>);
  };

  const form = useForm<AuthFormData>({
    resolver: zodResolver(validatedAuthSchema),
    defaultValues: getDefaultValues(mode),
  });

  // Update form validation schema when mode changes
  const updateFormMode = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    form.reset(getDefaultValues(newMode));
  };

  // Handle form submission
  const onSubmit = async (formData: AuthFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      if (formData.mode === 'login') {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.success) {
          window.location.href = '/';
        }
      } else {
        const result = await signup({
          email: formData.email,
          password: formData.password,
        });

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.success) {
          window.location.href = '/confirm-email';
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OAuth sign in
  const handleOAuthSignIn = async (provider: Provider) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signInWithOAuth(provider);

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md p-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create an account'}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'login'
              ? 'Enter your credentials to access your account'
              : 'Enter your details to create your account'}
          </p>
        </div>

        {/* Error display */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Auth form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="••••••••" disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === 'signup' && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {/* OAuth buttons */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleOAuthSignIn('google' as Provider)}
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Continue with Google
        </Button>

        {/* Mode toggle */}
        <div className="mt-6 text-center text-sm">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <Button
                variant="link"
                className="px-2 py-0"
                onClick={() => updateFormMode('signup')}
                disabled={isLoading}
              >
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Button
                variant="link"
                className="px-2 py-0"
                onClick={() => updateFormMode('login')}
                disabled={isLoading}
              >
                Sign in
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
