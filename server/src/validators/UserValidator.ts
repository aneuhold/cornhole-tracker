import User from 'shared/types/User';
import UserRepository from 'src/repositories/UserRepository';
import IValidator from './BaseValidator';

export default class UserValidator extends IValidator<User> {
  async validateNewObject(newUser: User): Promise<void> {
    // Check if it has a username
    if (!newUser.userName) {
      this.throwValidationError(
        'No username provided for creating new user',
        newUser
      );
    }

    // Check if the username already exists
    const userRepo = UserRepository.getRepo();
    const userNameSearchResult = await userRepo.get({
      userName: newUser.userName
    });
    if (userNameSearchResult) {
      this.throwValidationError('Username already exists', newUser);
    }
  }
}
