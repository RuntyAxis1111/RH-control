/*
  # Create IT Equipment Requests Table

  1. New Tables
    - `it_equipment_requests`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `requester` (text, required)
      - `email` (text, required)
      - `equipment` (equipment_kind enum, required)
      - `notes` (text, optional)
      - `inserted_by` (uuid, tracks user)

  2. Security
    - Enable RLS on `it_equipment_requests` table
    - Add policy for authenticated users to insert requests
    - Add policy for users to read their own requests

  3. Performance
    - Add indexes for common queries
*/

-- Create equipment_kind enum only if it doesn't exist
DO $$ BEGIN
  CREATE TYPE equipment_kind AS ENUM (
    'Laptop',
    'Monitor',
    'Teclado',
    'Mouse',
    'Headset',
    'Dock',
    'Other'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create it_equipment_requests table
CREATE TABLE IF NOT EXISTS it_equipment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  requester text NOT NULL,
  email text NOT NULL,
  equipment equipment_kind NOT NULL,
  notes text,
  inserted_by uuid DEFAULT auth.uid()
);

-- Enable RLS
ALTER TABLE it_equipment_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (drop first if they exist to avoid conflicts)
DROP POLICY IF EXISTS "Users can insert equipment requests" ON it_equipment_requests;
DROP POLICY IF EXISTS "Users can read own equipment requests" ON it_equipment_requests;

CREATE POLICY "Users can insert equipment requests"
  ON it_equipment_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own equipment requests"
  ON it_equipment_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = inserted_by);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS it_equipment_requests_inserted_by_idx ON it_equipment_requests(inserted_by);
CREATE INDEX IF NOT EXISTS it_equipment_requests_created_at_idx ON it_equipment_requests(created_at DESC);