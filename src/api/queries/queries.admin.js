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
  findBusByBusId: `
        SELECT available_seats
            FROM buses
        WHERE bus_id = $1
    `
};
