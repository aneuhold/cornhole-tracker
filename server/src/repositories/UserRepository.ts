import { UUID } from 'bson';
import { Collection } from 'mongodb';
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

  static async insertNewUser(newUser: User) {
    const collection = await this.getCollection();
    return collection.insertOne(newUser);
  }

  static async getUser(userId: UUID) {
    const collection = await this.getCollection();
    return collection.findOne({ id: userId });
  }
}
