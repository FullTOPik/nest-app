import { CookieOptions } from "express";
import { JWT_MAX_AGE_ACCESS, JWT_MAX_AGE_REFRESH } from "src/config/config";

const optionsAccess: CookieOptions = {
  maxAge: JWT_MAX_AGE_ACCESS,
  httpOnly: true
};

const optionsRefresh: CookieOptions = {
  maxAge: JWT_MAX_AGE_REFRESH,
  httpOnly: true
};

export {
  optionsAccess,
  optionsRefresh,
};
