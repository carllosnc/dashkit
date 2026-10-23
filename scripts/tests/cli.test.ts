/** @vitest-environment node */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

const CLI_PATH = path.resolve(__dirname, '../cli.ts');
const TEMP_DIR = path.resolve(__dirname, '../../tmp/cli-tests');
// execSync blocks the worker thread, so vitest's own test timeout cannot
// interrupt it — every spawn must carry its own kill timeout.
const SPAWN_TIMEOUT = 20000;

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
      stdio: 'inherit',
      timeout: SPAWN_TIMEOUT
    });

    // Check main component and its dependencies
    expect(await fs.pathExists(path.join(testDir, 'components/Card/Card.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/Badge/Badge.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/Button/Button.tsx'))).toBe(true);
  }, 30000);

  it('should show simplified dependency notes with --no-install', async () => {
    const testDir = path.join(TEMP_DIR, 'no-install-note');
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, 'package.json'), { name: 'test-app' });

    const output = execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      encoding: 'utf8',
      timeout: SPAWN_TIMEOUT
    });

    expect(output).toContain('[INFO] Install missing dependencies:');
  }, 30000);

  it('should run doctor diagnostics successfully', async () => {
    // Running doctor on the current dashkit project itself
    const output = execSync(`bun x tsx ${CLI_PATH} doctor`, {
      cwd: path.resolve(__dirname, '../..'),
      encoding: 'utf8',
      timeout: SPAWN_TIMEOUT
    });

    expect(output).toContain('Dashkit UI - Health Check');
    // Note: ora spinners might be stripped in non-TTY test environments
    // but the final health message should be present
    expect(output).toContain('[SUCCESS] Everything looks good! Your component library is healthy.');
  }, 30000);

  it('should fail doctor if core file is missing', async () => {
    const testDir = path.join(TEMP_DIR, 'doctor-fail');
    await fs.ensureDir(testDir);

    // Initialize empty without src/index.css
    let threw = false;
    let stdout = '';
    try {
      execSync(`bun x tsx ${CLI_PATH} doctor`, {
        cwd: testDir,
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: SPAWN_TIMEOUT
      });
    } catch (error: unknown) {
      threw = true;
      stdout = (error as { stdout: Buffer }).stdout.toString();
    }

    // The command must actually fail — assertions only running inside `catch`
    // would let a passing command satisfy the test vacuously
    expect(threw, 'doctor should exit with a non-zero code when core files are missing').toBe(true);
    expect(stdout).toContain('Design system base');
    expect(stdout).toContain('index.css');
    expect(stdout).toContain('not found');
  }, 30000);

  it('should fail with an error for non-existent components', async () => {
    const testDir = path.join(TEMP_DIR, 'non-existent');
    await fs.ensureDir(testDir);

    try {
      execSync(`bun x tsx ${CLI_PATH} add unknown-comp -o components`, {
        cwd: testDir,
        stdio: 'pipe',
        timeout: SPAWN_TIMEOUT
      });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { stderr: Buffer };
      expect(err.stderr.toString()).toContain('[ERROR] Component "unknown-comp" not found in registry.');
    }
  }, 30000);

  it('should not overwrite existing files without --force', async () => {
    const testDir = path.join(TEMP_DIR, 'no-overwrite');
    await fs.ensureDir(path.join(testDir, 'components', 'Badge'));
    const customFile = path.join(testDir, 'components', 'Badge', 'Badge.tsx');
    await fs.writeFile(customFile, '// my local modifications\n');

    const output = execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });

    // User modifications are preserved
    expect(await fs.readFile(customFile, 'utf8')).toBe('// my local modifications\n');
    expect(output).toContain('[WARNING]');
    expect(output).toContain('use --force to overwrite');
    // Non-conflicting files are still copied
    expect(await fs.pathExists(path.join(testDir, 'components', 'Badge', 'index.ts'))).toBe(true);
  }, 30000);

  it('should overwrite existing files with --force', async () => {
    const testDir = path.join(TEMP_DIR, 'force-overwrite');
    await fs.ensureDir(path.join(testDir, 'components', 'Badge'));
    const customFile = path.join(testDir, 'components', 'Badge', 'Badge.tsx');
    await fs.writeFile(customFile, '// my local modifications\n');

    execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install --force`, {
      cwd: testDir,
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });

    const source = await fs.readFile(
      path.resolve(__dirname, '../../src/dashkit/Badge/Badge.tsx'),
      'utf8'
    );
    expect(await fs.readFile(customFile, 'utf8')).toBe(source);
  }, 30000);

  it('should exit with a non-zero code when adding a component fails', async () => {
    const testDir = path.join(TEMP_DIR, 'add-failure');
    // A file where the component directory must go makes the copy fail
    await fs.ensureDir(path.join(testDir, 'components'));
    await fs.writeFile(path.join(testDir, 'components', 'Card'), 'not a directory');

    try {
      execSync(`bun x tsx ${CLI_PATH} add card -o components --no-install`, {
        cwd: testDir,
        stdio: 'pipe',
        timeout: SPAWN_TIMEOUT
      });
      expect(true).toBe(false);
    } catch (error: unknown) {
      const err = error as { status?: number | null; stderr: Buffer };
      expect(err.status).not.toBe(0);
      expect(err.stderr.toString()).toContain('[ERROR] Error adding Card');
    }
  }, 30000);

  it('should emit utils/cn.ts as a prerequisite when adding a component', async () => {
    const testDir = path.join(TEMP_DIR, 'cn-prerequisite');
    await fs.ensureDir(testDir);

    execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });

    // Components import '../utils/cn', which previously only `init` copied —
    // `add` alone produced code that did not compile
    expect(await fs.pathExists(path.join(testDir, 'components/utils/cn.ts'))).toBe(true);
  }, 30000);

  it('should initialize a project with init (css, config, cn.ts)', async () => {
    const testDir = path.join(TEMP_DIR, 'init');
    await fs.ensureDir(testDir);

    // Non-interactive run via the --yes flag (prompts race on piped stdin)
    execSync(`bun x tsx ${CLI_PATH} init --yes`, {
      cwd: testDir,
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });

    expect(await fs.pathExists(path.join(testDir, 'dashkit.json'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'dashkit', 'dashkit.css'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'dashkit', 'utils', 'cn.ts'))).toBe(true);
  }, 30000);

  it('should use output directory from dashkit.json if available', async () => {
    const testDir = path.join(TEMP_DIR, 'dashkit-json-config');
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, 'dashkit.json'), {
      componentsDir: 'my-custom-components',
      cssDir: 'styles'
    });

    execSync(`bun x tsx ${CLI_PATH} add badge --no-install`, {
      cwd: testDir,
      stdio: 'inherit',
      timeout: SPAWN_TIMEOUT
    });

    expect(await fs.pathExists(path.join(testDir, 'my-custom-components/Badge/Badge.tsx'))).toBe(true);
  }, 30000);

  it('should use smart detection for components dir if dashkit.json is missing', async () => {
    const testDir = path.join(TEMP_DIR, 'smart-detection');
    await fs.ensureDir(path.join(testDir, 'src')); // Create src to trigger smart detection

    execSync(`bun x tsx ${CLI_PATH} add badge --no-install`, {
      cwd: testDir,
      stdio: 'inherit',
      timeout: SPAWN_TIMEOUT
    });

    // Default for info.hasSrc is path.join('src', 'components', 'dashkit')
    const expectedPath = path.join(testDir, 'src/dashkit/Badge/Badge.tsx');
    expect(await fs.pathExists(expectedPath)).toBe(true);
  }, 30000);
});
