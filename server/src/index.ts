import config from './config';

console.log('The server is beginning to start...');

const mongoDbConnectionString = `mongodb://${config.mongoRootUsername}:${config.mongoRootPassword}`;
console.log(mongoDbConnectionString);
