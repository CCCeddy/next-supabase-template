import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex items-center justify-between p-6 text-sm text-muted-foreground">
        <div className="flex gap-4">
          <p>Built with Next.js 15 and Supabase</p>
          <span>•</span>
          <Link href="/examples" className="hover:text-primary">
            Examples
          </Link>
          <span>•</span>
          <Link
            href="https://github.com/CCCeddy/next-supabase-template"
            className="hover:text-primary"
          >
            GitHub
          </Link>
        </div>
        <p>MIT License</p>
      </div>
    </footer>
  );
}
