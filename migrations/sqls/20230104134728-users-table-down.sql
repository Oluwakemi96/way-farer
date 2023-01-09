DROP TABLE IF EXISTS buses CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS user_activity_logs CASCADE;
DROP TABLE IF EXISTS activity_types CASCADE;
DROP INDEX IF EXISTS user_activity_logs_activity_type_index;
DROP INDEX IF EXISTS user_activity_logs_user_id_index;
DROP INDEX IF EXISTS buses_bus_id_index;
DROP INDEX IF EXISTS users_user_id_index;