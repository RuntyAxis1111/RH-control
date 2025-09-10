/*
  # Create vacaciones_registro table

  1. New Tables
    - `vacaciones_registro` (aliased as `b` in schema)
      - `id` (uuid, primary key)
      - `employee_name` (text, not null)
      - `imss_enrolled` (date, nullable)
      - `contract_signed` (date, nullable)
      - `vacations_remaining` (integer, default 15)
      - `auth_rh` (enum: pending/approved/rejected, default pending)
      - `auth_manager` (enum: pending/approved/rejected, default pending)
      - `periods_taken` (text array, nullable)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on `vacaciones_registro` table
    - Add policies for authenticated users to read, insert, and update records

  3. Triggers
    - Add trigger to automatically update `updated_at` timestamp
*/

-- Create the vacaciones_registro table (matches the existing 'b' table structure)
CREATE TABLE IF NOT EXISTS vacaciones_registro (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_name text NOT NULL,
  imss_enrolled date,
  contract_signed date,
  vacations_remaining integer NOT NULL DEFAULT 15,
  auth_rh vac_auth_status DEFAULT 'pending',
  auth_manager vac_auth_status DEFAULT 'pending',
  periods_taken text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE vacaciones_registro ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can read vacation registry"
  ON vacaciones_registro
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert vacation registry"
  ON vacaciones_registro
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update vacation registry"
  ON vacaciones_registro
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create trigger function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at_vacaciones()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER trg_vacaciones_registro_updated_at
  BEFORE UPDATE ON vacaciones_registro
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at_vacaciones();