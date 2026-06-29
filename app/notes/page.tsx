"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { fetchNotes } from "@/lib/api";
const PER_PAGE = 12;

// Тут ми зібрали головний компонент додатка:
// зберігаємо стан сторінки, пошуку, модалки і отримуємо нотатки з сервера.
export default function App() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const updateSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search }),
    placeholderData: (previousData) => previousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  // Тут ми відкриваємо модальне вікно для створення нової нотатки.
  function openModal() {
    setIsModalOpen(true);
  }

  // Тут ми закриваємо модальне вікно.
  function closeModal() {
    setIsModalOpen(false);
  }

  // Тут ми оновлюємо значення інпута одразу,
  // а сам запит на сервер запускаємо із затримкою.
  function handleSearch(value: string) {
    setInputValue(value);
    updateSearch(value);
  }

  return (
    <div className="app">
      <header className="toolbar">
        <SearchBox value={inputValue} onChange={handleSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className="button" onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong. Please try again.</p>}
      {!isLoading && !isError && notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && !isError && notes.length === 0 && <p>No notes found.</p>}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onCancel={closeModal} onSuccess={closeModal} />
        </Modal>
      )}
    </div>
  );
}
