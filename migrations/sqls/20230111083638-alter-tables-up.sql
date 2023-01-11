ALTER TYPE trip_status ADD VALUE IF NOT EXISTS 'completed';
ALTER TYPE trip_status ADD VALUE IF NOT EXISTS 'in-progress';

ALTER TABLE trips ALTER column fare TYPE float8 USING (trim(fare)::float8);
ALTER TABLE trips DROP column IF EXISTS available_seats CASCADE;