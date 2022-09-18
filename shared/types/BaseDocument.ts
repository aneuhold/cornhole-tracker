import { UUID } from 'bson';
import { Document } from 'mongodb';

/**
 * A base document which other types that will be stored in a document DB can
 * inherit from.
 */
export default interface BaseDocument extends Document {
  _id: UUID;
}
