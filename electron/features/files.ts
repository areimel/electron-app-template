import type { FileFilter } from "electron";
import type { OpenedFile } from "../../shared/ipc/editor";

// The only place that turns a path into a handle.
export function pickOpenFile(_o: { title: string; filters: FileFilter[] }): Promise<string | null> { throw new Error("todo"); }
export function pickSaveFile(_o: { title: string; defaultName: string; filters: FileFilter[] }): Promise<string | null> { throw new Error("todo"); }
export function readTextFile(_path: string, _maxBytes: number): string { throw new Error("todo"); }   // throws "Too large" / "Not a text file"
export function writeTextFile(_path: string, _text: string): void { throw new Error("todo"); }        // temp + rename
export function fileHandle(_path: string): string { throw new Error("todo"); }
export function pathOf(_fileId: string): string | null { throw new Error("todo"); }
export function openTextFile(_path: string): OpenedFile { throw new Error("todo"); }                  // .md .markdown .txt, 2 MB; adds a recent
export function queueLaunchFile(_path: string): void { throw new Error("todo"); }                     // launch arg / second instance
export function takePendingFile(): OpenedFile | null { throw new Error("todo"); }
