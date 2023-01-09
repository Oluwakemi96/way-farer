import config from '../../config/index';
import bcrypt from 'bcrypt';
import Crypto from 'crypto';

export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, Number(config.WAYFARER_BCRYPT_SALT_ROUNDS));
  return hashedPassword;
};

export const comparePasswordHash = (password, hash) => {
  return bcrypt.compare(password, hash);
};

export const generateRandomString = (size) => {
  try {
    return Crypto.randomBytes(size).toString('hex');
  } catch (error) {
    return error;
  }
}; 
