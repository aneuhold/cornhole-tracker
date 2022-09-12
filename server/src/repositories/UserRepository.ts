import { Collection, InsertOneResult } from 'mongodb';
import User from 'shared/types/User';
import DocumentDb from 'src/util/DocumentDb';
import UserDocument from './documentTypes/UserDocument';

/**
 * The repository that contains {@link User} documents.
 */
export default class UserRepository {
  private static COLLECTION_NAME = 'users';

  private static userCollection: Collection<UserDocument>;

  private static async getCollection() {
    if (!this.userCollection) {
      this.userCollection = await DocumentDb.getCollection<UserDocument>(
        this.COLLECTION_NAME
      );
    }
    return this.userCollection;
  }

  static async insertNewUser(newUser: User): Promise<InsertOneResult> {
    const collection = await this.getCollection();
    const insertResult = await collection.insertOne(newUser);
    return insertResult;
  }
}
