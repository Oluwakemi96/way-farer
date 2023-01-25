/* Replace with your SQL commands */
CREATE TYPE bus_status AS ENUM('active', 'inactive');

ALTER TABLE IF EXISTS buses
ADD COLUMN bus_status bus_status DEFAULT 'active';

CREATE TABLE IF NOT EXISTS admin_activity_type (
    id SERIAL,
    code VARCHAR(10) UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_activity_logs (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR REFERENCES users(user_id) NOT NULL,
    activity_type VARCHAR REFERENCES admin_activity_type(code) NOT NULL,
    activity_status activity_status NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

