import User from 'shared/types/User';
import { throwError } from 'shared/utils/errorUtils';
import UserRepository from 'src/repositories/UserRepository';
import IValidator from './BaseValidator';

export default class UserValidator extends IValidator<User> {
  async validateNewObject(newUser: User): Promise<void> {
    // Check if the username already exists
    const userRepo = UserRepository.getRepo();
    await this.checkIfUserNameExists(userRepo, newUser.userName);
  }

  async validateUpdateObject(userToUpdate: Partial<User>): Promise<void> {
    // Check to see if the user exists
    const userRepo = UserRepository.getRepo();
    const userInDb = await userRepo.get({ _id: userToUpdate._id });
    if (!userInDb) {
      throwError(
        `User with ID: ${userToUpdate._id} does not exist in the database.`,
        userToUpdate
      );
      return;
    }

    // Check if the username is being updated and, if it is, if it already
    // exists
    if (userToUpdate.userName && userInDb.userName !== userToUpdate.userName) {
      await this.checkIfUserNameExists(userRepo, userToUpdate.userName);
    }
  }

  /**
   * Checks if the username exists already and throws an error if it does.
   */
  public async checkIfUserNameExists(
    userRepo: UserRepository,
    userName: string
  ) {
    const userNameSearchResult = await userRepo.get({
      userName
    });
    if (userNameSearchResult) {
      throwError('Username already exists', { userName });
    }
  }
}
