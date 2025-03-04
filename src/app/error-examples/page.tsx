"use client";

import { ErrorDemo } from "@/components/ErrorDemo";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ErrorExamplesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow mb-8">
          <h1 className="text-2xl font-bold mb-4">Error Examples</h1>
          <p className="text-muted-foreground mb-4">
            This page demonstrates different types of errors and how they are
            handled by our error boundary system.
          </p>
        </div>

        <ErrorBoundary>
          <ErrorDemo />
        </ErrorBoundary>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Immediate Error Example</h2>
          <p className="text-muted-foreground mb-4">
            This component throws an error immediately during render:
          </p>
          <div className="p-4 bg-destructive/10 rounded-md">
            <ErrorBoundary>
              <ErrorDemo throwImmediate />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
