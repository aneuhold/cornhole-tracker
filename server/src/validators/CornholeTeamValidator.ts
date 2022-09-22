import { ObjectId } from 'bson';
import CornholeTeam from 'shared/types/CornholeTeam';
import { throwError, throwErrorList } from 'shared/utils/errorUtils';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
import TempPlayerRepository from 'src/repositories/TempPlayerRepository';
import UserRepository from 'src/repositories/UserRepository';
import IValidator from './BaseValidator';

/**
 * Validates {@link CornholeTeam}s. Some validation is done in object creation,
 * so only things that aren't done there are done here.
 */
export default class CornholeTeamValidator extends IValidator<CornholeTeam> {
  async validateNewObject(newTeam: CornholeTeam): Promise<void> {
    // Check if the owner exists
    const userRepo = UserRepository.getRepo();
    const ownerResult = await userRepo.get({ _id: newTeam.owner });
    if (!ownerResult) {
      throwError(`Owner with ID: ${newTeam.owner} does not exist.`, newTeam);
    }

    let errorList: string[] = [];

    errorList = await this.validateTeamWithPlayersDoesntExist(
      newTeam.players,
      errorList
    );
    errorList = await this.validatePlayersExist(newTeam.players, errorList);

    if (errorList.length !== 0) {
      throwErrorList(errorList, newTeam);
    }
  }

  async validateUpdateObject(
    teamToUpdate: Partial<CornholeTeam>
  ): Promise<void> {
    // Check if an id is defined
    if (!teamToUpdate._id) {
      throwError(`No _id defined for game to update.`, teamToUpdate);
    }

    // Check that the team exists
    const teamRepo = CornholeTeamRepository.getRepo();
    const teamInDb = await teamRepo.get({ _id: teamToUpdate._id });
    if (!teamInDb) {
      throwError(
        `Team with ID: ${teamToUpdate._id} does not exist in the database.`,
        teamToUpdate
      );
    }

    let errorList: string[] = [];

    if (teamInDb && teamToUpdate.players) {
      const updatedPlayersMatchDbTeamPlayers = this.checkAllElementsExistInArr(
        teamInDb.players.map((x) => x.toHexString()),
        teamToUpdate.players.map((x) => x.toHexString())
      );
      if (!updatedPlayersMatchDbTeamPlayers) {
        errorList = await this.validatePlayersExist(
          teamToUpdate.players,
          errorList
        );
        errorList = await this.validateTeamWithPlayersDoesntExist(
          teamToUpdate.players,
          errorList
        );
      }
    }

    if (errorList.length !== 0) {
      throwErrorList(errorList, teamToUpdate);
    }
  }

  private async validatePlayersExist(players: ObjectId[], errorList: string[]) {
    const userRepo = UserRepository.getRepo();
    const tempPlayerRepo = TempPlayerRepository.getRepo();
    const userPromise = userRepo.getList(players);
    const tempPlayerPromise = tempPlayerRepo.getList(players);
    const result = await Promise.all([userPromise, tempPlayerPromise]);
    const matchedPlayers = [...result[0], ...result[1]];
    if (matchedPlayers.length !== players.length) {
      errorList.push(
        `1 or 2 of the players provided do not exist in the database`
      );
    }
    return errorList;
  }

  private async validateTeamWithPlayersDoesntExist(
    players: ObjectId[],
    errorList: string[]
  ): Promise<string[]> {
    const teamRepo = CornholeTeamRepository.getRepo();
    const teamResult = await teamRepo.getTeamIncludingPlayers(players);
    if (teamResult) {
      errorList.push(
        `The players provided already exist on the team with the ID: ${teamResult._id}`
      );
    }
    return errorList;
  }
}
