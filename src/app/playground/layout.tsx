import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <nav className="bg-foreground text-background shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-4 items-center">
          <Link href="/">Home</Link>
          <Link href="/playground">Playground</Link>
          <p className="text-red-500">
            Feel free to delete this whole directory
          </p>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
