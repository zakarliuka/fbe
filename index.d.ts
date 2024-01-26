declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    DATABASE_URL?: string;
    DATABASE_AUTH_TOKEN?: string;
  }
}
declare namespace Express {
  export interface Request {
    parsedData?: {
      body?: any;
      query?: any;
      params?: any;
    };
  }
}
