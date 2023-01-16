import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.admin';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as UserMiddleware from '../middlewares/middlewares.user';
import * as AdminController from '../controllers/controllers.admin';

const router = Router();

router.use([ AuthMiddleware.authenticate, AuthMiddleware.isAdmin ]);

router.post(
  '/register-bus',
  Model(Schema.registerBus, 'payload'),
  AdminController.registerBus
);

router.post(
  '/create-trip',
  Model(Schema.createTrip, 'payload'),
  AdminController.createTrip
);

router.put(
  '/cancel-trip/:trip_id',
  Model(Schema.tripId, 'param'),
  UserMiddleware.checkIfTripExists,
  AdminController.cancelTrip
);

export default router;
