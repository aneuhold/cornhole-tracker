import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import type CornholeGame from '../_shared/types/CornholeGame';

function createCornholeGamesStore() {
  const { subscribe, set, update } = writable<CornholeGame[]>(LocalData.cornholeGames);

  return {
    subscribe,
    set: (updatedCornholeGames: CornholeGame[]) => {
      set(updatedCornholeGames);
      LocalData.cornholeGames = updatedCornholeGames;
    },
    update
  };
}

export const cornholeGames = createCornholeGamesStore();
