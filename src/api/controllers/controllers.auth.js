import * as AuthServices from '../services/services.auth';
import AuthPayloads from '../../lib/payloads/lib.payload.auth';
import enums from '../../lib/enums/index';
import ApiResponse from '../../lib/http/lib.http.responses';
import mails from '../../config/email/mails';
import config from '../../config/index';

export const signUp = async (req, res) => {
  try {
    const { body, hashedPassword, email_verification_token, expTime } = req;
    const payload = AuthPayloads.registerUser(body, hashedPassword, email_verification_token, expTime );
    const verificationLink = `http://explorertrips.com?token=${email_verification_token}`;
    const  registeredUser  = await AuthServices.registerUsers(payload);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredUser.user_id}:::Info: successfully registered user to the database signup.controllers.auth.js`);
    const data = registeredUser;
    if (config.WAYFARER_NODE_ENV === 'test') {
      delete registeredUser.password;
      return ApiResponse.success(res, enums.REGISTER_USER, enums.HTTP_CREATED, data);
    }
    mails.sendSignUp(body.email, verificationLink);
    logger.info(`${enums.CURRENT_TIME_STAMP}, ${registeredUser.user_id}:::Info: successfully sends mail to user signup.controllers.auth.js`);
    delete registeredUser.password;
    return ApiResponse.success(res, enums.REGISTER_USER, enums.HTTP_CREATED, data);
  } catch (error) {
    error.label =  enums.SIGNUP_CONTROLLER;
    logger.error(`User account creation failed::${enums.SIGNUP_CONTROLLER}`, error.message);  
  }

};
