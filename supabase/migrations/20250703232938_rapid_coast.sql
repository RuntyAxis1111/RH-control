/*
  # Fix travel notifications table schema

  1. Schema Updates
    - Ensure all columns match the application expectations
    - Add missing columns if they don't exist
    - Update column names to match TypeScript interface

  2. Changes
    - Verify `emergency_phone` column exists
    - Ensure all column names match the application code
*/

-- Add missing columns if they don't exist
DO $$
BEGIN
  -- Check and add emergency_phone column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'emergency_phone'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN emergency_phone text;
  END IF;

  -- Ensure all other expected columns exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'emergency_contact'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN emergency_contact text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'flight_info'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN flight_info text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'hotel_info'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN hotel_info text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'need_extra_expenses'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN need_extra_expenses boolean NOT NULL DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'extra_expenses_reason'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN extra_expenses_reason text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'travel_notifications' AND column_name = 'extra_expenses_budget_usd'
  ) THEN
    ALTER TABLE travel_notifications ADD COLUMN extra_expenses_budget_usd numeric(12,2);
  END IF;
END $$;