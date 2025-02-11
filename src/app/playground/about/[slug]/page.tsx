import Link from "next/link";

export default function DynamicRoutePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container">
      <h1 className="text-2xl">Dynamic Route: {params.slug}</h1>
      <p>This is a dynamically generated page for slug: {params.slug}</p>

      <div className="mt-4 space-y-2">
        <ul>
          <li>
            <Link href="/playground/about">About</Link>
          </li>
          <li>
            <Link href="/playground">Playground</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
