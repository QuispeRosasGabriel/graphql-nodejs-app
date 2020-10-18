import environment from "./environments";

if (process.env.NODE_ENV !== "production") {
  const env = environment;
}

export const SECRET_KEY = process.env.SECRET || "GaboApp";
export enum COLLECTIONS {
  USERS="users"
}

export enum MESSAGES {
  TOKEN_VERIFICATION_FAILED = 'Token expirado, inicia sesión nuevamente'
}