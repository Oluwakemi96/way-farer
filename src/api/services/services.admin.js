import DB from '../../services/services.db';
import enums from '../../lib/enums/index';

export const registerBus = (payload) => DB.singleTransact('registerBus', payload, enums.ADMIN_QUERY);
