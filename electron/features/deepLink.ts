import type { DeepLink } from "../../shared/ipc/app";

export { parseDeepLink } from "./deepLinkParse";
/** setAsDefaultProtocolClient, open-url, argv. */
export function registerDeepLinks(_onLink: (l: DeepLink) => void): void { throw new Error("todo"); }
