import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const HASH_PASSWORD_MIDDLEWARE = 'AuthMiddleware::hashUserPassword';
export const GENERATE_EMAIL_VERIFICATION_TOKEN = 'AuthMiddleware::generateEmailVerificationToken';
export const SET_EMAIL_VERIFICATION_TOKEN_EXPIRY = 'AuthMiddleware::setEmailVerificationExpiry';
export const VALIDATE_DATA_MIDDLEWARE = 'ModelMiddleware::validateData';
export const SIGNUP_CONTROLLER = 'AuthController::signup';
export const CHECK_EXISTING_EMAIL = 'AuthMiddleware::checkIfEmailAlreadyExist';


