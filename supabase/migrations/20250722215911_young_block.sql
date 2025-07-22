/*
  # Add purchase fields to equipos_ti table

  1. New Columns
    - `purchase_date` (date) - Purchase date (required for depreciation)
    - `purchase_cost` (numeric) - Purchase cost in USD/MXN

  2. Purpose
    - Enable depreciation calculations
    - Support financial reporting and charts
*/

ALTER TABLE public.equipos_ti
  ADD COLUMN IF NOT EXISTS purchase_date date,
  ADD COLUMN IF NOT EXISTS purchase_cost numeric(12,2);

-- Add comment for documentation
COMMENT ON COLUMN public.equipos_ti.purchase_date IS 'Date when the equipment was purchased';
COMMENT ON COLUMN public.equipos_ti.purchase_cost IS 'Purchase cost in USD or MXN';