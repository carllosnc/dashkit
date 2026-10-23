import { describe, it, expect, beforeEach } from 'vitest';
import { lockBodyScroll } from './scrollLock';

describe('lockBodyScroll', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  it('locks the body on first acquire and restores on last release', () => {
    const release = lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    release();
    expect(document.body.style.overflow).toBe('');
  });

  it('keeps the body locked while a stacked overlay holds a lock', () => {
    // e.g. a Drawer opened on top of a Modal
    const releaseModal = lockBodyScroll();
    const releaseDrawer = lockBodyScroll();

    // Closing the Drawer must not unlock the page (Modal is still open)
    releaseDrawer();
    expect(document.body.style.overflow).toBe('hidden');

    releaseModal();
    expect(document.body.style.overflow).toBe('');
  });

  it('ignores repeated releases from the same lock', () => {
    const releaseOuter = lockBodyScroll();
    const releaseInner = lockBodyScroll();

    releaseInner();
    releaseInner(); // double cleanup must not drop the outer lock

    expect(document.body.style.overflow).toBe('hidden');

    releaseOuter();
    expect(document.body.style.overflow).toBe('');
  });

  it('restores a previously set overflow value', () => {
    document.body.style.overflow = 'scroll';

    const release = lockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    release();
    expect(document.body.style.overflow).toBe('scroll');
  });
});
