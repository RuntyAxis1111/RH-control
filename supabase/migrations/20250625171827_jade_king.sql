/*
  # Create business travel notifications table

  1. New Tables
    - `travel_notifications`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `full_name` (text, required)
      - `email` (text, required)
      - `division` (text, required)
      - `start_date` (date, required)
      - `end_date` (date, required)
      - `destination` (text, required)
      - `purpose` (text, required)
      - `need_extra_expenses` (boolean, required)
      - `extra_expenses_reason` (text, optional)
      - `extra_expenses_budget_usd` (numeric, optional)
      - `emergency_contact` (text, optional)
      - `emergency_phone` (text, optional)
      - `flight_info` (text, optional)
      - `hotel_info` (text, optional)
      - `inserted_by` (uuid, optional)

  2. Security
    - Enable RLS on `travel_notifications` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS travel_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  division text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  destination text NOT NULL,
  purpose text NOT NULL,
  need_extra_expenses boolean NOT NULL,
  extra_expenses_reason text,
  extra_expenses_budget_usd numeric(12,2),
  emergency_contact text,
  emergency_phone text,
  flight_info text,
  hotel_info text,
  inserted_by uuid DEFAULT auth.uid()
);

ALTER TABLE travel_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own travel notifications"
  ON travel_notifications
  FOR SELECT
  TO authenticated
  USING (auth.uid() = inserted_by);

CREATE POLICY "Users can insert travel notifications"
  ON travel_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS travel_notifications_start_end_idx 
  ON travel_notifications (start_date, end_date);

CREATE INDEX IF NOT EXISTS travel_notifications_email_idx 
  ON travel_notifications (email);