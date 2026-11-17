import type { DeepLink } from "../../shared/ipc/app";

// app-template://home | app-template://settings | app-template://open/<appId>[/<recordId>]
export function parseDeepLink(_url: string): DeepLink | null { throw new Error("todo"); }
