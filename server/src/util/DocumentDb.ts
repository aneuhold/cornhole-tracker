import { Collection, Db, Document, MongoClient } from 'mongodb';
import config from './config';

export default class DocumentDb {
  private static DB_NAME = 'cornholeTracker';

  private static mongoClient: MongoClient;

  private static db: Db;

  private static async getClient(): Promise<MongoClient> {
    if (!this.mongoClient) {
      const mongoDbConnectionString = `mongodb://${config.mongoRootUsername}:${config.mongoRootPassword}@${config.mongoUrl}:${config.mongoPort}`;
      this.mongoClient = new MongoClient(mongoDbConnectionString);
    }
    // Connecting every time is evidently the correct way to do it. This is
    // because it will not do anything and just return if it is already
    // connected.
    await this.mongoClient.connect();
    return this.mongoClient;
  }

  static async getCollection<TDocType extends Document>(
    collectionName: string
  ): Promise<Collection<TDocType>> {
    const client = await this.getClient();
    if (!this.db) {
      DocumentDb.db = client.db(DocumentDb.DB_NAME);
    }
    return DocumentDb.db.collection<TDocType>(collectionName);
  }

  static async closeDbConnection(): Promise<void> {
    if (DocumentDb.mongoClient) {
      await DocumentDb.mongoClient.close();
      console.log('MongoDB connection successfully closed...');
    }
    console.log('Connection close was attempted but no client existed');
  }
}
