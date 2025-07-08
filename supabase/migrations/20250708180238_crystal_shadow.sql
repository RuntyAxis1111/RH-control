/*
  # Add end_date column to hiring tables

  1. New Columns
    - Add `end_date` column to all four hiring tables
    - Type: date (nullable)

  2. Notes
    - end_date will be calculated as start_date + 90 days
    - Updated automatically when start_date changes
*/

-- Add end_date to new_emp_this_month
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'new_emp_this_month' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE new_emp_this_month ADD COLUMN end_date date;
  END IF;
END $$;

-- Add end_date to on_boarded
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'on_boarded' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE on_boarded ADD COLUMN end_date date;
  END IF;
END $$;

-- Add end_date to off_boarding
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'off_boarding' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE off_boarding ADD COLUMN end_date date;
  END IF;
END $$;

-- Add end_date to hold_rejected_other
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'hold_rejected_other' AND column_name = 'end_date'
  ) THEN
    ALTER TABLE hold_rejected_other ADD COLUMN end_date date;
  END IF;
END $$;