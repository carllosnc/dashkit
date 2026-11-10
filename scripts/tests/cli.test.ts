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

  it('should install every file a component imports so the output compiles (modal)', async () => {
    const testDir = path.join(TEMP_DIR, 'modal-compiles');
    await fs.ensureDir(testDir);

    // Modal imports Backdrop, IconButton and utils/scrollLock — all three were
    // previously missing from the registry/copy logic, so the emitted Modal.tsx
    // failed to resolve its imports in a user project.
    execSync(`bun x tsx ${CLI_PATH} add modal -o components --no-install`, {
      cwd: testDir,
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });

    expect(await fs.pathExists(path.join(testDir, 'components/Modal/Modal.tsx'))).toBe(true);
    // registryDependencies: backdrop + iconbutton
    expect(await fs.pathExists(path.join(testDir, 'components/Backdrop/Backdrop.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, 'components/IconButton/IconButton.tsx'))).toBe(true);
    // utils/scrollLock is imported by useModal and previously never copied
    expect(await fs.pathExists(path.join(testDir, 'components/utils/scrollLock.ts'))).toBe(true);
  }, 30000);

  it('should install tooltip for sidebar and divider for statscard', async () => {
    const testDir = path.join(TEMP_DIR, 'misc-registry-deps');
    await fs.ensureDir(testDir);

    execSync(`bun x tsx ${CLI_PATH} add sidebar -o components --no-install`, {
      cwd: testDir,
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });
    expect(await fs.pathExists(path.join(testDir, 'components/Tooltip/Tooltip.tsx'))).toBe(true);

    execSync(`bun x tsx ${CLI_PATH} add statscard -o components --no-install`, {
      cwd: testDir,
      stdio: 'pipe',
      timeout: SPAWN_TIMEOUT
    });
    expect(await fs.pathExists(path.join(testDir, 'components/Divider/Divider.tsx'))).toBe(true);
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
  it("should list all components and support --json output", async () => {
    const output = execSync(`bun x tsx ${CLI_PATH} list`, {
      cwd: path.resolve(__dirname, "../.."),
      encoding: "utf8",
      timeout: SPAWN_TIMEOUT
    });
    expect(output).toContain("Dashkit Components Registry");
    expect(output).toContain("Button");
    expect(output).toContain("Card");

    const jsonOutput = execSync(`bun x tsx ${CLI_PATH} list --json`, {
      cwd: path.resolve(__dirname, "../.."),
      encoding: "utf8",
      timeout: SPAWN_TIMEOUT
    });
    const parsed = JSON.parse(jsonOutput);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed.some((c: { name: string }) => c.name === "Button")).toBe(true);
  }, 30000);

  it("should exclude test files by default and include them with --tests flag", async () => {
    const testDir = path.join(TEMP_DIR, "tests-flag");
    await fs.ensureDir(testDir);

    // Default: no test files
    execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });
    expect(await fs.pathExists(path.join(testDir, "components/Badge/Badge.tsx"))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, "components/Badge/Badge.test.tsx"))).toBe(false);

    // With --tests and --force: test files included
    execSync(`bun x tsx ${CLI_PATH} add badge -o components --no-install --tests --force`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });
    expect(await fs.pathExists(path.join(testDir, "components/Badge/Badge.test.tsx"))).toBe(true);
  }, 30000);

  it("should inject @import into existing main CSS file on init --yes", async () => {
    const testDir = path.join(TEMP_DIR, "init-inject-css");
    await fs.ensureDir(path.join(testDir, "src"));
    const cssPath = path.join(testDir, "src/index.css");
    await fs.writeFile(cssPath, "@import \"tailwindcss\";\nbody { margin: 0; }\n");

    execSync(`bun x tsx ${CLI_PATH} init --yes`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });

    const updatedCss = await fs.readFile(cssPath, "utf8");
    expect(updatedCss).toContain("@import \"tailwindcss\";");
    expect(updatedCss).toContain("dashkit.css");
  }, 30000);

  it("should add multiple components in a single command and maintain root index.ts barrel file", async () => {
    const testDir = path.join(TEMP_DIR, "multi-add-barrel");
    await fs.ensureDir(testDir);

    execSync(`bun x tsx ${CLI_PATH} add badge switch input -o components --no-install`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });

    expect(await fs.pathExists(path.join(testDir, "components/Badge/Badge.tsx"))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, "components/Switch/Switch.tsx"))).toBe(true);
    expect(await fs.pathExists(path.join(testDir, "components/Input/Input.tsx"))).toBe(true);

    const barrelPath = path.join(testDir, "components/index.ts");
    expect(await fs.pathExists(barrelPath)).toBe(true);
    const barrelContent = await fs.readFile(barrelPath, "utf8");
    expect(barrelContent).toContain("export * from './Badge';");
    expect(barrelContent).toContain("export * from './Input';");
    expect(barrelContent).toContain("export * from './Switch';");
  }, 30000);

  it("should output component metadata and props via info --json", async () => {
    const jsonOutput = execSync(`bun x tsx ${CLI_PATH} info card --json`, {
      cwd: path.resolve(__dirname, "../.."),
      encoding: "utf8",
      timeout: SPAWN_TIMEOUT
    });

    const parsed = JSON.parse(jsonOutput);
    expect(parsed.key).toBe("card");
    expect(parsed.name).toBe("Card");
    expect(parsed.exports).toEqual(expect.arrayContaining(["Card", "CardHeader", "CardContent", "CardFooter"]));
    expect(Array.isArray(parsed.propsDefinitions)).toBe(true);
    expect(parsed.propsDefinitions.length).toBeGreaterThan(0);
  }, 30000);

  it("should not hang when init or add without args is run in non-TTY mode", async () => {
    const testDir = path.join(TEMP_DIR, "non-tty-guard");
    await fs.ensureDir(testDir);

    // init without --yes in piped (non-TTY) mode should auto-accept defaults
    execSync(`bun x tsx ${CLI_PATH} init`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });
    expect(await fs.pathExists(path.join(testDir, "dashkit.json"))).toBe(true);

    // add without component arguments in piped mode should exit with non-zero code instead of hanging
    let threw = false;
    try {
      execSync(`bun x tsx ${CLI_PATH} add`, {
        cwd: testDir,
        stdio: "pipe",
        timeout: SPAWN_TIMEOUT
      });
    } catch {
      threw = true;
    }
    expect(threw).toBe(true);
  }, 30000);

  it("should scaffold consumer AI rules via dashkit ai-rules", async () => {
    const testDir = path.join(TEMP_DIR, "ai-rules-cmd");
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, "dashkit.json"), {
      componentsDir: "src/ui/dashkit",
      cssDir: "src/styles"
    });

    execSync(`bun x tsx ${CLI_PATH} ai-rules`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });

    const agentsPath = path.join(testDir, "AGENTS.md");
    expect(await fs.pathExists(agentsPath)).toBe(true);
    const content = await fs.readFile(agentsPath, "utf8");
    expect(content).toContain("src/ui/dashkit");
    expect(content).toContain("src/styles/dashkit.css");
    expect(content).toContain("3-Tier AI Customization Protocol");
  }, 30000);

  it("should detect modified and up-to-date components via dashkit diff --json", async () => {
    const testDir = path.join(TEMP_DIR, "diff-cmd");
    await fs.ensureDir(testDir);
    await fs.writeJson(path.join(testDir, "dashkit.json"), {
      componentsDir: "components",
      cssDir: "styles"
    });

    execSync(`bun x tsx ${CLI_PATH} add badge switch --no-install`, {
      cwd: testDir,
      stdio: "pipe",
      timeout: SPAWN_TIMEOUT
    });

    // Modify Switch.tsx locally
    const switchFile = path.join(testDir, "components/Switch/Switch.tsx");
    await fs.appendFile(switchFile, "\n// local customization\n");

    const diffJson = execSync(`bun x tsx ${CLI_PATH} diff --json`, {
      cwd: testDir,
      encoding: "utf8",
      timeout: SPAWN_TIMEOUT
    });

    const parsed = JSON.parse(diffJson) as Array<{
      key: string;
      status: string;
      modifiedFiles: string[];
    }>;

    const badgeDiff = parsed.find((c) => c.key === "badge");
    const switchDiff = parsed.find((c) => c.key === "switch");

    expect(badgeDiff?.status).toBe("up-to-date");
    expect(switchDiff?.status).toBe("modified");
    expect(switchDiff?.modifiedFiles).toContain("Switch.tsx");
  }, 30000);
});
