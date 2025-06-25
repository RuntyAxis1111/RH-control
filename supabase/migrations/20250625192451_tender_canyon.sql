/*
  # Add review status to all tables

  1. New Columns
    - Add `review_status` column to all three tables
    - Default value: 'unreviewed'
    - Check constraint for valid values

  2. Security
    - No RLS changes needed as existing policies will cover the new column
*/

-- Add review_status to vacation_requests
ALTER TABLE vacation_requests
ADD COLUMN IF NOT EXISTS review_status text
  CHECK (review_status IN ('unreviewed','in_progress','done'))
  DEFAULT 'unreviewed';

-- Add review_status to travel_notifications  
ALTER TABLE travel_notifications
ADD COLUMN IF NOT EXISTS review_status text
  CHECK (review_status IN ('unreviewed','in_progress','done'))
  DEFAULT 'unreviewed';

-- Add review_status to it_equipment_requests
ALTER TABLE it_equipment_requests
ADD COLUMN IF NOT EXISTS review_status text
  CHECK (review_status IN ('unreviewed','in_progress','done'))
  DEFAULT 'unreviewed';