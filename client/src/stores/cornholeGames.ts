import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import CornholeGame from '../_shared/types/CornholeGame';

function createCornholeGamesStore() {
  const { subscribe, set, update } = writable<CornholeGame[]>(LocalData.cornholeGames);

  return {
    subscribe,
    set,
    update
  };
}

export const cornholeGames = createCornholeGamesStore();
