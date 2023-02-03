import * as TripServices from '../services/services.trip';
import TripPayloads from '../../lib/payloads/lib.payload.admin';
import Payloads from '../../lib/payloads/lib.payload.trips';
import * as ActivityTracking from '../../lib/monitor/index';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';
import * as Helpers from '../../lib/utils/lib.util.helpers';
import mails from '../../config/email/mails';

export const registerBus = async (req, res) => {
  try {
    const registeredBus = await TripServices.registerBus(
      TripPayloads.registerBus(req.body)
    );
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${registeredBus.bus_id}:::Info: successfully registered bus to the database registerBus.controllers.trip.js`
    );

    ActivityTracking.adminActivityTracking(req.data.userId, 13, 'success');
    return ApiResponse.success(
      res,
      enums.REGISTER_BUS,
      enums.HTTP_CREATED,
      registeredBus
    );
  } catch (error) {
    ActivityTracking.adminActivityTracking(req.data.userId, 13, 'fail');
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
    await TripServices.updateBusStatus([ req.body.bus_id ]);
    ActivityTracking.adminActivityTracking(req.data.userId, 9, 'success');
    return ApiResponse.success(
      res,
      enums.CREATE_TRIP,
      enums.HTTP_CREATED,
      createdTrip
    );
  } catch (error) {
    ActivityTracking.adminActivityTracking(req.data.userId, 9, 'fail');
    error.label = enums.CREATE_TRIP_CONTROLLER;
    return logger.error(
      `trip creation failed::${enums.CREATE_TRIP_CONTROLLER}::::${error.message}`
    );
  }
};

export const updateTripStatus = async (req, res) => {
  try {
    const {
      params: { trip_id },
      query: { trip_status }
    } = req;
    await TripServices.updateTripStatus([ trip_id, trip_status ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${trip_id}:::Info: successfully set trip status to ${trip_status} updateTripStatus.controllers.trip.js`
    );

    ActivityTracking.adminActivityTracking(req.data.userId, 9, 'success');
    return ApiResponse.success(res, enums.SET_TRIP_STATUS(trip_status), enums.HTTP_OK);
  } catch (error) {
    error.label = enums.CANCEL_TRIP_CONTROLLER;
    return logger.error(
      `trip cancellation failed::${enums.CANCEL_TRIP_CONTROLLER}::::${error.message}`
    );
  }
};

export const bookTrip = async (req, res) => {
  try {
    const { userId, email } = req.data;
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
    const { origin, destination, trip_date } =
      await TripServices.fetchTripDetails([ bookedTrip.trip_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookedTrip.trip_id}:::Info: successfully fetched trip details bookTrip.controllers.trip.js`
    );
    mails.bookTrip(
      email,
      origin,
      destination,
      bookedTrip.trip_id,
      bookedTrip.booking_id,
      seat_number,
      trip_date
    );
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookedTrip.trip_id}:::Info: successfully sent mail to user bookTrip.controllers.trip.js`
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

export const fetchAllBookings = async (req, res) => {
  try {
    const { query } = req;
    const payload = Payloads.fetchAllBookings(query);
    const [ bookings, [ bookingsCount ] ] = await TripServices.fetchAllBookings(
      payload
    );
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${bookings.trip_id}:::Info: successfully fetched bookings for trip fetchAllBookings.controllers.trip.js`
    );
    const data = {
      page: parseFloat(req.query.page) || 1,
      total_count: Number(bookingsCount.count),
      total_pages: Helpers.calculatePages(
        Number(bookingsCount.count),
        Number(req.query.per_page) || 10
      ),
      bookings
    };
    return ApiResponse.success(
      res,
      enums.FETCH_ALL_BOOKINGS,
      enums.HTTP_OK,
      data
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
    const { query } = req;
    const payload = Payloads.fetchAllUserBookings(query, userId);
    const [ userBookings, [ userBookingsCount ] ] =
      await TripServices.fetchAllUserBookings(payload);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${userBookings.user_id}:::Info: successfully fetched all bookings fetchAllUserBookings.controllers.trip.js`
    );
    const data = {
      page: parseFloat(req.query.page) || 1,
      total_count: Number(userBookingsCount.count),
      total_pages: Helpers.calculatePages(
        Number(userBookingsCount.count),
        Number(req.query.per_page) || 10
      ),
      userBookings
    };
    return ApiResponse.success(
      res,
      enums.FETCH_ALL_BOOKINGS,
      enums.HTTP_OK,
      data
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

export const filterTrips = async (req, res) => {
  try {
    const { userId } = req.data;
    const { query } = req;
    const payload = Payloads.filterTrips(query);
    const [ trips, [ tripsCount ] ] = await TripServices.filterTrips(payload);

    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${userId} Info: successfully filtered trips by origin or destination filterTripsByOriginOrDestination.trips.controllers.roles.js`
    );
    const data = {
      page: parseFloat(req.query.page) || 1,
      total_count: Number(tripsCount.count),
      total_pages: Helpers.calculatePages(
        Number(tripsCount.count),
        Number(req.query.per_page) || 10
      ),
      trips
    };
    return ApiResponse.success(res, enums.FILTER_TRIPS, 200, data);
  } catch (error) {
    error.label = enums.FILTER_TRIPS_CONTROLLER;
    logger.error(
      `filtering trips failed::${enums.FILTER_TRIPS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const getAvailableBus = async (req, res) => {
  try {
    const [ buses ] = await TripServices.getAvailableBus();
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${req.data.userId} Info: successfully fetched the buses with inactive status getAvailableBus.trips.controllers.roles.js`
    );
    return ApiResponse.success(
      res,
      enums.AVAILABLE_BUS_FETCHED_SUCCESSFULLY,
      enums.HTTP_OK,
      buses
    );
  } catch (error) {
    error.label = enums.GET_AVAILABLE_BUS_CONTROLLER;
    logger.error(
      `fetching the available buses failed::${enums.GET_AVAILABLE_BUS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};

export const getSeatStatus = async (req, res) => {
  try {
    let seats = {};
    const { trip_id } = req.params;
    const buses = await TripServices.getSeatStatus([ trip_id ]);
    for (let i = 1; i <= buses.capacity; i++) {
      seats[i] = false;
    }
    buses.unavailable_seats.map(seat => {
      if (seat) {
        seats[seat] = true;
      }
    });
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, - Info: successfully fetched the bus seats getSeatStatus.trips.controllers.roles.js`
    );
    return ApiResponse.success(
      res,
      enums.AVAILABLE_BUS_FETCHED_SUCCESSFULLY,
      enums.HTTP_OK,
      seats
    );
  } catch (error) {
    error.label = enums.GET_AVAILABLE_BUS_CONTROLLER;
    logger.error(
      `fetching the available buses failed::${enums.GET_AVAILABLE_BUS_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};
