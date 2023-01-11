import enums from '../../lib/enums/index';
import * as admin from '../services/services.admin';
import ApiResponse from '../../lib/http/lib.http.responses';

export const checkIfTripExists = async (req, res, next) => {
  try {
    const { trip_id } = req.params;
    const trip = await admin.findTrip([ trip_id ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully found trip checkIfTripExists.middlewares.user.js`);

    if (!trip) return ApiResponse.error(res, enums.TRIP_NOT_FOUND, enums.HTTP_BAD_REQUEST);
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_TRIP_EXISTS_CONTROLLER;
    logger.error(`hashing user password failed::${enums.CHECK_IF_TRIP_EXISTS_CONTROLLER}::::${error.message}`);   
  }
};
