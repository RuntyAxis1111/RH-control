/*
  # Agregar campo Empresa y tasas de depreciación diferenciadas

  1. Nuevo campo
    - `company` (text) con valores HBL/AJA, default HBL
    - `depr_rate` (numeric) para tasas de depreciación por modelo

  2. Vista actualizada
    - Depreciación diferenciada por modelo
    - Valor residual por modelo
    - Cálculo de valor libro con límite residual

  3. Tasas por modelo
    - Mac Air: 14% anual, residual 30%
    - Mac Pro: 15% anual, residual 25%
    - Lenovo: 18% anual, residual 10%
*/

-- Agregar campo company
ALTER TABLE public.equipos_ti
  ADD COLUMN IF NOT EXISTS company text DEFAULT 'HBL' NOT NULL
    CHECK (company IN ('HBL','AJA'));

-- Agregar campo depr_rate (opcional)
ALTER TABLE public.equipos_ti
  ADD COLUMN IF NOT EXISTS depr_rate numeric(4,3);

-- Actualizar tasas de depreciación por modelo
UPDATE public.equipos_ti
  SET depr_rate = CASE
    WHEN model = 'mac_air' THEN 0.14
    WHEN model = 'mac_pro' THEN 0.15
    WHEN model = 'lenovo'  THEN 0.18
  END;

-- Recrear vista de depreciación con tasas diferenciadas
CREATE OR REPLACE VIEW public.equipos_depreciacion AS
WITH params AS (
  SELECT
    serial_number,
    model,
    company,
    purchase_date,
    purchase_cost,
    CASE model
      WHEN 'mac_air' THEN 0.14        -- 14% anual
      WHEN 'mac_pro' THEN 0.15        -- 15% anual
      WHEN 'lenovo'  THEN 0.18        -- 18% anual
    END AS rate,
    CASE model
      WHEN 'mac_air' THEN 0.30        -- residual 30%
      WHEN 'mac_pro' THEN 0.25        -- residual 25%
      WHEN 'lenovo'  THEN 0.10        -- residual 10%
    END AS residual_pct
  FROM public.equipos_ti
)
SELECT
  p.*,
  gs.year_n AS year_number,
  (p.purchase_cost * p.rate) AS depreciation_year,
  GREATEST(
    p.purchase_cost * p.residual_pct,
    p.purchase_cost - (p.purchase_cost * p.rate * gs.year_n)
  ) AS book_value_end_year
FROM params p
CROSS JOIN generate_series(1,5) AS gs(year_n);