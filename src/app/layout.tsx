import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import Providers from '@/components/Providers';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { createClient } from '@/utils/supabase/server';

// Initialize fonts outside component for better performance
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js Template | Build MVPs Faster',
  description:
    'A production-ready template for building modern web applications with Next.js 15, Supabase, and shadcn/ui.',
  keywords: ['Next.js', 'React', 'Supabase', 'Template', 'MVP'],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <MainNav user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
