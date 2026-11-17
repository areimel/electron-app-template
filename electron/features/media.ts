import type { MediaFile } from "../../shared/ipc/player";

// Seeded as no-ops by E, filled by the Player builder.
export function registerMediaScheme(): void { /* before app ready */ }
export function registerMediaProtocol(): void { /* after ready; Range support from f4ff043 serveFile */ }
export function serveOnly(_path: string): MediaFile { throw new Error("todo"); }   // new random token, replaces the previous one
export function clearServed(): void { /* todo */ }
