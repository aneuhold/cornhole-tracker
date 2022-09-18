import { ObjectId } from 'bson';

/**
 * Player info for a `CornholeRound`. This should only be used in the context
 * of a `CornholeRound`.
 */
export class CornholeRoundPlayerInfo {
  id: ObjectId;

  score: number;

  constructor(playerId: ObjectId, score: number) {
    this.id = playerId;
    this.score = score;
  }
}
