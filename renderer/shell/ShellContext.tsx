import type { Route, RouterAction } from "./router";
import type { ToastAction, ToastKind } from "../components/common/Toast";

export type SaveState = "saved" | "saving" | "unsaved" | "error";
export interface TitleInfo { count?: string; saveState?: SaveState }      // count: "12 notes"
export interface ConfirmOptions { title: string; body?: string; confirmLabel: string; cancelLabel?: string; danger?: boolean }
export interface ShellApi {
  route: Route;
  sheet: { index: number; total: number } | null;     // null on home and settings
  navigate(action: RouterAction): void;
  toast(kind: ToastKind, message: string, action?: ToastAction): void;
  confirm(o: ConfirmOptions): Promise<boolean>;
}
// Stubs until builder D provides the context.
export function useShell(): ShellApi { throw new Error("todo"); }
export function useTitleInfo(_info: TitleInfo): void { throw new Error("todo"); }                 // set while mounted, cleared on unmount
export function useCommandHandlers(_handlers: Record<string, () => void>): void { throw new Error("todo"); }
export function useNavigationGuard(_message: string | null): void { throw new Error("todo"); }    // also sets window:set-guard
