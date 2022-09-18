import CornholeTeam from 'shared/types/CornholeTeam';
import { throwError } from 'shared/utils/errorUtils';
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

  async validateUpdateObject(teamToUpdate: CornholeTeam): Promise<void> {}
}
