import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import type User from '../_shared/types/User';

function createUserStore() {
  const { subscribe, set, update } = writable<Partial<User>>(LocalData.user);

  console.log('Initializing user store...');

  return {
    subscribe,
    set: (updatedUser: Partial<User>) => {
      set(updatedUser);
      LocalData.user = updatedUser;
    },
    update
  };
}

export const user = createUserStore();
