import { UUID } from 'bson';
import { Document } from 'mongodb';
import BaseRepository from 'src/repositories/BaseRepository';
import { Controller } from 'tsoa';

export default class BaseDocumentController<
  TBaseType extends Document
> extends Controller {
  /**
   * A generic get implementation that can be used for other controllers.
   */
  protected async baseGet(
    repo: BaseRepository<TBaseType>,
    docId: UUID
  ): Promise<TBaseType | null> {
    const doc = repo.get(docId);
    if (doc) {
      return doc;
    }
    this.setStatus(400);
    return doc;
  }
}
