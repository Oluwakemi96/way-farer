import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const HASH_PASSWORD_MIDDLEWARE = 'AuthMiddleware::hashUserPassword';
export const GENERATE_EMAIL_VERIFICATION_TOKEN = 'AuthMiddleware::generateEmailVerificationToken';
export const SET_EMAIL_VERIFICATION_TOKEN_EXPIRY = 'AuthMiddleware::setEmailVerificationExpiry';
export const VALIDATE_DATA_MIDDLEWARE = 'ModelMiddleware::validateData';
export const SIGNUP_CONTROLLER = 'AuthController::signup';
export const CHECK_EXISTING_EMAIL = 'AuthMiddleware::checkIfEmailAlreadyExist';
export const EMAIL_DOES_NOT_EXIST = 'AuthMiddleware::checkIfEmailDoesNotExist';
export const CHECK_EMAIL_VERIFIED = 'AuthMiddleware::checkIfEmailIsVerified';
export const VALIDATE_PASSWORD = 'AuthMiddleware::checkIfPasswordsMatch';
export const GENERATE_JWT = 'AuthMiddleware::generateJwt';
export const LOGIN_CONTROLLER = 'AuthController::login';
export const VERIFY_EMAIL_CONTROLLER = 'AuthController::verifyEmail';
export const CHECK_EMAIL_VERIFICATION_TOKEN = 'AuthController::checkIfEmailVerificationTokenIsPresentOrExpired';



