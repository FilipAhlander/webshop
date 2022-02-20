import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const expiresIn = process.env.JWT_EXPIRATION_TIME;

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, jwtRefreshSecret);
}

export const verifyAccessToken = (accessToken) => {
  return jwt.verify(accessToken, jwtSecret);
}

export const verifyRefreshToken = (accessToken) => {
  return jwt.verify(accessToken, jwtRefreshSecret);
}