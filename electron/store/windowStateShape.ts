export interface Rect { x: number; y: number; width: number; height: number }
export interface WindowState { bounds: Rect | null; maximized: boolean }
export function healWindowState(_raw: unknown): WindowState { throw new Error("todo"); }
/** Keeps the window on a visible work area; drops x/y when off every display; min 720x480. */
export function fitToDisplays(_s: WindowState, _workAreas: Rect[]): WindowState { throw new Error("todo"); }
