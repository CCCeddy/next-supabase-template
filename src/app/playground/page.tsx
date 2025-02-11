import Link from "next/link";
import DynamicLink from "./dynamicLink";

export default function Page() {
  return (
    <div className="container">
      <h1 className="text-2xl">Playground</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/playground/about">About</Link>
        </li>
        <li>
          <Link href="/playground/about/1">Dynamic Route 1</Link>
        </li>
        <li>
          <Link href="/playground/about/post-1">Dynamic Route Post 1</Link>
        </li>
        <DynamicLink />
      </ul>
    </div>
  );
}
