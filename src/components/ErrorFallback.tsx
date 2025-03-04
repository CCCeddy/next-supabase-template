interface ErrorFallbackProps {
  error?: Error & { statusCode?: number };
  resetError?: () => void;
}

export const ErrorFallback = ({ error, resetError }: ErrorFallbackProps) => {
  // Check if it's our custom 404 error
  const is404 = error?.statusCode === 404;

  return (
    <div className="min-h-[300px] flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 rounded-lg bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {is404 ? "404 - Not Found" : "Something went wrong"}
        </h2>

        <div className="mb-6 space-y-2">
          <p className="text-muted-foreground">
            {error?.message || "An unexpected error occurred"}
          </p>
          {error?.name && (
            <p className="text-sm text-muted-foreground">
              Error type:{" "}
              <code className="bg-muted px-1 py-0.5 rounded">{error.name}</code>
            </p>
          )}
          {process.env.NODE_ENV === "development" && error?.stack && (
            <pre className="mt-4 p-4 bg-muted rounded-md overflow-x-auto text-xs">
              {error.stack}
            </pre>
          )}
        </div>

        <div className="flex gap-4">
          {resetError && (
            <button
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors"
              onClick={resetError}
            >
              Try again
            </button>
          )}
          <button
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md transition-colors"
            onClick={() => (window.location.href = "/")}
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};
