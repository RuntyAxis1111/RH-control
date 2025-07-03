/*
  # Add trigger for vacation request notifications

  1. Trigger Function
    - Creates a function to call the Edge Function when a new vacation request is inserted
    
  2. Trigger
    - Fires AFTER INSERT on vacation_requests table
    - Calls the notify-vacation-request Edge Function
    
  Note: This trigger is commented out until email infrastructure is configured
*/

-- TODO: Uncomment when email notification system is ready

-- CREATE OR REPLACE FUNCTION notify_vacation_request()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   PERFORM
--     net.http_post(
--       url := 'https://your-project.supabase.co/functions/v1/notify-vacation-request',
--       headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
--       body := json_build_object('record', NEW)::text
--     );
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER vacation_request_notification
--   AFTER INSERT ON vacation_requests
--   FOR EACH ROW
--   EXECUTE FUNCTION notify_vacation_request();