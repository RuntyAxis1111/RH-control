/*
  # Create hiring table for candidate management

  1. New Types
    - `hiring_stage_enum` for hiring pipeline stages
    - `status_enum` for various status fields
    - `location_enum` for office locations

  2. New Tables
    - `hiring`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `candidate_name` (text, required)
      - `hiring_stage` (enum: sourcing, interview, offer, hired)
      - `contract_status` (enum: done, solicited, na)
      - `start_date` (date)
      - `expiry_date` (date, calculated field)
      - `people` (text array for responsible people)
      - `offer_letter_status` (enum)
      - `computer_status` (enum)
      - `bgc_status` (enum)
      - `psychometrics_status` (enum)
      - `welcome_email_status` (enum)
      - `welcome_kit_status` (enum)
      - `location` (enum: prado_norte, alvaro_obregon, us, col)
      - `team` (text)
      - `position` (text)
      - `email` (text)
      - `contract_file_url` (text)
      - `inserted_by` (uuid, references auth.users)

  3. Security
    - Enable RLS on `hiring` table
    - Add policies for authenticated users to read/write all records
*/

-- Create enums (using DO block to handle IF NOT EXISTS)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'hiring_stage_enum') THEN
    CREATE TYPE hiring_stage_enum AS ENUM ('sourcing', 'interview', 'offer', 'hired');
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_enum') THEN
    CREATE TYPE status_enum AS ENUM ('done', 'solicited', 'na');
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'location_enum') THEN
    CREATE TYPE location_enum AS ENUM ('prado_norte', 'alvaro_obregon', 'us', 'col');
  END IF;
END $$;

-- Create hiring table
CREATE TABLE IF NOT EXISTS hiring (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  candidate_name text NOT NULL,
  hiring_stage hiring_stage_enum DEFAULT 'sourcing',
  contract_status status_enum DEFAULT 'na',
  start_date date,
  expiry_date date,
  people text[] DEFAULT '{}',
  offer_letter_status status_enum DEFAULT 'na',
  computer_status status_enum DEFAULT 'na',
  bgc_status status_enum DEFAULT 'na',
  psychometrics_status status_enum DEFAULT 'na',
  welcome_email_status status_enum DEFAULT 'na',
  welcome_kit_status status_enum DEFAULT 'na',
  location location_enum,
  team text,
  position text,
  email text,
  contract_file_url text,
  inserted_by uuid DEFAULT auth.uid()
);

-- Enable RLS
ALTER TABLE hiring ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all hiring records"
  ON hiring
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert hiring records"
  ON hiring
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update hiring records"
  ON hiring
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete hiring records"
  ON hiring
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS hiring_created_at_idx ON hiring (created_at DESC);
CREATE INDEX IF NOT EXISTS hiring_candidate_name_idx ON hiring (candidate_name);
CREATE INDEX IF NOT EXISTS hiring_hiring_stage_idx ON hiring (hiring_stage);
CREATE INDEX IF NOT EXISTS hiring_email_idx ON hiring (email);