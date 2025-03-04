"use client";

import { useState } from "react";
import { notFound } from "next/navigation";

interface ErrorDemoProps {
  throwImmediate?: boolean;
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

class Custom404Error extends Error {
  constructor(message: string = "Custom 404 Error") {
    super(message);
    this.name = "Custom404Error";
    this.statusCode = 404;
  }
  statusCode: number;
}

export function ErrorDemo({ throwImmediate = false }: ErrorDemoProps) {
  const [count, setCount] = useState(0);

  if (throwImmediate) {
    throw new CustomError("This is an immediate rendering error demonstration");
  }

  const triggerClientError = () => {
    throw new CustomError(
      "This is a simulated client-side error from a button click"
    );
  };

  const triggerAsyncError = async () => {
    try {
      // Simulate an API call that fails
      await new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new CustomError("This is a simulated async operation failure")
          );
        }, 1000);
      });
    } catch (error) {
      throw error;
    }
  };

  const triggerStateError = () => {
    setCount((prevCount) => {
      if (prevCount > 2) {
        throw new CustomError(
          `This is a state management error (triggered at count ${prevCount})`
        );
      }
      return prevCount + 1;
    });
  };

  const triggerNextJs404 = () => {
    notFound();
  };

  const triggerCustom404 = () => {
    throw new Custom404Error(
      "This is a custom 404 error that triggers the error boundary"
    );
  };

  const triggerPromiseRejection = () => {
    // This will trigger an unhandled promise rejection
    Promise.reject(new CustomError("This is an unhandled Promise rejection"));
  };

  return (
    <div className="space-y-8">
      <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Error Demonstration Panel</h2>
        <p className="text-muted-foreground mb-6">
          This panel demonstrates various types of errors and how they are
          handled by our error boundary system.
        </p>

        <div className="space-y-6">
          <div className="p-4 bg-secondary/20 rounded-md">
            <p className="text-muted-foreground">
              Current count: {count}
              {count > 1 && " (Error will trigger at count > 2)"}
            </p>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <button
                onClick={triggerClientError}
                className="w-full bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md transition-colors"
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
                className="w-full bg-orange-500 text-white hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
              >
                Trigger Async Error
              </button>
              <p className="text-xs text-muted-foreground">
                Simulates an API call failure
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerStateError}
                className="w-full bg-yellow-500 text-white hover:bg-yellow-600 px-4 py-2 rounded-md transition-colors"
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
                className="w-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
              >
                Trigger Next.js not-found
              </button>
              <p className="text-xs text-muted-foreground">
                Demonstrates Next.js built-in not-found handling (renders
                not-found.tsx)
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={triggerCustom404}
                className="w-full bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded-md transition-colors"
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
                className="w-full bg-purple-500 text-white hover:bg-purple-600 px-4 py-2 rounded-md transition-colors"
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
