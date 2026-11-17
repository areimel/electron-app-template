import { MAX_LABEL, MAX_MINUTES, MIN_MINUTES } from "../../shared/ipc/timer";
import { dispatchTimer, getTimer, registerTimerLifecycle } from "../features/timer";
import { handle, type Check } from "./handle";
import { IpcArgError, v } from "./validate";

const minutes = v.int(MIN_MINUTES, MAX_MINUTES);
const label = v.string({ max: MAX_LABEL });

/** The one object argument: { minutes, label }. */
const startArgs: Check<{ minutes: number; label: string }> = (x, at) => {
  if (typeof x !== "object" || x === null) throw new IpcArgError(at, "an object with minutes and label");
  const o = x as Record<string, unknown>;
  return { minutes: minutes(o.minutes, `${at}.minutes`), label: label(o.label, `${at}.label`) };
};

export function register(): void {
  handle("timer:get", v.none, () => getTimer());
  handle("timer:start", v.args(startArgs), (o) => dispatchTimer({ type: "start", ...o }));
  handle("timer:pause", v.none, () => dispatchTimer({ type: "pause" }));
  handle("timer:resume", v.none, () => dispatchTimer({ type: "resume" }));
  handle("timer:reset", v.none, () => dispatchTimer({ type: "reset" }));
  registerTimerLifecycle();
}
