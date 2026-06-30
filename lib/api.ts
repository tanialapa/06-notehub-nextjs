import axios from 'axios'
import type { Note, NoteTag } from '../types/note'

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
const BASE_URL = "https://notehub-public.goit.study/api";

const notehubApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await notehubApi.get<Note>(`/notes/${noteId}`)
  return response.data
}


export interface FetchNotesParams {
  page: number
  perPage: number
  search?: string
}

export interface FetchNotesResponse {
  notes: Note[]
  totalPages: number
}

export interface CreateNoteData {
  title: string
  content: string
  tag: NoteTag
}

// Тут ми отримуємо список нотаток із сервера.
// Також можемо передати сторінку, кількість елементів і текст пошуку.
export async function fetchNotes({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const response = await notehubApi.get<FetchNotesResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
    },
  })

  return response.data
}

// Тут ми створюємо нову нотатку на сервері.
export async function createNote(noteData: CreateNoteData): Promise<Note> {
  const response = await notehubApi.post<Note>('/notes', noteData)

  return response.data
}

// Тут ми видаляємо нотатку з сервера за її id.
export async function deleteNote(noteId: string): Promise<Note> {
  const response = await notehubApi.delete<Note>(`/notes/${noteId}`)

  return response.data
}
