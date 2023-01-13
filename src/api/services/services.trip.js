import DB from '../../services/services.db';
import enums from '../../lib/enums/index';

export const registerBus = (payload) => DB.singleTransact('registerBus', payload, enums.TRIP_QUERY);
export const createTrip = (payload) => DB.singleTransact('createTrip', payload, enums.TRIP_QUERY);
export const findTrip = (payload) => DB.singleTransact('findTrip', payload, enums.TRIP_QUERY);
export const findBus = (payload) => DB.singleTransact('findBus', payload, enums.TRIP_QUERY);
export const checkBusAvailability = (payload) => DB.singleTransact('checkBusAvailability', payload, enums.TRIP_QUERY);
export const cancelTrip = (payload) => DB.noReturnTransact('cancelTrip', payload, enums.TRIP_QUERY);
export const bookTrip = (payload) => DB.singleTransact('bookTrip', payload, enums.TRIP_QUERY);
export const checkTripStatus = (payload) => DB.singleTransact('checkTripStatus', payload, enums.TRIP_QUERY);
export const checkSeatAvailability = (payload) => DB.singleTransact('checkSeatAvailability', payload, enums.TRIP_QUERY);
export const countFilledSeats = (payload) => DB.singleTransact('countFilledSeats', payload, enums.TRIP_QUERY);
export const checkBusCapacity = (payload) => DB.singleTransact('checkBusCapacity', payload, enums.TRIP_QUERY);
export const fetchAllBookings = (payload) => DB.transact('fetchAllBookings', payload, enums.TRIP_QUERY);
export const fetchTripBookings = (payload) => DB.transact('fetchTripBookings', payload, enums.TRIP_QUERY);
export const fetchAllUserBookings = (payload) => DB.transact('fetchAllUserBookings', payload, enums.TRIP_QUERY);
