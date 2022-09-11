import { Document } from 'mongodb';
import User from 'shared/types/User';

export default interface UserDocument extends User, Document {}
