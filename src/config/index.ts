import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  DEFAULT_USER_PASSWORD: process.env.DEFAULT_USER_PASSWORD,
};
