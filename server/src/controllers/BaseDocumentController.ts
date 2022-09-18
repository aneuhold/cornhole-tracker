import { ObjectId } from 'bson';
import { DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';
import BaseRepository from 'src/repositories/BaseRepository';
import BaseDocument from 'src/_shared/types/BaseDocument';
import { Controller } from 'tsoa';

export default abstract class BaseDocumentController<
  TBaseType extends BaseDocument
> extends Controller {
  /**
   * A generic get implementation that can be used for other controllers.
   */
  protected async baseGet(
    repo: BaseRepository<TBaseType>,
    filter: Partial<TBaseType>
  ): Promise<TBaseType | null> {
    const doc = repo.get(filter);
    if (doc) {
      return doc;
    }
    this.setStatus(400);
    return doc;
  }

  protected async baseDelete(repo: BaseRepository<TBaseType>, docId: ObjectId) {
    const result = await repo.delete(docId);
    if (result.acknowledged && result.deletedCount >= 1) {
      this.setStatus(204);
    } else {
      this.setStatus(400);
    }
    return result;
  }

  protected async baseUpdate(repo: BaseRepository<TBaseType>, doc: TBaseType) {
    const response = await repo.update(doc);
    if (response.acknowledged) {
      this.setStatus(200);
    } else {
      this.setStatus(400);
    }
    return response;
  }

  abstract get(docId: ObjectId): Promise<TBaseType | null>;

  abstract getAll(): Promise<TBaseType[]>;

  abstract delete(docId: ObjectId): Promise<DeleteResult>;

  abstract update(doc: TBaseType): Promise<UpdateResult>;

  abstract create(doc: TBaseType): Promise<InsertOneResult>;
}
