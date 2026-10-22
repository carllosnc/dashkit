import { useEffect } from 'react';
import { lockBodyScroll } from '../utils/scrollLock';

export interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function useModal({ isOpen, onClose }: UseModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
}
