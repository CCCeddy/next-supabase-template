'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';

interface ErrorDemoProps {
  throwImmediate?: boolean;
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

class Custom404Error extends Error {
  constructor(message: string = 'Custom 404 Error') {
    super(message);
    this.name = 'Custom404Error';
    this.statusCode = 404;
  }
  statusCode: number;
}

export function ErrorDemo({ throwImmediate = false }: ErrorDemoProps) {
  const [count, setCount] = useState(0);

  if (throwImmediate) {
    throw new CustomError('This is an immediate rendering error demonstration');
  }

  const triggerClientError = () => {
    // Wrap in setTimeout to ensure the error is caught by ErrorBoundary
    // instead of React's default error overlay
    setTimeout(() => {
      throw new CustomError('This is a simulated client-side error from a button click');
    }, 0);
  };

  const triggerAsyncError = async () => {
    try {
      // Simulate an API call that fails
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(new CustomError('This is a simulated async operation failure'));
        }, 1000);
      });
    } catch (error) {
      // Re-throw inside setTimeout to ensure ErrorBoundary catches it
      setTimeout(() => {
        throw error;
      }, 0);
    }
  };

  const triggerStateError = () => {
    setCount((prevCount) => {
      if (prevCount > 2) {
        // Wrap in setTimeout to ensure ErrorBoundary catches it
        setTimeout(() => {
          throw new CustomError(
            `This is a state management error (triggered at count ${prevCount})`
          );
        }, 0);
      }
      return prevCount + 1;
    });
  };

  const triggerNextJs404 = () => {
    notFound();
  };

  const triggerCustom404 = () => {
    setTimeout(() => {
      throw new Custom404Error('This is a custom 404 error that triggers the error boundary');
    }, 0);
  };

  const triggerPromiseRejection = () => {
    // Wrap in setTimeout to ensure ErrorBoundary catches it
    setTimeout(() => {
      Promise.reject(new CustomError('This is an unhandled Promise rejection'));
    }, 0);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-card p-6 text-card-foreground shadow">
        <h2 className="mb-4 text-xl font-bold">Error Demonstration Panel</h2>
        <p className="mb-6 text-muted-foreground">
          This panel demonstrates various types of errors and how they are handled by our error
          boundary system.
        </p>

        <div className="space-y-6">
          <div className="rounded-md bg-secondary/20 p-4">
            <p className="text-muted-foreground">
              Current count: {count}
              {count > 1 && ' (Error will trigger at count > 2)'}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <button
                onClick={triggerClientError}
                className="w-full rounded-md bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600"
              >
                Trigger Sync Error
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates a synchronous error during event handling
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => triggerAsyncError()}
                className="w-full rounded-md bg-orange-500 px-4 py-2 text-white transition-colors hover:bg-orange-600"
              >
                Trigger Async Error
              </button>
              <p className="text-xs text-muted-foreground">Simulates an API call failure</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerStateError}
                className="w-full rounded-md bg-yellow-500 px-4 py-2 text-white transition-colors hover:bg-yellow-600"
              >
                Trigger State Error ({3 - count} clicks until error)
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates error handling in React state updates
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerNextJs404}
                className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Trigger Next.js not-found
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates Next.js built-in not-found handling (renders not-found.tsx)
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerCustom404}
                className="w-full rounded-md bg-indigo-500 px-4 py-2 text-white transition-colors hover:bg-indigo-600"
              >
                Trigger Custom 404 Error
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates custom 404 error handling through error boundary
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerPromiseRejection}
                className="w-full rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
              >
                Trigger Unhandled Rejection
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates unhandled Promise rejection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
