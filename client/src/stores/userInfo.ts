import { writable } from 'svelte/store';
import User from '../_shared/types/User';

function createUserInfo() {
  const { subscribe, set, update } = writable<User>();

  return {
    subscribe,
    increment: () => update((n) => n + 1),
    decrement: () => update((n) => n - 1),
    reset: () => set(0)
  };
}

export const count = createUserInfo();
