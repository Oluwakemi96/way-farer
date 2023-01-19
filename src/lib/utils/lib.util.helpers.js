import config from '../../config';
import jwt from 'jsonwebtoken';

export const generateJWT = (data) => {
  return jwt.sign(data, config.WAYFARER_JWT_SECRET_KEY, {
    expiresIn: '1d'
  });
};

export const setTokenExpire = (minutes) => {
  const expiresIn = new Date().getTime() + minutes * 60 * 1000;
  return new Date(expiresIn);
};

export const verifyToken = (token, SECRET) => {
  return jwt.verify(token, SECRET);
};

export const calculatePages = (total, limit) => {
  const displayPage = Math.floor(total / limit);
  return total % limit ? displayPage + 1 : displayPage;
};
