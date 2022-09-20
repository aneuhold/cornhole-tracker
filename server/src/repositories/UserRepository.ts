import { InsertOneResult } from 'mongodb';
import User from 'shared/types/User';
import UserValidator from 'src/validators/UserValidator';
import CornholeTeam from 'src/_shared/types/CornholeTeam';
import BaseRepository from './BaseRepository';
import CornholeTeamRepository from './CornholeTeamRepository';

/**
 * The repository that contains {@link User} documents.
 */
export default class UserRepository extends BaseRepository<User> {
  private static COLLECTION_NAME = 'users';

  private static singletonInstance: UserRepository;

  private static teamRepo = CornholeTeamRepository.getRepo();

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
   * user's {@link User.currentTeamsIncludingUser}.
   *
   * @override
   */
  async insertNew(newUser: User): Promise<InsertOneResult> {
    const { teamRepo } = UserRepository;
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
    return super.insertNew(newUser);
  }
}
