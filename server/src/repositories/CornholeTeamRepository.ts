import CornholeTeam from 'shared/types/CornholeTeam';
import CornholeTeamValidator from 'src/validators/CornholeTeamValidator';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link CornholeTeam} documents.
 */
export default class CornholeTeamRepository extends BaseRepository<CornholeTeam> {
  private static COLLECTION_NAME = 'cornholeTeams';

  private static singletonInstance: CornholeTeamRepository;

  private constructor() {
    super(CornholeTeamRepository.COLLECTION_NAME, new CornholeTeamValidator());
  }

  /**
   * Gets the singleton instance of the {@link CornholeTeamRepository}.
   */
  public static getRepo() {
    if (!CornholeTeamRepository.singletonInstance) {
      CornholeTeamRepository.singletonInstance = new CornholeTeamRepository();
    }
    return CornholeTeamRepository.singletonInstance;
  }
}
