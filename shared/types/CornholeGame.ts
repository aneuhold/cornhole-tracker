import { ObjectId } from 'bson';
import { throwErrorList } from '../utils/errorUtils';
import BaseDocument from './BaseDocument';
import { CornholeRound } from './CornholeRound';

/**
 * A session where 2 or 4 players play on 2 teams. If 2 players are playing,
 * then the rounds are always with the same 2 people. If 4 people are
 * playing, then the rounds go back and forth between 2 opposing players on
 * each team.
 *
 * Whoever reaches 21 points first, wins. The points to win are variable
 * though and can change per game.
 *
 * A game does not have to be finished for it to be registered, but a game
 * does have to be finished to calculate stats (Otherwise, if a game ends
 * with an uneven number of rounds, then the stats will be incorrect for
 * the players).
 */
export default class CornholeGame implements BaseDocument {
  _id = new ObjectId();

  teams: ObjectId[];

  gameIsComplete = false;

  rounds: CornholeRound[] = [];

  fourPlayerPositioning?: FourPlayerPositioning;

  /**
   * The user that created the game. Only this user can permenently delete
   * the game, and log scores for it.
   */
  owner: ObjectId;

  /**
   * Creates a new {@link CornholeGame} with default and provided values.
   *
   * If something other than 1 or 2 teams is provided it will throw an error.
   *
   * If `fourPlayerPositioning` is defined and anything but 2
   * players are assigned to `board1Players` and `board2Players`,
   * it will also throw an error.
   */
  constructor(
    teams: ObjectId[],
    owner: ObjectId,
    fourPlayerPositioning?: FourPlayerPositioning
  ) {
    this.validateParameters(teams, fourPlayerPositioning);
    this.teams = teams;
    this.fourPlayerPositioning = fourPlayerPositioning;
    this.owner = owner;
  }

  private validateParameters(
    teams: ObjectId[],
    playerPositioning?: FourPlayerPositioning
  ) {
    const errorList: string[] = [];
    // Validate teams
    if (teams.length !== 1 && teams.length !== 2) {
      errorList.push(
        `There can only be 1 or 2 teams in a CornholeGame. Teams provided: ${teams.length}`
      );
    }
    // Validate playerPositioning
    if (playerPositioning && playerPositioning.board1Players.length !== 2) {
      errorList.push(
        `board1Players must contain 2 players. Currently contains: ${playerPositioning.board1Players.length}`
      );
    }
    if (playerPositioning && playerPositioning.board2Players.length !== 2) {
      errorList.push(
        `board2Players must contain 2 players. Currently contains: ${playerPositioning.board1Players.length}`
      );
    }

    if (errorList.length > 0) {
      throwErrorList(errorList, {
        teams,
        playerPositioning
      });
    }
  }
}

export interface FourPlayerPositioning {
  board1Players: ObjectId[];
  board2Players: ObjectId[];
}
