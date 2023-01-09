import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.auth';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as AuthController from '../controllers/controllers.auth';

const router = Router();

router.post(
  '/sign_up',
  Model(Schema.signUp, 'payload'),
  [
    AuthMiddleware.checkIfEmailAlreadyExist,
    AuthMiddleware.hashUserPassword,
    AuthMiddleware.generateEmailVerificationToken,
    AuthMiddleware.setEmailVerificationExpiry
  ],
  AuthController.signUp
);

router.put(
  '/verify-email/:emailToken',
  Model(Schema.tokenParam, 'param'),
  AuthMiddleware.validateEmailVerificationToken,
  AuthController.verifyEmail
);

router.post(
  '/login',
  Model(Schema.login, 'payload'),
  [
    AuthMiddleware.emailDoesNotExist,
    AuthMiddleware.checkIfEmailVerified,
    AuthMiddleware.validateUserPassword,
    AuthMiddleware.generateJwtToken
  ],
  AuthController.loginClient
);

export default router;
