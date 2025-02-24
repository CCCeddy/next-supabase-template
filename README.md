# general-next-app-template

## Installation

**Install packages:**

```bash
pnpm i
```

**Auth setup:**

1. Add .env variables for the following:
```.env
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_ID
GITHUB_SECRET

# The following will require setting up a Supabase project
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

2. Add the following redirect URI to your providers (for google this would be done through google cloud console): *{siteURL:54321}/auth/v1/callback* or whatever your Supabase project has provided you with. 

3. for local development you may want to set up your local Supabase project with docker



**Test that the application is correctly installed with:**

```bash
pnpm dev
```

## Testing
**Storybook:**

```bash
pnpm run storybook
```

**Vitest:**

```bash
pnpm test:run
```

**Playwright:**
```bash
pnpm test:playwright
```

<br></br>
# Next.js 15 Application Directory Structure

This project is structured for a consumer-facing Next.js 15 application that leverages AI (via API calls, etc.). The following structure separates concerns and helps keep the codebase scalable and maintainable.

```bash
my-nextjs-app/
├── public/                        # Static assets (served as-is)
│   └── assets/                    # Global static assets
│       └── logo.svg
├── src/
│   ├── app/                       # Next.js App Router
│   │   ├── api/
│   │   │   └── auth/
│   │   │       └── [...nextauth]/
│   │   │           ├── options.ts
│   │   │           └── route.ts
│   │   ├── auth/
│   │   │   └── signin/
│   │   │       └── page.tsx
│   │   ├── layout.tsx             # Global layout component
│   │   ├── page.tsx               # Entry page
│   │   └── ...                    # Additional pages
│   │
│   ├── assets/                    # Assets imported directly in code
│   │   ├── images/                # Component-specific images
│   │   │   └── #banner.jpg
│   │   └── icons/                 # Icons used throughout the app
│   │       └── #search.svg
│   │
│   ├── components/                # Reusable UI components
│   │   ├── ui/
│   │   │   ├── button.stories.tsx
│   │   │   └── button.tsx
│   │   ├── Providers.tsx
│   │   └── ThemeProvider.tsx
│   │
│   ├── hooks/                     # Custom React hooks
│   │   └── #useAuth.ts
│   │
│   ├── context/                   # React context providers (e.g., auth, theme)
│   │   └── #AuthContext.tsx
│   │
│   ├── api/                       # Global API helpers and endpoint definitions
│   │   ├── #fetcher.ts             # Generic fetcher (e.g., for SWR or React Query)
│   │   └── #endpoints.ts           # API endpoint constants
│   │
│   ├── services/                  # Business logic and external integrations
│   │   └── #aiService.ts           # AI API integration (e.g., OpenAI calls)
│   │
│   ├── utils/                     # General utility functions used across the app
│   │   └── #formatDate.ts
│   │
│   ├── lib/                       # Library-specific helpers and abstractions
│   │   ├── api/                   # Internal API logic (if applicable)
│   │   │   └── someLibApi.ts
│   │   ├── utils/                 # Internal library utilities
│   │   │   └── someLibUtil.ts
│   │   └── types/                 # Types specific to lib modules
│   │       └── libTypes.ts
│   │
│   ├── tests/
│   │   └── #test.
│   │
│   ├── types/                     # Global TypeScript types/interfaces
│   │   └── next-auth.d.ts
│   │
│   ├── styles/                    # Global styles (CSS, SCSS, etc.)
│   │   ├── globals.css
│   │   └── #theme.css
│   │
│   └── config/                    # Application configuration and constants
│       └── #index.ts               # e.g., environment variables, API keys, etc.
│
├── .env                           # Environment variables (not committed to VCS)
├── package.json
├── tsconfig.json                  # TypeScript configuration
└── next.config.js                 # Next.js configuration
```

<br></br>
# Next.js boilerplate information

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
