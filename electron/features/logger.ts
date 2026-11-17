// userData/logs/main.log, rotates at 1 MB to main.old.log; console in dev
type Log = (scope: string, msg: string, extra?: unknown) => void;
const todo: Log = () => { throw new Error("todo"); };
export const log: { info: Log; warn: Log; error: Log } = { info: todo, warn: todo, error: todo };
