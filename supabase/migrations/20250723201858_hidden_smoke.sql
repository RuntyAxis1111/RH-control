/*
  # Add file_url column to equipos_ti table

  1. New Column
    - `file_url` (text, nullable)
      - Stores the public URL of uploaded PDF files
      - Used for equipment documentation/invoices

  2. Purpose
    - Allow users to upload and link PDF files to equipment records
    - Store public URLs from Supabase Storage bucket 'facturas'
*/

-- Add file_url column to store PDF file URLs
ALTER TABLE public.equipos_ti 
  ADD COLUMN IF NOT EXISTS file_url text;