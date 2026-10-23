let lockCount = 0;
let previousOverflow = '';

/**
 * Lock body scroll with reference counting, so stacked overlays (e.g. a Drawer
 * opened over a Modal) keep the page locked until the last one closes.
 *
 * Returns a release function that must be called on cleanup; it is safe to
 * call more than once.
 */
export function lockBodyScroll(): () => void {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  lockCount += 1;

  let released = false;
  return () => {
    if (released) return;
    released = true;

    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.body.style.overflow = previousOverflow;
    }
  };
}
