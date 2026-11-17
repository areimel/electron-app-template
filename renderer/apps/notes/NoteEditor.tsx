import { useCallback, useEffect, useRef, useState } from "react";
import type { Note } from "../../../shared/collections/notes";
import { Button } from "../../components/common/Button";
import { TextArea } from "../../components/common/TextArea";
import { TextField } from "../../components/common/TextField";
import { Toolbar } from "../../components/common/Toolbar";
import { useCollection } from "../../hooks/useCollection";
import { useLatest } from "../../hooks/useLatest";
import { useShell, type SaveState } from "../../shell/ShellContext";
import { draftPatch, type Draft } from "./notesModel";

const AUTOSAVE_MS = 500;

/**
 * Edits one note. Typing changes a local draft only; the draft is saved 500 ms after the last keystroke, when
 * focus leaves the editor, and when the editor closes. The parent keys this component by note id, so the draft
 * starts fresh for each note and is never overwritten by the list refreshing underneath it.
 */
export function NoteEditor(p: {
  note: Note; autoFocus: boolean; onSaveState(s: SaveState): void; onPin(): void; onDelete(): void;
}) {
  const { update } = useCollection("notes");
  const { toast } = useShell();
  const [draft, setDraft] = useState<Draft>({ title: p.note.title, body: p.note.body });
  const draftRef = useLatest(draft);
  const noteRef = useLatest(p.note);
  const onSaveState = useLatest(p.onSaveState);
  const timer = useRef<number | undefined>(undefined);

  const save = useCallback(async (quiet: boolean) => {
    window.clearTimeout(timer.current);
    timer.current = undefined;
    const patch = draftPatch(noteRef.current, draftRef.current);
    if (!patch) return;
    if (!quiet) onSaveState.current("saving");
    try {
      await update(noteRef.current.id, patch);
      if (!quiet) onSaveState.current("saved");
    } catch (e) {
      // When the editor is closing (or its note was just deleted) there is nobody left to tell.
      if (quiet) return;
      onSaveState.current("error");
      toast("error", `This note could not be saved (${e instanceof Error ? e.message : "unknown error"}). Your text is still here: edit it again to retry.`);
    }
  }, [update, toast, noteRef, draftRef, onSaveState]);

  const change = (next: Draft) => {
    setDraft(next);
    onSaveState.current("unsaved");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => void save(false), AUTOSAVE_MS);
  };

  // Closing the editor (another note, another sheet, a deleted note) saves what is pending.
  const saveOnClose = useLatest(() => { if (timer.current !== undefined) void save(true); });
  useEffect(() => () => saveOnClose.current(), [saveOnClose]);

  return (
    <div className="notes-editor" onBlur={() => void save(false)}>
      <Toolbar label="Note actions" end={<Button variant="quiet" icon="trash" onClick={p.onDelete}>Delete note</Button>}>
        <Button variant="quiet" icon="pin" onClick={p.onPin}>{p.note.pinned ? "Unpin note" : "Pin note"}</Button>
      </Toolbar>
      <div className="notes-fields">
        <TextField label="Title" placeholder="Untitled note" autoFocus={p.autoFocus} maxLength={200}
          value={draft.title} onChange={(title) => change({ ...draft, title })} />
        <TextArea fill label="Note" placeholder="Write something" maxLength={100_000}
          value={draft.body} onChange={(body) => change({ ...draft, body })} />
      </div>
    </div>
  );
}
