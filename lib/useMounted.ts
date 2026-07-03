import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns false during SSR and the first (hydration) render, then true after
 * mount — without calling setState inside an effect. Lets components render a
 * neutral, hydration-safe default on the server and switch to client-only,
 * date-dependent output after mount.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
