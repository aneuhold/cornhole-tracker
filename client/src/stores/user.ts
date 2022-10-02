import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import User from '../_shared/types/User';

function createUserStore() {
  const { subscribe, set, update } = writable<Partial<User>>(LocalData.user);

  return {
    subscribe,
    set,
    update
  };
}

export const user = createUserStore();
