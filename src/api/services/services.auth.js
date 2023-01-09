import DB from '../../services/services.db';
import enums from '../../lib/enums/index';

export const registerUsers = (payload) => DB.singleTransact('registerUsers', payload, enums.AUTH_QUERY);
export const findEmail = (payload) => DB.singleTransact('findEmail', payload, enums.AUTH_QUERY);
export const findEmailVerificationToken = (payload) => DB.singleTransact('findEmailVerificationToken', payload, enums.AUTH_QUERY);
export const verifyEmail = (payload) => DB.noReturnTransact('verifyEmail', payload, enums.AUTH_QUERY);

