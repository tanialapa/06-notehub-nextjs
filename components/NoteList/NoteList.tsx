import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteList.module.css";
import { deleteNote } from "../../lib/api";
import type { Note } from "../../types/note";
import Link from "next/link";

interface NoteListProps {
  notes: Note[];
}

// Тут ми показуємо список нотаток
// і даємо можливість видалити будь-яку нотатку.
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  // Тут ми видаляємо нотатку за її id.
  function handleDelete(noteId: string) {
    deleteNoteMutation.mutate(noteId);
  }

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View details</Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={
                deleteNoteMutation.isPending &&
                deleteNoteMutation.variables === note.id
              }
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
