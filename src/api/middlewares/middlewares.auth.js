import * as hash from '../../lib/utils/lib.util.hash';
import * as helpers from '../../lib/utils/lib.util.helpers';
import enums from '../../lib/enums/index';
import * as authServices from '../services/services.auth';
import ApiResponse from '../../lib/http/lib.http.responses';
import config from '../../config';

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
    error.label = enums.GENERATE_VERIFICATION_TOKEN;
    logger.error(`generating random token failed::${enums.GENERATE_VERIFICATION_TOKEN}`, error.message);
  }
};

export const setEmailVerificationExpiry = async (req, res, next) => {
  try {
    const expTime = helpers.setTokenExpire(10);
    req.expTime = expTime;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: set email verification expiry time.middlewares.auth.js`);
    return next();
  } catch (error) {
    error.label = enums.SET_TOKEN_EXPIRY;
    logger.error(`setting email verification expiry time failed::${enums.SET_TOKEN_EXPIRY}`, error.message);
  }
};

export const checkIfEmailAlreadyExist = async (req, res, next) => {
  try {
    const  { email }  = req.body; 
    const existingEmail = await authServices.findEmail([ email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully checked if email exists.middlewares.auth.js`);

    if (existingEmail) {
      return ApiResponse.error(res, enums.EXISTING_EMAIL, enums.HTTP_BAD_REQUEST);
    }
    return next();
  } catch (error) {
    error.label = enums.CHECK_EXISTING_EMAIL; 
    logger.error(`checking existing email failed::${enums.CHECK_EXISTING_EMAIL}`, error.message);
  }
};

export const checkIfEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userEmail = await authServices.findEmail([ email ]);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully checked if email exists.middlewares.auth.js`);

    if (!userEmail){
      return ApiResponse.error(res, enums.EMAIL_NOT_FOUND, enums.HTTP_BAD_REQUEST);
    }
    return next();
  } catch (error) {
    error.label = enums.CHECK_IF_EMAIL_EXIST_MIDDLEWARE; 
    logger.error(`checking if email exist failed::${enums.CHECK_IF_EMAIL_EXIST_MIDDLEWARE}`, error.message);
  }
};

export const generateForgotPasswordToken = async (req, res, next) => {
  try {
    const forgot_password_token = hash.generateRandomString(10);
    req.forgot_password_token = forgot_password_token;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: generated a password reset token.middlewares.auth.js`); 
    return next(); 
  } catch (error) {
    error.label = enums.GENERATE_VERIFICATION_TOKEN;
    logger.error(`generating random token failed::${enums.GENERATE_VERIFICATION_TOKEN}`, error.message);
  }
};

export const verifyPasswordResetToken = async (req, res, next) => {
  try {
    const { password_token } = req.query;
    const user = await authServices.getUserByToken(password_token);
    if(!user) {
      return ApiResponse.error(res, enums.INVALID_TOKEN, enums.HTTP_NOT_FOUND);
    }
    req.user = user;
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: successfully fetched user details verifyPasswordResetToken.middlewares.auth.js`);
        
    return next();
  } catch (error) {
    error.label = enums.RESET_PASSWORD_MIDDLEWARE;
    logger.error(`password reset failed::${enums.RESET_PASSWORD_MIDDLEWARE}`, error.message);
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
    const data = { 
      userId: user.user_id, 
      email: user.email, 
      is_admin: user.is_admin 
    };
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

const checkAuthorizationToken = (authorization) => {
  let bearerToken = null;

  if (authorization) {
    const token = authorization.split(' ')[1];
    bearerToken = token || authorization;
  }

  return bearerToken;
};
  
const checkToken = (req) => {
  const {
    headers: { authorization }
  } = req; 
  const bearerToken = checkAuthorizationToken(authorization);
  logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: authentication token checked checkToken.middlewares.auth.js`);

  return req.body.refreshToken
    ? req.body.refreshToken
    : bearerToken ||
        req.headers['x-access-token'] ||
        req.headers.token ||
        req.body.token;
};

export const authenticate = async (req, res, next) => {
  const token = checkToken(req);
  logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: user authenticated authenticate.middlewares.auth.js`);

  if (!token) {
    return ApiResponse.error(res, enums.TOKEN_ERROR, enums.HTTP_FORBIDDEN);
  }

  try {
    const decoded = helpers.verifyToken(token, config.WAYFARER_JWT_SECRET_KEY);
    logger.info(`${enums.CURRENT_TIME_STAMP}, :::Info: authentication token decoded authenticate.middlewares.auth.js`);

    req.data = decoded; 

    next();
  } catch (error) {
    error.label = enums.CHECK_USER_AUTH;
    logger.error(`user authentication failed::${enums.CHECK_USER_AUTH}::::${error.message}`);
    return res.status(enums.HTTP_BAD_REQUEST).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  const { is_admin } = req.data;

  if (!is_admin) {
    return ApiResponse.error(res, enums.ROLE_NOT_SUFFICIENT, enums.HTTP_FORBIDDEN);
  }
  next();
};
  

  
  
  
  
  
  



