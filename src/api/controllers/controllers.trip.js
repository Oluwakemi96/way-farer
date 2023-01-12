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

    return ApiResponse.success(res, enums.BOOK_TRIP, enums.HTTP_CREATED, bookedTrip);
  } catch (error) {
    error.label = enums.BOOK_TRIP_CONTROLLER;
    logger.error(
      `Trip booking failed::${enums.BOOK_TRIP_CONTROLLER}::::${error.message}`
    );
    return error;
  }
};
