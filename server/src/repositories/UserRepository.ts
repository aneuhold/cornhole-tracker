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

  static async getAllUsers() {
    const collection = await this.getCollection();
    const cursor = collection.find();
    return cursor.toArray();
  }

  static async deleteUser(userId: UUID) {
    const collection = await this.getCollection();
    return collection.deleteOne({ id: userId });
  }

  /**
   * This should not be used except for testing purposes
   */
  static async deleteAllUsers() {
    const collection = await this.getCollection();
    return collection.deleteMany({});
  }
}
