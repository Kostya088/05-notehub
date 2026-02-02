import axios from "axios";
import type { Note } from "../types/note";

const NOTEHUB_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

interface NotesApiResponse {
  notes: Note[];
  totalPages: number;
}

export const notesApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api/notes",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
  },
});

export async function fetchNotes(
  page: number,
  query: string,
): Promise<NotesApiResponse> {
  try {
    const { data } = await notesApi.get<NotesApiResponse>("", {
      params: { page, perPage: 12, search: query },
    });
    return data;
  } catch (err) {
    console.error("Failed to fetch notes:", err);
    throw err;
  }
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: string;
}

export async function createNote(body: CreateNoteProps): Promise<Note> {
  try {
    const { data } = await notesApi.post<Note>("", body);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
export async function deleteNote(id: Note["id"]) {
  const { data } = await notesApi.delete<Note>(`/${id}`);
  return data;
}
