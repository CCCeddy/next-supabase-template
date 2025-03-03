# Next.js 15 Template Application

A production-ready template for building modern web applications with Next.js 15, Supabase, and shadcn/ui. Designed for rapid MVP development with built-in authentication, database setup, and component examples.

## �� Prerequisites

- Node.js 18.17 or later
- pnpm 9.5.0 (specified in package.json)
- Supabase CLI
- Git

## 📦 Template Usage

1. **Create New Project**
```bash
# Using this template through GitHub
git clone https://github.com/CCCeddy/next-supabase-template.git my-project
cd my-project

# Or use GitHub's "Use this template" button to create your own repository
```

2. **Environment Setup**

Create a `.env.local` file in the root directory:

```env
# Auth Provider Setup
GOOGLE_CLIENT_ID=        # From Google Cloud Console
GOOGLE_CLIENT_SECRET=    # From Google Cloud Console
GITHUB_ID=              # From GitHub Developer Settings
GITHUB_SECRET=          # From GitHub Developer Settings

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=       # From Supabase Project Settings
NEXT_PUBLIC_SUPABASE_ANON_KEY=  # From Supabase Project Settings
SUPABASE_SERVICE_ROLE_KEY=      # From Supabase Project Settings
NEXT_PUBLIC_SITE_URL=           # Your deployment URL (localhost:3000 for development)

# Optional for Supabase Studio AI features
OPENAI_API_KEY=           # Optional: For Supabase Studio AI features

# Optional for Chromatic (if using)
CHROMATIC_PROJECT_TOKEN=  # Your project token
```

3. **Install Dependencies**
```bash
pnpm install
```

4. **Configure Auth Providers**
- Add redirect URI to your providers: `{siteURL}/auth/v1/callback`
- For Google: Configure through Google Cloud Console
- For GitHub: Configure through GitHub Developer Settings

5. **Database Setup**
```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase
pnpm supabase start

# Apply migrations
supabase db reset

# Generate types
supabase gen types typescript --local > src/types/supabase.ts
```

