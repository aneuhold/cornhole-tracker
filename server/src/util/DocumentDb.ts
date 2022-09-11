import { Collection, Db, Document, MongoClient } from 'mongodb';
import config from './config';

export default class DocumentDb {
  private static DB_NAME = 'cornholeTracker';

  private static mongoClient: MongoClient;

  private static db: Db;

  private static async getClient(): Promise<MongoClient> {
    if (!DocumentDb.mongoClient) {
      const mongoDbConnectionString = `mongodb://${config.mongoRootUsername}:${config.mongoRootPassword}@${config.mongoUrl}:${config.mongoPort}`;
      DocumentDb.mongoClient = new MongoClient(mongoDbConnectionString);
      await DocumentDb.mongoClient.connect();
    }
    return DocumentDb.mongoClient;
  }

  static async getCollection<TDocType extends Document>(
    collectionName: string
  ): Promise<Collection<TDocType>> {
    const client = await DocumentDb.getClient();
    if (!DocumentDb.db) {
      DocumentDb.db = client.db(DocumentDb.DB_NAME);
    }
    return DocumentDb.db.collection<TDocType>(collectionName);
  }

  static closeDbConnection(): void {
    if (DocumentDb.mongoClient) {
      DocumentDb.mongoClient.close();
    }
  }
}
