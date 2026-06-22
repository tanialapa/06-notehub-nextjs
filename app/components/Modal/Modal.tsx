import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import css from './Modal.module.css'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

// Тут ми створюємо універсальну модалку через portal.
// Вона закривається по Escape, по кліку на бекдроп
// і блокує прокрутку сторінки, поки відкрита.
export default function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    // Тут ми закриваємо модалку, якщо користувач натиснув Escape.
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  // Тут ми не даємо кліку всередині модалки закрити її.
  function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation()
  }

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className={css.modal} onClick={handleModalClick}>
        {children}
      </div>
    </div>,
    document.body
  )
}
