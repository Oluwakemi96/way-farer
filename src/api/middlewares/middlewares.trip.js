import enums from '../../lib/enums/index';
import * as Trip from '../services/services.trip';
import ApiResponse from '../../lib/http/lib.http.responses';

export const checkIfTripExists = async (req, res, next) => {
  try {
    const { trip_id } = req.params;
    const trip = await Trip.findTrip([ trip_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully found trip checkIfTripExists.middlewares.trip.js`
    );

    if (!trip)
      return ApiResponse.error(
        res,
        enums.TRIP_NOT_FOUND,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_TRIP_EXISTS;
    logger.error(
      `checking trip existence failed::${enums.CHECK_IF_TRIP_EXISTS}::::${error.message}`
    );
  }
};

export const checkIfBookingExists = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await Trip.findBooking([ bookingId ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully found booking checkIfTripExists.middlewares.trip.js`
    );

    if (!booking)
      return ApiResponse.error(
        res,
        enums.BOOKING_NOT_FOUND,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_BOOKING_EXISTS;
    logger.error(
      `checking booking failed::${enums.CHECK_IF_BOOKING_EXISTS}::::${error.message}`
    );
  }
};

export const checkTripStatus = async (req, res, next) => {
  try {
    const { trip_id } = req.body;
    const trip = await Trip.checkTripStatus([ trip_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully found active trip checkTripStatus.middlewares.trip.js`
    );

    if (!trip)
      return ApiResponse.error(
        res,
        enums.TRIP_UNAVAILABLE,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_TRIP_AVAILABLE;
    logger.error(
      `check trip status failed::${enums.CHECK_IF_TRIP_AVAILABLE}::::${error.message}`
    );
  }
};

export const checkIfBusExists = async (req, res, next) => {
  try {
    const { bus_id } = req.body;
    const bus = await Trip.findBus([ bus_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: successfully found bus checkIfBusExists.middlewares.trip.js`
    );

    if (!bus)
      return ApiResponse.error(
        res,
        enums.BUS_NOT_FOUND,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_BUS_EXISTS;
    logger.error(
      `check bus existence failed::${enums.CHECK_IF_BUS_EXISTS}::::${error.message}`
    );
  }
};

export const checkBusAvailability = async (req, res, next) => {
  try {
    const { bus_id } = req.body;
    const bus = await Trip.checkBusAvailability([ bus_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: found unavailable bus checkBusAvailability.middlewares.trip.js`
    );

    if (bus)
      return ApiResponse.error(
        res,
        enums.BUS_UNAVAILABLE,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_BUS_AVAILABLE;
    logger.error(
      `check bus availability failed::${enums.CHECK_IF_BUS_AVAILABLE}::::${error.message}`
    );
  }
};

export const checkSeatAvailability = async (req, res, next) => {
  try {
    const { seat_number, bus_id } = req.body;
    const seat = await Trip.checkSeatAvailability([ seat_number ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, :::Info: booked seat found checkSeatAvailability.middlewares.trip.js`
    );

    const busCapacity = await Trip.checkBusCapacity([ bus_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${busCapacity.capacity}:::Info: bus capacity returned checkIfBusIsFilled.middlewares.trip.js`
    );

    if (seat || seat_number > busCapacity.capacity)
      return ApiResponse.error(
        res,
        enums.SEAT_UNAVAILABLE,
        enums.HTTP_BAD_REQUEST
      );
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_SEAT_AVAILABLE;
    logger.error(
      `check seat availability failed::${enums.CHECK_IF_SEAT_AVAILABLE}::::${error.message}`
    );
  }
};

export const checkIfBusIsFilled = async (req, res, next) => {
  try {
    const { trip_id, bus_id } = req.body;
    const filledSeatsCount = await Trip.countFilledSeats([ trip_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${filledSeatsCount.count}:::Info: count of seats returned checkIfBusIsFilled.middlewares.trip.js`
    );
    const busCapacity = await Trip.checkBusCapacity([ bus_id ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${busCapacity.capacity}:::Info: bus capacity returned checkIfBusIsFilled.middlewares.trip.js`
    );

    if (filledSeatsCount === busCapacity)
      return ApiResponse.error(res, enums.BUS_FILLED, enums.HTTP_BAD_REQUEST);
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_BUS_FILLED;
    logger.error(
      `check if bus is filled failed::${enums.CHECK_IF_BUS_FILLED}::::${error.message}`
    );
  }
};

export const checkPlateNumber = async (req, res, next) => {
  try {
    const { number_plate } = req.body;
    const plate = await Trip.checkPlateNumber([ number_plate ]);
    logger.info(
      `${enums.CURRENT_TIME_STAMP}, ${plate}:::Info: found plate number checkPlateNumber.middlewares.trip.js`
    );
    if (number_plate) 
      return ApiResponse.error(res, enums.NUMBER_PLATE_FOUND, enums.HTTP_BAD_REQUEST);
    return next();
  } catch (error) {
    error.label = enums.CHECK_DUPLICATE_PLATE_NUMBER;
    logger.error(
      `check if bus is filled failed::${enums.CHECK_DUPLICATE_PLATE_NUMBER}::::${error.message}`
    );
  }
};

