// src/app/page.tsx
import Link from 'next/link';
import { ArrowRight, Code2, Lightbulb, Rocket } from 'lucide-react';

export default async function Home() {
  return (
    <div className="flex flex-col">
      {/* Main content */}
      <main className="container mx-auto flex-1 px-6 py-12">
        {/* Hero section */}
        <section className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Build Your MVP{' '}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Faster
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            A production-ready template with authentication, database setup, and component examples.
            Start building your next project in minutes, not days.
          </p>
        </section>

        {/* Feature sections */}
        <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Examples section */}
          <div className="rounded-lg border bg-card p-6">
            <Lightbulb className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Example Features</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Explore pre-built examples and learn how to implement common features.
            </p>
            <div className="space-y-2">
              <Link href="/playground" className="block text-sm hover:text-primary">
                Playground <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
              <Link href="/data-access-example" className="block text-sm hover:text-primary">
                Data Access <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
              <Link href="/error-examples" className="block text-sm hover:text-primary">
                Error Handling <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Validation section */}
          <div className="rounded-lg border bg-card p-6">
            <Rocket className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Validation Examples</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Type-safe form validation with Zod and API request validation.
            </p>
            <div className="space-y-2">
              <Link href="/zod" className="block text-sm hover:text-primary">
                Zod Validation <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
              <Link href="/api-validation" className="block text-sm hover:text-primary">
                API Validation <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Testing section */}
          <div className="rounded-lg border bg-card p-6">
            <Code2 className="mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-2 text-xl font-semibold">Development Tools</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Explore development tools and testing utilities included in the template.
            </p>
            <div className="space-y-2">
              <Link href="/bad-link" className="block text-sm hover:text-primary">
                Error Boundary Demo <ArrowRight className="ml-1 inline-block h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
