import { useSyncExternalStore } from "react";

export type CharacterPhase = "run" | "skid" | "tada";

/** Valeurs lues chaque frame par la scène 3D (pas de re-render). */
export const motionState = {
  progress: 0,
  velocity: 0,
};

type UiState = { index: number; phase: CharacterPhase };

let snapshot: UiState = { index: 0, phase: "tada" };
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function setUiState(patch: Partial<UiState>) {
  const next = { ...snapshot, ...patch };
  if (next.index === snapshot.index && next.phase === snapshot.phase) return;
  snapshot = next;
  listeners.forEach((l) => l());
}

export function useScrollUi(): UiState {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => snapshot,
  );
}
