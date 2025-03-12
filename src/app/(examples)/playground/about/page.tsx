import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-2xl">About Section</h1>
      <p>Welcome to the about section!</p>

      <div className="mt-4">
        <Link href="/playground">Back to Playground</Link>
      </div>
    </div>
  );
}
