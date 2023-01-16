export default {
  registerBus: `
        INSERT INTO buses(
            number_plate,
            manufacturer,
            model,
            year,
            capacity
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
  createTrip: `
        INSERT INTO trips (
            bus_id,
            origin,
            destination,
            trip_date,
            fare
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `,
  findBus: `
        SELECT bus_id
        FROM buses
        WHERE bus_id = $1
    `,
  checkBusAvailability: `
        SELECT bus_id
        FROM trips
        WHERE bus_id = $1
        AND trips_status = 'active'
        OR trips_status = 'in-progress'
    `,
  findTrip: `
        SELECT trip_id
        FROM trips
        WHERE trip_id = $1
`,
  cancelTrip: `
        UPDATE trips
        SET trips_status = 'cancelled'
        WHERE trip_id = $1
    `,
  bookTrip: `
        INSERT INTO bookings (
            trip_id,
            user_id,
            bus_id,
            seat_number
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
`,
  checkTripStatus: `
        SELECT trip_id
        FROM trips
        WHERE trip_id = $1
        AND trips_status = 'active'
`,
  checkSeatAvailability: `
        SELECT seat_number
        FROM bookings
        WHERE seat_number = $1
  `,
  countFilledSeats: `
        SELECT COUNT(booking_id)
        FROM bookings
        WHERE trip_id = $1
  `,
  checkBusCapacity: `
        SELECT capacity
        FROM buses
        WHERE bus_id = $1
  `,
  fetchTripBookings: `
        SELECT * FROM bookings
        WHERE trip_id = $1
  `,
  fetchAllBookings: `
        SELECT * FROM bookings
  `,
  fetchAllUserBookings: `
        SELECT * FROM bookings
        WHERE user_id = $1
  `
};
