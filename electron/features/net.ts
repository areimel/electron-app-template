export const NET_HOSTS = ["hacker-news.firebaseio.com"] as const;
export class NetError extends Error {
  constructor(public kind: "offline" | "timeout" | "http" | "blocked" | "parse", message?: string) { super(message ?? kind); }
}
/** https and host in NET_HOSTS; pure, tested. */
export function isAllowedUrl(_url: string): boolean { throw new Error("todo"); }
/** net.fetch, 10 s default. */
export function fetchJson<T>(_url: string, _heal: (raw: unknown) => T, _o?: { timeoutMs?: number }): Promise<T> {
  throw new Error("todo");
}
