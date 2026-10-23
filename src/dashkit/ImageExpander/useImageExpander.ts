import { useState, useEffect } from 'react';
import { lockBodyScroll } from '../utils/scrollLock';

export function useImageExpander() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (!isOpen) return;

    window.addEventListener('keydown', handleKeyDown);
    const releaseScroll = lockBodyScroll();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      releaseScroll();
    };
  }, [isOpen]);

  return {
    isOpen,
    setIsOpen,
  };
}
