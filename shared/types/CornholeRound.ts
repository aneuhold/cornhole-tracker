import type { CornholeRoundPlayerInfo } from './CornholeRoundPlayerInfo';

/**
 * Represents a single round of cornhole. So 2 people throwing bags.
 *
 * These are defined as player1 and player2 for each round and not something
 * like leftPlayer and rightPlayer because "left" and "right" can get confusing
 * based on who is recording scores (facing the board or facing down the
 * field towards the other board?). The only positioning is based on who is
 * at what board in the `playerPositioning` field in the containing
 * `CornholeGame` class.
 *
 * This should only be used in the context of a `CornholeGame`.
 */
export class CornholeRound {
  player1: CornholeRoundPlayerInfo;

  player2: CornholeRoundPlayerInfo;

  /**
   * Creates a new {@link CornholeRound}.
   */
  constructor(
    player1Info: CornholeRoundPlayerInfo,
    player2Info: CornholeRoundPlayerInfo
  ) {
    this.player1 = player1Info;
    this.player2 = player2Info;
  }
}
