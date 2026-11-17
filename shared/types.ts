import type { CommandId } from "./commands";

export interface RecentFile {
  path: string;
  name: string;
  openedAt: number;
}

export interface PlayerBridge {
  /** process.platform of the host. */
  platform: string;
  /** Native menu commands. Unknown ids are ignored by the renderer helper. */
  onCommand(cb: (id: CommandId) => void): () => void;
  getRecents(): Promise<RecentFile[]>;
  /** Tells the main process the renderer has mounted. */
  ready(): void;
}
