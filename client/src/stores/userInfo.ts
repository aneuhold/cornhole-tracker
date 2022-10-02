import { writable } from 'svelte/store';
import User from '../_shared/types/User';

function createUserInfo() {
  const { subscribe, set, update } = writable<User>();

  return {
    subscribe,
    set,
    update
  };
}

export const userInfo = createUserInfo();
