import css from './SearchBox.module.css'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

// Тут ми створюємо поле пошуку для нотаток.
export default function SearchBox({ value, onChange }: SearchBoxProps) {
  // Тут ми передаємо в батьківський компонент новий текст із інпута.
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
  }

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />
  )
}
