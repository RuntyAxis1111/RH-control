/*
  # Update vacaciones_registro table for Phase 1

  1. New Columns
    - `vacaciones_por_contrato` (integer) - Total vacation days assigned by contract (12, 15, or 20)
    - `vacaciones_disponibles` (integer) - Available vacation days remaining

  2. Changes
    - Add new columns with appropriate defaults
    - Keep existing structure intact
    - Remove contract_signed column usage (but keep in DB for now)

  3. Security
    - Maintain existing RLS policies
    - No changes to permissions
*/

-- Add new vacation columns
DO $$
BEGIN
  -- Add vacaciones_por_contrato column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacaciones_registro' AND column_name = 'vacaciones_por_contrato'
  ) THEN
    ALTER TABLE vacaciones_registro ADD COLUMN vacaciones_por_contrato integer DEFAULT 15 NOT NULL;
  END IF;

  -- Add vacaciones_disponibles column if it doesn't exist  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacaciones_registro' AND column_name = 'vacaciones_disponibles'
  ) THEN
    ALTER TABLE vacaciones_registro ADD COLUMN vacaciones_disponibles integer DEFAULT 15 NOT NULL;
  END IF;
END $$;

-- Add check constraints for vacation days
DO $$
BEGIN
  -- Check constraint for vacaciones_por_contrato
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacaciones_por_contrato_check' 
    AND table_name = 'vacaciones_registro'
  ) THEN
    ALTER TABLE vacaciones_registro 
    ADD CONSTRAINT vacaciones_por_contrato_check 
    CHECK (vacaciones_por_contrato >= 0 AND vacaciones_por_contrato <= 30);
  END IF;

  -- Check constraint for vacaciones_disponibles
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacaciones_disponibles_check' 
    AND table_name = 'vacaciones_registro'
  ) THEN
    ALTER TABLE vacaciones_registro 
    ADD CONSTRAINT vacaciones_disponibles_check 
    CHECK (vacaciones_disponibles >= 0);
  END IF;
END $$;

-- Update existing records to have proper vacation values
UPDATE vacaciones_registro 
SET 
  vacaciones_por_contrato = COALESCE(vacaciones_por_contrato, 15),
  vacaciones_disponibles = COALESCE(vacaciones_disponibles, vacations_remaining)
WHERE vacaciones_por_contrato IS NULL OR vacaciones_disponibles IS NULL;