DROP TYPE IF EXISTS trip_status;
CREATE TYPE trip_status  AS ENUM('active', 'cancelled');

CREATE TABLE IF NOT EXISTS trips (
    id SERIAL,
    trip_id VARCHAR PRIMARY KEY DEFAULT 'trip-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    bus_id VARCHAR REFERENCES buses(bus_id) ON UPDATE CASCADE,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    trip_date DATE NOT NULL,
    fare TEXT NOT NULL,
    available_seats JSON NOT NULL,
    trips_status trip_status DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL,
    booking_id VARCHAR PRIMARY KEY DEFAULT 'booking-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-' ,''
        )
    ),
    trip_id VARCHAR REFERENCES trips(trip_id),
    user_id VARCHAR REFERENCES users(user_id),
    seat_number INTEGER,
    created_on TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX trips_trip_id_index ON trips(trip_id);
CREATE INDEX bookings_booking_id_index ON bookings(booking_id);