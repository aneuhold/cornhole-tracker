import type TempPlayer from 'src/_shared/types/TempPlayer';
import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';

function createTempPlayersStore() {
  const { subscribe, set, update } = writable<Partial<TempPlayer>[]>(LocalData.tempPlayers);

  return {
    subscribe,
    set: (updatedTempPlayers: TempPlayer[]) => {
      set(updatedTempPlayers);
      LocalData.tempPlayers = updatedTempPlayers;
    },
    update
  };
}

/**
 * The store for information on tempPlayers. This makes accessing them offline
 * possible.
 */
export const tempPlayers = createTempPlayersStore();
