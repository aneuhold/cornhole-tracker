import { ObjectId } from 'bson';
import type Player from './Player';

/**
 * A person that a user has created that isn't linked to a person with a
 * registered account in the database. Either because the user is offline,
 * or because the tempPlayer hasn't created an account yet.
 *
 * These should be deleted if they get synced to someone.
 *
 * There can be multiple of these for the same userName.
 */
export default class TempPlayer implements Player {
  _id = new ObjectId();

  name?: string;

  /**
   * This is the target userName for the player, as it can't be checked for
   * uniquness (if the device is offline), this is a target, as it can be
   * synced later if it matches someone in the DB when they re-connect.
   */
  userName: string;

  /**
   * Constructs a new {@link TempPlayer} with default values.
   */
  constructor(userName: string) {
    this.userName = userName;
  }
}
