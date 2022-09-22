import { ObjectId } from 'bson';
import CornholeGameRepository from 'src/repositories/CornholeGameRepository';
import CornholeGame from 'src/_shared/types/CornholeGame';
import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Route,
  SuccessResponse,
  Tags
} from 'tsoa';
import BaseDocumentController from './BaseDocumentController';

/**
 * Handles operations related to {@link CornholeGame}s.
 */
@Route('cornholegames')
@Tags('CornholeGames')
export class CornholeGameController extends BaseDocumentController<CornholeGame> {
  private cornholeGameRepo = CornholeGameRepository.getRepo();

  /**
   * @summary Gets the game with the provided ID.
   */
  @Get('{gameId}')
  @SuccessResponse('200')
  public async get(@Path() gameId: ObjectId): Promise<CornholeGame | null> {
    return this.baseGet(this.cornholeGameRepo, { _id: gameId });
  }

  /**
   * @summary Gets all games.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAll(): Promise<CornholeGame[]> {
    return this.cornholeGameRepo.getAll();
  }

  /**
   * @summary Gets a list of games with the provided IDs.
   */
  @Post('/list')
  @SuccessResponse('200')
  getList(@Body() gameIds: ObjectId[]): Promise<CornholeGame[]> {
    return this.cornholeGameRepo.getList(gameIds);
  }

  /**
   * @summary Deletes a game.
   */
  @Delete('{gameId}')
  @SuccessResponse('204')
  public async delete(@Path() gameId: ObjectId) {
    return this.baseDelete(this.cornholeGameRepo, gameId);
  }

  /**
   * @summary Updates the provided game with any new values.
   */
  @SuccessResponse('200')
  @Patch('/')
  public async update(@Body() game: CornholeGame) {
    return this.baseUpdate(this.cornholeGameRepo, game);
  }

  /**
   * @summary Creates a new game with the properties defined in the body.
   */
  @SuccessResponse('204')
  @Post('/')
  create(@Body() game: CornholeGame): Promise<CornholeGame | null> {
    return this.cornholeGameRepo.insertNew(game);
  }
}
