'use client';

// import { ErrorDemo } from '@/components/ErrorDemo';
// import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function ErrorExamplesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto space-y-8">
        <div className="mb-8 rounded-lg bg-card p-6 text-card-foreground shadow">
          <h1 className="mb-4 text-2xl font-bold">Error Examples</h1>
          <p className="mb-4 text-muted-foreground">
            This page demonstrates different types of errors and how they are handled by our error
            boundary system.
          </p>
        </div>

        {/* <ErrorBoundary>
          <ErrorDemo />
        </ErrorBoundary> */}

        <div className="rounded-lg bg-card p-6 text-card-foreground shadow">
          <h2 className="mb-4 text-xl font-bold">Immediate Error Example</h2>
          <p className="mb-4 text-muted-foreground">
            This component throws an error immediately during render:
          </p>
          <div className="rounded-md bg-destructive/10 p-4">
            {/* <ErrorBoundary>
              <ErrorDemo throwImmediate />
            </ErrorBoundary> */}
          </div>
        </div>
      </div>
    </div>
  );
}