> **Note**: This template uses local Supabase for development. For production:
> 1. Create a Supabase project at [supabase.com](https://supabase.com)
> 2. Push your migrations: `supabase db push`
> 3. Update your `.env.local` with production credentials

6. **Start Development**
```bash
pnpm dev
```

## 🧪 Testing Suite

```bash
# Component Testing (Storybook)
pnpm storybook          # Runs on port 6006
pnpm build-storybook    # Builds static Storybook
pnpm chromatic          # Deploys to Chromatic

# Unit Tests (Vitest)
pnpm test              # Run tests in watch mode
pnpm test:run          # Run tests once
pnpm test:coverage     # Run tests with coverage

# E2E Tests (Playwright)
pnpm test:playwright   # Run E2E tests
```

## 📁 Project Structure

```bash
project-root/
├── public/                        # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
│
├── scripts/                       # Development scripts
│   └── next-debug.mjs            # Next.js debugging configuration
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth-pages)/        # Grouped authentication pages
│   │   │   └── login/          # Login page implementation
│   │   ├── actions/            # Server actions
│   │   │   └── logout.ts      # Logout functionality
│   │   ├── auth/              # Auth-related routes
│   │   │   ├── callback/     # OAuth callback handling
│   │   │   ├── confirm/      # Email confirmation
│   │   │   ├── login/       # Login implementation
│   │   │   └── signup/      # Signup implementation
│   │   ├── instruments/      # Instruments feature
│   │   │   ├── [id]/        # Dynamic instrument routes
│   │   │   │   └── edit/    # Edit instrument page
│   │   │   ├── CreateInstrumentForm.tsx
│   │   │   └── page.tsx     # Instruments list page
│   │   ├── playground/       # Development playground
│   │   ├── private/         # Protected routes example
│   │   └── profile/         # User profile pages
│   │
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   └── input.tsx
│   │   ├── logout-button.tsx
│   │   ├── Providers.tsx    # App providers wrapper
│   │   └── ThemeToggle.tsx  # Dark/light mode toggle
│   │
│   ├── hooks/               # Custom React hooks
│   │   └── use-auth.ts     # Authentication hook
│   │
│   ├── lib/                 # Core utilities
│   │   ├── supabase/       # Supabase integration
│   │   │   ├── repositories/
│   │   │   │   ├── base-repository.ts
│   │   │   │   └── instruments-repository.ts
│   │   │   └── db-client.ts
│   │   └── utils.ts        # Helper functions
│   │
│   ├── services/           # Business logic
│   │   └── instruments-service.ts
│   │
│   ├── tests/             # Test files
│   │   ├── e2e/          # Playwright tests
│   │   └── unit/         # Unit tests
│   │
│   ├── types/            # TypeScript types
│   │   └── supabase.ts  # Generated Supabase types
│   │
│   ├── utils/           # Utility functions
│   │   └── supabase/   # Supabase utilities
│   │       ├── client.ts
│   │       ├── middleware.ts
│   │       └── server.ts
│   │
│   └── middleware.ts    # Next.js middleware
│
└── supabase/           # Supabase configuration
    ├── migrations/    # Database migrations
    │   ├── 20240301000000_create_instruments.sql
    │   └── 20240301000001_add_auth_to_instruments.sql
    └── seed.sql      # Initial database seed
```

### 🗂️ Key Directories Explained

- **/src/app**: Next.js 13+ app directory containing all routes and pages
  - `(auth-pages)`: Route group for authentication-related pages
  - `actions`: Server-side actions (Next.js Server Actions)
  - `auth`: Authentication flow implementation
  - `instruments`: Example feature implementation with CRUD operations
  - `playground`: Development and testing area

- **/src/components**: 
  - `ui`: shadcn/ui components with custom styling
  - Root components are app-wide shared components

- **/src/lib**: Core functionality
  - `supabase`: Database client and repositories
  - `utils.ts`: Shared utility functions

- **/src/services**: Business logic layer separating database from UI

### 📝 File Naming Conventions

- React Components: PascalCase (e.g., `ThemeToggle.tsx`, `Providers.tsx`)
- Hooks and Utilities: camelCase (e.g., `useAuth.ts`, `dbClient.ts`)
- Routes: kebab-case folders (e.g., `auth-pages`, `private`)
- SQL Files: snake_case with timestamp prefix (e.g., `20240301000000_create_instruments.sql`)
- Test Files: `.spec.ts` or `.test.ts` suffix

### 🔍 Key Files

- `src/middleware.ts`: Authentication and route protection
- `src/lib/supabase/db-client.ts`: Supabase client configuration
- `src/utils/supabase/server.ts`: Server-side Supabase utilities
- `src/hooks/use-auth.ts`: Authentication hook for components
- `supabase/migrations/*.sql`: Database schema and RLS policies

### 💡 Development Tips

- Use the `playground` directory for testing new features
- Check `instruments` feature for full-stack implementation examples
- Server Actions are in `src/app/actions`
- Authentication flow examples in `src/app/auth`

## �� Key Features

- **Authentication**: Pre-configured with Google and GitHub auth
- **Database**: Supabase setup with migrations and type generation
- **UI Components**: shadcn/ui integration with examples
- **Type Safety**: Full TypeScript support
- **Testing**: Comprehensive testing setup
- **Security**: Row Level Security (RLS) examples
- **State Management**: Examples of various patterns

## 💡 Development Tips

### Authentication
- Example implementation in `src/app/auth/`
- RLS policies in `supabase/migrations/`
- Protected routes demonstration

### Database
- Migrations in `supabase/migrations/`
- Repository pattern in `src/lib/supabase/`
- Service layer in `src/services/`

### Components
- shadcn/ui usage examples
- Form handling patterns
- State management examples
- Accessibility implementations

## 🚀 Deployment

1. Create a Supabase project
2. Update environment variables
3. Deploy to Vercel:
```bash
vercel deploy
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository at [https://github.com/CCCeddy/next-supabase-template](https://github.com/CCCeddy/next-supabase-template)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request to the main repository

## Development

```bash
pnpm dev               # Starts Next.js with Turbopack (--turbopack flag)
pnpm debug             # Runs debug script from scripts/next-debug.mjs
pnpm build             # Builds the production application
pnpm start             # Starts the production server
pnpm lint              # Runs ESLint
```

## 📦 Key Dependencies

- Next.js 15.1.6
- React 19.0.0
- Supabase Client 2.48.1
- Storybook 8.5.3
- Vitest 3.0.5
- Playwright 1.50.1
- Tailwind CSS 3.4.1
- TypeScript 5.x

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ciaran Eddy**

* Github: [@CCCeddy](https://github.com/CCCeddy)
* Repository: [next-supabase-template](https://github.com/CCCeddy/next-supabase-template)

