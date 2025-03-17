import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExamplesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" className="hover:bg-secondary/80" asChild>
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Examples</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Learn from these examples to implement features in your application
        </p>
      </div>

      <div className="mt-12">{children}</div>
    </div>
  );
}
