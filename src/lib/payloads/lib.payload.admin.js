export default {
  registerBus: (body) => [ body.number_plate, body.manufacturer, body.model, body.year, body.capacity ],
  createTrip: (body, available_seats) => [ body.bus_id, body.origin, body.destination, body.trip_date, body.fare, available_seats ]
};
