import { UpdateResult } from 'mongodb';
import CornholeGameValidator from 'src/validators/CornholeGameValidator';
import CornholeGame from 'shared/types/CornholeGame';
import BaseRepository from './BaseRepository';

/**
 * The repository that contains {@link User} documents.
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

  /**
   * Updates the provided game in the DB.
   *
   * This cleans the following because they can't be updated:
   * - owner
   *
   * @override
   */
  async update(updatedGame: Partial<CornholeGame>): Promise<UpdateResult> {
    const cleanedGame = { ...updatedGame };
    delete cleanedGame.owner;
    return super.update(cleanedGame);
  }
}
