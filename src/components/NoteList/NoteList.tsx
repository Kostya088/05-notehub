import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteNote } from "../../services/noteService";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const QueryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess() {
      QueryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError(error) {
      console.error("Failed to create note:", error);
    },
  });

  const noteGrid = notes.map((note: Note) => {
    return (
      <li key={note.id} className={css.listItem}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <div className={css.footer}>
          <span className={css.tag}>{note.tag}</span>
          <button className={css.button} onClick={() => mutate(note.id)}>
            Delete
          </button>
        </div>
      </li>
    );
  });

  return <ul className={css.list}>{noteGrid}</ul>;
}
