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
    await this.checkIfUserNameExists(userRepo, newUser);
  }

  async validateUpdateObject(userToUpdate: User): Promise<void> {
    // Check to see if the user exists
    const userRepo = UserRepository.getRepo();
    const userInDb = await userRepo.get({ _id: userToUpdate._id });
    if (!userInDb) {
      this.throwValidationError(
        `User with ID: ${userToUpdate._id} does not exist in the database`,
        userToUpdate
      );
    }

    // Check if the username is being updated and, if it is, if it already
    // exists
    if (userInDb?.userName !== userToUpdate.userName) {
      await this.checkIfUserNameExists(userRepo, userToUpdate);
    }
  }

  private async checkIfUserNameExists(userRepo: UserRepository, user: User) {
    const userNameSearchResult = await userRepo.get({
      userName: user.userName
    });
    if (userNameSearchResult) {
      this.throwValidationError('Username already exists', user);
    }
  }
}
