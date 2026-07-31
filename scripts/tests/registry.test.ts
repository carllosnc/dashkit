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
});
