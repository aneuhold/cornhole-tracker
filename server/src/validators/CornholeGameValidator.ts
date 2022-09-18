import CornholeGame from 'shared/types/CornholeGame';
import { throwError, throwErrorList } from 'shared/utils/errorUtils';
import CornholeGameRepository from 'src/repositories/CornholeGameRepository';
import CornholeTeamRepository from 'src/repositories/CornholeTeamRepository';
import UserRepository from 'src/repositories/UserRepository';
import IValidator from './BaseValidator';

/**
 * Validates {@link CornholeGame}s. Some validation is done in object creation,
 * so only things that aren't done there are done here.
 */
export default class CornholeGameValidator extends IValidator<CornholeGame> {
  async validateNewObject(newGame: CornholeGame): Promise<void> {
    let errorList: string[] = [];

    // Check if the owner exists
    const userRepo = UserRepository.getRepo();
    const ownerResult = await userRepo.get({ _id: newGame.owner });
    if (!ownerResult) {
      errorList.push(`Owner with ID: ${newGame.owner} does not exist.`);
    }
    errorList = await this.validateStandardGameRules(newGame, errorList);
    if (errorList.length > 0) {
      throwErrorList(errorList, newGame);
    }
  }

  async validateUpdateObject(
    gameToUpdate: Partial<CornholeGame>
  ): Promise<void> {
    // Check if an id is defined
    if (!gameToUpdate._id) {
      throwError(`No _id defined for game to update.`, gameToUpdate);
    }

    // Check that the game exists
    const gameRepo = CornholeGameRepository.getRepo();
    const gameInDb = await gameRepo.get({ _id: gameToUpdate._id });
    if (gameInDb === null) {
      throwError(
        `Game with ID: ${gameToUpdate._id} does not exist in the database.`,
        gameToUpdate
      );
      return; // Tell TypeScript that gameInDb is not null
    }

    // Merge the properties so they can be checked together
    const mergedGame = Object.assign(gameInDb, gameToUpdate);

    let errorList: string[] = [];
    errorList = await this.validateStandardGameRules(mergedGame, errorList);
    if (errorList.length > 0) {
      throwErrorList(errorList, mergedGame);
    }
  }

  /**
   * Validates standard game rules and adds to the error list. It then returns
   * that error list.
   */
  private async validateStandardGameRules(
    game: CornholeGame,
    errorList: string[]
  ): Promise<string[]> {
    // Make sure the points to win are 1 or higher.
    if (game.pointsToWin < 1) {
      errorList.push(
        `pointsToWin must be 1 or higher. points currently set to ${game.pointsToWin}.`
      );
    }

    // Check if the teams exist in the DB
    const teamRepo = CornholeTeamRepository.getRepo();
    const teamsResult = await teamRepo.getList(game.teams);
    let teamsAlignWithDb = true;
    if (teamsResult.length !== game.teams.length) {
      teamsAlignWithDb = false;
      errorList.push(
        `The number of teams found with the number of IDs in the teams attribute did not match.`
      );
    }

    // Check if fourPlayerPoisitioning is defined if the number of teams is 2
    if (
      teamsAlignWithDb &&
      game.teams.length === 2 &&
      !game.fourPlayerPositioning
    ) {
      errorList.push(
        `The number of teams was 2 but fourPlayerPositioning was not defined`
      );

      // Don't continue validation further
      return errorList;
    }

    // Check that the number of people identified in fourPlayerPositioning is
    // correct.
    if (
      game.fourPlayerPositioning &&
      (game.fourPlayerPositioning.board1Players.length !== 2 ||
        game.fourPlayerPositioning.board2Players.length !== 2)
    ) {
      errorList.push(
        `fourPlayerPositioning was defined but the number of players in board1Players or board2Players was not 2`
      );

      // Don't continue validation further
      return errorList;
    }

    // Check that the teams include the players defined in fourPlayerPositioning
    if (game.fourPlayerPositioning) {
      const teamPlayers = [
        ...teamsResult[0].players.map((id) => id.toHexString()),
        ...teamsResult[1].players.map((id) => id.toHexString())
      ];
      const playerPositioningPlayers = [
        ...game.fourPlayerPositioning.board1Players.map((id) =>
          id.toHexString()
        ),
        ...game.fourPlayerPositioning.board2Players.map((id) =>
          id.toHexString()
        )
      ];
      if (
        !this.checkAllElementsExistInArr(teamPlayers, playerPositioningPlayers)
      ) {
        errorList.push(
          `Players in the teams do not match the players defined in fourPlayerPositioning. Players defined in teams are ${teamPlayers}.`
        );
      }
    }

    // Maybe validate rounds?

    return errorList;
  }
}
