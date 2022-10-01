import type { ObjectId } from 'bson';
import type { Document } from 'mongodb';

/**
 * A base document which other types that will be stored in a document DB can
 * inherit from.
 */
export default interface BaseDocument extends Document {
  _id: ObjectId;
}
