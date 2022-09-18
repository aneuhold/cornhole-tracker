import User from 'shared/types/User';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link User} documents.
 *
 * This can not be offered as a singleton in this class because
 */
export default class UserRepository extends BaseRepository<User> {
  private static COLLECTION_NAME = 'users';

  private static singletonInstance: UserRepository;

  private constructor() {
    super(UserRepository.COLLECTION_NAME);
  }

  public static getRepo() {
    if (!UserRepository.singletonInstance) {
      UserRepository.singletonInstance = new UserRepository();
    }
    return UserRepository.singletonInstance;
  }
}
