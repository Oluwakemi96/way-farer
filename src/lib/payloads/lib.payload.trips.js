export default {
  fetchAllBookings: (query) => [
    query.page ? (query.page - 1) * (query.per_page || 5) : (1-1) * (query.per_page || 10),
    query.per_page ? query.per_page : '10',
    query.tripId ? query.tripId : null
  ],

  fetchAllUserBookings: (query, userId) => [
    query.page ? (query.page - 1) * (query.per_page || 5) : (1-1) * (query.per_page || 10),
    query.per_page ? query.per_page : '10',
    userId,
    query.tripId
  ],

  filterTrips: (query) => [
    query.origin ? query.origin.trim().toLowerCase(): query.origin,
    query.destination,
    query.page ? (query.page - 1) * (query.per_page || 5) : (1 - 1) * (query.per_page || 10),
    query.per_page ? query.per_page : '10'
  ]
};
