import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-foreground text-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href="/playground">Playground</Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
