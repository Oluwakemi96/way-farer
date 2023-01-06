import config from "../../config";
import jwt from "jsonwebtoken";

export const generateJWT = (data) => {
  const token = jwt.sign(data, config.WAYFARER_JWT_SECRET_KEY, {
    expiresIn: "1d"
  });
  return token;
}

export const setTokenExpire = (minutes) => {
  const expiresIn = new Date().getTime() + minutes * 60 * 1000;
  return new Date(expiresIn);
};
