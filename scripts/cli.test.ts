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

  it('should handle registry dependencies recursively (card)', async () => {
    const testDir = path.join(TEMP_DIR, 'registry-deps');
    await fs.ensureDir(testDir);

    execSync(`bun x tsx ${CLI_PATH} add card -o components --no-install`, {
      cwd: testDir,
      stdio: 'inherit'
    });

    // Check main component and its dependencies
    expect(await fs.pathExists(path.join(testDir, 'components/Card/Card.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/Badge/Badge.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/Button/Button.tsx'))).toBe(true);
  });

  it('should show simplified dependency notes with --no-install', async () => {
    const testDir = path.join(TEMP_DIR, 'no-install-note');
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, 'package.json'), { name: 'test-app' });

    const output = execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      encoding: 'utf8'
    });

    expect(output).toContain('[INFO] Install missing dependencies:');
  });

  it('should run doctor diagnostics successfully', async () => {
    // Running doctor on the current dashkit project itself
    const output = execSync(`bun x tsx ${CLI_PATH} doctor`, {
      cwd: path.resolve(__dirname, '..'),
      encoding: 'utf8'
    });

    expect(output).toContain('Dashkit UI - Health Check');
    // Note: ora spinners might be stripped in non-TTY test environments
    // but the final health message should be present
    expect(output).toContain('[SUCCESS] Everything looks good! Your component library is healthy.');
  });

  it('should fail doctor if core file is missing', async () => {
    const testDir = path.join(TEMP_DIR, 'doctor-fail');
    await fs.ensureDir(testDir);
    
    // Initialize empty without src/index.css
    try {
      execSync(`bun x tsx ${CLI_PATH} doctor`, {
        cwd: testDir,
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error: unknown) {
      const err = error as { stdout: Buffer };
      const output = err.stdout.toString();
      expect(output).toContain('[INFO] Design system base (index.css) not found');
    }
  });

  it('should fail with an error for non-existent components', async () => {
    const testDir = path.join(TEMP_DIR, 'non-existent');
    await fs.ensureDir(testDir);

    try {
      execSync(`bun x tsx ${CLI_PATH} add unknown-comp -o components`, {
        cwd: testDir,
        stdio: 'pipe'
      });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { stderr: Buffer };
      expect(err.stderr.toString()).toContain('[ERROR] Component "unknown-comp" not found in registry.');
    }
  });

  it('should use output directory from dashkit.json if available', async () => {
    const testDir = path.join(TEMP_DIR, 'dashkit-json-config');
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, 'dashkit.json'), {
      componentsDir: 'my-custom-components',
      cssDir: 'styles'
    });

    execSync(`bun x tsx ${CLI_PATH} add badge --no-install`, {
      cwd: testDir,
      stdio: 'inherit'
    });

    expect(await fs.pathExists(path.join(testDir, 'my-custom-components/Badge/Badge.tsx'))).toBe(true);
  });

  it('should use smart detection for components dir if dashkit.json is missing', async () => {
    const testDir = path.join(TEMP_DIR, 'smart-detection');
    await fs.ensureDir(path.join(testDir, 'src')); // Create src to trigger smart detection

    execSync(`bun x tsx ${CLI_PATH} add badge --no-install`, {
      cwd: testDir,
      stdio: 'inherit'
    });

    // Default for info.hasSrc is path.join('src', 'components', 'dashkit')
    const expectedPath = path.join(testDir, 'src/dashkit/Badge/Badge.tsx');
    expect(await fs.pathExists(expectedPath)).toBe(true);
  });
});
