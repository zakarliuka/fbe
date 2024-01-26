import "dotenv/config";

export const PORT = process.env.PORT || 1234;
export const DATABASE_URL = process.env.DATABASE_URL || "file:./bin/local.db";
export const DATABASE_AUTH_TOKEN =
  process.env.DATABASE_AUTH_TOKEN || "DATABASE_AUTH_TOKEN";

export const SUPERADMIN_TOKEN =
  process.env.SUPERADMIN_TOKEN || "SUPERADMIN_TOKEN";

export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "JWT_REFRESH_SECRET";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "JWT_EXPIRATION";
export const JWT_REFRESH_EXPIRATION =
  process.env.JWT_REFRESH_EXPIRATION || "JWT_REFRESH_EXPIRATION";
