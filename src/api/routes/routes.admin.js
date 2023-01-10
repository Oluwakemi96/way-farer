import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.admin';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as AdminController from '../controllers/controllers.admin';

const router = Router();

router.use([ AuthMiddleware.authenticate, AuthMiddleware.isAdmin ]);

router.post(
  '/register-bus',
  Model(Schema.registerBus, 'payload'),
  AdminController.registerBus
);

export default router;
