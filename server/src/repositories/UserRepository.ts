import { InsertOneResult } from 'mongodb';
import User from 'shared/types/User';
import UserValidator from 'src/validators/UserValidator';
import CornholeTeam from 'shared/types/CornholeTeam';
import BaseRepository from './BaseRepository';
import CornholeTeamRepository from './CornholeTeamRepository';

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

  /**
   * Inserts a new user.
   *
   * This will add the default team that consists of just the user if it
   * doesn't already exist. If it does exist, it will add that team to the
   * user's {@link User.currentTeamsIncludingUser} array.
   *
   * @override
   */
  async insertNew(newUser: User): Promise<InsertOneResult> {
    // Insert the new user first
    const insertResult = await super.insertNew(newUser);

    // Create or add the single user team
    const teamRepo = CornholeTeamRepository.getRepo();
    const teamResult = await teamRepo.getTeamIncludingPlayers([newUser._id]);
    if (teamResult) {
      newUser.currentTeamsIncludingUser.push(teamResult._id);
    } else {
      const newTeam = new CornholeTeam(
        `Team ${newUser.userName}`,
        [newUser._id],
        newUser._id
      );
      await teamRepo.insertNew(newTeam);
      newUser.currentTeamsIncludingUser.push(newTeam._id);
    }

    await super.update(newUser);

    // Return the initial insert result
    return insertResult;
  }
}
