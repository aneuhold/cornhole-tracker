import { UUID } from 'bson';
import {
  Collection,
  DeleteResult,
  Document,
  InsertOneResult,
  UpdateResult
} from 'mongodb';
import DocumentDb from 'src/util/DocumentDb';

/**
 * A base repository that implements a lot of the normal CRUD operations.
 */
export default abstract class BaseRepository<TBasetype extends Document> {
  protected collectionName: string;

  private collection?: Collection;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  protected async getCollection() {
    if (!this.collection) {
      this.collection = await DocumentDb.getCollection(this.collectionName);
    }
    return this.collection;
  }

  async insertNew(newDoc: TBasetype): Promise<InsertOneResult> {
    const collection = await this.getCollection();
    return collection.insertOne(newDoc);
  }

  async get(docId: UUID): Promise<TBasetype | null> {
    const collection = await this.getCollection();
    const result = await collection.findOne({ _id: docId });
    return result as TBasetype | null;
  }

  async getAll(): Promise<TBasetype[]> {
    const collection = await this.getCollection();
    const result = await collection.find().toArray();
    // Set to uknown first because of some weird type things.
    return result as unknown as TBasetype[];
  }

  async delete(docId: UUID): Promise<DeleteResult> {
    const collection = await this.getCollection();
    return collection.deleteOne({ _id: docId });
  }

  /**
   * This should not be used except for testing purposes
   */
  async deleteAll(): Promise<DeleteResult> {
    const collection = await this.getCollection();
    return collection.deleteMany({});
  }

  async update(updatedDoc: TBasetype): Promise<UpdateResult> {
    const collection = await this.getCollection();
    const docId = updatedDoc._id;
    const docWithoutId: Partial<TBasetype> = updatedDoc;
    delete docWithoutId._id;
    return collection.updateOne({ _id: docId }, docWithoutId);
  }
}
