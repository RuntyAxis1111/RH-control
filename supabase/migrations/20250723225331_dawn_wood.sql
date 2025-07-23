/*
  # Create news_updates table for HR platform

  1. New Types
    - `news_type` enum with values 'slide' and 'texto'

  2. New Tables
    - `news_updates`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz, default now())
      - `published_for` (date, required) - represents the month (e.g., 2025-08-01)
      - `title` (text, required)
      - `content` (text, required) - either Google Slides link or text content
      - `type` (news_type, required) - 'slide' or 'texto'
      - `is_active` (boolean, default true)

  3. Indexes
    - Index on `published_for` for efficient ordering

  4. Security
    - RLS is disabled as requested - any user can read/write
*/

-- Create enum type for news type
CREATE TYPE IF NOT EXISTS news_type AS ENUM ('slide', 'texto');

-- Create news_updates table
CREATE TABLE IF NOT EXISTS public.news_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  published_for date NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  type news_type NOT NULL,
  is_active boolean DEFAULT true
);

-- Create index for efficient ordering by published_for
CREATE INDEX IF NOT EXISTS news_updates_by_month 
ON public.news_updates (published_for DESC);

-- Ensure RLS is disabled (public access)
ALTER TABLE public.news_updates DISABLE ROW LEVEL SECURITY;