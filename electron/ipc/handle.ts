import type { ArgsOf, DropChannel, EventChannel, InvokeChannel, PayloadOf, ResultOf } from "../../shared/ipc";

export type Check<T> = (x: unknown, at: string) => T;            // throws IpcArgError
/** Checks the channel kind, rejects senders other than the main window's top frame, validates, logs and re-throws as Error(message). */
export function handle<C extends InvokeChannel>(
  _channel: C, _validate: (args: unknown[]) => ArgsOf<C>,
  _fn: (...args: ArgsOf<C>) => ResultOf<C> | Promise<ResultOf<C>>): void { throw new Error("todo"); }
/** Paths arrive already resolved by the preload; handleDrop re-checks: string[] <= 32, absolute, existing regular files. */
export function handleDrop<C extends DropChannel>(_channel: C, _fn: (paths: string[]) => Promise<ResultOf<C>>): void {
  throw new Error("todo");
}
export function emit<E extends EventChannel>(_event: E, ..._payload: PayloadOf<E> extends void ? [] : [PayloadOf<E>]): void {
  throw new Error("todo");
}
