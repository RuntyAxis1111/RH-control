-- TODO: Uncomment when email notification system is ready

-- CREATE OR REPLACE FUNCTION notify_travel_notification()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   PERFORM
--     net.http_post(
--       url := 'https://your-project.supabase.co/functions/v1/notify-travel',
--       headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.settings.service_role_key') || '"}',
--       body := json_build_object('record', NEW)::text
--     );
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER travel_notification_trigger
--   AFTER INSERT ON travel_notifications
--   FOR EACH ROW
--   EXECUTE FUNCTION notify_travel_notification();