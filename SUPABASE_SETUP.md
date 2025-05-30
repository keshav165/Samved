# Supabase Backend Setup

This guide will help you set up and configure Supabase for your project.

## Prerequisites

1. Create a Supabase account at [https://supabase.com](https://supabase.com)
2. Create a new project in Supabase

## Environment Variables

1. Copy the `.env.example` file to a new file called `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your Supabase project credentials:
   ```
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

   You can find these values in your Supabase project settings under Project Settings > API.

## Authentication

The project includes the following authentication features:

- Email/Password login
- Protected routes that require authentication
- Automatic redirect to login for protected routes

## Database

The Supabase client provides several utility functions for database operations:

- `fetchData(table: string)` - Retrieve all records from a table
- `insertData(table: string, data: any)` - Insert a new record
- `updateData(table: string, id: string, data: any)` - Update an existing record
- `deleteData(table: string, id: string)` - Delete a record

Example usage:

```typescript
// Fetch all users
const { data: users, error } = await fetchData('users');

// Insert a new user
const { data: newUser, error } = await insertData('users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

## Edge Functions

You can deploy serverless functions to Supabase Edge Functions. See the Supabase documentation for more details.

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The app will be available at `http://localhost:5173`

## Production

1. Build the app for production:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `dist` folder to your hosting provider.

## Troubleshooting

- If you encounter authentication issues, ensure your Supabase project's authentication settings are properly configured.
- Check the browser's developer console for error messages.
- Make sure your Supabase project URL and anon key are correctly set in the `.env` file.
