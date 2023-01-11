import _ from 'lodash';
import * as AuthServices from '../services/services.auth';
import AuthPayloads from '../../lib/payloads/lib.payload.auth';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';
import mails from '../../config/email/mails';
import config from '../../config/index';
import { userDetails } from '../../lib/constants/constants';

export const signUp = async (req, res) => {
  try {
    const { body, hashedPassword, email_verification_token, expTime } = req;
    const payload = AuthPayloads.registerUser(body, hashedPassword, email_verification_token, expTime );
    const verificationLink = `http://explorertrips.com?token=${email_verification_token}`;
    const  registeredUser  = await AuthServices.registerUsers(payload);

    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredUser.user_id}:::Info: successfully registered user to the database signup.controllers.auth.js`);

    if (config.WAYFARER_NODE_ENV === 'test') {
      return ApiResponse.success(res, enums.REGISTER_USER, enums.HTTP_CREATED, registeredUser);
    }

    mails.sendSignUp(body.email, verificationLink);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredUser.user_id}:::Info: successfully sends mail to user signup.controllers.auth.js`);
    delete registeredUser.password;

    return ApiResponse.success(res, enums.REGISTER_USER, enums.HTTP_CREATED, registeredUser);
  } catch (error) {
    error.label =  enums.SIGNUP_CONTROLLER;
    logger.error(`User account creation failed::${enums.SIGNUP_CONTROLLER}`, error.message);  
  }

};

export const forgotPassword = async (req, res) => {
  try {
    const { forgot_password_token, body, expTime } = req;
    const verificationLink =  `http://explorertrips.com?token=${forgot_password_token}`;
    const user = await AuthServices.getUserDetailsByEmail([ body.email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.user_id}:::Info: successfully fetched user details forgotPassword.controllers.auth.js`);
    await AuthServices.setForgotPasswordToken([ user.user_id, forgot_password_token, expTime ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.user_id}:::Info: successfully updates a user's password reset token forgotPassword.controllers.auth.js`);
    if (config.WAYFARER_NODE_ENV === 'test') {
      return ApiResponse.success(res, enums.FORGOT_PASSWORD, enums.HTTP_OK, forgot_password_token);
    }
    mails.forgotPassword(body.email, verificationLink);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.user_id}:::Info: successfully sends mail to user forgotPassword.controllers.auth.js`);

    return ApiResponse.success(res, enums.FORGOT_PASSWORD, enums.HTTP_OK, forgot_password_token);
  } catch (error) {
    error.label = enums.FORGOT_PASSWORD_CONTROLLER;
    logger.error(` password reset link failed to send::${enums.FORGOT_PASSWORD_CONTROLLER}`, error.message); 
  }
};
    
export const verifyEmail = async (req, res) => {
  try {
    await AuthServices.verifyEmail([ req.user_id ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${req.user_id}:::Info: successfully verified client email verifyEmail.controllers.auth.js`);

    return ApiResponse.success(res, enums.VERIFY_CLIENT_EMAIL, enums.HTTP_OK);
  } catch (error) {
    error.label =  enums.VERIFY_EMAIL_CONTROLLER;
    logger.error(`Client email verified::${enums.VERIFY_EMAIL_CONTROLLER}`, error.message);  
  }
};

export const loginUser = async (req, res) => {
  try {
    const user = _.pick(req.user, userDetails);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user}:::Info: successfully logged in client loginClient.controllers.auth.js`);

    return ApiResponse.success(res, enums.LOGIN_USER, enums.HTTP_OK, user);
  } catch (error) {
    error.label =  enums.LOGIN_CONTROLLER;
    logger.error(`Client login failed::${enums.LOGIN_CONTROLLER}`, error.message);  
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { hashedPassword, user } = req;
    await AuthServices.resetUserPassword([ user.user_id, hashedPassword ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.user_id}:::Info: successfully resets user's password resetPassword.controllers.auth.js`);

    if (config.WAYFARER_NODE_ENV === 'test') {
      return ApiResponse.success(res, enums.PASSWORD_RESET, enums.HTTP_OK);
    }
    mails.resetPassword(user.email);
    return ApiResponse.success(res, enums.PASSWORD_RESET, enums.HTTP_OK);
  } catch (error) {
    error.label = enums.RESET_PASSWORD_CONTROLLER;
    logger.error(` password reset failed::${enums.RESET_PASSWORD_CONTROLLER}`, error.message);
  }
};
