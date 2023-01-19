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
  checkPlateNumber: `
      SELECT number_plate
      FROM buses 
      WHERE number_plate = $1
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
      AND trip_date > NOW()
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
  fetchAllBookings: `
      SELECT * FROM bookings
      WHERE (trip_id = $3 OR $3 IS NULL)
      OFFSET $1 LIMIT $2
  `,
  fetchBookingsCount: `
      SELECT COUNT(id) FROM bookings
      WHERE (trip_id = $3 OR $3 IS NULL)
  `,
  fetchAllUserBookings: `
      SELECT 
        booking_id, 
        b.trip_id, 
        seat_number, 
        t.bus_id, 
        trip_date, 
        fare, 
        trips_status, 
        b.created_on 
      FROM bookings b
      LEFT JOIN trips t ON t.trip_id = b.trip_id
      WHERE user_id = $3 AND (b.trip_id = $4 OR $4 IS NULL)
      OFFSET $1 LIMIT $2
  `,
  fetchUserBookingsCount: `
      SELECT COUNT(id) FROM bookings
      WHERE user_id = $3 AND (trip_id = $4 OR $4 IS NULL)
  `,
  fetchAllTrips: `
      SELECT * FROM trips
  `,
  deleteBooking: `
      DELETE FROM bookings 
      WHERE user_id = $1 
      AND booking_id = $2
  `,
  findBooking: `
      SELECT booking_id
      FROM bookings
      WHERE booking_id = $1
  `
};
