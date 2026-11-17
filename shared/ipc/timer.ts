import { event, invoke } from "./define";

export interface TimerState { status: "idle" | "running" | "paused" | "done"; label: string;
  durationMs: number; remainingMs: number; endsAt: number | null }   // remaining = endsAt - now while running

export const timerIpc = {
  "timer:get": invoke<[], TimerState>(),
  "timer:start": invoke<[{ minutes: number; label: string }], TimerState>(),
  "timer:pause": invoke<[], TimerState>(),
  "timer:resume": invoke<[], TimerState>(),
  "timer:reset": invoke<[], TimerState>(),
  "timer:changed": event<TimerState>(),
} as const;
