export interface PortalThemeAttrs {
  'data-primary'?: string;
  'data-base'?: string;
  'data-dark-bg'?: string;
}

export function getPortalThemeAttrs(source?: Element | null): PortalThemeAttrs {
  if (typeof document === 'undefined') return {};

  const el =
    source ??
    (document.activeElement instanceof Element
      ? document.activeElement
      : document.documentElement);

  if (!el || typeof el.closest !== 'function') return {};

  const attrs: PortalThemeAttrs = {};
  const primary = el.closest('[data-primary]')?.getAttribute('data-primary');
  const base = el.closest('[data-base]')?.getAttribute('data-base');
  const darkBg = el.closest('[data-dark-bg]')?.getAttribute('data-dark-bg');

  if (primary) attrs['data-primary'] = primary;
  if (base) attrs['data-base'] = base;
  if (darkBg) attrs['data-dark-bg'] = darkBg;

  return attrs;
}
