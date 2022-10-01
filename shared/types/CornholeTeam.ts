import { ObjectId } from 'bson';
import type BaseDocument from './BaseDocument';

/**
 * A grouping of players that may play over a span of `CornholeGame`s, or
 * possibly for only one `CornholeGame`. It is supposed to only contain
 * information on the players and possibly the color of the team, but no stats.
 *
 * Only the owner (the creator of the team) and the team members themselves
 * can change the name of the team or the color.
 */
export default class CornholeTeam implements BaseDocument {
  _id = new ObjectId();

  /**
   * The team name. This is required so that it can be represented to the user
   * in some way. If there is a way to identify teams without this, then it
   * can be made optional in the future.
   */
  name: string;

  /**
   * Contains the information on the players for the team. This is where
   * temporary players can be entered if internet is not available or the
   * new player doesn't have an account.
   */
  players: ObjectId[];

  /**
   * A CSS compatible color. This needs to be able to change. It can only be
   * checked if it is valid on the frontend though.
   *
   * This should be checked on the frontend perhaps so that the other team
   * has a different color than the first. It should default to red and blue.
   */
  color = 'blue';

  owner: ObjectId;

  /**
   * `isArchived` means that the team will not be shown to other users when
   * trying to create new games, but will still be available for stats purposes.
   *
   * If a user tries to create a new team with the same players in it as an
   * existing one, it will bring this team back. That way stats can stay
   * consistent for particular users.
   */
  isArchived = false;

  /**
   * Constructs a new {@link CornholeTeam} with default values. If the number
   * of players is not equal to 1 or 2, it will throw an error.
   */
  constructor(teamName: string, players: ObjectId[], owner: ObjectId) {
    if (players.length !== 1 && players.length !== 2) {
      throw new Error(
        `Number of cornhole players must be 1 or 2. Number provided: ${players.length}`
      );
    }
    this.name = teamName;
    this.players = players;
    this.owner = owner;
  }
}
