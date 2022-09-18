import User from 'shared/types/User';
import IValidator from './IValidator';

export default class UserValidator implements IValidator<User> {
  validateAndThrow(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
