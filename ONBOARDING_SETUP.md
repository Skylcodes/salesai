# Onboarding System Setup Guide

## Overview
The onboarding system collects user information on first login and stores it in Supabase. Users are automatically redirected to complete onboarding if they haven't done so yet.

## Supabase Table Setup

### Step 1: Run the Migration
Execute the SQL migration file in your Supabase SQL Editor:

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/001_create_user_onboarding.sql`
4. Click **Run** to execute the migration

### Step 2: Verify Table Creation
After running the migration, verify the table was created:

1. Go to **Table Editor** in Supabase
2. You should see a new table called `user_onboarding`
3. Verify the following columns exist:
   - `id` (UUID, primary key)
   - `user_id` (UUID, foreign key to auth.users)
   - `full_name` (TEXT)
   - `experience_level` (TEXT: 'beginner', 'intermediate', 'experienced')
   - `sales_types` (TEXT[] array)
   - `sales_types_other` (TEXT, nullable)
   - `pain_points` (TEXT[] array)
   - `pain_points_other` (TEXT, nullable)
   - `completed_at` (TIMESTAMPTZ)
   - `created_at` (TIMESTAMPTZ)
   - `updated_at` (TIMESTAMPTZ)

### Step 3: Verify RLS Policies
The migration automatically creates Row Level Security (RLS) policies that allow:
- Users to view their own onboarding data
- Users to insert their own onboarding data
- Users to update their own onboarding data

Verify these policies exist in **Authentication > Policies** for the `user_onboarding` table.

## Onboarding Flow

1. **User signs up** → Email confirmation (if enabled)
2. **User logs in** → Redirected to `/dashboard/onboarding` if onboarding incomplete
3. **User completes form** → Data saved to `user_onboarding` table
4. **User redirected** → To `/dashboard` after completion

## Form Fields

### Required Fields:
- **Full Name**: Text input
- **Experience Level**: Dropdown (Beginner, Intermediate, Experienced)
- **Sales Types**: Multi-select checkboxes:
  - SaaS
  - Agency/Service
  - E-commerce
  - Local business services
  - Real estate
  - Other (with free text input if selected)
- **Pain Points**: Multi-select checkboxes:
  - Getting past the opener
  - Keeping the prospect engaged
  - Handling objections
  - Staying confident
  - Closing the deal
  - Other (with free text input if selected)

## API Endpoints

### POST `/api/onboarding`
Saves onboarding data for the authenticated user.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "experienceLevel": "intermediate",
  "salesTypes": ["saas", "ecommerce"],
  "salesTypesOther": null,
  "painPoints": ["opener", "objections"],
  "painPointsOther": null
}
```

**Response:**
```json
{
  "success": true
}
```

### GET `/api/onboarding`
Retrieves onboarding data for the authenticated user.

**Response:**
```json
{
  "data": {
    "id": "...",
    "user_id": "...",
    "full_name": "John Doe",
    "experience_level": "intermediate",
    "sales_types": ["saas", "ecommerce"],
    "sales_types_other": null,
    "pain_points": ["opener", "objections"],
    "pain_points_other": null,
    "completed_at": "2024-01-01T00:00:00Z",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

## Files Created

- `supabase/migrations/001_create_user_onboarding.sql` - Database schema
- `app/dashboard/onboarding/page.tsx` - Onboarding form page
- `app/dashboard/onboarding/layout.tsx` - Onboarding layout (no sidebar/navbar)
- `app/api/onboarding/route.ts` - API route for saving/fetching onboarding data
- Updated `app/dashboard/page.tsx` - Checks onboarding status
- Updated `app/dashboard/layout.tsx` - Main dashboard layout

## Testing

1. Create a new user account
2. Log in with the new account
3. You should be automatically redirected to `/dashboard/onboarding`
4. Fill out the form and submit
5. You should be redirected to `/dashboard` after submission
6. Try accessing `/dashboard/onboarding` again - you should be redirected to `/dashboard`

