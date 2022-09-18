import User from 'shared/types/User';
import UserValidator from 'src/validators/UserValidator';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link User} documents.
 */
export default class UserRepository extends BaseRepository<User> {
  private static COLLECTION_NAME = 'users';

  private static singletonInstance: UserRepository;

  private constructor() {
    super(UserRepository.COLLECTION_NAME, new UserValidator());
  }

  /**
   * Gets the singleton instance of the {@link UserRepository}.
   */
  public static getRepo() {
    if (!UserRepository.singletonInstance) {
      UserRepository.singletonInstance = new UserRepository();
    }
    return UserRepository.singletonInstance;
  }
}
