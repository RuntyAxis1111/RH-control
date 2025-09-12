/*
  # Add vacation workflow steps to vacation_requests table

  1. New Columns
    - `step1_auth_manager` (text) - Manager authorization status
    - `step2_auth_rh` (text) - HR authorization status  
    - `step3_contract_signature` (text) - Contract signature status
    - `step4_congratulations_email` (text) - Congratulations email status

  2. Default Values
    - All columns default to 'pendiente' (pending)
    - Allows tracking of vacation request workflow progress

  3. Constraints
    - Check constraints to ensure valid status values
    - Maintains data integrity for workflow states
*/

-- Add workflow step columns to vacation_requests table
DO $$
BEGIN
  -- Step 1: Manager Authorization
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step1_auth_manager'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD COLUMN step1_auth_manager text DEFAULT 'pendiente';
  END IF;

  -- Step 2: HR Authorization  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step2_auth_rh'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD COLUMN step2_auth_rh text DEFAULT 'pendiente';
  END IF;

  -- Step 3: Contract Signature
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step3_contract_signature'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD COLUMN step3_contract_signature text DEFAULT 'pendiente';
  END IF;

  -- Step 4: Congratulations Email
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step4_congratulations_email'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD COLUMN step4_congratulations_email text DEFAULT 'pendiente';
  END IF;
END $$;

-- Add check constraints for valid workflow status values
DO $$
BEGIN
  -- Manager auth constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacation_requests_step1_auth_manager_check'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD CONSTRAINT vacation_requests_step1_auth_manager_check 
    CHECK (step1_auth_manager IN ('pendiente', 'aprobado', 'rechazado'));
  END IF;

  -- HR auth constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacation_requests_step2_auth_rh_check'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD CONSTRAINT vacation_requests_step2_auth_rh_check 
    CHECK (step2_auth_rh IN ('pendiente', 'aprobado', 'rechazado'));
  END IF;

  -- Contract signature constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacation_requests_step3_contract_signature_check'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD CONSTRAINT vacation_requests_step3_contract_signature_check 
    CHECK (step3_contract_signature IN ('pendiente', 'enviado', 'recibido'));
  END IF;

  -- Congratulations email constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'vacation_requests_step4_congratulations_email_check'
  ) THEN
    ALTER TABLE vacation_requests 
    ADD CONSTRAINT vacation_requests_step4_congratulations_email_check 
    CHECK (step4_congratulations_email IN ('pendiente', 'listo'));
  END IF;
END $$;

-- Create index for workflow queries
CREATE INDEX IF NOT EXISTS idx_vacation_requests_workflow_status 
ON vacation_requests (step1_auth_manager, step2_auth_rh, step3_contract_signature, step4_congratulations_email);

-- Update existing records to have default workflow values
UPDATE vacation_requests 
SET 
  step1_auth_manager = COALESCE(step1_auth_manager, 'pendiente'),
  step2_auth_rh = COALESCE(step2_auth_rh, 'pendiente'),
  step3_contract_signature = COALESCE(step3_contract_signature, 'pendiente'),
  step4_congratulations_email = COALESCE(step4_congratulations_email, 'pendiente')
WHERE 
  step1_auth_manager IS NULL OR 
  step2_auth_rh IS NULL OR 
  step3_contract_signature IS NULL OR 
  step4_congratulations_email IS NULL;