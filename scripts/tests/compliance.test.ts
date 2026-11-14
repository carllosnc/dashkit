/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { registry } from '../registry';

const projectRoot = path.resolve(__dirname, '../..');
const dashkitDir = path.resolve(projectRoot, 'src/dashkit');

const IGNORED_DIRS = new Set(['utils', 'presets']);
const RAW_NEUTRAL_SCALE_REGEX = /\b(?:bg|text|border|ring|from|to|via)-(?:zinc|slate|gray|neutral|stone)-[0-9]{2,3}\b/;

function getComponentDirs(): string[] {
  return fs
    .readdirSync(dashkitDir)
    .filter((entry) => {
      if (IGNORED_DIRS.has(entry)) return false;
      return fs.statSync(path.join(dashkitDir, entry)).isDirectory();
    })
    .sort();
}

function collectFiles(dir: string, predicate: (filePath: string) => boolean): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, entry);
    if (fs.statSync(fullPath).isDirectory()) {
      results.push(...collectFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }
  return results;
}

describe('Agent Architecture & Styling Compliance', () => {
  const componentDirs = getComponentDirs();

  it('requires [ComponentName].tsx, [ComponentName].test.tsx, and index.ts in every component folder', () => {
    const missing: string[] = [];

    for (const name of componentDirs) {
      const folder = path.join(dashkitDir, name);
      for (const required of [`${name}.tsx`, `${name}.test.tsx`, 'index.ts']) {
        if (!fs.pathExistsSync(path.join(folder, required))) {
          missing.push(`src/dashkit/${name}/${required}`);
        }
      }
    }

    expect(missing, `Missing required component files:\n${missing.join('\n')}`).toEqual([]);
  });

  it('requires every component folder to be exported from src/dashkit/index.ts', () => {
    const barrelPath = path.join(dashkitDir, 'index.ts');
    const barrelContent = fs.readFileSync(barrelPath, 'utf-8');
    const missingExports: string[] = [];

    for (const name of componentDirs) {
      const exportPattern = new RegExp(`export\\s+\\*\\s+from\\s+['"]\\./${name}['"]`);
      if (!exportPattern.test(barrelContent)) {
        missingExports.push(name);
      }
    }

    expect(
      missingExports,
      `Components missing from src/dashkit/index.ts:\n${missingExports.join('\n')}`
    ).toEqual([]);
  });

  it('requires every component folder to be registered in scripts/registry.ts', () => {
    const registeredFolders = new Set<string>();
    for (const entry of Object.values(registry)) {
      for (const file of entry.files) {
        const match = file.replace(/\\/g, '/').match(/^src\/dashkit\/([^/]+)\//);
        if (match) registeredFolders.add(match[1]);
      }
    }

    const unregistered = componentDirs.filter((name) => !registeredFolders.has(name));
    expect(
      unregistered,
      `Component folders not registered in scripts/registry.ts:\n${unregistered.join('\n')}`
    ).toEqual([]);
  });

  it('forbids per-component .css files in src/dashkit/', () => {
    const forbiddenCss = collectFiles(dashkitDir, (filePath) => {
      if (!filePath.endsWith('.css')) return false;
      const rel = path.relative(dashkitDir, filePath).replace(/\\/g, '/');
      return rel !== 'dashkit.css' && !rel.startsWith('presets/');
    }).map((filePath) => path.relative(projectRoot, filePath).replace(/\\/g, '/'));

    expect(
      forbiddenCss,
      `Per-component CSS files are forbidden (use Tailwind v4 + CVA):\n${forbiddenCss.join('\n')}`
    ).toEqual([]);
  });

  it('forbids raw Tailwind neutral color scales in component source files', () => {
    const componentSources = collectFiles(
      dashkitDir,
      (filePath) => filePath.endsWith('.tsx') && !filePath.endsWith('.test.tsx')
    );

    const violations: string[] = [];
    for (const filePath of componentSources) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const match = content.match(RAW_NEUTRAL_SCALE_REGEX);
      if (match) {
        const rel = path.relative(projectRoot, filePath).replace(/\\/g, '/');
        violations.push(`${rel} (${match[0]})`);
      }
    }

    expect(
      violations,
      `Found raw Tailwind neutral scale classes (use semantic tokens instead):\n${violations.join('\n')}`
    ).toEqual([]);
  });
});
