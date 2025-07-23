/*
  # Add company column with AJA default

  1. New Column
    - `company` (text, default 'AJA')
    - Check constraint for HBL/AJA values
    - Update existing records to AJA

  2. Changes
    - All existing equipment will have company = 'AJA'
    - New equipment will default to 'AJA'
    - Only HBL and AJA values allowed
*/

-- Add the column if it doesn't exist
ALTER TABLE public.equipos_ti
  ADD COLUMN IF NOT EXISTS company text;

-- Fill existing records with 'AJA'
UPDATE public.equipos_ti
  SET company = 'AJA'
  WHERE company IS NULL;

-- Set default and constraint
ALTER TABLE public.equipos_ti
  ALTER COLUMN company SET DEFAULT 'AJA',
  ALTER COLUMN company SET NOT NULL;

-- Add check constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE table_name = 'equipos_ti' AND constraint_name = 'equipos_ti_company_check'
  ) THEN
    ALTER TABLE public.equipos_ti
      ADD CONSTRAINT equipos_ti_company_check CHECK (company IN ('HBL','AJA'));
  END IF;
END $$;