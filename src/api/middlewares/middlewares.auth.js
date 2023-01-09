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
  try {
    const  { email }  = req.body; 
    const existingEmail = await authServices.findEmail([ email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: existing email not found correctly`);
    if (existingEmail) {
      return ApiResponse.error(res, enums.EXISTING_EMAIL, enums.HTTP_BAD_REQUEST);
    }
    return next();
  } catch (error) {
    error.label = enums.CHECK_EXISTING_EMAIL; 
    logger.error(`checking existing email failed::${enums.CHECK_EXISTING_EMAIL}`, error.message);
  }
};

export const emailDoesNotExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authServices.findEmail([ email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: user with email found emailDoesNotExist.middlewares.auth.js`);

    if (!user) return ApiResponse.error(res, enums.EMAIL_DOES_NOT_EXIST, enums.HTTP_BAD_REQUEST);

    req.user = user;
    return next();
  } catch (error) {
    error.label = enums.EMAIL_DOES_NOT_EXIST; 
    logger.error(`checking if email exists::${enums.EMAIL_DOES_NOT_EXIST}`, error.message);
  }
};

export const checkIfEmailVerified = async (req, res, next) => {
  try {
    const { user } = req;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: user email verified checkIfEmailVerified.middlewares.auth.js`);

    if (!user.is_email_verified) 
      return ApiResponse.error(res, enums.UNVERIFIED_EMAIL, enums.HTTP_BAD_REQUEST);
    

    return next();
  } catch (error) {
    error.label = enums.CHECK_EMAIL_VERIFIED; 
    logger.error(`checking if email is verified::${enums.CHECK_EMAIL_VERIFIED}`, error.message);
  }
};

export const validateUserPassword = async (req, res, next) => {
  try {
    const { user, body } = req;
    const passwordMatch = await hash.comparePasswordHash(body.password.trim(), user.password);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: password match successful validateUserPassword.middlewares.auth.js`);

    if (!passwordMatch)
      return ApiResponse.error(res, enums.PASSWORD_INCORRECT, enums.HTTP_BAD_REQUEST);

    return next();
  } catch (error) {
    error.label = enums.VALIDATE_PASSWORD; 
    logger.error(`checking if passwords match::${enums.VALIDATE_PASSWORD}`, error.message);
  }
};

export const generateJwtToken = async (req, res, next) => {
  try {
    const { user } = req;
    const data = { userId: user.user_id, email: user.email };
    const token = helpers.generateJWT(data);

    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: jwt generated successfully generateJwtToken.middlewares.auth.js`);

    req.user.token = token;
    return next();
  } catch (error) {
    error.label = enums.GENERATE_JWT; 
    logger.error(`generating jwt failed::${enums.GENERATE_JWT}`, error.message);
  }
};

export const validateEmailVerificationToken = async (req, res, next) => {
  try {
    const user = await authServices.findEmailVerificationToken(req.params.emailToken);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: email verification token found validateEmailVerificationToken.middlewares.auth.js`);

    if (!user) {
      return ApiResponse.error(res, enums.TOKEN_ABSENT_OR_EXPIRED, enums.HTTP_BAD_REQUEST);
    }

    req.user_id = user.user_id;
    return next();
  } catch (error) {
    error.label = enums.CHECK_EMAIL_VERIFICATION_TOKEN; 
    logger.error(`validating email verification token::${enums.CHECK_EMAIL_VERIFICATION_TOKEN}`, error.message);
  }
};
