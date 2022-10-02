import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import CornholeTeam from '../_shared/types/CornholeTeam';

function createCornholeTeamsStore() {
  const { subscribe, set, update } = writable<CornholeTeam[]>(LocalData.cornholeTeams);

  return {
    subscribe,
    set,
    update
  };
}

export const cornholeTeams = createCornholeTeamsStore();
