import dayjs from 'dayjs';

export const CURRENT_TIME_STAMP = `${dayjs().format('DD-MMM-YYYY, HH:mm:ss')}`;
export const HASH_PASSWORD_MIDDLEWARE = 'AuthMiddleware::hashUserPassword';
export const GENERATE_VERIFICATION_TOKEN = 'AuthMiddleware::generateVerificationToken';
export const SET_TOKEN_EXPIRY = 'AuthMiddleware::setTokenExpiry';
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
export const CHECK_USER_AUTH = 'AuthMiddleware::checkIfUserIsAuthenticated';
export const CHECK_IF_EMAIL_EXIST_MIDDLEWARE = 'AuthMiddleware::checkIfEmailExist';
export const FORGOT_PASSWORD_CONTROLLER = 'AuthController::forgotPassword';
export const RESET_PASSWORD_MIDDLEWARE = 'AuthMiddleware::resetPassword';
export const RESET_PASSWORD_CONTROLLER = 'AuthController::resetPassword';
export const REGISTER_BUS_CONTROLLER = 'TripController::registerBus';
export const BOOK_TRIP_CONTROLLER = 'TripController::bookTrip';
export const CREATE_TRIP_CONTROLLER = 'TripController::createTrip';
export const CHECK_IF_TRIP_EXISTS = 'TripController::checkIfTripExists';
export const CHECK_IF_TRIP_AVAILABLE = 'TripController::checkTripStatus';
export const CHECK_IF_BUS_EXISTS = 'TripController::checkIfBusExists';
export const CHECK_IF_BUS_AVAILABLE = 'TripController::checkBusAvailability';
export const CHECK_IF_SEAT_AVAILABLE = 'TripController::checkSeatAvailability';
export const CHECK_IF_BUS_FILLED = 'TripController::checkIfBusIsFilled';
export const CANCEL_TRIP_CONTROLLER = 'TripController::cancelTrip';


