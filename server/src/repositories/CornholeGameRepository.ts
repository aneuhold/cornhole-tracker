import CornholeGameValidator from 'src/validators/CornholeGameValidator';
import CornholeGame from 'src/_shared/types/CornholeGame';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link User} documents.
 *
 * This can not be offered as a singleton in this class because
 */
export default class CornholeGameRepository extends BaseRepository<CornholeGame> {
  private static COLLECTION_NAME = 'cornholeGames';

  private static singletonInstance: CornholeGameRepository;

  private constructor() {
    super(CornholeGameRepository.COLLECTION_NAME, new CornholeGameValidator());
  }

  /**
   * Gets the singleton instance of the {@link CornholeGameRepository}.
   */
  public static getRepo() {
    if (!CornholeGameRepository.singletonInstance) {
      CornholeGameRepository.singletonInstance = new CornholeGameRepository();
    }
    return CornholeGameRepository.singletonInstance;
  }
}
