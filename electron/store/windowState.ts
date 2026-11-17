import type { BrowserWindow } from "electron";
import type { WindowState } from "./windowStateShape";

export type { WindowState };
export { fitToDisplays, healWindowState } from "./windowStateShape";
export function loadWindowState(): WindowState { throw new Error("todo"); }              // window-state.json
export function trackWindowState(_win: BrowserWindow): void { throw new Error("todo"); } // saves on resize/move (500 ms debounce) and close
