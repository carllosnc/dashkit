import { describe, it, expect } from 'vitest';
import { getPortalThemeAttrs } from './portalTheme';

describe('getPortalThemeAttrs', () => {
  it('extracts scoped data-primary, data-base, and data-dark-bg from ancestor elements', () => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('data-primary', 'emerald');
    wrapper.setAttribute('data-base', 'stone');
    wrapper.setAttribute('data-dark-bg', 'oled');
    wrapper.setAttribute('data-preset', 'brutalist');

    const child = document.createElement('button');
    wrapper.appendChild(child);
    document.body.appendChild(wrapper);

    expect(getPortalThemeAttrs(child)).toEqual({
      'data-primary': 'emerald',
      'data-base': 'stone',
      'data-dark-bg': 'oled',
      'data-preset': 'brutalist',
    });

    document.body.removeChild(wrapper);
  });

  it('returns empty object when no theme attributes are present', () => {
    const child = document.createElement('div');
    document.body.appendChild(child);
    expect(getPortalThemeAttrs(child)).toEqual({});
    document.body.removeChild(child);
  });
});
