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
    `
};
