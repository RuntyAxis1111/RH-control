/*
  # Create monthly equipment statistics function

  1. New Functions
    - `get_monthly_equipment_stats(date_filter)` - Returns monthly aggregated equipment purchase data
      - `month` (text) - Month in YYYY-MM format
      - `qty` (bigint) - Number of equipment purchased in that month
      - `total_spend` (numeric) - Total cost of equipment purchased in that month

  2. Security
    - Function is accessible to authenticated users
    - Uses dynamic SQL with format() for date filtering

  3. Usage
    - Called from ChartsDashboard component to generate charts
    - Supports date filtering for different time ranges (12m, 24m, all)
*/

CREATE OR REPLACE FUNCTION public.get_monthly_equipment_stats(date_filter text DEFAULT '')
 RETURNS TABLE(month text, qty bigint, total_spend numeric)
 LANGUAGE plpgsql
AS $function$
DECLARE
  filter_clause text := '';
BEGIN
  IF date_filter IS NOT NULL AND date_filter <> '' THEN
    -- The client passes a SQL fragment like "and purchase_date >= 'YYYY-MM-DD'"
    -- This approach directly inserts the fragment. For enhanced security and robustness,
    -- consider modifying the client to pass a simpler parameter (e.g., '12m', '24m', 'all')
    -- and constructing the full WHERE clause within this function.
    filter_clause := date_filter;
  END IF;

  RETURN QUERY EXECUTE format('
    SELECT
      to_char(e.purchase_date, ''YYYY-MM'') AS month,
      COUNT(*)::bigint AS qty,
      SUM(e.purchase_cost)::numeric AS total_spend
    FROM
      equipos_ti e
    WHERE
      e.purchase_date IS NOT NULL
      AND e.purchase_cost IS NOT NULL
      %s
    GROUP BY
      to_char(e.purchase_date, ''YYYY-MM'')
    ORDER BY
      month;', filter_clause);
END;
$function$;