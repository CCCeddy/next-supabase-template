# Next.js 15 Template Application

A production-ready template for building modern web applications with Next.js 15, Supabase, and shadcn/ui. Designed for rapid MVP development with built-in authentication, database setup, and component examples.

## 🚀 Quick Start

1. **Clone and Install**
```bash
# Install dependencies
pnpm i
```

2. **Set Up Environment**
```env
# Auth (Required for authentication)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=
```

3. **Configure Auth Providers**
- Add redirect URI to your providers: `{siteURL}/auth/v1/callback`
- For Google: Configure through Google Cloud Console
- For GitHub: Configure through GitHub Developer Settings

4. **Database Setup**
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

5. **Start Development**
```bash
pnpm dev
```

## 🧪 Testing Suite

```bash
# Component Testing (Storybook)
pnpm run storybook

# Unit Tests (Vitest)
pnpm test:run

# E2E Tests (Playwright)
pnpm test:playwright
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
│   │   ├── playground/       # Development playground
│   │   ├── private/         # Protected routes example
│   │   └── profile/         # User profile pages
│   │
│   ├── components/           # Reusable components
│   │   ├── ui/              # shadcn/ui components
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

- React Components: PascalCase (e.g., `ThemeToggle.tsx`)
- Utilities/Hooks: camelCase (e.g., `use-auth.ts`)
- Routes: kebab-case folders
- SQL Files: snake_case with timestamp prefix
- Test Files: `.spec.ts` or `.test.ts`

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

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

3. Run `supabase db push` to apply migrations
