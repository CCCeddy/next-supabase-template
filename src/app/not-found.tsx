import Link from "next/link";

export default function Custom404() {
  return (
    <div className="width-full text-center h-[calc(100vh_-_5rem)] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        The page you are looking for does not exist. Please check the URL or
        return to the homepage. If you believe this is an error, please contact
        support.
      </p>
      <Link
        href="/"
        className="mt-4 bg-foreground hover:bg-indigo-700 text-background py-3 px-6 rounded-lg text-xl"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
