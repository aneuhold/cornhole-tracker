import { ObjectId } from 'bson';
import Player from './Player';

/**
 * A standard user of the software. This object contains links to games they
 * have played, but only the ones they want stats calculated on their profile
 */
export default class User implements Player {
  _id = new ObjectId();

  userName: string;

  auth: {
    googleId?: string;
    githubId?: string;
  } = {};

  /**
   * Games the user has approved to count towards their overall profile record.
   */
  approvedGames: string[] = [];

  /**
   * currentTeamsIncludingUser will act in a kind of special way. A solo team
   * will always be an option and shown to the user so they can change their
   * color when they like.
   *
   * The user can archive teams in this list so it doesn't show up as an option to
   * them when creating new games.
   */
  currentTeamsIncludingUser: string[] = [];

  /**
   * Contains teams that the user has created that don't include themself.
   * These will come up as an option when creating a new game.
   */
  currentTeamsNotIncludingUser: string[] = [];

  /**
   * Players that the user has created that aren't linked to an actual user
   * in the database.
   */
  tempPlayers: string[] = [];

  /**
   * False by default, but if set to true, then other people will see their
   * stats and that will be pulled in when calculating them for games that
   * other people create.
   */
  profileIsPublic = false;

  /**
   * If this is true, then the account is essentially deleted, but for
   * scoring purposes in other people's games, the document will stay.
   * Also, if set to true, the username is no longer in use, and can be
   * used by someone else again.
   */
  isArchived = false;

  /**
   * Constructs a new user with default values.
   *
   * This should eventually probably check that the username is unique.
   */
  constructor(userName: string) {
    this.userName = userName;
  }
}
