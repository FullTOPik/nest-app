import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const CLIENT_HOST = process.env.CLIENT_HOST;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const JWT_LIFETIME_ACCESS = process.env.JWT_LIFETIME_ACCESS;
export const JWT_LIFETIME_REFRESH = process.env.JWT_LIFETIME_REFRESH;
export const DATABASE_PORT = Number(process.env.DATABASE_PORT);
export const JWT_MAX_AGE_ACCESS = Number(process.env.JWT_MAX_AGE_ACCESS);
export const JWT_MAX_AGE_REFRESH = Number(process.env.JWT_MAX_AGE_REFRESH);
export const SECRET = {
  ACCESS: process.env.JWT_SECRET_ACCESS,
  REFRESH: process.env.JWT_SECRET_REFRESH,
};

