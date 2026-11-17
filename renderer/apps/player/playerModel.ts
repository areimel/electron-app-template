import type { CommandSpec } from "../../../shared/commands";

// Pure helpers. The main process imports this file too (extension check and MIME type), so it
// must not touch `electron`, React or the DOM.

/** What Chromium plays by itself. Anything else is refused: this template ships no ffmpeg. */
const MIME_BY_EXTENSION: Readonly<Record<string, string>> = {
  mp4: "video/mp4", m4v: "video/mp4", mov: "video/mp4", webm: "video/webm", ogv: "video/ogg",
  mp3: "audio/mpeg", m4a: "audio/mp4", ogg: "audio/ogg", wav: "audio/wav", flac: "audio/flac",
};
const AUDIO = new Set(["mp3", "m4a", "ogg", "wav", "flac"]);

export const MEDIA_EXTENSIONS = Object.keys(MIME_BY_EXTENSION);
export const UNSUPPORTED_MESSAGE = "This file's format isn't supported. Try MP4, WebM or MP3.";

export function extensionOf(name: string): string {
  const m = /\.([^./\\]+)$/.exec(name);
  return m ? m[1]!.toLowerCase() : "";
}

export const isMediaExtension = (name: string): boolean => Object.hasOwn(MIME_BY_EXTENSION, extensionOf(name));
export const isAudioName = (name: string): boolean => AUDIO.has(extensionOf(name));
export const mimeForName = (name: string): string => MIME_BY_EXTENSION[extensionOf(name)] ?? "application/octet-stream";

/** Seek step for the arrow keys and the back and forward buttons. */
export const SEEK_STEP_SEC = 5;

export const PLAYER_COMMANDS: readonly CommandSpec[] = [
  { id: "player.open", label: "Open a file", group: "Player", accelerator: "CmdOrCtrl+O" },
  { id: "player.togglePlay", label: "Play or pause", group: "Player", keys: [" "] },
  { id: "player.back", label: "Back 5 seconds", group: "Player", keys: ["ArrowLeft"] },
  { id: "player.forward", label: "Forward 5 seconds", group: "Player", keys: ["ArrowRight"] },
  { id: "player.fullscreen", label: "Fullscreen video", group: "Player", keys: ["f"] },
  { id: "player.mute", label: "Mute or unmute", group: "Player", keys: ["m"] },
];

export function command(id: string): CommandSpec {
  const c = PLAYER_COMMANDS.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown player command: ${id}`);
  return c;
}
