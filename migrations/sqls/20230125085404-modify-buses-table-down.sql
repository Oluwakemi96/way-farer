/* Replace with your SQL commands */
DROP TYPE IF EXISTS bus_status CASCADE;
ALTER TABLE buses DROP COLUMN IF EXISTS bus_status;
DROP TABLE IF EXISTS admin_activity_logs;
DROP TABLE IF EXISTS admin_activity_type;