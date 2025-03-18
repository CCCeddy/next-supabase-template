'use client';

import { ErrorDemo } from '@/components/ErrorDemo';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Alert } from '@/components/ui/alert';
import { Card } from '@/components/ui/card';

export default function ErrorExamplesPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Introduction */}
        <Card className="p-6 text-card-foreground">
          <h1 className="mb-4 text-2xl font-bold">Error Handling Examples</h1>
          <p className="mb-4 text-muted-foreground">
            This page demonstrates different types of errors and how they are handled by our error
            boundary system. To see the errors in action, uncomment the example components below.
          </p>

          <Alert className="mb-4">
            <p className="text-sm">
              ⚠️ Note: These examples are commented out by default to ensure the project builds
              successfully. To test error handling, uncomment the components one at a time.
            </p>
          </Alert>
        </Card>

        {/* Setup Instructions */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">How to Test Error Handling</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              To enable error demonstrations, follow these steps:
            </p>
            <ol className="list-inside list-decimal space-y-2 text-muted-foreground">
              <li>Uncomment the imports at the top of this file</li>
              <li>Uncomment any error example section you want to test</li>
              <li>Each error is wrapped in an ErrorBoundary to prevent app crashes</li>
              <li>Refresh the page to reset error boundaries after testing</li>
            </ol>
          </div>
        </Card>

        {/* Basic Error Example */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">Basic Error Example</h2>
          <p className="mb-4 text-muted-foreground">
            This example shows a basic error caught by the error boundary:
          </p>
          <div className="mb-4 rounded-md bg-muted p-4">
            <pre className="text-sm">
              {`{/* Uncomment to test:
<ErrorBoundary>
  <ErrorDemo />
</ErrorBoundary>
*/}`}
            </pre>
          </div>
          {/* <ErrorBoundary>
            <ErrorDemo />
          </ErrorBoundary> */}
        </Card>

        {/* Immediate Error */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">Immediate Render Error</h2>
          <p className="mb-4 text-muted-foreground">
            This component throws an error during the initial render:
          </p>
          <div className="mb-4 rounded-md bg-muted p-4">
            <pre className="text-sm">
              {`{/* Uncomment to test:
<ErrorBoundary>
  <ErrorDemo throwImmediate />
</ErrorBoundary>
*/}`}
            </pre>
          </div>
          {/* <ErrorBoundary>
            <ErrorDemo throwImmediate />
          </ErrorBoundary> */}
        </Card>

        {/* Safe Error Examples */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">Safe Error Examples</h2>
          <p className="mb-4 text-muted-foreground">
            These examples can be safely uncommented as they only trigger errors on user
            interaction:
          </p>

          <ErrorBoundary>
            <ErrorDemo />
          </ErrorBoundary>
        </Card>

        {/* Implementation Guide */}
        <Card className="p-6">
          <h2 className="mb-4 text-xl font-bold">Error Handling Implementation</h2>
          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <h3 className="mb-2 font-semibold">Error Boundary Setup:</h3>
              <pre className="text-sm">
                {`// Basic usage
<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>

// With custom fallback
<ErrorBoundary 
  fallback={<CustomErrorUI />}
>
  <YourComponent />
</ErrorBoundary>`}
              </pre>
            </div>

            <div className="rounded-md bg-muted p-4">
              <h3 className="mb-2 font-semibold">Available Error Types:</h3>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Sync Render Errors</li>
                <li>Event Handler Errors</li>
                <li>Async Operation Errors</li>
                <li>State Management Errors</li>
                <li>Custom 404 Errors</li>
                <li>Unhandled Promise Rejections</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
