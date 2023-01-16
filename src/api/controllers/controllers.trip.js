import * as TripServices from '../services/services.trip';
import TripPayloads from '../../lib/payloads/lib.payload.admin';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';

export const registerBus = async (req, res) => {
  try {
    const registeredBus = await TripServices.registerBus(
      TripPayloads.registerBus(req.body)
    );
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${registeredBus.bus_id}:::Info: successfully registered bus to the database registerBus.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.REGISTER_BUS,
      enums.HTTP_CREATED,
      registeredBus
    );
  } catch (error) {
    error.label = enums.REGISTER_BUS_CONTROLLER;
    return logger.error(
      `Bus registration failed::${enums.REGISTER_BUS_CONTROLLER}::::${error.message}`
    );
  }
};

export const createTrip = async (req, res) => {
  try {
    const createdTrip = await TripServices.createTrip(
      TripPayloads.createTrip(req.body)
    );
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${createdTrip.trip_id}:::Info: successfully created a trip createTrip.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.CREATE_TRIP,
      enums.HTTP_CREATED,
      createdTrip
    );
  } catch (error) {
    error.label = enums.CREATE_TRIP_CONTROLLER;
    return logger.error(
      `trip creation failed::${enums.CREATE_TRIP_CONTROLLER}::::${error.message}`
    );
  }
};

export const cancelTrip = async (req, res) => {
  try {
    const { trip_id } = req.params;
    await TripServices.cancelTrip([ trip_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${trip_id}:::Info: successfully cancelled a trip cancelTrip.controllers.trip.js`
    );

    return ApiResponse.success(res, enums.CANCEL_TRIP, enums.HTTP_OK);
  } catch (error) {
    error.label = enums.CANCEL_TRIP_CONTROLLER;
    return logger.error(
      `trip cancellation failed::${enums.CANCEL_TRIP_CONTROLLER}::::${error.message}`
    );
  }
};

export const bookTrip = async (req, res) => {
  try {
    const { userId } = req.data;
    const { trip_id, seat_number, bus_id } = req.body;
    const bookedTrip = await TripServices.bookTrip([
      trip_id,
      userId,
      bus_id,
      seat_number
    ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookedTrip.trip_id}:::Info: successfully booked trip bookTrip.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.BOOK_TRIP,
      enums.HTTP_CREATED,
      bookedTrip
    );
  } catch (error) {
    error.label = enums.BOOK_TRIP_CONTROLLER;
    logger.error(
      `Trip booking failed::${enums.BOOK_TRIP_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const fetchAllTrips = async (req, res) => {
  try {
    const trips = await TripServices.fetchAllTrips();
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully fetched all trips fetchAllTrips.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.FETCH_ALL_TRIPS,
      enums.HTTP_OK,
      trips
    );
  } catch (error) {
    error.label = enums.FETCH_TRIPS_CONTROLLER;
    logger.error(
      `fetch trips failed::${enums.FETCH_TRIPS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const fetchAllBookings = async (req, res) => {
  try {
    const { page, limit, tripId } = req.query;
    const bookings = await TripServices.fetchAllBookings([ page, limit, tripId ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookings.trip_id}:::Info: successfully fetched bookings for trip fetchAllBookings.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.FETCH_ALL_BOOKINGS,
      enums.HTTP_OK,
      bookings
    );
  } catch (error) {
    error.label = enums.FETCH_ALL_BOOKINGS_CONTROLLER;
    logger.error(
      `fetch trip bookings failed::${enums.FETCH_ALL_BOOKINGS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const fetchAllUserBookings = async (req, res) => {
  try {
    const { userId } = req.data;
    const { page, limit, tripId } = req.query;
    const bookings = await TripServices.fetchAllUserBookings([
      page,
      limit,
      userId,
      tripId
    ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookings.user_id}:::Info: successfully fetched all bookings fetchAllUserBookings.controllers.trip.js`
    );

    return ApiResponse.success(
      res,
      enums.FETCH_ALL_BOOKINGS,
      enums.HTTP_OK,
      bookings
    );
  } catch (error) {
    error.label = enums.FETCH_USER_BOOKINGS_CONTROLLER;
    logger.error(
      `fetch user bookings failed::${enums.FETCH_USER_BOOKINGS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const { userId } = req.data;
    const { bookingId } = req.params;
    await TripServices.deleteBooking([ userId, bookingId ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully deleted booking deleteBooking.controllers.trip.js`
    );

    return ApiResponse.success(res, enums.DELETE_BOOKING, enums.HTTP_OK);
  } catch (error) {
    error.label = enums.DELETE_BOOKING_CONTROLLER;
    logger.error(
      `delete booking failed::${enums.DELETE_BOOKING_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};
