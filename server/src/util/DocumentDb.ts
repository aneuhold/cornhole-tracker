import { MongoClient } from 'mongodb';
import config from './config';

export default class DocumentDb {
  private static mongoClient: MongoClient;

  static get client(): MongoClient {
    if (!DocumentDb.mongoClient) {
      const mongoDbConnectionString = `mongodb://${config.mongoRootUsername}:${config.mongoRootPassword}@${config.mongoUrl}:${config.mongoPort}`;
      DocumentDb.mongoClient = new MongoClient(mongoDbConnectionString);
    }
    return DocumentDb.mongoClient;
  }
}
