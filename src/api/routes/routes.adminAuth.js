import { Router } from 'express';
import Model from '../middlewares/middlewares.model';
import * as Schema from '../../lib/schemas/lib.schema.auth';
import * as AuthMiddleware from '../middlewares/middlewares.auth';
import * as AuthController from '../controllers/controllers.auth';

const router = Router();

router.post(
  '/login',
  Model(Schema.login, 'payload'),
  [
    AuthMiddleware.emailDoesNotExist,
    AuthMiddleware.validateUserPassword,
    AuthMiddleware.generateJwtToken
  ],
  AuthController.loginUser
);

router.post(
  '/forgot_password',
  Model(Schema.forgotPassword, 'payload'),
  [
    AuthMiddleware.checkIfEmailExist,
    AuthMiddleware.generateForgotPasswordToken,
    AuthMiddleware.setEmailVerificationExpiry
  ],
  AuthController.forgotPassword
);

router.patch(
  '/reset_password',
  Model(Schema.resetPasswordToken, 'query'),
  Model(Schema.resetPassword, 'payload'),
  [ AuthMiddleware.verifyPasswordResetToken, AuthMiddleware.hashUserPassword ],
  AuthController.resetPassword
);

export default router;
