import type { DeepLink } from "../../shared/ipc/app";

export type Route = { view: "home" } | { view: "settings" } | { view: "app"; appId: string; recordId: string | null };
export type RouterAction = { type: "home" } | { type: "settings" } | { type: "open"; appId: string; recordId?: string }
  | { type: "deep-link"; link: DeepLink };
/** Pure, tested. Unknown app -> home. */
export function routerReducer(_route: Route, _action: RouterAction, _appIds: readonly string[]): Route { throw new Error("todo"); }
