/** @vitest-environment node */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, 'cli.ts');
const TEMP_DIR = path.resolve(__dirname, '../tmp/cli-tests');

describe('Dashkit CLI', () => {
  beforeAll(async () => {
    // Ensure the temp directory is empty
    await fs.remove(TEMP_DIR);
    await fs.ensureDir(TEMP_DIR);
  });

  afterAll(async () => {
    // Clean up
    await fs.remove(TEMP_DIR);
  });

  it('should add a basic component (badge)', async () => {
    const testDir = path.join(TEMP_DIR, 'basic-component');
    await fs.ensureDir(testDir);
    
    // Run CLI via tsx to test source
    execSync(`npx tsx ${CLI_PATH} add badge -o components`, {
      cwd: testDir,
      stdio: 'inherit'
    });

    const componentFile = path.join(testDir, 'components/Badge/Badge.tsx');
    expect(await fs.pathExists(componentFile)).toBe(true);
  });

  it('should handle registry dependencies recursively (card)', async () => {
    const testDir = path.join(TEMP_DIR, 'registry-deps');
    await fs.ensureDir(testDir);
    
    // Run CLI
    execSync(`npx tsx ${CLI_PATH} add card -o components`, {
      cwd: testDir,
      stdio: 'inherit'
    });

    // Check main component
    expect(await fs.pathExists(path.join(testDir, 'components/Card/Card.tsx'))).toBe(true);
    // Check registry dependencies
    expect(await fs.pathExists(path.join(testDir, 'components/Badge/Badge.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/Button/Button.tsx'))).toBe(true);
  });

  it('should not install dependencies if --no-install is flag is set', async () => {
    const testDir = path.join(TEMP_DIR, 'no-install-flag');
    await fs.ensureDir(testDir);
    
    // Initialize a package.json to avoid auto-detecting npm
    await fs.writeJson(path.join(testDir, 'package.json'), { name: 'test-app' });

    // Run CLI with --no-install
    const output = execSync(`npx tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      encoding: 'utf8'
    });

    expect(output).toContain('Ensure you have these dependencies installed');
    expect(await fs.pathExists(path.join(testDir, 'node_modules'))).toBe(false);
  });

  it('should fail with an error for non-existent components', async () => {
    const testDir = path.join(TEMP_DIR, 'non-existent');
    await fs.ensureDir(testDir);

    try {
      execSync(`npx tsx ${CLI_PATH} add unknown-comp -o components`, {
        cwd: testDir,
        stdio: 'pipe' // Capture output
      });
      // Should not reach here
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { stderr?: Buffer };
      expect(err.stderr?.toString()).toContain('Component "unknown-comp" not found in registry.');
    }
  });
});
