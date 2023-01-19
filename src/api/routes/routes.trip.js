import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.trip';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as TripMiddleware from '../middlewares/middlewares.trip';
import * as TripController from '../controllers/controllers.trip';

const router = Router();

router.use(AuthMiddleware.authenticate);
router.get('/fetch-bookings', TripController.fetchAllUserBookings);
router.post(
  '/book-trip',
  Model(Schema.bookTrip, 'payload'),
  [
    TripMiddleware.checkTripStatus,
    TripMiddleware.checkIfBusIsFilled,
    TripMiddleware.checkSeatAvailability
  ],
  TripController.bookTrip
);
router.delete(
  '/delete-booking/:bookingId',
  TripMiddleware.checkIfBookingExists,
  TripController.deleteBooking
);

router.get(
  '/filter-trips',
  Model(Schema.filterTrips, 'query'),
  TripController.filterTrips
);

router.use(AuthMiddleware.isAdmin);
router.get('/admin/fetch-bookings', TripController.fetchAllBookings);
router.post(
  '/register-bus',
  Model(Schema.registerBus, 'payload'),
  TripMiddleware.checkPlateNumber,
  TripController.registerBus
);

router.post(
  '/create-trip',
  Model(Schema.createTrip, 'payload'),
  TripMiddleware.checkIfBusExists,
  TripMiddleware.checkBusAvailability,
  TripController.createTrip
);

router.put(
  '/cancel-trip/:trip_id',
  Model(Schema.tripId, 'param'),
  TripMiddleware.checkIfTripExists,
  TripController.cancelTrip
);

export default router;
