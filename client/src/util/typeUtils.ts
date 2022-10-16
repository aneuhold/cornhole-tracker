import type { SvelteComponentTyped } from 'svelte';

/**
 * Creates an object that is typed without type widening of the key for each
 * key value pair, but with a defined type for each value.
 *
 * This was found at {@link https://stackoverflow.com/questions/70956050/how-do-i-declare-object-value-type-without-declaring-key-type this stack overflow post}.
 */
export const satisfiesRecord =
  <T>() =>
  <K extends PropertyKey>(rec: Record<K, T>) =>
    rec;

export type ComponentProps<T> = T extends SvelteComponentTyped<infer P, never, never> ? P : never;
export type ComponentEvents<T> = T extends SvelteComponentTyped<never, infer E, never> ? E : never;
export type ComponentSlots<T> = T extends SvelteComponentTyped<never, never, infer S> ? S : never;
