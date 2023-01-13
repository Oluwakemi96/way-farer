import config from '../../config';
import jwt from 'jsonwebtoken';

export const generateJWT = (data) => {
  return jwt.sign(data, config.WAYFARER_JWT_SECRET_KEY, {
    expiresIn: '1m'
  });
};

export const setTokenExpire = (minutes) => {
  const expiresIn = new Date().getTime() + minutes * 60 * 1000;
  return new Date(expiresIn);
};

export const verifyToken = (token, SECRET) => {
  return jwt.verify(token, SECRET);
};
