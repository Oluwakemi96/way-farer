import config from '../../config/index';

export const generateJWT = (data) => {
  const token = jwt.sign(data, config.WATFARER_DEV_JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

export const setTokenExpire = (minutes) => {
  const expiresIn = new Date().getTime() + minutes * 60 * 1000;
  return new Date(expiresIn);
};

