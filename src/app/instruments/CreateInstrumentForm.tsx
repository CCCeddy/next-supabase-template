"use client";

import { useState } from "react";
import { InstrumentsService } from "@/services/instruments-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, AlertCircle, CheckCircle2, Info } from "lucide-react";

// Example of type extraction from your database schema
type FormStatus = "idle" | "loading" | "error" | "success";

interface CreateInstrumentFormProps {
  userId: string;
  // Example of extensible props:
  // onSuccess?: () => void;
  // onError?: (error: string) => void;
  // className?: string;
}

export default function CreateInstrumentForm({
  userId,
}: CreateInstrumentFormProps) {
  // Example of controlled form state management
  const [name, setName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    // Example of service layer usage
    const service = new InstrumentsService();
    const { error } = await service.createInstrument(name, userId);

    if (error) {
      setStatus("error");
      setError(error.message);
      return;
    }

    setStatus("success");
    setName("");

    /* 
    Production Alternatives:
    1. Using React Query:
        const queryClient = useQueryClient();
        await queryClient.invalidateQueries(['instruments']);

    2. Using SWR:
        mutate('/api/instruments');

    3. Optimistic Updates:
        const newInstrument = { id: 'temp-id', name, user_id: userId };
        queryClient.setQueryData(['instruments'], (old: Instrument[]) => [...old, newInstrument]);
    */
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {/* Example of form accessibility and validation */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Create instrument form"
      >
        <div className="flex gap-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter instrument name"
            disabled={status === "loading"}
            className="max-w-md"
            // Example of enhanced accessibility
            aria-label="Instrument name"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "name-error" : undefined}
          />
          <Button
            type="submit"
            disabled={status === "loading"}
            variant="default"
          >
            {status === "loading" ? (
              "Creating..."
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
              </>
            )}
          </Button>
        </div>

        {/* Example of error handling UI */}
        {error && (
          <div
            className="flex items-center text-destructive text-sm"
            id="name-error"
            role="alert"
          >
            <AlertCircle className="mr-2 h-4 w-4" />
            {error}
          </div>
        )}

        {/* Example of success feedback */}
        {status === "success" && (
          <div
            className="flex items-center text-green-600 dark:text-green-400 text-sm"
            role="status"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Instrument created successfully!
          </div>
        )}
      </form>

      {/* Developer Documentation */}
      <div className="text-sm text-muted-foreground border-t border-border pt-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="h-4 w-4" />
          <p className="font-medium">Implementation Notes:</p>
        </div>
        <ul className="list-disc list-inside space-y-1">
          <li>Uses shadcn/ui components for consistent styling</li>
          <li>Demonstrates form state management patterns</li>
          <li>Includes accessibility attributes (ARIA)</li>
          <li>Shows error handling and loading states</li>
          <li>Implements Supabase RLS security</li>
        </ul>

        <div className="mt-4 bg-muted/50 p-3 rounded-md">
          <p className="font-medium mb-2">🚀 Production Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Replace page reload with React Query/SWR</li>
            <li>Add form validation (e.g., Zod, Yup)</li>
            <li>Implement optimistic updates</li>
            <li>Add error boundary</li>
            <li>Consider adding loading skeletons</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
