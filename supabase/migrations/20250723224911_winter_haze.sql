/*
  # Create news_updates table for HR news management

  1. New Tables
    - `news_updates`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `published_for` (date) - represents the month (e.g., 2025-08-01)
      - `title` (text, required)
      - `content` (text, required) - slide URL or markdown text
      - `type` (enum: slide, texto)
      - `is_active` (boolean, default true)

  2. Indexes
    - Index on `published_for` for efficient month-based queries

  3. Security
    - RLS is disabled as specified - any user can read
*/

-- Create enum for news type
CREATE TYPE IF NOT EXISTS news_type AS ENUM ('slide', 'texto');

-- Create news_updates table
CREATE TABLE IF NOT EXISTS public.news_updates (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz DEFAULT now(),
  published_for date NOT NULL,      -- month that represents (e.g., 2025-08-01)
  title         text NOT NULL,
  content       text NOT NULL,      -- slide URL or markdown text
  type          news_type NOT NULL,
  is_active     boolean DEFAULT true
);

-- Create index for efficient month-based queries
CREATE INDEX IF NOT EXISTS news_updates_by_month
  ON public.news_updates (published_for DESC);

-- RLS is intentionally disabled as specified
-- Any user can read without additional authentication