// src/components/Providers.tsx
"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorFallback } from "./ErrorFallback";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </ErrorBoundary>
  );
}
