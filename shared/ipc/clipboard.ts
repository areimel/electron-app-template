import { invoke } from "./define";

export const clipboardIpc = {
  "clipboard:read": invoke<[], { text: string }>(),
  "clipboard:write": invoke<[text: string], void>(),     // max 1 MB
} as const;
