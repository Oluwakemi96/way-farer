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
  findTrip: `
        SELECT trip_id
        FROM trips
        WHERE trip_id = $1
`,
  cancelTrip: `
        UPDATE trips
        SET trips_status = 'cancelled'
        WHERE trip_id = $1
    `
};
