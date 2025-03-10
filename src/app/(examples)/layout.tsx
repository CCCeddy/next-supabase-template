export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4">
        <h1 className="text-4xl font-bold mb-2">Examples</h1>
        <p className="text-muted-foreground mb-8">
          Learn from these examples to implement features in your application
        </p>
        {children}
      </div>
    </div>
  );
}