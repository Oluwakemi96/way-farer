import * as hash from '../../lib/utils/lib.util.hash';
import * as helpers from '../../lib/utils/lib.util.helpers';
import enums from '../../lib/enums/index';
import * as authServices from '../services/services.auth';
import ApiResponse from '../../lib/http/lib.http.responses';

export const hashUserPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = hash.hashPassword(password.trim());
    req.hashedPassword = hashedPassword;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully hashed user's password.middlewares.auth.js`);
    return next();
  } catch (error) {
    error.label = enums.HASH_PASSWORD_MIDDLEWARE;
    logger.error(`hashing user password failed::${enums.HASH_PASSWORD_MIDDLEWARE}`, error.message);   
  }
};

export const generateEmailVerificationToken = async (req, res, next) => {
  try {
    const email_verification_token = hash.generateRandomString(10);
    req.email_verification_token = email_verification_token;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: generated an email verification token.middlewares.auth.js`); 
    return next(); 
  } catch (error) {
    error.label = enums.GENERATE_EMAIL_VERIFICATION_TOKEN;
    logger.error(`generating random token failed::${enums.GENERATE_EMAIL_VERIFICATION_TOKEN}`, error.message);
  }
};

export const setEmailVerificationExpiry = async (req, res, next) => {
  try {
    const expTime = helpers.setTokenExpire(10);
    req.expTime = expTime;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: set email verification expiry time.middlewares.auth.js`);
    return next();
  } catch (error) {
    error.label = enums.SET_EMAIL_VERIFICATION_TOKEN_EXPIRY;
    logger.error(`setting email verification expiry time failed::${enums.SET_EMAIL_VERIFICATION_TOKEN_EXPIRY}`, error.message);
  }
};

export const checkIfEmailAlreadyExist = async (req, res, next) => {
  logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: first hit`);
  try {
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: right here, not working`);
    const  { email }  = req.body; 
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: got email from body`);
    const existingEmail = await authServices.findEmail([ email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: existing email not found correctly`);
    if (existingEmail) {
      return ApiResponse.error(res, enums.EXISTING_EMAIL, enums.HTTP_BAD_REQUEST);
    }
    return next();
  } catch (error) {
    error.label = enums.CHECK_EXISTING_EMAIL; 
    logger.error(`checking existing email failed::${enums.CHECK_EXISTING_EMAIL}`, error.message);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: ran this`);
  }
};
