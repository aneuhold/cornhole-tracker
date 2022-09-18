import { UUID } from 'bson';
import { DeleteResult, InsertOneResult, UpdateResult } from 'mongodb';

/**
 * A controller interface that all document controllers should implement.
 */
export abstract class IDocumentController<TBaseType> {
  abstract get(docId: UUID): Promise<TBaseType | null>;

  abstract getAll(): Promise<TBaseType[]>;

  abstract delete(docId: UUID): Promise<DeleteResult>;

  abstract update(doc: TBaseType): Promise<UpdateResult>;

  abstract create(doc: TBaseType): Promise<InsertOneResult>;
}
