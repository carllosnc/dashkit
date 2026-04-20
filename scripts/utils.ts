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
