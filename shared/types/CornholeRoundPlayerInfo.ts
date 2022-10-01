import type { ObjectId } from 'bson';

/**
 * Player info for a `CornholeRound`. This should only be used in the context
 * of a `CornholeRound`.
 */
export class CornholeRoundPlayerInfo {
  id: ObjectId;

  score: number;

  constructor(playerId: ObjectId, score: number) {
    this.id = playerId;
    if (score < 0 || score > 12) {
      throw new Error(
        `Players can only score from 0 to 12 points in a round. Points provided were ${score}`
      );
    }
    this.score = score;
  }
}
