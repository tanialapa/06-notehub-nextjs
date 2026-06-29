
import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'


interface PaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (nextPage: number) => void
}

// Тут ми показуємо кнопки пагінації
// і повідомляємо батьківський компонент, яку сторінку вибрав користувач.
export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // Тут ми переводимо номер сторінки з react-paginate
  // у звичний формат, який використовуємо в додатку.
  function handlePageChange({ selected }: { selected: number }) {
    onPageChange(selected + 1)
  }

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={handlePageChange}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
    />
  )
}
