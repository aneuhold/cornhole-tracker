import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import type CornholeTeam from '../_shared/types/CornholeTeam';

function createCornholeTeamsStore() {
  const { subscribe, set, update } = writable<CornholeTeam[]>(LocalData.cornholeTeams);

  return {
    subscribe,
    set: (updatedCornholeTeams: CornholeTeam[]) => {
      set(updatedCornholeTeams);
      LocalData.cornholeTeams = updatedCornholeTeams;
    },
    update
  };
}

export const cornholeTeams = createCornholeTeamsStore();
