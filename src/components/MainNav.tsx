'use client';

import Link from 'next/link';
import { Code2, UserCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import LogoutButton from '@/components/logout-button';
import { User } from '@supabase/supabase-js';

interface MainNavProps {
  user: User | null;
}

export function MainNav({ user }: MainNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-6 w-6" />
            <span className="font-mono font-bold">Next.js Template</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/examples"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Examples
          </Link>
          <Link href="/docs" className="text-sm font-medium transition-colors hover:text-primary">
            Documentation
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-md hover:text-primary"
                  title="Profile"
                >
                  <UserCircle2 className="h-5 w-5" />
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <Link href="/login" className="text-sm font-medium hover:text-primary">
                Sign in
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
