'use client';

import { ErrorFallback } from '@/components/ErrorFallback';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error);
  }, [error]);

  return <ErrorFallback error={error} resetError={reset} />;
}
