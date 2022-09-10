import mongoose from 'mongoose';
import config from './config';

console.log('The server is beginning to start...');

const mongoDbConnectionString = `mongodb://${config.mongoRootUsername}:${config.mongoRootPassword}@${config.mongoUrl}:${config.mongoPort}`;
const conn = mongoose.createConnection(mongoDbConnectionString);
console.log(conn);
