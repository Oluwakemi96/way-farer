import * as AdminServices from '../services/services.admin';
import AdminPayloads from '../../lib/payloads/lib.payload.admin';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';

export const registerBus = async (req, res) => {
  try {
    const payload = AdminPayloads.registerBus(req.body);
    const registeredBus = await AdminServices.registerBus(payload);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredBus.bus_id}:::Info: successfully registered bus to the database registerBus.controllers.admin.js`);
    
    return ApiResponse.success(res, enums.REGISTER_BUS, enums.HTTP_CREATED, registeredBus);
  } catch (error) {
    error.label = enums.REGISTER_BUS_CONTROLLER;
    logger.error(`Bus registration failed::${enums.REGISTER_BUS_CONTROLLER}`, error.message);  
  }
};
