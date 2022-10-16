import { writable } from 'svelte/store';
import LocalData from '../util/LocalData';
import type User from '../_shared/types/User';

function createUsersStore() {
  const { subscribe, set, update } = writable<Partial<User>[]>(LocalData.users);

  return {
    subscribe,
    set: (updatedUsers: Partial<User>[]) => {
      set(updatedUsers);
      LocalData.users = updatedUsers;
    },
    update
  };
}

/**
 * The store for information on users. This makes accessing them offline
 * possible.
 */
export const users = createUsersStore();
