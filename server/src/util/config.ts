import dotenv from 'dotenv';

dotenv.config();

/**
 * The configuration for the server-side of the cornhole-tracker application.
 */
const config = {
  mongoRootUsername: process.env.MONGO_ROOT_USERNAME,
  mongoRootPassword: process.env.MONGO_ROOT_PASSWORD,
  mongoPort: process.env.MONGO_PORT,
  mongoUrl: process.env.MONGO_URL
};

export default config;
