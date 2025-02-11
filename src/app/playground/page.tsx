import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl">Playground</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/playground/about">About</Link>
        </li>
      </ul>
    </div>
  );
}
