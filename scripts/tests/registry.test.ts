/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { registry } from '../registry';

const projectRoot = path.resolve(__dirname, '../..');
const componentsDir = path.resolve(projectRoot, 'src/dashkit');

describe('Registry Integrity', () => {
  it('should ensure all files listed in registry.ts exist on disk', () => {
    for (const [key, component] of Object.entries(registry)) {
      for (const file of component.files) {
        const filePath = path.resolve(projectRoot, file);
        const exists = fs.pathExistsSync(filePath);
        expect(exists, `Component "${key}" references file "${file}" which does not exist on disk`).toBe(true);
      }
    }
  });

  it('should ensure all files in component folders are registered in registry.ts', () => {
    // Get all subdirectories in src/dashkit, except 'utils'
    const subdirs = fs.readdirSync(componentsDir).filter((file) => {
      const fullPath = path.join(componentsDir, file);
      return fs.statSync(fullPath).isDirectory() && file !== 'utils';
    });

    // Collect all registered files across all components, normalized to forward slashes
    const registeredFiles = new Set<string>();
    for (const component of Object.values(registry)) {
      for (const file of component.files) {
        registeredFiles.add(file.replace(/\\/g, '/'));
      }
    }

    const unregisteredFiles: string[] = [];

    // Helper function to recursively find all files in a directory
    function walk(dir: string) {
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath);
        } else {
          const relativePath = path.relative(projectRoot, fullPath).replace(/\\/g, '/');
          if (!registeredFiles.has(relativePath)) {
            unregisteredFiles.push(relativePath);
          }
        }
      }
    }

    for (const subdir of subdirs) {
      walk(path.join(componentsDir, subdir));
    }

    expect(unregisteredFiles, `Found files in component directories that are not registered in scripts/registry.ts:\n${unregisteredFiles.join('\n')}`).toEqual([]);
  });

  it('should ensure all registryDependencies are valid registry keys', () => {
    for (const [key, component] of Object.entries(registry)) {
      if (component.registryDependencies) {
        for (const dep of component.registryDependencies) {
          expect(registry[dep], `Component "${key}" has registryDependency "${dep}" which does not exist in the registry`).toBeDefined();
        }
      }
    }
  });

  it('should keep registryDependencies acyclic', () => {
    // A cycle (a -> b -> a) would make `dashkit add` recurse infinitely
    const state = new Map<string, 'visiting' | 'done'>();
    const cycles: string[] = [];

    const visit = (key: string, chain: string[]): void => {
      const current = state.get(key);
      if (current === 'done') return;
      if (current === 'visiting') {
        cycles.push([...chain, key].join(' -> '));
        return;
      }

      state.set(key, 'visiting');
      for (const dep of registry[key].registryDependencies ?? []) {
        visit(dep, [...chain, key]);
      }
      state.set(key, 'done');
    };

    for (const key of Object.keys(registry)) {
      visit(key, []);
    }

    expect(cycles, `Cycle(s) detected in registryDependencies:\n${cycles.join('\n')}`).toEqual([]);
  });

  it('should resolve every cross-component import via registryDependencies', () => {
    // A component file may import from ../AnotherComponent or ../utils. The
    // utils dir is always copied, but another component is only copied when it
    // is reachable through registryDependencies — otherwise `dashkit add`
    // emits code that references files that were never installed (and thus
    // does not compile in the user's project).
    const ownerByFile = new Map<string, Set<string>>();
    for (const [key, component] of Object.entries(registry)) {
      for (const file of component.files) {
        const abs = path.resolve(projectRoot, file);
        const owners = ownerByFile.get(abs) ?? new Set<string>();
        owners.add(key);
        ownerByFile.set(abs, owners);
      }
    }

    // Transitive closure of registryDependencies for a given component key.
    const closure = (start: string): Set<string> => {
      const seen = new Set<string>();
      const stack = [start];
      while (stack.length > 0) {
        const key = stack.pop()!;
        if (seen.has(key)) continue;
        seen.add(key);
        for (const dep of registry[key].registryDependencies ?? []) stack.push(dep);
      }
      return seen;
    };

    const IMPORT_RE = /(?:from\s+|import\s+|require\()\s*['"](\.[^'"]+)['"]/g;
    const problems: string[] = [];

    for (const [key, component] of Object.entries(registry)) {
      const allowed = closure(key);

      for (const file of component.files) {
        if (!/\.(ts|tsx)$/.test(file)) continue;
        const absFile = path.resolve(projectRoot, file);
        const source = fs.readFileSync(absFile, 'utf8');

        for (const match of source.matchAll(IMPORT_RE)) {
          const spec = match[1];
          const base = path.resolve(path.dirname(absFile), spec);
          const resolved = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')]
            .find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
          if (!resolved) continue; // css / asset / unresolved — not a registry concern

          // Imports from the shared utils dir are always shipped by the CLI.
          if (resolved.replace(/\\/g, '/').includes('/src/dashkit/utils/')) continue;

          const owners = ownerByFile.get(resolved);
          if (!owners) {
            // Imported file lives outside any registered component (and isn't utils).
            problems.push(`${file} imports "${spec}" but no registry entry ships "${path.relative(projectRoot, resolved)}"`);
            continue;
          }
          // Covered if ANY component that ships this file is reachable via registryDependencies.
          const covered = [...owners].some((owner) => allowed.has(owner));
          if (!covered) {
            problems.push(`${file} imports "${spec}" (shipped by ${[...owners].map((o) => `"${o}"`).join(', ')}) but none is a registryDependency of "${key}"`);
          }
        }
      }
    }

    expect(problems, `Components import files that \`dashkit add\` would not install:\n${problems.join('\n')}`).toEqual([]);
  });
});
