import { ObjectId } from 'bson';
import { InsertOneResult } from 'mongodb';
import TempPlayer from 'shared/types/TempPlayer';
import TempPlayerRepository from 'src/repositories/TempPlayerRepository';
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
 * Handles operations related to {@link TempPlayer}s.
 */
@Route('tempplayers')
@Tags('TempPlayers')
export class TempPlayerController extends BaseDocumentController<TempPlayer> {
  private tempPlayerRepo = TempPlayerRepository.getRepo();

  /**
   * @summary Gets the temp player with the provided ID.
   */
  @Get('{playerId}')
  @SuccessResponse('200')
  public async get(@Path() playerId: ObjectId): Promise<TempPlayer | null> {
    return this.baseGet(this.tempPlayerRepo, { _id: playerId });
  }

  /**
   * @summary Gets all temp players.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAll(): Promise<TempPlayer[]> {
    return this.tempPlayerRepo.getAll();
  }

  /**
   * @summary Gets a list of players with the provided IDs.
   */
  @Post('/list')
  @SuccessResponse('200')
  getList(@Body() playerIds: ObjectId[]): Promise<TempPlayer[]> {
    return this.tempPlayerRepo.getList(playerIds);
  }

  /**
   * @summary Deletes a player.
   */
  @Delete('{playerId}')
  @SuccessResponse('204')
  public async delete(@Path() playerId: ObjectId) {
    return this.baseDelete(this.tempPlayerRepo, playerId);
  }

  /**
   * @summary Updates the provided player with any new values.
   */
  @SuccessResponse('200')
  @Patch('/')
  public async update(@Body() player: TempPlayer) {
    return this.baseUpdate(this.tempPlayerRepo, player);
  }

  /**
   * @summary Creates a new player with the properties defined in the body.
   */
  @SuccessResponse('204')
  @Post('/')
  create(@Body() player: TempPlayer): Promise<InsertOneResult<TempPlayer>> {
    return this.tempPlayerRepo.insertNew(player);
  }
}
