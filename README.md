# The Wild Oasis Website

A hotel booking website built with Next.js App Router for browsing luxury cabins, viewing cabin details, and authenticating guests with Google.

This project uses Supabase as the backend for cabins, guests, bookings, and settings, and NextAuth for authentication. It appears to be part of the "The Ultimate React Course" project work and currently includes both finished pages and a few in-progress account features.

## Features

- Landing page with hero section and call to action
- About page with resort story and dynamic cabin count
- Cabins listing page with filtering by capacity
- Dynamic cabin detail pages with static params generation
- Google sign-in with NextAuth
- Protected guest area through middleware
- Supabase-powered data fetching for cabins, guests, bookings, and settings
- Reservation UI scaffold for cabin booking
- Profile update UI scaffold for guest details

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- NextAuth v5 beta
- Supabase
- date-fns

## Project Structure

```text
app/
  _components/        Reusable UI components
  _lib/               Auth, Supabase client, data layer, server actions
  _styles/            Global styles
  about/              About page
  cabins/             Cabin listing and cabin details
  login/              Sign-in page
  account/            Protected guest area pages
  api/auth/           NextAuth route handlers
public/               Static images
database.types.ts     Generated Supabase database types
middleware.ts         Route protection via NextAuth
```

## Routes

- `/` Home page
- `/about` About page
- `/cabins` Cabin listing page
- `/cabins/[cabinId]` Cabin details page
- `/login` Google sign-in page
- `/account` Protected guest dashboard
- `/account/profile` Profile form page
- `/account/reservations` Reservations page placeholder

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env.local` file in the project root with values like these:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_or_api_key

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
```

### 3. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` Start the development server
- `npm run build` Create a production build
- `npm run start` Start the production server
- `npm run prod` Build and start production locally
- `npm run lint` Run ESLint

## Authentication

- Google is configured as the auth provider
- The sign-in page is `/login`
- `middleware.ts` protects authenticated routes using `auth`
- On sign-in, the app checks whether the guest exists in Supabase and creates one if needed

## Data Layer

The app reads data from Supabase tables including:

- `cabins`
- `guests`
- `bookings`
- `settings`

Database helpers live in `app/_lib/data-service.tsx`, and the typed Supabase client is in `app/_lib/supabase.ts`.

## Current Status

Some guest-area functionality is still scaffolded or incomplete:

- The reservations page currently renders a placeholder
- The reservation form UI is present, but booking submission is not fully wired
- The profile form UI is present, but update logic is not fully wired

## Notes

- Remote cabin images are allowed from the configured Supabase storage bucket in `next.config.ts`
- Country data is fetched from the Rest Countries API
- A `starter/` directory is included with reference files from the course material

## License

This project is for learning and practice unless you add your own license.
