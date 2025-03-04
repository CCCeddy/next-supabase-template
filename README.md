# Next.js 15 Template Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-2.48.1-green)](https://supabase.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)

A production-ready template for building modern web applications with Next.js 15, Supabase, and shadcn/ui. Designed for rapid MVP development with built-in authentication, database setup, and component examples.

![Template Preview](https://via.placeholder.com/800x400?text=Template+Preview+Screenshot) <!-- Replace with an actual screenshot of your template -->

## 🚀 Why Use This Template?

- **Production Ready**: Built with best practices and performance in mind
- **Rapid Development**: Get your MVP running in hours, not days
- **Full Stack Solution**: Authentication, database, and UI components pre-configured
- **Developer Experience**: Comprehensive testing suite and development tools included
- **Type Safety**: Full TypeScript integration throughout the codebase

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/CCCeddy/next-supabase-template.git my-project
cd my-project

# Install dependencies
pnpm install

# Set up environment variables (copy from .env.example)
cp .env.example .env.local

# Start Supabase locally
pnpm supabase start

# Start development server
pnpm dev
```

➡️ [View Demo](https://your-demo-url.com) <!-- Add your demo URL if available -->

## 📋 Prerequisites

- **Node.js**: 18.17 or later
  - Run `node --version` to check
  - [Download Node.js](https://nodejs.org/)
- **pnpm**: 9.5.0 (specified in package.json)
  - Run `pnpm --version` to check
  - Install with `npm install -g pnpm`
  - Alternatives: npm or yarn (update commands accordingly)
- **Supabase CLI**:
  - Install with `npm install -g supabase`
  - [Supabase CLI Documentation](https://supabase.com/docs/reference/cli)
- **Git**: Latest version recommended
  - Run `git --version` to check
  - [Download Git](https://git-scm.com/downloads)

## 🔧 Detailed Setup Guide

<details>
<summary>Click to expand detailed setup instructions</summary>

### 1. Environment Setup

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

### 2. Configure Auth Providers
- Add redirect URI to your providers: `{siteURL}/auth/v1/callback`
- For Google: Configure through Google Cloud Console
- For GitHub: Configure through GitHub Developer Settings

### 3. Database Setup
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

### 4. Start Development
```bash
pnpm dev
```
</details>

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

## 📱 Responsive Design

This template implements a mobile-first approach with:

- Responsive UI components from shadcn/ui
- Breakpoint-based styling using Tailwind CSS
- Mobile-optimized navigation and layouts
- Responsive form elements and modals
- Proper viewport configuration for various devices

Test your app's responsiveness using the browser's device simulator or real devices.

## ⚙️ Performance Optimizations

- Next.js App Router with server components for optimal loading
- Image optimization with Next.js Image component
- Efficient component rendering strategies
- Code splitting and lazy loading
- Database query optimization in repositories
- Server-side rendering for SEO and initial load performance
- Optimized authentication flow

## 📁 Project Structure

<details>
<summary>Click to expand project structure</summary>

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
</details>

## 🔐 Authentication Flow

The template implements a secure authentication system using Supabase Auth with multiple providers:

<!-- Consider adding an authentication flow diagram here -->
![Authentication Flow Diagram](https://via.placeholder.com/800x400?text=Auth+Flow+Diagram) <!-- Replace with actual diagram -->

- OAuth integration (Google, GitHub)
- Email/password authentication
- Session management
- Protected routes
- Row Level Security (RLS) policies

## 🛠️ Example Use Cases

This template has been successfully used to build:

1. **SaaS Dashboard** - A customer management platform with user roles and analytics
2. **Content Management System** - Editorial workflow with media management
3. **E-commerce MVP** - Product catalog with user accounts and cart functionality

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

## 🔮 Roadmap

Future enhancements planned for this template:

- [ ] Stripe integration for subscription management
- [ ] Internationalization (i18n) support
- [ ] Advanced analytics setup
- [ ] Enhanced role-based access control
- [ ] PWA configuration
- [ ] Optimized SEO setup

## 🚀 Deployment

1. Create a Supabase project
2. Update environment variables
3. Deploy to Vercel:
```bash
vercel deploy
```

## ❓ Troubleshooting

<details>
<summary>Common Issues and Solutions</summary>

### Authentication Problems

**Issue**: Redirect URI not working with OAuth providers  
**Solution**: Ensure your redirect URI exactly matches `{NEXT_PUBLIC_SITE_URL}/auth/v1/callback` in your provider settings

**Issue**: "User not found" errors  
**Solution**: Check if your Supabase tables have proper RLS policies and if the user exists in the auth schema

### Database Connection Issues

**Issue**: "Connection refused" with local Supabase  
**Solution**: Ensure Supabase local development is running with `pnpm supabase start`

**Issue**: TypeScript errors with Supabase types  
**Solution**: Regenerate types with `supabase gen types typescript --local > src/types/supabase.ts`

### Build Errors

**Issue**: Build fails with module resolution errors  
**Solution**: Check import paths and ensure all dependencies are installed

**Issue**: Environment variables not available during build  
**Solution**: Ensure environment variables are properly set in your hosting platform

### For more issues, check:

- [Supabase Documentation](https://supabase.io/docs/reference/javascript/installing)
- [Next.js Troubleshooting Guide](https://nextjs.org/docs/messages)
- [Project Issues on GitHub](https://github.com/CCCeddy/next-supabase-template/issues)

</details>

## 📦 Key Dependencies

- Next.js 15.1.6
- React 19.0.0
- Supabase Client 2.48.1
- Storybook 8.5.3
- Vitest 3.0.5
- Playwright 1.50.1
- Tailwind CSS 3.4.1
- TypeScript 5.x

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ciaran Eddy**

* Github: [@CCCeddy](https://github.com/CCCeddy)
* Repository: [next-supabase-template](https://github.com/CCCeddy/next-supabase-template)

















