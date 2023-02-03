import DB from '../../services/services.db';
import enums from '../../lib/enums/index';

export const registerBus = (payload) => DB.singleTransact('registerBus', payload, enums.TRIP_QUERY);
export const createTrip = (payload) => DB.singleTransact('createTrip', payload, enums.TRIP_QUERY);
export const findTrip = (payload) => DB.singleTransact('findTrip', payload, enums.TRIP_QUERY);
export const findBus = (payload) => DB.singleTransact('findBus', payload, enums.TRIP_QUERY);
export const checkBusAvailability = (payload) => DB.singleTransact('checkBusAvailability', payload, enums.TRIP_QUERY);
export const updateTripStatus = (payload) => DB.noReturnTransact('updateTripStatus', payload, enums.TRIP_QUERY);
export const bookTrip = (payload) => DB.singleTransact('bookTrip', payload, enums.TRIP_QUERY);
export const checkTripStatus = (payload) => DB.singleTransact('checkTripStatus', payload, enums.TRIP_QUERY);
export const checkSeatAvailability = (payload) => DB.singleTransact('checkSeatAvailability', payload, enums.TRIP_QUERY);
export const countFilledSeats = (payload) => DB.singleTransact('countFilledSeats', payload, enums.TRIP_QUERY);
export const checkBusCapacity = (payload) => DB.singleTransact('checkBusCapacity', payload, enums.TRIP_QUERY);
export const getSeatStatus = (payload) => DB.singleTransact('getSeatStatus', payload, enums.TRIP_QUERY);
export const deleteBooking = (payload) => DB.noReturnTransact('deleteBooking', payload, enums.TRIP_QUERY);
export const checkPlateNumber = (payload) => DB.singleTransact('checkPlateNumber', payload, enums.TRIP_QUERY);
export const findBooking = (payload) => DB.singleTransact('findBooking', payload, enums.TRIP_QUERY);
export const fetchTripDetails = (payload) => DB.singleTransact('fetchTripDetails', payload, enums.TRIP_QUERY);
export const fetchAllBookings = async (payload) => DB.multipleTransaction([
  DB.transact('fetchAllBookings', payload, enums.TRIP_QUERY),
  DB.transact('fetchBookingsCount', payload, enums.TRIP_QUERY)
]); 
    
export const fetchAllUserBookings = async (payload) => DB.multipleTransaction([
  DB.transact('fetchAllUserBookings', payload, enums.TRIP_QUERY),
  DB.transact('fetchUserBookingsCount', payload, enums.TRIP_QUERY)
]);
  
export const filterTrips = async(payload) => DB.multipleTransaction([
  await DB.transact('filterTrips', payload, enums.TRIP_QUERY),
  await DB.transact('getTripsCount', payload, enums.TRIP_QUERY)
]);
export const updateBusStatus = (payload) => DB.singleTransact('updateBusStatus', payload, enums.TRIP_QUERY);
export const getAvailableBus = (payload) => DB.transact('getAvailableBus', payload, enums.TRIP_QUERY);

