import * as AdminServices from '../services/services.admin';
import AdminPayloads from '../../lib/payloads/lib.payload.admin';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';

export const registerBus = async (req, res) => {
  try {
    const registeredBus = await AdminServices.registerBus(AdminPayloads.registerBus(req.body));
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredBus.bus_id}:::Info: successfully registered bus to the database registerBus.controllers.admin.js`);
    
    return ApiResponse.success(res, enums.REGISTER_BUS, enums.HTTP_CREATED, registeredBus);
  } catch (error) {
    error.label = enums.REGISTER_BUS_CONTROLLER;
    logger.error(`Bus registration failed::${enums.REGISTER_BUS_CONTROLLER}`, error.message);  
  }
};

export const createTrip = async (req, res) => {
  try {
    const { bus_id } = req.body;
    const available_seats = await AdminServices.findBusByBusId([bus_id]);
    const createdTrip = await AdminServices.createTrip(AdminPayloads.createTrip(req.body), available_seats);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${createdTrip.trip_id}:::Info: successfully created a trip createTrip.controllers.admin.js`);
    
    return ApiResponse.success(res, enums.CREATE_TRIP, enums.HTTP_CREATED, registeredBus);
  } catch (error) {
    error.label = enums.CREATE_TRIP_CONTROLLER;
    logger.error(`Bus registration failed::${enums.CREATE_TRIP_CONTROLLER}`, error.message);  
  }
};
