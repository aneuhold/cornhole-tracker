import TempPlayer from 'shared/types/TempPlayer';
import TempPlayerValidator from 'src/validators/TempPlayerValidator';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link TempPlayer} documents.
 */
export default class TempPlayerRepository extends BaseRepository<TempPlayer> {
  private static COLLECTION_NAME = 'tempPlayers';

  private static singletonInstance: TempPlayerRepository;

  private constructor() {
    super(TempPlayerRepository.COLLECTION_NAME, new TempPlayerValidator());
  }

  /**
   * Gets the singleton instance of the {@link TempPlayerRepository}.
   */
  public static getRepo() {
    if (!TempPlayerRepository.singletonInstance) {
      TempPlayerRepository.singletonInstance = new TempPlayerRepository();
    }
    return TempPlayerRepository.singletonInstance;
  }
}
