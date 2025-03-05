import Link from 'next/link';

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const DynamicRoutePage = async ({ params, searchParams }: PageProps) => {
  // Await the resolution of the params promise
  const resolvedParams = await params;
  // If you need searchParams, you can await them too:
  // const resolvedSearchParams = await searchParams;

  return (
    <div className="container">
      <h1 className="text-2xl">Dynamic Route: {resolvedParams.slug}</h1>
      <p>This is a dynamically generated page for slug: {resolvedParams.slug}</p>

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
};

export default DynamicRoutePage;
