import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md p-8 rounded-lg bg-card text-card-foreground shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for does not exist. Please check the URL or
          return to the homepage.
        </p>
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md transition-colors inline-block"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
