/*
  # Add contrato_renuncia column to hiring tables

  1. New Columns
    - Add `contrato_renuncia` column to all four hiring tables
    - Type: TEXT (nullable)
    - No default value

  2. Security
    - No RLS changes needed as existing policies will cover the new column
*/

-- Add contrato_renuncia to new_emp_this_month
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'new_emp_this_month' AND column_name = 'contrato_renuncia'
  ) THEN
    ALTER TABLE new_emp_this_month ADD COLUMN contrato_renuncia text;
  END IF;
END $$;

-- Add contrato_renuncia to on_boarded
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'on_boarded' AND column_name = 'contrato_renuncia'
  ) THEN
    ALTER TABLE on_boarded ADD COLUMN contrato_renuncia text;
  END IF;
END $$;

-- Add contrato_renuncia to off_boarding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'off_boarding' AND column_name = 'contrato_renuncia'
  ) THEN
    ALTER TABLE off_boarding ADD COLUMN contrato_renuncia text;
  END IF;
END $$;

-- Add contrato_renuncia to hold_rejected_other
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hold_rejected_other' AND column_name = 'contrato_renuncia'
  ) THEN
    ALTER TABLE hold_rejected_other ADD COLUMN contrato_renuncia text;
  END IF;
END $$;