import fs from 'fs-extra';
import path from 'path';

export interface ProjectInfo {
  hasSrc: boolean;
  hasApp: boolean;
}

export interface DashkitConfig {
  componentsDir: string;
  cssDir: string;
}

const CONFIG_FILE = 'dashkit.json';

export async function saveConfig(config: DashkitConfig) {
  await fs.writeJson(path.resolve(process.cwd(), CONFIG_FILE), config, { spaces: 2 });
}

export async function loadConfig(): Promise<DashkitConfig | null> {
  const configPath = path.resolve(process.cwd(), CONFIG_FILE);
  if (await fs.pathExists(configPath)) {
    try {
      return await fs.readJson(configPath);
    } catch {
      return null;
    }
  }
  return null;
}

export async function getProjectInfo(): Promise<ProjectInfo> {
  const cwd = process.cwd();
  const hasSrc = await fs.pathExists(path.resolve(cwd, 'src'));
  const hasApp = await fs.pathExists(path.resolve(cwd, 'app')) || await fs.pathExists(path.resolve(cwd, 'src', 'app'));

  return { hasSrc, hasApp };
}

export function getFolderStructure(info: ProjectInfo) {
  const base = info.hasSrc ? 'src' : '';

  return {
    components: path.join(base, 'dashkit'),
    css: path.join(base, 'dashkit')
  };
}

export async function findMainCssFile(cwd = process.cwd()): Promise<string | null> {
  const candidates = [
    'src/index.css',
    'src/main.css',
    'src/app.css',
    'src/globals.css',
    'src/app/globals.css',
    'app/globals.css',
    'styles/globals.css',
    'index.css',
  ];

  for (const rel of candidates) {
    const full = path.resolve(cwd, rel);
    if (await fs.pathExists(full)) {
      return full;
    }
  }

  return null;
}

export function getRelativeCssImport(mainCssPath: string, dashkitCssPath: string): string {
  let rel = path.relative(path.dirname(mainCssPath), dashkitCssPath).replace(/\\/g, '/');
  if (!rel.startsWith('.')) {
    rel = `./${rel}`;
  }
  return rel;
}

export async function injectDashkitCss(
  mainCssPath: string,
  dashkitCssPath: string
): Promise<{ updated: boolean; reason?: string; importPath?: string }> {
  if (!(await fs.pathExists(mainCssPath))) {
    return { updated: false, reason: 'main_css_not_found' };
  }

  const content = await fs.readFile(mainCssPath, 'utf8');
  if (content.includes('dashkit.css')) {
    return { updated: false, reason: 'already_imported' };
  }

  const importPath = getRelativeCssImport(mainCssPath, dashkitCssPath);
  const importStatement = `@import "${importPath}";`;

  // Look for @import "tailwindcss" (with single or double quotes, optional semicolon)
  const twImportRegex = /(@import\s+['"]tailwindcss['"];?\r?\n)/;
  let newContent: string;

  if (twImportRegex.test(content)) {
    newContent = content.replace(twImportRegex, `$1${importStatement}\n`);
  } else {
    newContent = `${importStatement}\n${content}`;
  }

  await fs.writeFile(mainCssPath, newContent, 'utf8');
  return { updated: true, importPath };
}
