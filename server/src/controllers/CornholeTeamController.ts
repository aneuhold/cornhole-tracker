import { ObjectId } from 'bson';
import { InsertOneResult } from 'mongodb';
import CornholeTeam from 'shared/types/CornholeTeam';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
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
 * Handles operations related to {@link CornholeTeam}s.
 */
@Route('cornholeteams')
@Tags('CornholeTeams')
export class CornholeTeamController extends BaseDocumentController<CornholeTeam> {
  private cornholeTeamRepo = CornholeTeamRepository.getRepo();

  /**
   * @summary Gets the team with the provided ID.
   */
  @Get('{teamId}')
  @SuccessResponse('200')
  public async get(@Path() teamId: ObjectId): Promise<CornholeTeam | null> {
    return this.baseGet(this.cornholeTeamRepo, { _id: teamId });
  }

  /**
   * @summary Gets all teams.
   */
  @Get('/')
  @SuccessResponse('200')
  public async getAll(): Promise<CornholeTeam[]> {
    return this.cornholeTeamRepo.getAll();
  }

  /**
   * @summary Gets a list of teams with the provided IDs.
   */
  @Post('/list')
  @SuccessResponse('200')
  getList(@Body() teamIds: ObjectId[]): Promise<CornholeTeam[]> {
    return this.cornholeTeamRepo.getList(teamIds);
  }

  /**
   * @summary Deletes a team.
   */
  @Delete('{teamId}')
  @SuccessResponse('204')
  public async delete(@Path() teamId: ObjectId) {
    return this.baseDelete(this.cornholeTeamRepo, teamId);
  }

  /**
   * @summary Updates the provided team with any new values.
   */
  @SuccessResponse('200')
  @Patch('/')
  public async update(@Body() team: CornholeTeam) {
    return this.baseUpdate(this.cornholeTeamRepo, team);
  }

  /**
   * @summary Creates a new team with the properties defined in the body.
   */
  @SuccessResponse('204')
  @Post('/')
  create(@Body() team: CornholeTeam): Promise<InsertOneResult<CornholeTeam>> {
    return this.cornholeTeamRepo.insertNew(team);
  }
}
