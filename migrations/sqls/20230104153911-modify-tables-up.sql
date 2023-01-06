ALTER TABLE trips
DROP CONSTRAINT trips_bus_id_fkey,
ADD CONSTRAINT trips_bus_id_fkey
    FOREIGN KEY (bus_id)
    REFERENCES buses(bus_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

    
ALTER TABLE user_activity_logs
DROP CONSTRAINT user_activity_logs_user_id_fkey,
ADD CONSTRAINT user_activity_logs_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE user_activity_logs
DROP CONSTRAINT user_activity_logs_activity_type_fkey,
ADD CONSTRAINT user_activity_logs_activity_type_fkey
    FOREIGN KEY (id)
    REFERENCES activity_type(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE bookings
DROP CONSTRAINT bookings_trip_id_fkey,
ADD CONSTRAINT bookings_trip_id_fkey
    FOREIGN KEY (trip_id)
    REFERENCES trips(trip_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;

ALTER TABLE bookings
DROP CONSTRAINT bookings_user_id_fkey,
ADD CONSTRAINT bookings_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE;


