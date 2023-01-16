import DB from '../../services/services.db';
import enums from '../../lib/enums/index';

export const registerBus = (payload) => DB.singleTransact('registerBus', payload, enums.ADMIN_QUERY);
export const createTrip = (payload) => DB.singleTransact('createTrip', payload, enums.ADMIN_QUERY);
export const findTrip = (payload) => DB.singleTransact('findTrip', payload, enums.ADMIN_QUERY);
export const cancelTrip = (payload) => DB.noReturnTransact('cancelTrip', payload, enums.ADMIN_QUERY);
