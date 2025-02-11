import Link from "next/link";

export default function About() {
  return (
    <div>
      <h1 className="text-2xl">About</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/playground">Playground</Link>
        </li>
      </ul>
    </div>
  );
}
