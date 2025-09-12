/*
  # Agregar flujo de 4 pasos para solicitudes de vacaciones

  1. Nuevas Columnas
    - `step1_auth_manager` (enum: pendiente, aprobado, rechazado)
    - `step2_auth_rh` (enum: pendiente, aprobado, rechazado) 
    - `step3_contract_signature` (enum: pendiente, enviado, recibido)
    - `step4_congratulations_email` (enum: pendiente, listo)

  2. Valores por Defecto
    - Todos los pasos inician en "pendiente"

  3. Índices
    - Índices para optimizar consultas por estado de workflow
*/

-- Crear enum para estados de aprobación
CREATE TYPE IF NOT EXISTS approval_status AS ENUM ('pendiente', 'aprobado', 'rechazado');

-- Crear enum para firma de contrato
CREATE TYPE IF NOT EXISTS contract_status AS ENUM ('pendiente', 'enviado', 'recibido');

-- Crear enum para email de felicitaciones
CREATE TYPE IF NOT EXISTS email_status AS ENUM ('pendiente', 'listo');

-- Agregar las 4 nuevas columnas para el workflow
DO $$
BEGIN
  -- Paso 1: Autorización Manager
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step1_auth_manager'
  ) THEN
    ALTER TABLE vacation_requests ADD COLUMN step1_auth_manager approval_status DEFAULT 'pendiente';
  END IF;

  -- Paso 2: Autorización RH
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step2_auth_rh'
  ) THEN
    ALTER TABLE vacation_requests ADD COLUMN step2_auth_rh approval_status DEFAULT 'pendiente';
  END IF;

  -- Paso 3: Firma de contrato
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step3_contract_signature'
  ) THEN
    ALTER TABLE vacation_requests ADD COLUMN step3_contract_signature contract_status DEFAULT 'pendiente';
  END IF;

  -- Paso 4: Email de felicitaciones
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vacation_requests' AND column_name = 'step4_congratulations_email'
  ) THEN
    ALTER TABLE vacation_requests ADD COLUMN step4_congratulations_email email_status DEFAULT 'pendiente';
  END IF;
END $$;

-- Crear índices para optimizar consultas por workflow
CREATE INDEX IF NOT EXISTS vacation_requests_step1_idx ON vacation_requests (step1_auth_manager);
CREATE INDEX IF NOT EXISTS vacation_requests_step2_idx ON vacation_requests (step2_auth_rh);
CREATE INDEX IF NOT EXISTS vacation_requests_step3_idx ON vacation_requests (step3_contract_signature);
CREATE INDEX IF NOT EXISTS vacation_requests_step4_idx ON vacation_requests (step4_congratulations_email);

-- Índice compuesto para verificar solicitudes completadas
CREATE INDEX IF NOT EXISTS vacation_requests_workflow_complete_idx ON vacation_requests (
  step1_auth_manager, 
  step2_auth_rh, 
  step3_contract_signature, 
  step4_congratulations_email
) WHERE 
  step1_auth_manager = 'aprobado' AND 
  step2_auth_rh = 'aprobado' AND 
  step3_contract_signature = 'recibido' AND 
  step4_congratulations_email = 'listo';