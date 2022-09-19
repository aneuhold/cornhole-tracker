import CornholeTeam from 'shared/types/CornholeTeam';
import { throwError } from 'shared/utils/errorUtils';
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
    if (teamInDb === null) {
      throwError(
        `Team with ID: ${teamToUpdate._id} does not exist in the database.`,
        teamToUpdate
      );
    }

    // If updated players, check that they exist in the DB
    if (teamToUpdate.players) {
      const userRepo = UserRepository.getRepo();
      const tempPlayerRepo = TempPlayerRepository.getRepo();
      const userPromise = userRepo.getList(teamToUpdate.players);
      const tempPlayerPromise = tempPlayerRepo.getList(teamToUpdate.players);
      const result = await Promise.all([userPromise, tempPlayerPromise]);
      const matchedPlayers = [...result[0], ...result[1]];
      if (matchedPlayers.length !== teamToUpdate.players.length) {
        throwError(
          `1 or 2 of the players provided do not exist in the database`,
          teamToUpdate
        );
      }
    }
  }
}
