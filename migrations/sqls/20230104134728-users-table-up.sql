CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE activity_status AS ENUM('success', 'fail');

CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    user_id VARCHAR PRIMARY KEY DEFAULT 'user-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),
    email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT false,
    is_email_verified BOOLEAN DEFAULT false,
    email_token TEXT,
    email_token_expiry TEXT,
    password_token TEXT,
    password_token_expiry TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION make_lower_trim() RETURNS TRIGGER AS '
    BEGIN
        new.first_name := LOWER(TRIM(new.first_name));
        new.last_name := LOWER(TRIM(new.last_name));
        new.email := LOWER(TRIM(new.email));
        RETURN NEW;
    END;
    ' LANGUAGE plpgsql;
CREATE TRIGGER make_lower_trim BEFORE INSERT OR UPDATE ON users FOR
EACH ROW EXECUTE PROCEDURE make_lower_trim();

CREATE TABLE IF NOT EXISTS activity_type(
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_activity_logs (
    id SERIAL,
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    activity_type VARCHAR REFERENCES activity_type(code) NOT NULL,
    activity_status activity_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE table buses (
    id SERIAL,
    bus_id VARCHAR PRIMARY KEY DEFAULT 'bus-' || LOWER(
        REPLACE(
            CAST(uuid_generate_v1mc() AS VARCHAR(50))
            , '-',''
        )
    ),    
    number_plate TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year TEXT NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX buses_bus_id_index ON buses(bus_id);
CREATE INDEX user_activity_logs_user_id_index ON user_activity_logs(user_id);
CREATE INDEX user_activity_logs_activity_type_index ON user_activity_logs(activity_type);
CREATE INDEX users_user_id_index ON users(user_id);